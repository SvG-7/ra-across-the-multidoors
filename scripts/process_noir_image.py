import os
from collections import deque
from PIL import Image

src_path = r"C:\Users\saish\.gemini\antigravity\brain\935f113b-6f1a-4ec0-b6c8-50be60006ca4\spiderman_noir_1794270414084.jpg"
out_dir = r"S:\ra-across-the-multidoors\public\images"

img = Image.open(src_path).convert("RGBA")
width, height = img.size
data = img.load()

visited = [[False]*height for _ in range(width)]
queue = deque()

threshold = 240
for x in range(width):
    for y in [0, 1, 2, height-1, height-2, height-3]:
        r, g, b, _ = data[x, y]
        if r > threshold and g > threshold and b > threshold:
            visited[x][y] = True
            queue.append((x, y))

for y in range(height):
    for x in [0, 1, 2, width-1, width-2, width-3]:
        r, g, b, _ = data[x, y]
        if r > threshold and g > threshold and b > threshold and not visited[x][y]:
            visited[x][y] = True
            queue.append((x, y))

while queue:
    cx, cy = queue.popleft()
    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nx, ny = cx + dx, cy + dy
        if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
            r, g, b, _ = data[nx, ny]
            if r > 232 and g > 232 and b > 232:
                visited[nx][ny] = True
                queue.append((nx, ny))

# Also clean enclosed background pockets below mid-torso (between boots/coat skirt)
# Safe since white goggles/stitching are all above y = 0.45 * height
cutoff_y = int(height * 0.55)
for y in range(cutoff_y, height):
    for x in range(width):
        if not visited[x][y]:
            r, g, b, _ = data[x, y]
            if r > 236 and g > 236 and b > 236 and abs(r - b) < 15:
                # Flood fill interior white pocket
                q2 = deque([(x, y)])
                visited[x][y] = True
                while q2:
                    px, py = q2.popleft()
                    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nx, ny = px + dx, py + dy
                        if 0 <= nx < width and cutoff_y <= ny < height and not visited[nx][ny]:
                            rr, gg, bb, _ = data[nx, ny]
                            if rr > 230 and gg > 230 and bb > 230 and abs(rr - bb) < 18:
                                visited[nx][ny] = True
                                q2.append((nx, ny))

alpha_mask = Image.new("L", (width, height), 255)
alpha_data = alpha_mask.load()
for x in range(width):
    for y in range(height):
        if visited[x][y]:
            r, g, b, _ = data[x, y]
            min_val = min(r, g, b)
            if min_val >= 248:
                alpha_data[x, y] = 0
            else:
                alpha_data[x, y] = max(0, min(255, int(255 * (248 - min_val) / 16.0)))

img.putalpha(alpha_mask)
bbox = img.getbbox()
if bbox:
    pad = 8
    crop_box = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(width, bbox[2]+pad), min(height, bbox[3]+pad))
    img_cropped = img.crop(crop_box)
else:
    img_cropped = img

full_out = os.path.join(out_dir, "spiderman-noir.png")
img_cropped.save(full_out, "PNG")
print(f"Updated clean Noir sprite at {full_out}, size {img_cropped.size}")

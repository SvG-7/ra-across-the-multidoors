import os
from PIL import Image, ImageFilter

src_path = r"C:\Users\saish\.gemini\antigravity\brain\935f113b-6f1a-4ec0-b6c8-50be60006ca4\spiderman_noir_1794270414084.jpg"
out_dir = r"S:\ra-across-the-multidoors\public\images"

img = Image.open(src_path).convert("RGBA")
width, height = img.size

# We want to make the pure/near-white background transparent while preserving the character's ink outlines
# The character has dark tones (blacks, greys) and white goggles.
# Notice goggles are inside the mask, so an outside flood-fill from edges (or threshold based on outside connected component)
# ensures internal whites (like goggles) are NEVER made transparent!

from collections import deque

# Flood fill from all 4 borders to find background pixels
visited = [[False]*height for _ in range(width)]
queue = deque()

# Add all border pixels that are near white
threshold = 240
data = img.load()

for x in range(width):
    for y in [0, 1, 2, height-1, height-2, height-3]:
        r, g, b, a = data[x, y]
        if r > threshold and g > threshold and b > threshold:
            visited[x][y] = True
            queue.append((x, y))

for y in range(height):
    for x in [0, 1, 2, width-1, width-2, width-3]:
        r, g, b, a = data[x, y]
        if r > threshold and g > threshold and b > threshold:
            if not visited[x][y]:
                visited[x][y] = True
                queue.append((x, y))

# Flood fill outward
while queue:
    cx, cy = queue.popleft()
    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nx, ny = cx + dx, cy + dy
        if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
            r, g, b, a = data[nx, ny]
            # Consider background if very light/white
            if r > 232 and g > 232 and b > 232:
                visited[nx][ny] = True
                queue.append((nx, ny))

# Now create alpha mask with soft edge feathering
alpha_mask = Image.new("L", (width, height), 255)
alpha_data = alpha_mask.load()

for x in range(width):
    for y in range(height):
        if visited[x][y]:
            r, g, b, a = data[x, y]
            # Transition opacity for pixels near threshold
            min_val = min(r, g, b)
            if min_val >= 248:
                alpha_data[x, y] = 0
            else:
                # Soft transition
                trans = int(255 * (248 - min_val) / 16.0)
                alpha_data[x, y] = max(0, min(255, trans))

# Apply alpha mask
img.putalpha(alpha_mask)

# Crop to non-transparent bounding box
bbox = img.getbbox()
if bbox:
    # slight padding
    pad = 10
    crop_box = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(width, bbox[2]+pad), min(height, bbox[3]+pad))
    img_cropped = img.crop(crop_box)
else:
    img_cropped = img

full_out = os.path.join(out_dir, "spiderman-noir.png")
img_cropped.save(full_out, "PNG")
print(f"Saved full body to {full_out}, size {img_cropped.size}")

# Upper body / Portrait crop (hat down to belt/mid-torso)
cw, ch = img_cropped.size
portrait_box = (int(cw * 0.15), 0, int(cw * 0.85), int(ch * 0.52))
portrait_img = img_cropped.crop(portrait_box)
portrait_out = os.path.join(out_dir, "spiderman-noir-portrait.png")
portrait_img.save(portrait_out, "PNG")
print(f"Saved portrait to {portrait_out}, size {portrait_img.size}")

import sys
import os
from collections import deque
from PIL import Image

def extract_sprite(src_path: str, out_path: str, clean_enclosed_neutral: bool = False, cutoff_ratio: float = 0.55):
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    data = img.load()

    visited = [[False] * height for _ in range(width)]
    queue = deque()

    def is_bg_seed(r, g, b):
        return r > 238 and g > 238 and b > 238 and abs(r - g) < 16 and abs(g - b) < 16

    def is_bg_pixel(r, g, b):
        return r > 224 and g > 224 and b > 224 and max(r, g, b) - min(r, g, b) < 20

    for x in range(width):
        for y in [0, 1, 2, height - 1, height - 2, height - 3]:
            if 0 <= y < height:
                r, g, b, _ = data[x, y]
                if is_bg_seed(r, g, b) and not visited[x][y]:
                    visited[x][y] = True
                    queue.append((x, y))

    for y in range(height):
        for x in [0, 1, 2, width - 1, width - 2, width - 3]:
            if 0 <= x < width:
                r, g, b, _ = data[x, y]
                if is_bg_seed(r, g, b) and not visited[x][y]:
                    visited[x][y] = True
                    queue.append((x, y))

    while queue:
        cx, cy = queue.popleft()
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                r, g, b, _ = data[nx, ny]
                if is_bg_pixel(r, g, b):
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    if clean_enclosed_neutral:
        cutoff_y = int(height * cutoff_ratio)
        for y in range(cutoff_y, height):
            for x in range(width):
                if not visited[x][y]:
                    r, g, b, _ = data[x, y]
                    if r > 236 and g > 236 and b > 236 and max(r, g, b) - min(r, g, b) < 16:
                        q2 = deque([(x, y)])
                        visited[x][y] = True
                        while q2:
                            px, py = q2.popleft()
                            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                                nx, ny = px + dx, py + dy
                                if 0 <= nx < width and cutoff_y <= ny < height and not visited[nx][ny]:
                                    rr, gg, bb, _ = data[nx, ny]
                                    if rr > 228 and gg > 228 and bb > 228 and max(rr, gg, bb) - min(rr, gg, bb) < 18:
                                        visited[nx][ny] = True
                                        q2.append((nx, ny))

    alpha_mask = Image.new("L", (width, height), 255)
    alpha_data = alpha_mask.load()
    for x in range(width):
        for y in range(height):
            if visited[x][y]:
                r, g, b, _ = data[x, y]
                min_val = min(r, g, b)
                if min_val >= 244:
                    alpha_data[x, y] = 0
                else:
                    trans = int(255 * (244 - min_val) / 20.0)
                    alpha_data[x, y] = max(0, min(255, trans))
                # Defringe near-white semi-transparent pixels slightly darker so no white halo
                if 0 < alpha_data[x, y] < 200:
                    data[x, y] = (int(r * 0.75), int(g * 0.75), int(b * 0.75), alpha_data[x, y])

    img.putalpha(alpha_mask)
    bbox = img.getbbox()
    if bbox:
        pad = 6
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(width, bbox[2] + pad),
            min(height, bbox[3] + pad),
        )
        img = img.crop(crop_box)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "PNG")
    print(f"Saved {out_path} ({img.size})")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python extract_sprite.py <src> <dst> [clean_enclosed_true_false] [cutoff_ratio]")
        sys.exit(1)
    src = sys.argv[1]
    dst = sys.argv[2]
    clean_enc = len(sys.argv) > 3 and sys.argv[3].lower() == "true"
    cutoff = float(sys.argv[4]) if len(sys.argv) > 4 else 0.55
    extract_sprite(src, dst, clean_enc, cutoff)

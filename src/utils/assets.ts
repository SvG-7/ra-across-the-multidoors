export function getAssetUrl(path: string): string {
  const base = (import.meta as any).env?.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}

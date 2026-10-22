/**
 * Asset URL resolution helper for GitHub Pages and Custom Domains.
 * Prepends NEXT_PUBLIC_BASE_PATH if configured, without double-prefixing.
 */
export function getAssetPath(path?: string | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (basePath && (cleanPath === basePath || cleanPath.startsWith(`${basePath}/`))) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}

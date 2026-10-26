/**
 * Prepends NEXT_PUBLIC_BASE_PATH to relative asset URLs if present.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  let basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!basePath && typeof window !== 'undefined' && window.location.pathname.startsWith('/HRS-Group-Website')) {
    basePath = '/HRS-Group-Website';
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

export default getAssetUrl;

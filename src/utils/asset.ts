/**
 * Resolves an asset path to work consistently in both local development
 * and subpath-hosted deployments (such as GitHub Pages).
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading '/' or './'
  const cleanPath = path.replace(/^(\.\/|\/)/, '');

  // Vite base URL ('./' by default)
  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;

  return `${prefix}${cleanPath}`;
}

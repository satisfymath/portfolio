/**
 * Asset helper for GitHub Pages compatibility
 * Resolves paths relative to the configured base URL
 */
export function withBase(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Get base URL from Vite
    const base = import.meta.env.BASE_URL || './';

    // Simple concatenation - works for both dev ("/") and prod ("./")
    // Ensure base ends with slash
    const normalizedBase = base.endsWith('/') ? base : base + '/';

    return normalizedBase + cleanPath;
}

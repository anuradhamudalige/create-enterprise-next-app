const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const getPath = (relPath: string) => `${BASE_PATH}${relPath}`;

export const getExcludedRoutes = () => {
  const excludedRoutes = (process.env.NEXT_PUBLIC_PUBLIC_ROUTES || '').split(',');
  return excludedRoutes.map(route => getPath(route));
};
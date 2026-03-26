export default function imageLoader({ src, width, quality }) {
  const basePath = process.env.NODE_ENV === 'production' ? '/int/{{appName}}' : '';
  return `${basePath}${src}?w=${width}&q=${quality || 75}`;
}
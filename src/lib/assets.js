export function assetUrl(path, base = import.meta.env?.BASE_URL || './') {
  return `${base.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`;
}

export function assetSrcSet(srcset, base) {
  return srcset.split(',').map((entry) => {
    const [path, size] = entry.trim().split(/\s+/);
    return `${assetUrl(path, base)} ${size}`;
  }).join(', ');
}

export function safeWebUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

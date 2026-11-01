import { useEffect, useRef, useState } from 'react';
import { assetUrl, assetSrcSet } from '../lib/assets.js';

export function PortfolioImage({ image, sizes = '(max-width: 780px) 90vw, 1120px', ...props }) {
  return <img src={assetUrl(image.preview || image.file)} srcSet={image.srcset ? assetSrcSet(image.srcset) : undefined}
    sizes={sizes} width={image.width} height={image.height} alt={image.alt}
    loading="lazy" decoding="async" {...props} />;
}

export function Modal({ children, onClose, className, labelledBy, onKeyDown }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    dialog.showModal();
    document.body.classList.add('no-scroll');
    return () => {
      dialog.close();
      document.body.classList.remove('no-scroll');
      if (opener?.isConnected) opener.focus();
    };
  }, []);
  return <dialog ref={ref} className={className} aria-labelledby={labelledBy}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onKeyDown={onKeyDown}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>{children}</dialog>;
}

export function ImageViewer({ items, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const item = items[index];
  const move = (step) => setIndex((previous) => (previous + step + items.length) % items.length);
  return <Modal onClose={onClose} className="design-viewer" labelledBy="viewer-title"
    onKeyDown={(event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
    <div className="design-viewer-top">
      <h2 id="viewer-title">{item.title}{item.category ? ' — Redesign' : ''}</h2>
      <div className="design-viewer-actions">
        <a href={assetUrl(item.original || item.file)} target="_blank" rel="noopener noreferrer">Open full size ↗</a>
        <button type="button" className="close" onClick={onClose} aria-label="Close image viewer">×</button>
      </div>
    </div>
    <img className="design-viewer-image" src={assetUrl(item.file)} alt={item.alt} width={item.width} height={item.height} />
    <div className="design-viewer-bottom">
      <button className="btn" type="button" onClick={() => move(-1)} disabled={items.length < 2} aria-label="Previous image">← Previous</button>
      <p aria-live="polite">{index + 1} / {items.length} · {item.caption || (item.label + ' · Portfolio redesign')}</p>
      <button className="btn" type="button" onClick={() => move(1)} disabled={items.length < 2} aria-label="Next image">Next →</button>
    </div>
  </Modal>;
}

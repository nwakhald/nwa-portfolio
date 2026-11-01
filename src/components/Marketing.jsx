import { useState } from 'react';
import designs from '../data/designs.json';
import images from '../data/images.json';
import { PortfolioImage } from './Images.jsx';
import { assetUrl } from '../lib/assets.js';

export function GraphicGallery({ onView }) {
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const matches = designs.filter((item) => category === 'all' || item.category === category);
  const visible = expanded ? matches : matches.slice(0, 6);
  return <section id="graphic-design" className="design-section" aria-labelledby="design-title">
    <div className="design-heading"><div><span className="mono">Portfolio redesigns</span><h3 id="design-title">Graphic Design Projects</h3>
      <p>These redesign projects were created to showcase my graphic design skills.</p></div><span className="design-total">{designs.length} redesigns</span></div>
    <div className="design-filters" role="group" aria-label="Filter graphic designs">
      {[['all', 'All designs'], ['sports', 'Sports'], ['brand', 'Brand visuals'], ['culture', 'Culture & campaigns']].map(([key, label]) =>
        <button key={key} type="button" aria-pressed={category === key} onClick={() => { setCategory(key); setExpanded(false); }}>{label}</button>)}
    </div>
    <div className="design-grid" id="design-grid">{visible.map((item) => <figure className="design-card" key={item.id}>
      <a href={assetUrl(item.file)} aria-label={'View ' + item.title + ' redesign'} onClick={(event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); onView(matches, matches.findIndex((image) => image.id === item.id));
      }}><PortfolioImage image={item} sizes="(max-width: 530px) 90vw, (max-width: 850px) 45vw, 360px" /></a>
      <figcaption><span>{item.label} / Redesign</span><h4>{item.title}</h4></figcaption>
    </figure>)}</div>
    <div className="design-bottom">
      <p aria-live="polite">Showing {visible.length} of {matches.length} designs. Click an image to view it full size.</p>
      {matches.length > 6 && <button className="btn" type="button" aria-controls="design-grid" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show fewer designs ↑' : 'Show all ' + matches.length + ' designs ↓'}
      </button>}
    </div>
  </section>;
}

export default function Marketing({ onView }) {
  const searchImage = { ...images['assets/britishlightup-google-search.jpeg'], title: 'BritishLightUp Google search',
    caption: 'Google search result for “british light led”.',
    alt: 'Supplied Google search screenshot for british light led, showing the BritishLightUp website in the results.' };
  return <section id="skills" className="wrap section marketing-section" aria-labelledby="skills-title">
    <div className="section-heading"><div><div className="eyebrow">02 / Additional skills</div><h2 id="skills-title">Digital Marketing</h2></div>
      <p>My main focus is SEO and e-commerce management.</p></div>
    <div className="marketing-layout">
      <div className="marketing-skills">
        <article className="marketing-skill"><span className="mono">01 / Search visibility</span><h3>SEO</h3><p>Optimising website structure, page content and product listings for search visibility.</p></article>
        <article className="marketing-skill"><span className="mono">02 / Online stores</span><h3>E-commerce Management</h3><p>Managing products, pricing, stock, orders and promotions for online stores.</p></article>
      </div>
      <figure className="marketing-example">
        <a className="marketing-image-link" href={assetUrl(searchImage.file)} target="_blank" rel="noopener noreferrer" aria-label="View BritishLightUp Google search screenshot in a new tab">
          <PortfolioImage image={searchImage} sizes="(max-width: 580px) 90vw, (max-width: 900px) 50vw, 560px" />
        </a>
        <figcaption><span className="mono">SEO example / BritishLightUp</span><p>{searchImage.caption}</p>
          <a className="text-link" href={assetUrl(searchImage.file)} target="_blank" rel="noopener noreferrer">View full screenshot ↗</a>
        </figcaption>
      </figure>
    </div>
    <div className="marketing-support"><p className="mono">Supporting skills</p><ul aria-label="Supporting digital marketing skills">
      <li>Social Media Marketing</li><li><a href="#graphic-design">Graphic Design ↘</a></li><li>Video Editing (Montage)</li>
    </ul></div>
    <GraphicGallery onView={onView} />
  </section>;
}

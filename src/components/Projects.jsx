import { useRef, useState } from 'react';
import { PortfolioImage } from './Images.jsx';
import { britishScreenshots, appScreenshots } from '../data/screenshots.js';

function Details({ project }) {
  const rows = [['Goal', project.challenge], ['My contribution', project.role], ['Features', project.solution], ['Technology', project.tech], ['Notes', project.evidence]];
  return <details><summary>More details</summary><div className="case-details">
    {rows.filter(([, value]) => value).map(([label, value]) => <div key={label}><strong>{label}</strong><p>{value}</p></div>)}
  </div></details>;
}

function BritishLightUp({ project, onView }) {
  const [tab, setTab] = useState(0);
  const tabRefs = useRef([]);
  function keyboardTab(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % 4;
    else if (event.key === 'ArrowLeft') next = (index + 3) % 4;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = 3;
    if (next !== undefined) { event.preventDefault(); setTab(next); tabRefs.current[next].focus(); }
  }
  return <article className="blu-case" aria-labelledby="blu-title">
    <div className="blu-intro"><div>
      <div className="blu-kicker">01 / {project.category}</div>
      <h3 id="blu-title">{project.title === 'BritishLightUp' ? <>British<span>LightUp</span></> : project.title}</h3>
      <p className="blu-description">{project.description}</p>
      <a className="blu-link" href="https://britishlightup.co.uk" target="_blank" rel="noopener noreferrer">Visit website ↗</a>
    </div><div className="blu-delivered"><span className="mono">Project highlights</span><p>{project.result}</p>
      <div className="blu-tags">{['MERN stack', 'E-commerce', 'Dashboard', 'AI'].map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div></div>
    <div className="blu-gallery">
      <div className="blu-tabs" role="tablist" aria-label="BritishLightUp project screenshots">
        {britishScreenshots.map((shot, index) => <button key={shot.title} type="button" className="blu-tab" role="tab"
          ref={(element) => { tabRefs.current[index] = element; }} id={'blu-tab-' + index} aria-controls={'blu-shot-' + index}
          aria-selected={index === tab} tabIndex={index === tab ? 0 : -1} onClick={() => setTab(index)}
          onKeyDown={(event) => keyboardTab(event, index)}><span>0{index + 1}</span>{shot.title}</button>)}
      </div>
      {britishScreenshots.map((shot, index) => <figure className="blu-shot" role="tabpanel" key={shot.title}
        id={'blu-shot-' + index} aria-labelledby={'blu-tab-' + index} hidden={index !== tab}>
        <button className="blu-shot-button" type="button" onClick={() => onView(britishScreenshots, index)} aria-label={'Enlarge ' + shot.title.toLowerCase() + ' screenshot'}>
          <PortfolioImage image={shot} />
        </button>
        <figcaption><span><strong>{shot.title}</strong>{shot.caption}</span><span>Click to enlarge ↗</span></figcaption>
      </figure>)}
    </div>
    <section className="blu-dashboard" aria-labelledby="dashboard-title">
      <div className="blu-section-heading"><h4 id="dashboard-title">Store and dashboard</h4></div>
      <div className="blu-features">{[
        ['Online store', 'Products, orders, promotions and reviews.'],
        ['Dashboard', 'Sales, revenue trends, customers and stock alerts.'],
        ['Admin tools', 'CSV reports, staff administration and activity logs.'],
      ].map(([title, description], index) => <div className="blu-feature" key={title}><h5><span className="num">0{index + 1}</span>{title}</h5><p>{description}</p></div>)}</div>
    </section>
    <div className="blu-ai">
      <section className="blu-ai-card"><span className="mono">Ask Lumi / Customers</span><h4>AI recommendations</h4><p>Helps shoppers find suitable lighting products.</p></section>
      <section className="blu-ai-card admin"><span className="mono">Gemini / Admins</span><h4>AI product descriptions</h4><p>Helps admins draft product descriptions for review.</p></section>
    </div>
    <div className="blu-evidence"><Details project={project} /></div>
  </article>;
}

function OnlineNCC({ project, onView }) {
  return <article className="ncc-case" aria-labelledby="ncc-title">
    <div className="ncc-intro"><div><div className="ncc-kicker">02 / Mobile app &amp; systems</div>
      <h3 id="ncc-title">{project.title.replace(' — Mobile App & Management Systems', '')}</h3><p className="ncc-description">{project.description}</p>
    </div><div className="ncc-role"><span className="mono">My contribution</span><strong>Software development</strong><p>{project.role}</p></div></div>
    <div className="ncc-gallery"><div className="ncc-gallery-head"><h4>App screens</h4><span>Click to enlarge ↗</span></div>
      <div className="ncc-phones">{appScreenshots.map((shot, index) => <figure className="ncc-phone" key={shot.title}>
        <button type="button" onClick={() => onView(appScreenshots, index)} aria-label={'Enlarge app ' + shot.title.toLowerCase() + ' screenshot'}>
          <PortfolioImage image={shot} sizes="(max-width: 780px) 240px, 280px" />
        </button><figcaption><strong>0{index + 1} / {shot.title}</strong>{shot.caption}</figcaption>
      </figure>)}</div>
    </div>
    <section className="ncc-scope"><div className="ncc-scope-head"><h4>Main features</h4></div>
      <div className="ncc-features">{[
        ['Recharge & payments', 'Users can recharge and make payments themselves in the app.'],
        ['Support', 'FAQs, complaints, requests and contact details.'],
        ['Languages & themes', 'English, Arabic and Kurdish; light, dark and system themes.'],
      ].map(([title, description], index) => <div className="ncc-feature" key={title}><h5><span>0{index + 1}</span>{title}</h5><p>{description}</p></div>)}</div>
    </section>
    <section className="ncc-internal"><div><h4>Management systems</h4></div><div><p>Internal software for managing business operations.</p><small>The images show the customer app.</small></div></section>
    <div className="ncc-evidence"><Details project={project} /></div>
  </article>;
}

function DecorPlanet({ project }) {
  return <article className="decor-case" aria-labelledby="decor-title"><div className="decor-intro">
    <div><div className="decor-kicker">03 / {project.category}</div><h3 id="decor-title">{project.title}</h3><p>{project.description}</p></div>
    <a className="text-link" href="https://decorplanetsupply.co.uk/" target="_blank" rel="noopener noreferrer">Visit website ↗</a>
  </div><div className="decor-work">{[
    ['Product Design', 'Visuals for product listings.'],
    ['Video Editing (Montage)', 'Editing product videos.'],
    ['SEO', 'Search optimisation for the e-commerce website.'],
    ['WordPress Development', 'Website development using WordPress.'],
  ].map(([title, description]) => <section key={title}><h4>{title}</h4><p>{description}</p></section>)}</div>
    <div className="decor-details"><Details project={project} /></div>
  </article>;
}

export default function Projects({ projects, onView }) {
  return <section id="work" className="wrap section" aria-labelledby="work-title">
    <div className="section-heading"><div><div className="eyebrow">01 / Projects</div><h2 id="work-title">My projects</h2></div><p>Screenshots and key features from my work.</p></div>
    <div id="project-grid" className="project-grid">
      {projects[0] && <BritishLightUp project={projects[0]} onView={onView} />}
      {projects[1] && <OnlineNCC project={projects[1]} onView={onView} />}
      {projects[2] && <DecorPlanet project={projects[2]} />}
      {projects.slice(3).map((project, index) => <article className="project-card" key={index}><div className="project-content">
        <div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p>
        <div className="result-box"><span className="mono">Project highlights</span><p>{project.result}</p></div><Details project={project} />
      </div></article>)}
    </div><p className="section-note">Click a screenshot to view it full size.</p>
  </section>;
}

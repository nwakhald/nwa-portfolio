import { safeWebUrl } from '../lib/assets.js';

export function Header({ profile }) {
  return <header className="wrap topbar">
    <a className="identity" href="#"><span className="logo" aria-hidden="true">&lt;/&gt;</span><span><strong>{profile.name}</strong><small>{profile.role}</small></span></a>
    <nav aria-label="Main navigation"><a href="#work">Projects</a><a href="#skills">Skills</a><a href="#approach">How I work</a><a href="#salary">Salary</a></nav>
    <div className="actions"><button type="button" className="btn" onClick={() => window.print()}>Print / save PDF <span className="arrow" aria-hidden="true">↗</span></button></div>
  </header>;
}

export function Hero({ profile }) {
  return <section className="wrap hero" aria-labelledby="hero-title">
    <div className="hero-copy"><div className="eyebrow">Portfolio / {profile.role}</div>
      <h1 id="hero-title">Software for<br /><span>your business.</span></h1><p>{profile.summary}</p>
      <div className="hero-buttons"><a className="btn dark" href="#work">View projects <span className="arrow" aria-hidden="true">↗</span></a><a className="text-link" href="#salary">Salary expectations ↓</a></div>
      <div className="hero-meta"><span>Web &amp; mobile</span><span>AI tools</span>{profile.location && <span>{profile.location}</span>}</div>
    </div>
    <div className="system-art" role="img" aria-label="Illustrative system architecture connecting operations, customers, people and reporting through one platform.">
      <div className="art-top"><span className="mono">The connected company</span><span className="art-badge">System concept</span></div>
      <div className="system-map">
        <svg viewBox="0 0 400 245" preserveAspectRatio="none" aria-hidden="true"><path d="M74 33V72Q74 85 89 85H200V122 M326 33V72Q326 85 311 85H200 M74 220V179Q74 166 89 166H200V122 M326 220V179Q326 166 311 166H200" fill="none" stroke="#829e6d" strokeWidth="1.1" /><circle cx="200" cy="85" r="3" fill="#d8f4a5" /><circle cx="200" cy="166" r="3" fill="#d8f4a5" /></svg>
        <div className="node n1"><i>▤</i>Operations</div><div className="node n2"><i>◎</i>Customers</div>
        <div className="node center"><i>&lt;/&gt;</i>One platform</div><div className="node n3"><i>♧</i>People &amp; teams</div><div className="node n4"><i>▥</i>Reporting</div>
      </div><div className="art-bottom"><span>Designed around your business</span><span>01 — 04 ↗</span></div>
    </div>
  </section>;
}

export function Approach() {
  return <section id="approach" className="wrap" aria-labelledby="approach-title"><div className="approach">
    <div className="approach-head"><div><div className="eyebrow">03 / How I work</div><h2 id="approach-title">From idea to launch.</h2></div><p>Clear goals, regular updates and a documented handover.</p></div>
    <div className="steps">{[
      ['Plan', 'Agree the scope', 'Define the goals, features and timeline.'],
      ['Design', 'Design the system', 'Plan the screens, data and access.'],
      ['Build', 'Build and test', 'Develop, test and review each stage.'],
      ['Handover', 'Launch and explain', 'Deploy the system and provide documentation.'],
    ].map(([step, title, description], index) => <div className="step" key={step}><span className="mono">0{index + 1} / {step}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
    <p className="scope-note">Scope and support are agreed before development.</p>
  </div></section>;
}

export function Salary({ profile }) {
  const hasSalary = profile.salaryMin !== '' && profile.salaryMax !== '';
  const format = (value) => (profile.currency.toUpperCase() === 'USD' ? '$' : '') + new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(Number(value));
  const range = (multiplier = 1) => Number(profile.salaryMin) === Number(profile.salaryMax)
    ? format(Number(profile.salaryMin) * multiplier)
    : format(Number(profile.salaryMin) * multiplier) + ' – ' + format(Number(profile.salaryMax) * multiplier);
  const monthly = profile.period === 'Per month';
  const showTotal = hasSalary && monthly && /\b12[\s-]*month\b/i.test(profile.engagement);
  return <section id="salary" className="wrap section salary-section" aria-labelledby="salary-title">
    <div className="salary-copy"><div className="eyebrow">04 / Salary expectations</div><h2 id="salary-title">Clear scope.<br />Clear expectations.</h2>
      <p>My expected salary depends on the project scope, complexity, responsibilities, workload and whether the role is remote, hybrid or on-site. Work-related costs and benefits also form part of the agreement.</p>
      <div className="salary-notes">{['Responsibilities & complexity', 'Workload & support', 'Remote / hybrid / on-site', 'Expenses & benefits'].map((text) => <span className="pill" key={text}>{text}</span>)}</div>
    </div>
    <div className="salary-card"><span className="mono">{monthly ? 'Monthly salary' : 'Expected salary range'}</span>
      <div className="salary-amount-row"><div className="salary-value">{hasSalary ? range() : 'To be agreed'}</div><span className="pill salary-negotiable">Negotiable</span></div>
      <p className="salary-period">{profile.currency} · {profile.period}</p>
      <div className="salary-terms">
        <div className="salary-row"><span>Position</span><strong>{profile.role}</strong></div>
        <div className="salary-row"><span>Engagement</span><strong>{profile.engagement || 'To be agreed'}</strong></div>
        {showTotal && <div className="salary-row"><span>Salary over 12 months</span><strong>{range(12)}</strong></div>}
        <div className="salary-row"><span>Availability</span><strong>{profile.availability || 'To be confirmed'}</strong></div>
      </div><p className="salary-footnote">{profile.salaryNote}</p>
    </div>
  </section>;
}

export function Contact({ profile }) {
  const phone = String(profile.phone).replace(/[^\d+]/g, '');
  return <section className="wrap contact" aria-labelledby="contact-title">
    <div><h2 id="contact-title">Let’s talk.</h2><p>Tell me about your project.</p></div>
    <div className="contact-links">
      {profile.email && <a className="btn dark" href={'mailto:' + profile.email}>{profile.email} ↗</a>}
      {/^[+]?\d{7,15}$/.test(phone) && <a href={'tel:' + phone}>{profile.phone}</a>}
      {[['linkedin', 'LinkedIn'], ['github', 'GitHub']].map(([key, label]) => safeWebUrl(profile[key]) && <a key={key} href={safeWebUrl(profile[key])} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}
    </div>
  </section>;
}

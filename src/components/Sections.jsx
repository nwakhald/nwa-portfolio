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

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12.004 0C5.372 0 0 5.372 0 12c0 2.115.55 4.102 1.517 5.835L.39 23.498l5.834-1.127A11.96 11.96 0 0 0 12.004 24c6.627 0 12-5.372 12-12s-5.373-12-12-12zm.006 21.84a9.83 9.83 0 0 1-5.016-1.373l-.36-.214-3.731.722.736-3.637-.234-.373A9.843 9.843 0 1 1 12.01 21.84zm5.394-7.375c-.296-.148-1.751-.864-2.022-.963-.271-.098-.469-.148-.667.148-.198.297-.768.963-.942 1.161-.173.198-.346.223-.642.074-.296-.148-1.25-.46-2.38-1.468-.881-.786-1.476-1.758-1.649-2.055-.173-.297-.019-.457.13-.605.134-.134.296-.346.444-.52.148-.173.198-.297.296-.494.099-.198.05-.371-.025-.52-.074-.148-.667-1.606-.914-2.2-.24-.58-.485-.501-.667-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.015-1.04 2.476s1.065 2.871 1.213 3.07c.148.198 2.096 3.2 5.077 4.488.709.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.751-.715 1.998-1.405.247-.69.247-1.282.173-1.405-.074-.123-.272-.198-.568-.346z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Contact({ profile }) {
  const digits = String(profile.phone || '').replace(/\D/g, '');
  const waUrl = digits ? `https://wa.me/${digits}` : '';
  const linkedinUrl = safeWebUrl(profile.linkedin);
  const githubUrl = safeWebUrl(profile.github);
  return <section className="wrap contact" aria-labelledby="contact-title">
    <div><h2 id="contact-title">Let’s talk.</h2><p>Tell me about your project.</p></div>
    <div className="contact-links">
      {profile.email && <a className="btn dark" href={'mailto:' + profile.email}>{profile.email} ↗</a>}
      {waUrl && (
        <a className="btn dark" href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <WhatsAppIcon />
            <span>WhatsApp</span>
          </span>
          <span className="arrow" aria-hidden="true">↗</span>
        </a>
      )}
      {linkedinUrl && (
        <a className="btn dark" href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <LinkedInIcon />
            <span>LinkedIn</span>
          </span>
          <span className="arrow" aria-hidden="true">↗</span>
        </a>
      )}
      {githubUrl && (
        <a className="btn dark" href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <GitHubIcon />
            <span>GitHub</span>
          </span>
          <span className="arrow" aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  </section>;
}

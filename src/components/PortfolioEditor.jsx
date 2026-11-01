import { useState } from 'react';
import { Modal } from './Images.jsx';

const profileFields = [
  ['name', 'Your name'], ['role', 'Professional title'], ['location', 'Location'],
  ['email', 'Contact email', 'email'], ['phone', 'WhatsApp number', 'tel'],
  ['summary', 'Professional summary', 'textarea'],
  ['linkedin', 'LinkedIn URL', 'url'], ['github', 'GitHub URL', 'url'],
];
const projectFields = [
  ['title', 'Project title'], ['category', 'Category'], ['description', 'Short overview', 'textarea'],
  ['challenge', 'Goal', 'textarea'], ['role', 'My contribution', 'textarea'],
  ['solution', 'Features / work delivered', 'textarea'], ['tech', 'Technology used'],
  ['result', 'Project highlights', 'textarea'], ['evidence', 'Notes / supporting evidence', 'textarea'],
];

function Field({ name, label, type = 'text', value, onChange }) {
  const props = { id: 'field-' + name, name, value: value || '', onChange: (event) => onChange(event.target.value) };
  return <label className={'field' + (type === 'textarea' ? ' full' : '')} htmlFor={props.id}>{label}
    {type === 'textarea'
      ? <textarea {...props} maxLength={2000} />
      : <input {...props} type={type} maxLength={500} min={type === 'number' ? 0 : undefined} step={type === 'number' ? 'any' : undefined} />}
  </label>;
}

export default function PortfolioEditor({ profile, onClose, onSave, onReset }) {
  const [draft, setDraft] = useState(() => structuredClone(profile));
  const [error, setError] = useState('');
  const update = (field, value) => { setDraft((previous) => ({ ...previous, [field]: value })); setError(''); };
  const renderField = ([name, label, type]) => <Field key={name} name={name} label={label} type={type} value={draft[name]} onChange={(value) => update(name, value)} />;
  function submit(event) {
    event.preventDefault();
    const min = draft.salaryMin, max = draft.salaryMax;
    if ((min === '') !== (max === '')) { setError('Enter both ends of your salary range.'); return; }
    if (min !== '' && (Number(min) < 0 || Number(max) < Number(min))) { setError('The maximum salary must be at least the minimum.'); return; }
    onSave(draft);
  }
  return <Modal onClose={onClose} className="dialog" labelledBy="editor-title">
    <form onSubmit={submit}>
      <div className="dialog-top"><div><h2 id="editor-title">Edit portfolio</h2><p>Add only real projects and results you can support.</p></div>
        <button className="close" type="button" onClick={onClose} aria-label="Close editor">×</button></div>
      <div className="editor-body">
        <fieldset><legend>01 / Your profile</legend><div className="field-grid">{profileFields.map(renderField)}</div></fieldset>
        <fieldset><legend>02 / Your projects</legend>
          {draft.projects.map((project, index) => <div className="editor-project" key={index}><h3>Project {index + 1}</h3>
            <div className="field-grid">{projectFields.map(([field, label, type]) => <Field key={field} name={'p' + index + '_' + field} label={label} type={type} value={project[field]}
              onChange={(value) => setDraft((previous) => ({ ...previous, projects: previous.projects.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item) }))} />)}</div>
          </div>)}
        </fieldset>
        <fieldset><legend>03 / Salary &amp; availability</legend><div className="field-grid">
          {[['salaryMin', 'Minimum salary', 'number'], ['salaryMax', 'Maximum salary', 'number'], ['currency', 'Currency']].map(renderField)}
          <label className="field" htmlFor="field-period">Pay period<select id="field-period" value={draft.period} onChange={(event) => update('period', event.target.value)}>
            {['Per month', 'Per year', 'Per hour'].map((period) => <option key={period}>{period}</option>)}
          </select></label>
          {[['engagement', 'Engagement'], ['availability', 'Availability'], ['salaryNote', 'Salary note', 'textarea']].map(renderField)}
        </div></fieldset>
        {error && <p className="editor-error" role="alert">{error}</p>}
      </div>
      <div className="dialog-bottom">
        <p>Changes are saved in this browser. To update the public website, edit src/data/portfolio.json and push your changes to GitHub.</p>
        <div className="editor-buttons"><button className="btn" type="button" onClick={onReset}>Restore website details</button><button className="btn dark" type="submit">Save details ↗</button></div>
      </div>
    </form>
  </Modal>;
}

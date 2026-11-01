import { useEffect, useState } from 'react';
import defaultProfile from './data/portfolio.json';
import { Header, Hero, Approach, Salary, Contact } from './components/Sections.jsx';
import Projects from './components/Projects.jsx';
import Marketing from './components/Marketing.jsx';
import { ImageViewer } from './components/Images.jsx';
import PortfolioEditor from './components/PortfolioEditor.jsx';

export const STORAGE_KEY = 'nwa-portfolio-react-v1';

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.projects) && saved.projects.length >= 3) {
      return { ...defaultProfile, ...saved, projects: saved.projects.map((project, index) => ({
        ...(defaultProfile.projects[index] || {}), ...project,
      })) };
    }
  } catch { /* Browser storage may be disabled. The website still works. */ }
  return structuredClone(defaultProfile);
}

export default function App() {
  const [profile, setProfile] = useState(loadProfile);
  const [editorOpen, setEditorOpen] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [notice, setNotice] = useState('');
  const onView = (items, initialIndex) => setViewer({ items, initialIndex });

  useEffect(() => { document.title = profile.name + ' | Portfolio'; }, [profile.name]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 6000);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    let previouslyOpen = [];
    const beforePrint = () => {
      previouslyOpen = [...document.querySelectorAll('#project-grid details')].map((element) => [element, element.open]);
      previouslyOpen.forEach(([element]) => { element.open = true; });
    };
    const afterPrint = () => previouslyOpen.forEach(([element, wasOpen]) => { element.open = wasOpen; });
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    return () => { window.removeEventListener('beforeprint', beforePrint); window.removeEventListener('afterprint', afterPrint); };
  }, []);

  function saveProfile(draft) {
    setProfile(draft); setEditorOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setNotice('Saved in this browser. Public website details are unchanged.');
    } catch { setNotice('Updated for this visit. Browser storage is unavailable; print to keep a copy.'); }
  }
  function resetProfile() {
    setProfile(structuredClone(defaultProfile)); setEditorOpen(false);
    try { localStorage.removeItem(STORAGE_KEY); setNotice('Restored the website details in this browser.'); }
    catch { setNotice('Restored for this visit. Browser storage is unavailable.'); }
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header profile={profile} />
    <main id="main"><Hero profile={profile} /><Projects projects={profile.projects} onView={onView} />
      <Marketing onView={onView} /><Approach /><Salary profile={profile} /><Contact profile={profile} /></main>
    <footer className="wrap footer"><span>{profile.name} · {profile.role} portfolio</span>
      <button className="edit-trigger" type="button" onClick={() => setEditorOpen(true)}>Edit portfolio</button></footer>
    {viewer && <ImageViewer {...viewer} onClose={() => setViewer(null)} />}
    {editorOpen && <PortfolioEditor profile={profile} onClose={() => setEditorOpen(false)} onSave={saveProfile} onReset={resetProfile} />}
    {notice && <div className="toast" role="status">{notice}</div>}
  </>;
}

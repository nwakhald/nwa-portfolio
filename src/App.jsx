import { useEffect, useState } from 'react';
import defaultProfile from './data/portfolio.json';
import { Header, Hero, Approach, Salary, Contact } from './components/Sections.jsx';
import Projects from './components/Projects.jsx';
import Marketing from './components/Marketing.jsx';
import { ImageViewer } from './components/Images.jsx';

export default function App() {
  const [profile] = useState(defaultProfile);
  const [viewer, setViewer] = useState(null);
  const onView = (items, initialIndex) => setViewer({ items, initialIndex });

  useEffect(() => { document.title = profile.name + ' | Portfolio'; }, [profile.name]);
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

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header profile={profile} />
    <main id="main"><Hero profile={profile} /><Projects projects={profile.projects} onView={onView} />
      <Marketing onView={onView} /><Approach /><Salary profile={profile} /><Contact profile={profile} /></main>
    <footer className="wrap footer"><span>{profile.name} · {profile.role} portfolio</span></footer>
    {viewer && <ImageViewer {...viewer} onClose={() => setViewer(null)} />}
  </>;
}

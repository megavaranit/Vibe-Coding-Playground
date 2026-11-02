import { Suspense } from 'react';
import { sections } from '@/app/sections.config';
import { ThemeProvider } from '@/app/ThemeProvider';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';
import { ScrollProgress } from '@/layout/ScrollProgress';

function App() {
  return (
    <ThemeProvider>
      <a href="#hero" className="skip-link">
        Перейти к содержимому
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        {sections.map(({ id, component: SectionComponent }) => (
          <Suspense key={id} fallback={<section id={id} className="min-h-40" aria-busy="true" />}>
            <SectionComponent />
          </Suspense>
        ))}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

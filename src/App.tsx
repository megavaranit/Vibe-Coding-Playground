import { Suspense } from 'react';
import { sections } from '@/app/sections.config';
import { ThemeProvider } from '@/app/ThemeProvider';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';
import { ScrollProgress } from '@/layout/ScrollProgress';

function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Header />
      <main>
        {sections.map(({ id, component: SectionComponent }) => (
          <Suspense key={id} fallback={<section id={id} className="min-h-40" />}>
            <SectionComponent />
          </Suspense>
        ))}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

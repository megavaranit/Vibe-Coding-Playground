# Архитектура

Прочитай этот файл перед любой правкой. Подробности стека — в `TECH_STACK.md`, прогресс — в `CURRENT_STATUS.md`.

## Слои и правила зависимостей
- `app/` — сборка страницы: реестр секций, провайдер темы.
- `layout/` — каркас: Header, Footer, Section, Container, ScrollProgress.
- `sections/` — блоки-модули страницы. **Секции не импортируют друг друга.**
- `ui/` — общие примитивы без бизнес-логики (Button, Card, Badge...).
- `hooks/`, `lib/` — хуки, пресеты анимаций, утилиты.
- Зависимости идут только вниз: sections → ui, hooks, lib; layout → ui, hooks, lib.

## Структура папок
```
src/
├── main.tsx, App.tsx
├── app/            sections.config.ts, ThemeProvider.tsx
├── styles/         index.css, tokens.css, themes.css, effects.css
├── layout/         Header/, Footer/, Section.tsx, Container.tsx, ScrollProgress.tsx
├── sections/
│   ├── hero/            HeroSection, AnimatedBackground, HeroTitle, ScrollHint
│   ├── animations/      AnimationsSection, StaggerCards, HoverTiltCard, ScrollReveal, animations.data.ts
│   ├── interactivity/   InteractivitySection, ConfettiButton, MorphButton, AnimatedSlider, AnimatedSwitch, LiveDemoPanel
│   ├── effects/         EffectsSection, GlassCard, GlowCard, GradientBorderCard, ColorShiftCard, effects.data.ts
│   ├── responsive/      ResponsiveSection, DeviceSwitcher, DeviceFrame, ResponsiveDemoContent
│   └── leads/           LeadFormSection, LeadForm, FormField, leads.data.ts
├── ui/             Button, Card, Badge, SectionHeading, GradientText
├── hooks/          useTheme, useMediaQuery, useReducedMotion, useMousePosition
├── lib/            motion.ts, confetti.ts, cn.ts, constants.ts
└── types/          section.ts
api/                lead.php — приём заявок, data/leads.jsonl
```

## Реестр секций
`app/sections.config.ts` — единственное место, где задан порядок блоков. Запись: `{ id, navLabel, component }`, где `component` — `React.lazy(() => import(...))`. `App.tsx` и `NavLinks` строятся из этого массива. Каждая секция экспортирует компонент через `export default` и оборачивается в `<Section id eyebrow title>`. Футер в реестр не входит.

## Компоненты (кратко)
**Каркас:** App собирает страницу из реестра; ThemeProvider хранит тему; Header — липкая стеклянная шапка; NavLinks — якоря с подсветкой активного блока; ThemeToggle — переключатель темы; Section — обёртка блока; Container — ширина; ScrollProgress — полоска прогресса.
**Hero:** HeroSection — композиция и parallax; AnimatedBackground — градиентные пятна, сетка, зерно; HeroTitle — заголовок по словам, подзаголовок, кнопки; ScrollHint — подсказка прокрутки.
**Animations:** StaggerCards — каскад карточек (staggerChildren 0.08); HoverTiltCard — 3D-наклон за курсором; ScrollReveal — появление при скролле (direction, delay, once, parallax).
**Interactivity:** ConfettiButton — конфетти из точки клика; MorphButton — idle → loading → success; AnimatedSlider и AnimatedSwitch — управляют LiveDemoPanel; LiveDemoPanel — превью, реагирующее на элементы управления. Состояние держит InteractivitySection.
**Effects:** GlassCard (backdrop-blur), GlowCard (неоновое свечение), GradientBorderCard (conic-gradient + @property), ColorShiftCard (смена акцента на hover).
**Responsive:** DeviceSwitcher — сегментированный контроль (layoutId); DeviceFrame — рамка 1024 / 768 / 375 px; ResponsiveDemoContent — контент на container queries.
**Leads:** LeadFormSection — форма заявки; LeadForm — валидация и состояния idle/submitting/success/error; отправка на `VITE_LEADS_ENDPOINT` (по умолчанию `/api/lead.php`); fallback в `localStorage` если API недоступен.
**Footer:** О проекте, ссылка на GitHub, призыв пройти курс.

## Тема и токены
- Тема — атрибут `data-theme="dark|light"` на `<html>`; по умолчанию dark, при первом заходе учитывается `prefers-color-scheme`, выбор сохраняется в `localStorage`.
- Все цвета — CSS-переменные в `styles/themes.css`: `--bg`, `--surface`, `--surface-2`, `--border`, `--text`, `--text-muted`, `--accent-violet`, `--accent-cyan`, `--accent-pink`, `--accent-lime`, `--accent-amber`, `--glow`.
- Переменные подключены в Tailwind через `@theme`. Жёсткие hex-цвета в компонентах запрещены.
- Эффекты (glass, glow, gradient-border) — классы в `styles/effects.css`.

## Анимации
- Библиотека: `motion` (Framer Motion). Общие variants и spring — в `lib/motion.ts`.
- Длительность 0.4–0.8 с, easing `[0.22, 1, 0.36, 1]`.
- Анимируем `transform` и `opacity`. `whileInView` — с `once: true`.
- Любой сложный эффект проверяет `useReducedMotion()`.

## Как добавить новый блок
1. Создать `src/sections/<name>/<Name>Section.tsx` с `export default`, обёрнуть в `<Section>`.
2. Добавить запись в `app/sections.config.ts`.
3. Описать блок здесь и отметить задачу в `CURRENT_STATUS.md`.
# Vibe Coding Playground — архитектура проекта

Nov 2, 2026 · @Oleg

## Обзор и принципы

Playground — одностраничный сайт из шести независимых секций на Vite + React + TypeScript; каждая секция — отдельный модуль, который подключается через единый реестр, поэтому новый блок добавляется за 3 шага.

&#91;embedded content: архитектура · 4 слоя, 5 секций\]

Страница собирается из реестра, а каждая секция берёт только общие слои ниже себя — поэтому блоки можно добавлять и удалять независимо.

**Принципы архитектуры**

- **Секция = модуль.** У каждой секции своя папка: компоненты, данные, стили. Секции не импортируют друг друга.
- **Реестр секций.** Порядок блоков, id якорей и пункты навигации живут в одном файле `sections.config.ts`; страница и меню строятся из него.
- **Токены вместо цветов.** Все цвета, радиусы и тени — CSS-переменные; тема переключается атрибутом `data-theme` на `<html>` без перерисовки React-дерева.
- **Единые пресеты анимаций.** Variants и easing лежат в одном месте, чтобы весь сайт двигался в одном ритме.
- **Производительность по умолчанию.** Анимируем только `transform` и `opacity`, уважаем `prefers-reduced-motion`, тяжёлые эффекты грузим лениво.
- **Код как учебник.** В шапке каждого файла секции — комментарий «что показывает этот блок и какая техника здесь главная»: аудитория — ученики курса.

**Карта секций**

| Блок | Что демонстрирует | Главная техника |
| --- | --- | --- |
| Hero | Первое впечатление | Анимированный градиент, parallax, stagger-появление |
| Animations | Плавное движение | Stagger-карточки, `whileInView`, scroll-прогресс, hover-spring |
| Interactivity | «Живой» сайт | Конфетти, морфинг кнопки, анимированные slider и switch |
| Visual Effects | Модный визуал 2025–2026 | Glassmorphism, glow, градиентные границы, hover-смена цвета |
| Responsive Design | Адаптивность | Переключатель desktop / tablet / mobile, container queries |
| Footer | Призыв к действию | CTA-кнопка, ссылка на GitHub, информация о проекте |

## Технологический стек

Оптимальный стек для showcase с упором на визуал: **Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion (Framer Motion)**. Это самый короткий путь от идеи до эффектного результата, и именно с этими инструментами нейросети (Claude, Cursor) генерируют самый надёжный код.

| Слой | Выбор | Почему именно он |
| --- | --- | --- |
| Сборка | Vite | Мгновенный dev-сервер и HMR — идеально для вайбкодинга, где правки идут по десять раз в минуту |
| UI | React 19 + TypeScript | Компонентный подход = «каждый блок отдельный компонент»; типы помогают ИИ не ломать код |
| Стили | Tailwind CSS v4 + CSS-переменные | Быстрая вёрстка и токены тем в одном `@theme`; ИИ отлично знает Tailwind |
| Анимации | Motion (пакет `motion`, бывший Framer Motion) | `variants` для stagger, `whileInView`, `useScroll`, `layout`-анимации — всё, что нужно по ТЗ |
| Конфетти | `canvas-confetti` | 3 КБ, один вызов функции, работает поверх всего без DOM-мусора |
| Иконки | `lucide-react` | Единый стиль, tree-shaking |
| Тема | Свой хук `useTheme` + `data-theme` | Без библиотек: 30 строк, хранение в `localStorage`, учёт `prefers-color-scheme` |
| Шрифты | `@fontsource-variable/*` | Локальные variable-шрифты: быстро и без внешних запросов |
| Качество | ESLint + Prettier | Единый стиль, ИИ-код не «плывёт» |
| Деплой | Vercel или GitHub Pages | Бесплатно, деплой по push |

**Почему не Next.js.** Сайт одностраничный и без серверной логики: SSR и роутинг только усложнили бы проект и учебный код.

**Почему не GSAP / Three.js.** Для MVP хватает Motion + CSS. GSAP и Three.js остаются «блоком расширения» — их удобно добавить новой секцией позже (например, 3D-блок).

**Почему не Redux / Zustand.** Глобальное состояние — только тема и режим предпросмотра в Responsive-блоке; хватает контекста и локального `useState`.

## Структура файлов и папок

Проект делится на несколько слоёв: `app` (сборка страницы), `sections` (блоки страницы), `ui` (общие кирпичики) и `lib` (утилиты и пресеты). Зависимости идут только сверху вниз: секции используют `ui`, `hooks`, `lib`, но никогда друг друга.

```text
vibe-coding-playground/
├── docs/                          # контекст для Cursor и людей
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── TECH_STACK.md
│   └── CURRENT_STATUS.md
├── .cursor/rules/
│   └── project.mdc                # правила кода для Cursor
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── main.tsx                   # точка входа
│   ├── App.tsx                    # собирает страницу из реестра секций
│   ├── app/
│   │   ├── sections.config.ts     # РЕЕСТР: порядок, id, заголовки, lazy-импорты
│   │   └── ThemeProvider.tsx      # контекст темы (dark / light)
│   ├── styles/
│   │   ├── index.css              # @import tailwind + базовые стили
│   │   ├── tokens.css             # цвета, радиусы, тени, отступы (переменные)
│   │   ├── themes.css             # [data-theme="dark"] и [data-theme="light"]
│   │   └── effects.css            # glass, glow, gradient-border, noise
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── Header.tsx         # липкая шапка со стеклянным фоном
│   │   │   ├── NavLinks.tsx       # якорные ссылки из реестра
│   │   │   └── ThemeToggle.tsx    # переключатель темы
│   │   ├── Footer/
│   │   │   └── Footer.tsx
│   │   ├── Section.tsx            # обёртка блока: id, отступы, заголовок
│   │   ├── Container.tsx          # ширина и горизонтальные поля
│   │   └── ScrollProgress.tsx     # полоска прогресса прокрутки
│   ├── sections/
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AnimatedBackground.tsx
│   │   │   ├── HeroTitle.tsx
│   │   │   └── ScrollHint.tsx
│   │   ├── animations/
│   │   │   ├── AnimationsSection.tsx
│   │   │   ├── StaggerCards.tsx
│   │   │   ├── HoverTiltCard.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   └── animations.data.ts # тексты и иконки карточек
│   │   ├── interactivity/
│   │   │   ├── InteractivitySection.tsx
│   │   │   ├── ConfettiButton.tsx
│   │   │   ├── MorphButton.tsx
│   │   │   ├── AnimatedSlider.tsx
│   │   │   ├── AnimatedSwitch.tsx
│   │   │   └── LiveDemoPanel.tsx  # слайдер/переключатель управляют превью
│   │   ├── effects/
│   │   │   ├── EffectsSection.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GlowCard.tsx
│   │   │   ├── GradientBorderCard.tsx
│   │   │   ├── ColorShiftCard.tsx
│   │   │   └── effects.data.ts
│   │   ├── responsive/
│   │   │   ├── ResponsiveSection.tsx
│   │   │   ├── DeviceSwitcher.tsx # desktop / tablet / mobile
│   │   │   ├── DeviceFrame.tsx    # рамка устройства с анимацией ширины
│   │   │   └── ResponsiveDemoContent.tsx
│   ├── ui/                        # общие компоненты без логики блоков
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeading.tsx
│   │   └── GradientText.tsx
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useReducedMotion.ts
│   │   └── useMousePosition.ts
│   ├── lib/
│   │   ├── motion.ts              # общие variants, easing, spring-пресеты
│   │   ├── confetti.ts            # обёртка над canvas-confetti
│   │   ├── cn.ts                  # объединение className
│   │   └── constants.ts           # ссылка на GitHub, ссылка на курс
│   ├── types/
│   │   └── section.ts             # тип SectionConfig
│   └── assets/
│       └── noise.svg              # текстура зерна для фона
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
├── package.json
└── README.md
```

**Футер** лежит в `layout/`, а не в `sections/`: это не демонстрационный блок, а завершение страницы, и он не входит в реестр навигации.

## Компоненты и их ответственность

В проекте 37 компонентов в пяти группах; у каждого одна чёткая задача. Секции собираются из компонентов своей папки и общих примитивов `ui/`.

### Каркас страницы (`app/`, `layout/`)

| Компонент | Ответственность | Детали реализации |
| --- | --- | --- |
| `App` | Собирает страницу | Читает `sections.config.ts`, рендерит Header, список секций через `React.lazy` + `Suspense`, Footer |
| `ThemeProvider` | Хранит тему | Значения `dark` / `light`; при первом заходе берёт `prefers-color-scheme`; пишет в `localStorage` и в `data-theme` на `<html>` |
| `Header` | Липкая навигация | Стеклянный фон, на мобильных — бургер-меню; прячется при прокрутке вниз, возвращается при прокрутке вверх |
| `NavLinks` | Якорные ссылки | Строятся из реестра; активный пункт подсвечивается через `IntersectionObserver`; плавный скролл |
| `ThemeToggle` | Переключатель темы | Иконка солнце/луна с поворотом и масштабом (morph), доступен с клавиатуры, `aria-label` |
| `Section` | Обёртка блока | Props: `id`, `eyebrow`, `title`, `description`; одинаковые вертикальные отступы (`py-32`), мягкое появление при входе в экран |
| `Container` | Ширина контента | `max-w-6xl`, горизонтальные поля растут с экраном |
| `ScrollProgress` | Прогресс прокрутки | Тонкая градиентная линия сверху: `useScroll` + `scaleX` |

### Блок 1 — Hero (`sections/hero/`)

| Компонент | Ответственность | Детали реализации |
| --- | --- | --- |
| `HeroSection` | Композиция первого экрана | `min-h-screen`; parallax: фон и текст едут с разной скоростью (`useScroll` + `useTransform`) |
| `AnimatedBackground` | Живой фон | Три размытых градиентных «пятна» (mesh-gradient) на CSS keyframes, сетка и зерно поверх; пятна слегка следуют за курсором на десктопе |
| `HeroTitle` | Заголовок и подзаголовок | Заголовок появляется по словам со stagger и снятием blur; подзаголовок «Создано за 1 день с помощью Claude и Cursor» — следом; две кнопки: «Смотреть демо» и GitHub |
| `ScrollHint` | Подсказка прокрутки | Пульсирующая стрелка внизу, исчезает после первого скролла |

### Блок 2 — Animations (`sections/animations/`)

| Компонент | Ответственность | Детали реализации |
| --- | --- | --- |
| `AnimationsSection` | Композиция блока | Заголовок, сетка карточек, подпись «Что здесь показано: variants, stagger, whileInView, spring» |
| `StaggerCards` | Каскадное появление | Родитель с `staggerChildren: 0.08`, 6 карточек из `animations.data.ts`; запуск один раз при входе в экран |
| `HoverTiltCard` | Реакция на наведение | 3D-наклон за курсором (`useMotionValue` + `useSpring`), блик следует за указателем; на touch-устройствах отключается |
| `ScrollReveal` | Универсальная обёртка | Props: `direction` (up, left, right, scale), `delay`, `once`; опция `parallax` смещает элемент по прогрессу скролла |

### Блок 3 — Interactivity (`sections/interactivity/`)

| Компонент | Ответственность | Детали реализации |
| --- | --- | --- |
| `InteractivitySection` | Состояние блока | Держит `useState` для слайдера и переключателя, передаёт их в `LiveDemoPanel`; две колонки на десктопе |
| `ConfettiButton` | Клик с эффектом | Конфетти вылетает из точки клика (координаты из `getBoundingClientRect`), волна-ripple, `whileTap` с пружиной |
| `MorphButton` | Кнопка-трансформер | Состояния idle → loading → success: форма, ширина и иконка плавно перетекают (`layout`), через 2 секунды возврат |
| `AnimatedSlider` | Слайдер | Нативный `input[type=range]` под кастомным оформлением; градиентная заливка, пружинный ползунок, число меняется анимированно |
| `AnimatedSwitch` | Переключатель | Ползунок движется через `layout`, при включении вспыхивает glow; управляется клавиатурой (`role="switch"`) |
| `LiveDemoPanel` | Живое превью | Карточка, на которую влияют слайдер (радиус, размытие, скорость) и переключатель (свечение, анимация) — видно, что сайт реагирует мгновенно |

### Блок 4 — Visual Effects (`sections/effects/`)

| Компонент | Ответственность | Детали реализации |
| --- | --- | --- |
| `EffectsSection` | Сцена эффектов | Яркие цветные орбы на заднем плане — без них стекло не видно; сетка 2×2 с карточками |
| `GlassCard` | Glassmorphism | `backdrop-blur-xl`, фон `white/5`, граница 1 px, внутренний светлый блик сверху |
| `GlowCard` | Неоновое свечение | Размытый градиентный псевдоэлемент под карточкой; на hover свечение усиливается |
| `GradientBorderCard` | Живая граница | `conic-gradient` с анимируемым углом через `@property --angle` |
| `ColorShiftCard` | Смена цвета по hover | Меняет CSS-переменную акцента, цвет плавно перетекает за 400 мс |

### Блок 5 — Responsive Design (`sections/responsive/`)

| Компонент | Ответственность | Детали реализации |
| --- | --- | --- |
| `ResponsiveSection` | Состояние режима | Хранит выбранный режим: `desktop`, `tablet`, `mobile` |
| `DeviceSwitcher` | Выбор устройства | Сегментированный контроль, активный «ползунок» плавно переезжает (`layoutId`) |
| `DeviceFrame` | Рамка устройства | Ширина анимируется пружиной: 1024 → 768 → 375 px; внутри `container-type: inline-size` |
| `ResponsiveDemoContent` | Мини-страница внутри рамки | Перестраивается через **container queries** (`@container`): обычные media queries внутри рамки не сработали бы — они смотрят на окно браузера |

### Футер (`layout/Footer/`)

| Компонент | Ответственность | Детали реализации |
| --- | --- | --- |
| `Footer` | Завершение страницы | Колонка «О проекте», ссылка на GitHub, большой призыв «Хочешь научиться так же? Пройди курс» со светящейся кнопкой, строка «Сделано с Claude и Cursor» |

### Общие примитивы (`ui/`) и хуки (`hooks/`)

| Модуль | Ответственность |
| --- | --- |
| `Button` | Варианты `primary` (градиент), `ghost`, `glass`; размеры sm / md / lg; рендерится как `button` или как ссылка |
| `Card` | Базовая карточка с токенами радиуса и тени |
| `Badge` | Маленькая метка («Framer Motion», «Tailwind») |
| `SectionHeading` | Надзаголовок + заголовок + описание блока |
| `GradientText` | Текст с градиентной заливкой |
| `useTheme` | Доступ к теме и функции переключения |
| `useMediaQuery` | Подписка на медиазапрос |
| `useReducedMotion` | Флаг «пользователь просит меньше анимаций» — все сложные эффекты его учитывают |
| `useMousePosition` | Нормализованные координаты курсора для tilt и фона |
| `lib/motion.ts` | Общие variants, easing и spring-пресеты (`fadeUp`, `staggerContainer`, `springSoft`) |
| `lib/confetti.ts` | Обёртка над `canvas-confetti` с палитрой проекта |

## Дизайн-система: палитра, типографика, токены

Тёмная тема строится на почти чёрной сине-фиолетовой базе с тремя неоновыми акцентами (фиолетовый, циан, розовый); светлая — на холодном белом с теми же акцентами, но на 1–2 тона глубже, чтобы сохранить контраст.

### Цвета

| Токен | Тёмная тема | Светлая тема | Назначение |
| --- | --- | --- | --- |
| `--bg` | `#07070D` | `#FAFAFF` | Фон страницы |
| `--surface` | `#0F0F1A` | `#FFFFFF` | Карточки, шапка |
| `--surface-2` | `#161625` | `#F1F1FB` | Вложенные панели, инпуты |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(15,15,40,0.10)` | Границы |
| `--text` | `#F4F4FB` | `#0E0E1F` | Основной текст |
| `--text-muted` | `#9A9AB8` | `#5B5B7A` | Второстепенный текст |
| `--accent-violet` | `#8B5CF6` | `#7C3AED` | Главный акцент, кнопки |
| `--accent-cyan` | `#22D3EE` | `#0891B2` | Второй акцент, ссылки на фоне |
| `--accent-pink` | `#F472B6` | `#DB2777` | Третий акцент, hover |
| `--accent-lime` | `#A3E635` | `#65A30D` | Успех, состояние «включено» |
| `--accent-amber` | `#FBBF24` | `#D97706` | Конфетти, подсветка |
| `--glow` | `0 0 40px rgba(139,92,246,0.45)` | `0 8px 30px rgba(124,58,237,0.25)` | Свечение |

Главный градиент (кнопки, заголовки, прогресс): фиолетовый → циан → розовый под углом 135°, в светлой теме — те же три цвета из правого столбца.

**Правило контраста.** Циан `#0891B2` на светлом фоне даёт около 3.7:1 — его используем для крупных элементов и иконок, а не для основного текста. Основной текст и подписи проходят 4.5:1 в обеих темах.

### Типографика

| Роль | Шрифт | Размеры |
| --- | --- | --- |
| Заголовки | Space Grotesk Variable | Hero: `clamp(2.5rem, 8vw, 6rem)`, секции: `clamp(2rem, 5vw, 3.5rem)` |
| Текст | Inter Variable | 16–18 px, межстрочный 1.6 |
| Код и метки | JetBrains Mono | 12–14 px, капс для надзаголовков |

### Отступы и формы

- Вертикальный «воздух» между блоками: 128 px на десктопе, 80 px на мобильных.
- Радиусы: карточки 24 px, кнопки и инпуты 12 px, бейджи — полностью круглые.
- Тени в тёмной теме заменяем на свечение и тонкие границы; в светлой — мягкие цветные тени.

### Файл токенов (`styles/themes.css`)

```css
:root {
  --radius-card: 24px;
  --radius-control: 12px;
  --gradient-main: linear-gradient(135deg, var(--accent-violet), var(--accent-cyan) 50%, var(--accent-pink));
}

[data-theme="dark"] {
  --bg: #07070d;
  --surface: #0f0f1a;
  --surface-2: #161625;
  --border: rgba(255, 255, 255, 0.08);
  --text: #f4f4fb;
  --text-muted: #9a9ab8;
  --accent-violet: #8b5cf6;
  --accent-cyan: #22d3ee;
  --accent-pink: #f472b6;
  --accent-lime: #a3e635;
  --accent-amber: #fbbf24;
  --glow: 0 0 40px rgba(139, 92, 246, 0.45);
}

[data-theme="light"] {
  --bg: #fafaff;
  --surface: #ffffff;
  --surface-2: #f1f1fb;
  --border: rgba(15, 15, 40, 0.1);
  --text: #0e0e1f;
  --text-muted: #5b5b7a;
  --accent-violet: #7c3aed;
  --accent-cyan: #0891b2;
  --accent-pink: #db2777;
  --accent-lime: #65a30d;
  --accent-amber: #d97706;
  --glow: 0 8px 30px rgba(124, 58, 237, 0.25);
}
```

В Tailwind v4 эти переменные подключаются в `@theme` (`--color-bg: var(--bg)` и так далее), поэтому в разметке работают классы `bg-bg`, `text-muted`, `border-border` и сами подстраиваются под тему.

## Организация кода и масштабирование

Чтобы добавить новый блок, достаточно создать папку секции и одну запись в реестре: навигация, якоря, порядок и ленивая загрузка подхватятся сами.

### Реестр секций

```ts
// src/types/section.ts
import type { ComponentType, LazyExoticComponent } from 'react';

export interface SectionConfig {
  id: string;        // якорь, например 'animations' → #animations
  navLabel: string;  // текст пункта в меню
  component: LazyExoticComponent<ComponentType>;
}
```

```ts
// src/app/sections.config.ts
import { lazy } from 'react';
import type { SectionConfig } from '@/types/section';

export const sections: SectionConfig[] = [
  { id: 'hero', navLabel: 'Главная', component: lazy(() => import('@/sections/hero/HeroSection')) },
  { id: 'animations', navLabel: 'Animations', component: lazy(() => import('@/sections/animations/AnimationsSection')) },
  { id: 'interactivity', navLabel: 'Interactivity', component: lazy(() => import('@/sections/interactivity/InteractivitySection')) },
  { id: 'effects', navLabel: 'Visual Effects', component: lazy(() => import('@/sections/effects/EffectsSection')) },
  { id: 'responsive', navLabel: 'Responsive', component: lazy(() => import('@/sections/responsive/ResponsiveSection')) },
];
```

Каждая секция экспортирует компонент через `export default`, иначе `React.lazy` его не подхватит.

### Как добавить новый блок (например, «3D»)

1. Создать `src/sections/three-d/ThreeDSection.tsx` с `export default`; внутри обернуть содержимое в `<Section id="three-d" eyebrow="3D" title="...">`.
2. Добавить одну строку в `sections.config.ts`.
3. Описать блок в `docs/ARCHITECTURE.md` и отметить задачу в `docs/CURRENT_STATUS.md`.

### Рекомендации по коду

- **Именование.** Компоненты — PascalCase, данные — `*.data.ts`, хуки — `useXxx`, один компонент на файл.
- **Размер.** Файл длиннее 150 строк — повод выделить подкомпонент или хук.
- **Контент отдельно от разметки.** Тексты, иконки и списки карточек лежат в `*.data.ts`, а не в JSX: так ИИ и ученики меняют контент, не трогая вёрстку.
- **Алиас `@/`.** Все импорты из `src` идут через `@/`, без цепочек `../../..`.
- **Только токены.** В компонентах нет жёстких цветов вроде `#8b5cf6` — только `var(--accent-violet)` или классы Tailwind на токенах.
- **Эффекты в одном месте.** Glass, glow и gradient-border — классы в `effects.css`; их не копируют из файла в файл.
- **Анимации.** Берём variants из `lib/motion.ts`; длительность 0.4–0.8 с, основной easing `[0.22, 1, 0.36, 1]`. Свои variants — только если анимация уникальна для блока.
- **Производительность.** Анимируем `transform` и `opacity`; `whileInView` с `once: true`; секции ниже Hero грузятся лениво; `canvas-confetti` подключается динамическим `import()` при первом клике.
- **Доступность.** Видимый фокус, `aria-label` у иконок-кнопок, `role="switch"` у переключателя, поддержка `prefers-reduced-motion`.
- **Строгие типы.** `"strict": true` в `tsconfig`, никаких `any` в пропсах.
- **Git.** Ветка на блок (`feature/hero`), коммит на каждый готовый компонент.

### Как работать с ИИ в Cursor

- Один запрос — один компонент или одна задача из `CURRENT_STATUS.md`.
- В начале запроса: «Прочитай `docs/ARCHITECTURE.md` и `docs/TECH_STACK.md`», затем описание компонента из каталога выше.
- После каждого шага — попросить Cursor обновить `CURRENT_STATUS.md`: следующая сессия начнёт с актуального контекста.

## План реализации по этапам

Проект собирается за 9–10 часов в восемь этапов: сначала фундамент (токены, тема, каркас), затем блоки по убыванию «вау-эффекта», в конце — полировка и деплой. Следующий этап начинается только после выполнения критерия готовности предыдущего.

| № | Этап | Время | Что делаем | Критерий готовности |
| --- | --- | --- | --- | --- |
| 0 | Подготовка | 20 мин | `npm create vite` (React + TS), установка `tailwindcss`, `motion`, `canvas-confetti`, `lucide-react`; алиас `@/`; ESLint + Prettier; папка `docs/` и `.cursor/rules`; первый коммит | `npm run dev` открывает пустую страницу без ошибок |
| 1 | Фундамент | 1.5 ч | `tokens.css`, `themes.css`, `effects.css`; `ThemeProvider` и `ThemeToggle`; примитивы `ui/`; `Container`, `Section`; `lib/motion.ts`; `Header`, `ScrollProgress`; реестр и `App` с пятью секциями-заглушками | Тема переключается и запоминается; клик по меню плавно скроллит к заглушке |
| 2 | Hero | 1.5 ч | `AnimatedBackground`, `HeroTitle`, `ScrollHint`, parallax | Первый экран выглядит эффектно в обеих темах; анимация идёт плавно на телефоне |
| 3 | Animations | 1 ч | `ScrollReveal`, `StaggerCards`, `HoverTiltCard`, данные карточек | Карточки появляются по очереди; tilt реагирует на курсор |
| 4 | Interactivity | 1.5 ч | `ConfettiButton`, `MorphButton`, `AnimatedSwitch`, `AnimatedSlider`, `LiveDemoPanel` | Каждый элемент даёт видимый отклик; слайдер и переключатель меняют превью |
| 5 | Visual Effects | 1 ч | `GlassCard`, `GlowCard`, `GradientBorderCard`, `ColorShiftCard`, орбы на фоне | Стекло читается на фоне орбов в обеих темах |
| 6 | Responsive Design | 1.5 ч | `DeviceSwitcher`, `DeviceFrame`, `ResponsiveDemoContent` на container queries | Переключение режимов плавно меняет ширину рамки, контент внутри перестраивается |
| 7 | Футер и полировка | 1 ч | `Footer` с призывом к курсу и ссылкой на GitHub; `prefers-reduced-motion`; проверка на 375, 768, 1440 px; фокус и aria; `og-image`; Lighthouse | Lighthouse: Performance и Accessibility от 90; нет горизонтального скролла на мобильных |
| 8 | Деплой | 20 мин | Репозиторий на GitHub, подключение к Vercel (или GitHub Pages), проверка боевой ссылки | Сайт открывается по публичной ссылке, ссылки в футере рабочие |

**Если времени мало,** сокращаем с конца списка: сначала упрощаем Responsive (оставляем только переключатель ширины), затем Visual Effects (3 карточки вместо 4). Этапы 0–3 обязательны: они определяют впечатление от сайта.

**После MVP** новые блоки добавляются по схеме из предыдущего раздела: идеи — 3D-сцена на Three.js, блок «AI-чат» с реальным вызовом Claude, галерея работ учеников, scroll-driven история.

## Файлы контекста для Cursor (`/docs`)

Четыре файла в папке `docs/` дают Cursor полный контекст проекта: что строим, как устроено, на чём пишем и что уже сделано. Содержимое каждого файла лежит в отдельной вкладке: скопируйте его как есть.

```text
docs/
├── PROJECT_OVERVIEW.md   # что и зачем
├── ARCHITECTURE.md       # как устроено
├── TECH_STACK.md         # на чём и по каким правилам
└── CURRENT_STATUS.md     # что сделано и что дальше
```

- PROJECT\_OVERVIEW.md — что и зачем
- ARCHITECTURE.md — как устроено
- TECH\_STACK.md — на чём и по каким правилам
- CURRENT\_STATUS.md — что сделано и что дальше
- project.mdc (Cursor rules) — правила Cursor (бонус): кладётся в `.cursor/rules/project.mdc`

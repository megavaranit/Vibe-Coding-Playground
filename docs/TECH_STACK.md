# Технологии и библиотеки

## Основной стек
| Задача | Технология | Заметки |
| --- | --- | --- |
| Сборка и dev-сервер | Vite | Быстрый HMR |
| UI | React 19 + TypeScript (strict) | Функциональные компоненты и хуки, без классов |
| Стили | Tailwind CSS v4 | Токены тем в `@theme`, подключены к CSS-переменным |
| Анимации | `motion` (Framer Motion) | `import { motion } from 'motion/react'` |
| Конфетти | `canvas-confetti` | Подключать динамическим `import()` при первом клике |
| Иконки | `lucide-react` | Только нужные иконки, импорт по имени |
| Шрифты | `@fontsource-variable/space-grotesk`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` | Локально, без внешних запросов |
| Качество | ESLint + Prettier | Запускать перед коммитом |
| Деплой | Vercel или GitHub Pages | Автодеплой по push в `main` |

Версии: ставить последние стабильные мажорные версии на момент старта и зафиксировать их в `package.json`.

## Команды
- `npm run dev` — dev-сервер
- `npm run build` — продакшен-сборка
- `npm run preview` — просмотр сборки
- `npm run lint` — проверка кода

## Соглашения
- Алиас `@/` → `src/`.
- Компоненты: PascalCase, один компонент на файл, `export default` для секций.
- Данные и тексты: `*.data.ts` рядом с секцией.
- Хуки: `useXxx` в `src/hooks/`.
- Классы: `cn()` из `lib/cn.ts` для условных className.
- Комментарий в шапке файла секции: что показывает блок и какая техника главная (проект учебный).

## Правила
- Только токены цветов, никаких hex в компонентах.
- Анимации — через пресеты из `lib/motion.ts`.
- Не добавлять библиотеки состояния, роутер и CSS-in-JS: проект одностраничный.
- Новую зависимость добавлять только после обсуждения и записи сюда.
- Нельзя анимировать `width`, `height`, `top`, `left` (исключение — `DeviceFrame`, там `layout`).
- Поддерживать `prefers-reduced-motion`.

## Поддерживаемые браузеры
Последние две версии Chrome, Safari, Firefox, Edge. Для `backdrop-filter` и `@property` — запасной вариант без эффекта.

## Кандидаты на будущее
Three.js / React Three Fiber (3D-блок), GSAP ScrollTrigger (сложные scroll-сцены), Lenis (плавный скролл).
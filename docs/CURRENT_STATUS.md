# Текущий статус

**Последнее обновление:** 2026-11-02
**Текущий этап:** 9 — модуль заявок выкатан
**Следующая задача:** Lighthouse ≥ 90; og-image PNG/JPG; проверка 375/768/1440; reboot сервера по желанию.

**Прод:** https://opsurgut.ru/ · GitHub: https://github.com/megavaranit/Vibe-Coding-Playground  
**Последний деплой:** модуль `#leads` + PHP API `/api/lead.php`.

## Прогресс по этапам

### 0. Подготовка
- [x] Создан проект Vite (React + TypeScript)
- [x] Установлены tailwindcss, motion, canvas-confetti, lucide-react
- [x] Настроен алиас `@/`
- [x] Настроены ESLint и Prettier
- [x] Папка `docs/` и `.cursor/rules/` на месте
- [x] Первый коммит (`c5f5bfb`)

### 1. Фундамент
- [x] `tokens.css`, `themes.css`, `effects.css`
- [x] `ThemeProvider`, `useTheme`, `ThemeToggle`
- [x] Примитивы `ui/`: Button, Card, Badge, SectionHeading, GradientText
- [x] `Container`, `Section`
- [x] `lib/motion.ts`
- [x] `Header`, `NavLinks`, `ScrollProgress`
- [x] `sections.config.ts` и `App` с lazy-секциями

### 2. Hero
- [x] AnimatedBackground / HeroTitle / ScrollHint / HeroSection

### 3. Animations
- [x] ScrollReveal, StaggerCards, HoverTiltCard, демо directions

### 4. Interactivity
- [x] Confetti / Morph / Slider / Switch / LiveDemoPanel

### 5. Visual Effects
- [x] Glass / Glow / GradientBorder / ColorShift

### 6. Responsive Design
- [x] DeviceSwitcher / DeviceFrame / ResponsiveDemoContent

### 7. Футер и полировка
- [x] Footer, skip-link, focus/aria, OG meta (favicon временно)
- [ ] Проверка на 375 / 768 / 1440 px вручную
- [ ] Lighthouse ≥ 90
- [ ] Отдельный og-image (PNG/JPG)

### 8. Деплой
- [x] GitHub + VDS + DNS + HTTPS
- [x] Выкатить модуль Leads + PHP API
- [ ] Деплой на Vercel / GitHub Pages (опционально)

### 9. Leads (заявки)
- [x] `LeadFormSection` + `LeadForm` + `FormField` + `leads.data.ts`
- [x] Запись в `sections.config.ts` (id: `leads`, nav: «Заявка»)
- [x] `api/lead.php` (сохранение в `api/data/leads.jsonl`)
- [x] Fallback в `localStorage`, если API недоступен
- [x] PHP-FPM + nginx location `/api/` на VDS

## Принятые решения
- Стек: Vite + React + TypeScript + Tailwind v4 + Motion.
- Секции не импортируют друг друга.
- Заявки: POST JSON на `/api/lead.php` (или `VITE_LEADS_ENDPOINT`); файлы заявок не коммитятся (`api/data/*.jsonl`).
- LiveDemo: slider = scale/rotate; switch = glow only.
- Hero: без scroll-parallax фона; title через `--gradient-title`.

## Известные проблемы
- На сервере после `apt upgrade` рекомендован reboot (новое ядро).
- OG image временно указывает на `favicon.svg`.

## Как обновлять этот файл
После каждой выполненной задачи отметь её `[x]`, обнови «Текущий этап» и «Следующая задача». Новые решения и проблемы добавляй в соответствующие разделы.

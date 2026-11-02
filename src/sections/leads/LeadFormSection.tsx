/**
 * Leads: форма сбора заявок. Главная техника — accessible form + async submit states.
 */
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Section } from '@/layout/Section';
import { easeOutExpo, viewportOnce } from '@/lib/motion';
import { LeadForm } from '@/sections/leads/LeadForm';

export default function LeadFormSection() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="leads"
      eyebrow="Заявка"
      title="Оставьте заявку"
      description="Расскажите о задаче — перезвоним или напишем и обсудим формат работы."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          className="rounded-[var(--radius-card)] border border-border bg-surface-2/60 p-6 md:p-8"
        >
          <p className="font-mono text-xs tracking-[0.18em] text-accent-cyan uppercase">
            Как это работает
          </p>
          <ol className="mt-5 space-y-4 text-muted">
            <li className="flex gap-3">
              <span className="font-mono text-accent-lime">01</span>
              <span>Заполняете короткую форму — без лишних полей.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-accent-lime">02</span>
              <span>Мы получаем заявку на сервере и связываемся с вами.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-accent-lime">03</span>
              <span>Согласуем срок, объём и старт работы.</span>
            </li>
          </ol>
          <p className="mt-8 text-sm text-muted">
            Нужен быстрый ответ? Напишите в мессенджер или укажите удобное время в комментарии.
          </p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, delay: 0.08, ease: easeOutExpo }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </Section>
  );
}

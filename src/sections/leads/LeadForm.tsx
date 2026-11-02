/**
 * LeadForm: валидация + отправка заявки (endpoint или локальный fallback).
 */
import { Check, LoaderCircle, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { easeOutExpo } from '@/lib/motion';
import {
  LEADS_ENDPOINT,
  leadServices,
  type LeadPayload,
  type LeadServiceValue,
} from '@/sections/leads/leads.data';
import { InputField, SelectField, TextAreaField } from '@/sections/leads/FormField';
import { Button } from '@/ui/Button';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  service: LeadServiceValue | '';
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Укажите имя (минимум 2 символа)';
  }
  const phone = values.phone.replace(/[^\d+]/g, '');
  if (phone.length < 10) {
    errors.phone = 'Укажите телефон полностью';
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Похоже на некорректный email';
  }
  if (!values.service) {
    errors.service = 'Выберите задачу';
  }
  return errors;
}

async function submitLead(payload: LeadPayload): Promise<void> {
  const response = await fetch(LEADS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Lead submit failed: ${response.status}`);
  }
}

export function LeadForm() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<FormState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const onChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      if (errors[field]) {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy[field];
          return copy;
        });
      }
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'submitting') return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setState('idle');
      setStatusMessage('Проверьте поля формы');
      return;
    }

    const payload: LeadPayload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      service: values.service,
      message: values.message.trim(),
      createdAt: new Date().toISOString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
    };

    setState('submitting');
    setStatusMessage('Отправляем заявку…');

    try {
      await submitLead(payload);
      setState('success');
      setStatusMessage('Заявка отправлена. Мы свяжемся с вами.');
      setValues(initialValues);
    } catch {
      // Fallback для локальной разработки без API: сохраняем в localStorage
      try {
        const key = 'vibe-leads';
        const prev = JSON.parse(localStorage.getItem(key) ?? '[]') as LeadPayload[];
        localStorage.setItem(key, JSON.stringify([payload, ...prev].slice(0, 50)));
        setState('success');
        setStatusMessage(
          'Заявка сохранена локально (API недоступен). На проде уходит на сервер.',
        );
        setValues(initialValues);
      } catch {
        setState('error');
        setStatusMessage('Не удалось отправить. Попробуйте ещё раз или напишите в Telegram.');
      }
    }
  };

  if (state === 'success') {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="glass flex min-h-80 flex-col items-start justify-center gap-4 rounded-[var(--radius-card)] p-8"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent-lime/20 text-accent-lime">
          <Check size={22} aria-hidden />
        </span>
        <h3 className="font-display text-2xl">Заявка принята</h3>
        <p className="max-w-md text-muted">{statusMessage}</p>
        <Button
          type="button"
          variant="glass"
          onClick={() => {
            setState('idle');
            setStatusMessage('');
          }}
        >
          Отправить ещё одну
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-card)] border border-border bg-surface/60 p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          id="lead-name"
          label="Имя *"
          name="name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          value={values.name}
          onChange={onChange('name')}
          error={errors.name}
        />
        <InputField
          id="lead-phone"
          label="Телефон *"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+7 …"
          value={values.phone}
          onChange={onChange('phone')}
          error={errors.phone}
        />
        <InputField
          id="lead-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.ru"
          value={values.email}
          onChange={onChange('email')}
          error={errors.email}
        />
        <SelectField
          id="lead-service"
          label="Что нужно *"
          name="service"
          value={values.service}
          onChange={onChange('service')}
          error={errors.service}
        >
          <option value="">Выберите вариант</option>
          {leadServices.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="mt-5">
        <TextAreaField
          id="lead-message"
          label="Комментарий"
          name="message"
          placeholder="Сроки, ссылки, пожелания"
          value={values.message}
          onChange={onChange('message')}
          error={errors.message}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {statusMessage || 'Поля со * обязательны. Обычно отвечаем в течение дня.'}
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={state === 'submitting'}
          aria-busy={state === 'submitting'}
          className="min-w-44"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={state}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="inline-flex items-center gap-2"
            >
              {state === 'submitting' ? (
                <>
                  <LoaderCircle
                    size={18}
                    className={reduced ? undefined : 'animate-spin'}
                    aria-hidden
                  />
                  Отправка
                </>
              ) : (
                <>
                  <Send size={18} aria-hidden />
                  Отправить заявку
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>

      {state === 'error' ? (
        <p className="mt-4 text-sm text-accent-pink" role="alert">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}

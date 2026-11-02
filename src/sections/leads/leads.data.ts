export const leadServices = [
  { value: 'landing', label: 'Лендинг / промо-сайт' },
  { value: 'redesign', label: 'Редизайн существующего сайта' },
  { value: 'playground', label: 'Интерактивный playground / демо' },
  { value: 'consult', label: 'Консультация по вайбкодингу' },
  { value: 'other', label: 'Другое' },
] as const;

export type LeadServiceValue = (typeof leadServices)[number]['value'];

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  service: LeadServiceValue | '';
  message: string;
  createdAt: string;
  source: string;
};

export const LEADS_ENDPOINT =
  (import.meta.env.VITE_LEADS_ENDPOINT as string | undefined) ?? '/api/lead.php';

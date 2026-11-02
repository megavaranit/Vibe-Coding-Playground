import type { ReactNode } from 'react';
import { Container } from '@/layout/Container';
import { cn } from '@/lib/cn';
import { SectionHeading } from '@/ui/SectionHeading';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  withContainer?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  withContainer = true,
}: SectionProps) {
  const content = (
    <>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      {children}
    </>
  );

  return (
    <section id={id} className={cn('py-20 md:py-32', className)}>
      {withContainer ? <Container>{content}</Container> : content}
    </section>
  );
}

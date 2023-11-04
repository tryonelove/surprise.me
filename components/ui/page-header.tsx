import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

export function PageHeader({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        'flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12',
        className
      )}
      {...restProps}
    >
      {children}
    </section>
  );
}

export function PageHeaderHeading({
  className,
  ...restProps
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('text-3xl font-bold md:text-5xl')} {...restProps} />;
}

export function PageHeaderDescription({
  className,
  ...restProps
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn(className)} {...restProps} />;
}

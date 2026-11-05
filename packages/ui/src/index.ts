import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @zwantum/ui
 * Foundation utilities and styling contracts for Tailwind CSS & shadcn/ui.
 */

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export interface ComponentBaseProps {
  className?: string;
  id?: string;
  'aria-label'?: string;
}

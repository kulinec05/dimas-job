import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LoadingIndicatorProps
  extends DetailedHTMLProps<
  HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
  > {
  color?: 'primary' | 'white';
  isScreen?: boolean;
  className?: string;
}

import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export default interface TitleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  headerType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  margin?: boolean;
  align?: 'left' | 'center' | 'right';
  textWrap?: boolean;
}

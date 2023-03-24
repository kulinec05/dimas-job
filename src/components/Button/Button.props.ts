import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export enum ButtonThemeEnum {
  primary = 'primary',
  gray = 'gray',
  gost = 'gost',
  text = 'text',
}

type ButtonThemeType = 'primary' | 'gray' | 'gost' | 'text';

export enum ButtonSIzeEnum {
  small = 'small',
  medium = 'medium',
  large = 'large',
  huge = 'huge',
}

type ButtonSizeType = 'small' | 'medium' | 'large' | 'huge';

export interface ButtonProps
  extends DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  children?: ReactNode;
  size?: ButtonSizeType;
  theme?: ButtonThemeType;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  spinnerColor?: 'primary' | 'white';
  isWrap?: boolean;
  className?: string;
}

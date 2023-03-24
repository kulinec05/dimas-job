import { ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

export interface RootLinkProps extends LinkProps {
  children?: ReactNode;
}

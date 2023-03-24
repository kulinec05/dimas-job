import { lazy } from 'react';

export const AsyncPage = lazy(async () => await import('./Page'));

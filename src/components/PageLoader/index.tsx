import { LoadingIndicator } from 'components/LoadingIndicator';
import { classNames } from 'utils/classNames/classNames';

import styles from './PageLoader.module.css';

export const PageLoader = () => {
  return (
    <div className={classNames(styles.pageLoader)}>
      <LoadingIndicator isScreen />
    </div>
  );
};

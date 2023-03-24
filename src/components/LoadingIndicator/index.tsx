import { classNames } from 'utils/classNames/classNames';
import { FC } from 'react';
import styles from './LoadingIndicator.module.css';
import { LoadingIndicatorProps } from './LoadingIndicator.props';

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  color = 'primary',
  isScreen = false,
}) => {
  return (
    <div
      className={classNames({
        [styles.ldsDualRing]: !isScreen,
        [styles.screenLoading]: isScreen,
        [styles.colorWhite]: color === 'white',
      })}
    ></div>
  );
};

import { FC, useEffect, useState } from 'react';

import { LoadingIndicator } from '../LoadingIndicator';
import { ButtonProps, ButtonSIzeEnum, ButtonThemeEnum } from './Button.props';
import styles from './Button.module.css';
import { classNames } from 'utils/classNames/classNames';

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = 'medium',
  loading = false,
  isWrap = false,
  disabled,
  spinnerColor,
  theme = 'primary',
  ...props
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [isVisibleLoadingIndicator, setIsVisibleLoadingIndicator] =
    useState(false);

  useEffect(() => {
    if (loading) {
      setIsloading(true);
      setIsVisibleLoadingIndicator(true);
    } else {
      if (isVisibleLoadingIndicator) {
        setTimeout(() => setIsloading(false), 400);
        setTimeout(() => setIsVisibleLoadingIndicator(false), 800);
      }
    }
  }, [loading]);

  return (
    <button
      className={classNames(
        styles.button,
        `${isWrap ? 'clamp-2' : ''}`,
        styles[ButtonThemeEnum[theme]],
        styles[ButtonSIzeEnum[size]],
        {
          [styles.isLoading]: !disabled && isVisibleLoadingIndicator,
        },
        className,
      )}
      disabled={disabled ?? isVisibleLoadingIndicator}
      {...props}
    >
      <div className={styles.wrapper}>
        {isVisibleLoadingIndicator && (
          <div
            className={classNames(styles.loading, {
              [styles.loadingVisible]: isLoading,
              [styles.loadingHide]: !isLoading,
            })}
          >
            <LoadingIndicator
              color={
                !spinnerColor
                  ? theme === ButtonThemeEnum.primary
                    ? 'white'
                    : 'primary'
                  : spinnerColor
              }
            />
          </div>
        )}

        <div
          className={classNames(styles.content, {
            [styles.contentHide]: isVisibleLoadingIndicator && isLoading,
            [styles.contentVisible]: isVisibleLoadingIndicator && !isLoading,
          })}
        >
          {children}
        </div>
      </div>
    </button>
  );
};

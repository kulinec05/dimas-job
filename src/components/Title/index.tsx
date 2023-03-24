import TitleProps from './Title.props';
import styles from './Title.module.css';
import clsx from 'clsx';

const Header = ({
  className,
  children,
  headerType = 'h2',
  ...props
}: TitleProps): JSX.Element => {
  if (headerType === 'h1') {
    return (
      <h1 className={clsx(styles.h1, styles.h1Title, className)} {...props}>
        {children}
      </h1>
    );
  }
  if (headerType === 'h2') {
    return (
      <h2 className={clsx(styles.h2, styles.h2Title, className)} {...props}>
        {children}
      </h2>
    );
  }
  if (headerType === 'h3') {
    return (
      <h3 className={clsx(styles.h3, styles.h3Title, className)} {...props}>
        {children}
      </h3>
    );
  }
  if (headerType === 'h4') {
    return (
      <h4 className={clsx(styles.h4, styles.h4Title, className)} {...props}>
        {children}
      </h4>
    );
  }
  if (headerType === 'h5') {
    return (
      <h5 className={clsx(styles.h5, styles.h5Title, className)} {...props}>
        {children}
      </h5>
    );
  }
  if (headerType === 'h6') {
    return (
      <h6 className={clsx(styles.h6, styles.h6Title, className)} {...props}>
        {children}
      </h6>
    );
  }
  return (
    <h3 className={clsx(styles.h3, styles.h3Title, className)} {...props}>
      {children}
    </h3>
  );
};

export const Title = ({
  className,
  children,
  headerType,
  margin = false,
  align = 'left',
  textWrap = true,
  ...props
}: TitleProps): JSX.Element => {
  return (
    <Header
      align={align}
      headerType={headerType}
      className={clsx(
        {
          [styles.noneMargin]: !margin,
          [styles.noneWrap]: !textWrap,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Header>
  );
};

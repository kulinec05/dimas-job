import { classNames } from 'utils/classNames/classNames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './RootLink.module.css';
import { RootLinkProps } from './RootLink.props';

export const RootLink: FC<RootLinkProps> = (props) => {
  const { pathname } = useLocation();
  const { className, children, to, ...otherProps } = props;

  return (
    <Link
      to={to}
      className={classNames(
        styles.rootLink,
        {
          [styles.isActive]: pathname === to,
        },
        className,
      )}
      {...otherProps}
    >
      {children}
    </Link>
  );
};

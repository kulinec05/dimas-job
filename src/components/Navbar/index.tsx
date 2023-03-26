import { RootLink } from 'components/RootLink';
import { Title } from 'components/Title';
import { classNames } from 'utils/classNames/classNames';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={classNames(styles.navbar)}>
      <Title headerType="h5">
        <div>Антинаркотический ресурс</div>
        <div className={styles.subTitleText}>Административная панель</div>
      </Title>
      <div className={styles.linkList}>
        <RootLink className={styles.link} to={'/complaints'}>
          {'Жалобы'}
        </RootLink>
        <RootLink className={styles.link} to={'/suggestions'}>
          {'Предложения'}
        </RootLink>
        <RootLink className={styles.link} to={'/news'}>
          {'Новости'}
        </RootLink>
        <RootLink className={styles.link} to={'/botSettings'}>
          {'Настройки бота'}
        </RootLink>
      </div>
    </nav>
  );
};

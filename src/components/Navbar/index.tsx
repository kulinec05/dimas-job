import { RoutePath } from 'app/config/routeConfig/routeConfig';
import { RootLink } from 'components/RootLink';
import { Title } from 'components/Title';
import { classNames } from 'utils/classNames/classNames';
import styles from './Navbar.module.css';

export const Navbar = () => {
  // console.log(Object.entries(RoutePath));
  return (
    <nav className={classNames(styles.navbar)}>
      <Title headerType="h5">
        <div>Антинаркотический ресурс</div>
        <div className={styles.subTitleText}>Административная панель</div>
      </Title>
      <div className={styles.linkList}>
        {/* {RoutePath.map((route) => {
          <RootLink key={route.link} className={styles.link} to={route.link}>
            {route.label}
          </RootLink>;
        })} */}
        <RootLink className={styles.link} to={'/complaints'}>
          {'Жалобы'}
        </RootLink>
        <RootLink className={styles.link} to={'/suggestions'}>
          {'Предложения'}
        </RootLink>
        <RootLink className={styles.link} to={'/botSettings'}>
          {'Настройки бота'}
        </RootLink>
      </div>
    </nav>
  );
};

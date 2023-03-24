import { Suspense } from 'react';
import AppRouter from 'app/providers/routers';
import { classNames } from 'utils/classNames/classNames';
import { Navbar } from 'components/Navbar';

import './styles/index.css';

const App = () => {
  return (
    <div className={classNames('app')}>
      <Suspense fallback={''}>
        <Navbar />
        <div className="content">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;

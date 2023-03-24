import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routeConfig } from 'app/config/routeConfig/routeConfig';
import { PageLoader } from 'components/PageLoader';

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/complaints" />} />
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={<Suspense fallback={<PageLoader />}>{element}</Suspense>}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;

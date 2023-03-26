import { RouteProps } from 'react-router-dom';
import { ComplaintsPage } from 'pages/ComplaintsPage';
import { ComplaintDetailsPage } from 'pages/ComplaintDetailsPage';
import { SuggestionsPage } from 'pages/SuggestionsPage';
import { BotSettings } from 'pages/BotSettings';
import { NotFoundPage } from 'pages/NotFoundPage';
import { NewsPage } from 'pages/NewsPage';
import { NewsDetailsPage } from 'pages/NewsDetailPage';

export enum AppRoutes {
  Complaints = 'complaints',
  ComplaintDetails = 'complaintDetails',
  Suggestions = 'suggestions',
  News = 'news',
  NewsAdd = 'newsAdd',
  NewsEdit = 'newsEdit',
  BotSettings = 'botSettings',
  NOT_FOUND = 'not_found',
}

interface Ssasa {
  label: string;
  link: string;
}

export const RoutePath: Record<AppRoutes, Ssasa> = {
  [AppRoutes.Complaints]: {
    label: 'Жалобы',
    link: '/complaints',
  },
  [AppRoutes.ComplaintDetails]: {
    label: 'Детали жалобы',
    link: '/complaints/:id',
  },
  [AppRoutes.Suggestions]: {
    label: 'Предложения',
    link: '/suggestions',
  },
  [AppRoutes.News]: {
    label: 'Новости',
    link: '/news',
  },
  [AppRoutes.NewsAdd]: {
    label: 'Добавить новость',
    link: '/news/add',
  },
  [AppRoutes.NewsEdit]: {
    label: 'Редактирование новости',
    link: '/news/:id',
  },
  [AppRoutes.BotSettings]: {
    label: 'Настройки бота',
    link: '/botSettings',
  },
  [AppRoutes.NOT_FOUND]: {
    label: '',
    link: '*',
  },
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.Complaints]: {
    path: RoutePath.complaints.link,
    element: <ComplaintsPage />,
  },
  [AppRoutes.ComplaintDetails]: {
    path: RoutePath.complaintDetails.link,
    element: <ComplaintDetailsPage />,
  },
  [AppRoutes.Suggestions]: {
    path: RoutePath.suggestions.link,
    element: <SuggestionsPage />,
  },
  [AppRoutes.News]: {
    path: RoutePath.news.link,
    element: <NewsPage />,
  },
  [AppRoutes.NewsEdit]: {
    path: RoutePath.newsEdit.link,
    element: <NewsDetailsPage />,
  },
  [AppRoutes.NewsAdd]: {
    path: RoutePath.newsAdd.link,
    element: <NewsDetailsPage />,
  },
  [AppRoutes.BotSettings]: {
    path: RoutePath.botSettings.link,
    element: <BotSettings />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found.link,
    element: <NotFoundPage />,
  },
};

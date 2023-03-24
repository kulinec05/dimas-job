import { useMutation, useQuery } from 'react-query';
import { editBotSettings, getBotSettings } from '../services';

export function useGetBotSettings() {
  return useQuery(['bot_settings'], () => getBotSettings());
}

export function useEditBotSettings() {
  return useMutation(editBotSettings, {
    onSuccess: (newSettings: any) => {
      console.log('Настройки успешно изменены ! \n', newSettings);
    },
    onError: (error) => {
      console.log('Ошибка сохранения настроек !', error);
    },
  });
}

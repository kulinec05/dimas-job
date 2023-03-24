import { http } from 'services/http';
import { BotSettings, ResponseBotSettings } from '../models';

export const getBotSettings = async () => {
  const response = await http.get<ResponseBotSettings>('settings');

  return {
    ...(response.data as unknown as BotSettings[]),
  };
};

export const editBotSettings = async ({
  id,
  name,
  label,
  value,
  created_at,
  updated_at,
}: BotSettings) => {
  const response = await http.post<BotSettings>(`settings/${id}`, {
    id,
    name,
    label,
    value,
    created_at,
    updated_at,
  });

  return {
    ...response.data,
  };
};

type BotSettingsId = 1 | 2 | 3 | 4 | 5;
type BotSettingsName = 'start' | 'ACCEPTED' | 'REVIEW' | 'DONE' | 'REJECTED';

export interface BotSettings {
  id: BotSettingsId;
  name: BotSettingsName;
  value: string;
  label: string;
  created_at: '2023-02-23T09:04:55.000000Z';
  updated_at: '2023-02-23T09:04:55.000000Z';
}

export interface ResponseBotSettings {
  status: string;
  data: BotSettings[];
}

export interface CoinbotCommandResult {
  title: string;
  trigger: string;
  enabled: boolean;
  message: string;
  description: string;
  thumb: string;
  parameter?: string;
}

export type CoinbotCommand = (query?: string) => CoinbotCommandResult;

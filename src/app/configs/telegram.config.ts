import { ConfigService } from '@nestjs/config'
import { ITelegramOptions } from '../telegram/telegram.interface'

export function getTelegramConfig (configService: ConfigService): ITelegramOptions {
  const token = configService.get('TELEGRAM_BOT_TOKEN')

  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN not found')
  }

  return {
    chatId: configService.get('TELEGRAM_CHAT_ID') ?? '',
    token,
  }
}

import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateThemeDtoSchema } from './dto/update-theme.dto';
import type { ThemeConfig } from '@zwantum/theme-contract';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('theme')
  getTheme(): ThemeConfig {
    return this.settingsService.getTheme();
  }

  @Put('theme')
  @HttpCode(HttpStatus.OK)
  updateTheme(@Body() rawBody: unknown): ThemeConfig {
    const parseResult = UpdateThemeDtoSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const messages = parseResult.error.errors.map((e) => e.message).join('; ');
      throw new BadRequestException(`Invalid theme configuration: ${messages}`);
    }
    return this.settingsService.updateTheme(parseResult.data);
  }

  @Post('theme')
  @HttpCode(HttpStatus.OK)
  updateThemePost(@Body() rawBody: unknown): ThemeConfig {
    return this.updateTheme(rawBody);
  }
}


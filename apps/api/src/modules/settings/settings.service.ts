import { Injectable, Logger } from '@nestjs/common';
import type { ThemeConfig } from '@zwantum/theme-contract';
import defaultTheme from '@zwantum/theme-default';
import type { UpdateThemeDto } from './dto/update-theme.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);
  private currentTheme: ThemeConfig;
  private readonly storageFilePath = path.resolve(
    process.cwd(),
    '../../packages/themes/default/dist/active-theme.json',
  );
  private readonly fallbackFilePath = path.resolve(
    process.cwd(),
    'active-theme.json',
  );

  constructor() {
    this.currentTheme = { ...defaultTheme };
    this.loadPersistedTheme();
  }

  private loadPersistedTheme(): void {
    const targetFile = fs.existsSync(this.storageFilePath)
      ? this.storageFilePath
      : fs.existsSync(this.fallbackFilePath)
        ? this.fallbackFilePath
        : null;

    if (targetFile) {
      try {
        const raw = fs.readFileSync(targetFile, 'utf-8');
        const parsed = JSON.parse(raw);
        this.currentTheme = {
          ...this.currentTheme,
          ...parsed,
          colors: { ...this.currentTheme.colors, ...parsed.colors },
          branding: { ...this.currentTheme.branding, ...parsed.branding },
        };
        this.logger.log(`Loaded persisted theme from ${targetFile}`);
      } catch (err) {
        this.logger.warn(`Failed to read theme file: ${err}`);
      }
    }
  }

  private persistTheme(): void {
    const payload = JSON.stringify(this.currentTheme, null, 2);
    try {
      const dir = path.dirname(this.storageFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.storageFilePath, payload, 'utf-8');
    } catch {
      // Fallback to local cwd
      try {
        fs.writeFileSync(this.fallbackFilePath, payload, 'utf-8');
      } catch (e) {
        this.logger.error(`Could not persist theme to disk: ${e}`);
      }
    }
  }

  getTheme(): ThemeConfig {
    return this.currentTheme;
  }

  updateTheme(dto: UpdateThemeDto): ThemeConfig {
    this.currentTheme = {
      ...this.currentTheme,
      ...(dto.borderRadius && { borderRadius: dto.borderRadius }),
      ...(dto.headerLayout && { headerLayout: dto.headerLayout }),
      ...(dto.footerLayout && { footerLayout: dto.footerLayout }),
      branding: {
        ...this.currentTheme.branding,
        ...(dto.branding || {}),
      },
      colors: {
        ...this.currentTheme.colors,
        ...(dto.colors || {}),
      },
    };

    this.persistTheme();
    this.logger.log(`Theme updated successfully by merchant admin`);
    return this.currentTheme;
  }
}

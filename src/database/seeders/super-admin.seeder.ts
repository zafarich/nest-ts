import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SuperAdminSeeder {
  private readonly logger = new Logger(SuperAdminSeeder.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async seed(): Promise<void> {
    const phone = this.configService.get<string>('SUPERADMIN_PHONE');
    const password = this.configService.get<string>('SUPERADMIN_PASSWORD');

    if (!phone || !password) {
      this.logger.warn(
        "Superadmin ma'lumotlari topilmadi. SUPERADMIN_PHONE va SUPERADMIN_PASSWORD o'zgaruvchilarini tekshiring.",
      );
      return;
    }

    this.logger.debug(`Superadmin yaratilmoqda: ${phone}`);
    await this.authService.createSuperAdmin(phone, password);
  }
}

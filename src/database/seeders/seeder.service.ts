import { Injectable, Logger } from '@nestjs/common';
import { SuperAdminSeeder } from './super-admin.seeder';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private readonly superAdminSeeder: SuperAdminSeeder) {}

  async seed(): Promise<void> {
    await this.seedSuperAdmin()
      .then(() => {
        this.logger.debug('Seeding completed!');
      })
      .catch((error) => {
        this.logger.error('Seeding failed!');
        throw error;
      });
  }

  private async seedSuperAdmin(): Promise<void> {
    this.logger.debug('Seeding super admin...');
    return this.superAdminSeeder.seed();
  }
}

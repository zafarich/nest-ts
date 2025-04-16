import { Module } from '@nestjs/common';
import { SuperAdminSeeder } from './super-admin.seeder';
import { AuthModule } from '../../modules/auth/auth.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [AuthModule],
  providers: [SuperAdminSeeder, SeederService],
  exports: [SuperAdminSeeder, SeederService],
})
export class SeederModule {}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SeederService } from './database/seeders/seeder.service';
import { environment } from './config/environment';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Ma'lumotlar bazasi sxemasini yaratamiz
  const orm = app.get(MikroORM);
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  // Seed initial data
  const seederService = app.get(SeederService);
  await seederService.seed();

  await app.listen(environment().port);
  console.log(
    `Application is running on: http://localhost:${environment().port}`,
  );
}
bootstrap();

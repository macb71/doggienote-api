import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DogModule } from './dog/dog.module';
import configuration from './config/configuration';
import { DictActivityModule } from './dict-activity/dict-activity.module'
import { ActivityModule } from './activity/activity.module';
import { ErrorFilter } from './error.filter';
import { APP_FILTER } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // TypeOrmModule.forRoot(),
    DatabaseModule,
    DogModule,
    DictActivityModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, {
    provide: APP_FILTER,
    useClass: ErrorFilter,
  },],
})
export class AppModule {}

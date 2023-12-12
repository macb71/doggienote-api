import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/activity/activity.entity';
import { DictActivity } from 'src/dict-activity/dic-activity.entity';
import { Dog } from 'src/dog/dog.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.HOST'),
        username: configService.get<string>('database.USER'),
        password: configService.get<string>('database.PASSWORD'),
        database: configService.get<string>('database.DATABASE'),
        // entities: ['dist/**/*.entity{.ts,.js}'],
        entities: [Dog, DictActivity, Activity],
        bigNumberStrings: false,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

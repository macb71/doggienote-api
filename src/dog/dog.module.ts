import { Module } from '@nestjs/common';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './dog.entity';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dog]), ActivityModule],
  controllers: [DogController],
  providers: [DogService]
})
export class DogModule {}

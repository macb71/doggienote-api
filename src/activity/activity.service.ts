import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { Repository } from 'typeorm';
import { ErrorDoggienoteNotFound } from 'src/error-doggienote';

@Injectable()
export class ActivityService {
  logger = new Logger(ActivityService.name);

  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    const activities = await this.activityRepository.find();
    this.logger.log(activities);
    if (activities === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return activities;
    }
  }

  async findOne(id: string): Promise<Activity[]> {
    const activity = await this.activityRepository.find({ where: { id } });
    if (activity.length === 0) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return activity;
    }
  }

  async findByIdDog(id_dog: string): Promise<Activity[]> {
    const foundDog = await this.activityRepository.find({ where: { id_dog } });
    if (foundDog.length === 0) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return foundDog;
    }
  }

  async findByIdDictActivity(id_dict_activity: string): Promise<Activity[]> {
    const foundDictActivity = await this.activityRepository.find({
      where: { id_dict_activity },
    });
    if (foundDictActivity.length === 0) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return foundDictActivity;
    }
  }

  async createActivity(activityData: Partial<Activity>): Promise<Activity> {
    const newActivity = await this.activityRepository.create(activityData);
    return await this.activityRepository.save(newActivity);
  }

  async removeActivity(id: string) {
    const remAct = await this.activityRepository.find({ where: { id } });
    if (remAct.length === 0) {
      throw new ErrorDoggienoteNotFound();
    } else {
      await this.activityRepository.delete(id);
    }
  }

  async updateActivity(
    id: string,
    activityData: Partial<Activity>,
  ): Promise<Activity> {
    const remAct = await this.activityRepository.find({ where: { id } });
    if (remAct.length === 0) {
      throw new ErrorDoggienoteNotFound();
    } else {
      const activityToUpdate = await this.activityRepository.findOneOrFail({
        where: { id },
      });
      const { id_dog: id_dog, id_dict_activity, ...rest } = activityData;
      const updateActivity = Object.assign({}, activityToUpdate, rest);
      return this.activityRepository.save(updateActivity);
    }
  }
}

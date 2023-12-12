import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictActivity } from './dic-activity.entity';
import { ActivityService } from 'src/activity/activity.service';
import {
  ErrorDoggienote,
  ErrorDoggienoteNotCreated,
  ErrorDoggienoteNotFound,
} from 'src/error-doggienote';

@Injectable()
export class DictActivityService {

  constructor(
    @InjectRepository(DictActivity)
    private dictActivityRepository: Repository<DictActivity>,
    private activityServis: ActivityService,
  ) {}

  async findAll(): Promise<DictActivity[]> {
    const dictActivities = await this.dictActivityRepository.find();
    if (dictActivities === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return dictActivities;
    }
  }

  async findOne(id: string): Promise<DictActivity> {
    const dictActivity = await this.dictActivityRepository.findOneOrFail({
      where: { id },
    });
    if (dictActivity === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return dictActivity;
    }
  }

  async createDictActivity(
    dictActivityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    const newDictActivity =
      this.dictActivityRepository.create(dictActivityData);
    if (newDictActivity === null) {
      throw new ErrorDoggienoteNotCreated();
    } else {
      return await this.dictActivityRepository.save(newDictActivity);
    }
  }

  async updateActivity(
    id: string,
    activityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    const dictActivityToUpdate =
      await this.dictActivityRepository.findOneOrFail({
        where: { id },
      });
    if (dictActivityToUpdate === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      const { dict_activity, ...rest } = activityData;
      const updatedDictActivity = Object.assign({}, dictActivityToUpdate, rest);
      return this.dictActivityRepository.save(updatedDictActivity);
    }
  }

  async deleteDictActivity(id: string) {
    const dictActivityToDelete = await this.dictActivityRepository.findOne({
      where: { id },
    });
    if (dictActivityToDelete === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      if (dictActivityToDelete.removable === false) {
        throw new ErrorDoggienote(
          'This dictActivity cannot be removed',
          403,
          'dn_4',
        );
      } else {
        if (dictActivityToDelete.removable === true) {
          if (await this.activityServis.findByIdDictActivity(id)) {
            throw new ErrorDoggienote(
              'This dictActivity is used in Activity database. It cannot be removed.',
              403,
              'dn_3',
            );
          } else {
            await this.dictActivityRepository.delete(id);
          }
        }
      }
    }
  }
}

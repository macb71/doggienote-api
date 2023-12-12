import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from './dog.entity';
import { ActivityService } from 'src/activity/activity.service';
import {
  ErrorDoggienote,
  ErrorDoggienoteNotCreated,
  ErrorDoggienoteNotFound,
} from 'src/error-doggienote';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
    private activityServis: ActivityService,
  ) {}

  async findAll(): Promise<Dog[]> {
    const dogs = await this.dogRepository.find();
    if (dogs === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return dogs;
    }
  }

  async findOne(id: string): Promise<Dog> {
    try {
      const dog = await this.dogRepository.findOne({ where: { id } });
      if (dog === null) {
        throw new ErrorDoggienoteNotFound();
      } else {
        return dog;
      }
    } catch (error) {
      throw error;
    }
  }

  async createDog(dogData: Partial<Dog>): Promise<Dog> {
    const newDog = this.dogRepository.create(dogData);
    if (newDog === null) {
      throw new ErrorDoggienoteNotCreated();
    }
    return await this.dogRepository.save(newDog);
  }

  async removeDog(id: string) {
      const activity = await this.activityServis.findByIdDog(id);
      if (activity.length === 0) {
        await this.dogRepository.delete(id);
        if ('affected') {
          throw new ErrorDoggienoteNotFound();
        }
      } else {
        throw new ErrorDoggienote(
          'This dog has activity. It cannot be removed.',
          403,
          'dn_3',
        );
      }
  }

  async updateDog(id: string, dogData: Partial<Dog>): Promise<Dog> {
    const dogToUpdate = await this.dogRepository.findOneOrFail({
      where: { id },
    });
    if (dogToUpdate === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      const { name, ...rest } = dogData;
      const updatedDog = Object.assign({}, dogToUpdate, rest);
      return this.dogRepository.save(updatedDog);
    }
  }
}

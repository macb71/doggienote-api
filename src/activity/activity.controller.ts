import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.entity';

@Controller('activity')
export class ActivityController {
private readonly logger = new Logger();

  constructor(private readonly activityService: ActivityService) {}

 

  @Get('byDictActivity/:id_dict_activity')
  async findByIdDictActivity(@Param('id_dict_activity') id_dict_activity: string): Promise<Activity[]> {
    return await this.activityService.findByIdDictActivity(id_dict_activity);
  }

  @Get(':id')
  async findOne(@Param('id') id:string) {
    this.logger.log(id);
    return await this.activityService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Activity[]> {
    return await this.activityService.findAll();
  }

  @Get('byDog/:id_dog')
  async findByIdDog(@Param('id_dog') id_dog: string): Promise<Activity[]> {
    return await this.activityService.findByIdDog(id_dog);
  }

  @Post()
  async createActivity(
    @Body() activityData: Partial<Activity>,
  ): Promise<Activity> {
    return await this.activityService.createActivity(activityData);
  }

  @Delete(':id')
  async removeActivity(@Param('id') id: string) {
    return await this.activityService.removeActivity(id);
  }

  @Patch(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() activityData: Partial<Activity>,
  ): Promise<Activity> {
    const activity = await this.activityService.updateActivity(
      id,
      activityData,
    );
    return activity;
  }
}

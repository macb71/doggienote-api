import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DictActivityService } from './dict-activity.service';
import { DictActivity } from './dic-activity.entity';

@Controller('dict-activity')
export class DictActivityController {
  constructor(private readonly dictActivityService: DictActivityService) {}

  @Get()
  async findAll(): Promise<DictActivity[]> {
    return await this.dictActivityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DictActivity> {
    return await this.dictActivityService.findOne(id);
  }

  @Post()
  async createDictActivity(
    @Body() activityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    return await this.dictActivityService.createDictActivity(activityData);
  }

  @Patch(':id')
  async updateDictActivity(
    @Param('id') id: string,
    @Body() activityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    const dictActivity = await this.dictActivityService.updateActivity(
      id,
      activityData,
    );
    return dictActivity;
  }

  @Delete(':id')
  async deleteDictActivity(@Param('id') id: string) {
    return this.dictActivityService.deleteDictActivity(id);
  }
}

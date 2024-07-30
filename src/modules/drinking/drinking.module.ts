import GoogleCloudModule from '@/external/googlecloud/googlecloud.module';
import { DrinkingController } from '@/modules/drinking/drinking.controller';
import { DrinkingService } from '@/modules/drinking/drinking.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [GoogleCloudModule],
  controllers: [DrinkingController],
  providers: [DrinkingService],
})
export default class DrinkingModule {}

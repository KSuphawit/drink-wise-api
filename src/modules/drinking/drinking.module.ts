import GoogleCloudModule from '@/external/googlecloud/googlecloud.module';
import { DrinkingController } from '@/modules/drinking/controller/drinking.controller';
import { DrinkingService } from '@/modules/drinking/services/drinking.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [GoogleCloudModule],
  controllers: [DrinkingController],
  providers: [DrinkingService],
})
export default class DrinkingModule {}

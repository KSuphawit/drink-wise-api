import { MSSQLModule } from '@/providers/database/mssql.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MSSQLModule],
  exports: [MSSQLModule],
})
export default class InfrastructureModule {}

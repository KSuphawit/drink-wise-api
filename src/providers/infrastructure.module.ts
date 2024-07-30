import { MSSQLModule } from '@/providers/database/mssql.module';
import GlobalHttpModule from '@/providers/http/globalhttp.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MSSQLModule, GlobalHttpModule],
  exports: [MSSQLModule, GlobalHttpModule],
})
export default class InfrastructureModule {}

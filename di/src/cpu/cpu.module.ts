import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from '../power/power.module';

@Module({
  // Import to use services exported from PowerModule
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}

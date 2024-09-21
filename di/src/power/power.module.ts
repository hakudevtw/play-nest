import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  // Export PowerService to make it available to other modules
  exports: [PowerService],
})
export class PowerModule {}

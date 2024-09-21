import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class CpuService {
  constructor(private readonly powerService: PowerService) {}

  compute(a: number, b: number): number {
    console.log('Drawing 10W of power from the power supply');
    this.powerService.supplyPower(10);
    return a + b;
  }
}

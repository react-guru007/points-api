import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PointsService, PrismaService],
  controllers: [PointsController],
})
export class PointsModule {}

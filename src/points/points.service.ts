import { Injectable } from '@nestjs/common';
import { ApiKey, Point } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PointsService {
  constructor(private prisma: PrismaService) {}

  async distribute(
    event_name: string,
    address: string,
    points: number,
    campaign_id: string,
  ): Promise<Point> {
    return this.prisma.point.create({
      data: {
        event_name,
        address,
        points,
        campaign_id,
      },
    });
  }

  async getPoints(query: {
    address: string;
    campaign_id: string;
    event_name?: string;
  }): Promise<Point[]> {
    const { address, campaign_id, event_name } = query;
    return this.prisma.point.findMany({
      where: {
        address,
        event_name,
        campaign_id,
      },
    });
  }

  async authenticate(apiKey: string, campaign_id: string): Promise<boolean> {
    try {
      const apiRecord: ApiKey = await this.prisma.apiKey.findUnique({
        where: {
          campaign_id,
        },
      });

      if (!apiRecord || apiRecord.key !== apiKey) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}

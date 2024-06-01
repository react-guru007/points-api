// src/middleware/auth.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma/prisma.service';

export interface ICompaignAuthInfoRequest extends Request {
  campaign: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: ICompaignAuthInfoRequest, res: Response, next: NextFunction) {
    const apiKey = req.headers['api_key'];
    const campaignId = req.headers['campaign_id'];

    if (!apiKey || !campaignId) {
      throw new UnauthorizedException('API key and campaign ID are required');
    }

    const apiRecord = await this.prisma.apiKey.findUnique({
      where: {
        campaign_id: campaignId as string,
      },
    });

    if (!apiRecord || apiRecord.key !== apiKey) {
      throw new UnauthorizedException('Invalid API key or campaign ID');
    }
    req.campaign = apiRecord.id;

    next();
  }
}

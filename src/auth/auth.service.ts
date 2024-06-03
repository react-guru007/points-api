import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ApiKey } from '@prisma/client';
import { generateApiKey } from '../util/helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createApiKey(dto: CreateApiKeyDto): Promise<ApiKey> {
    if (!dto.campaign_id) {
      throw new BadRequestException('Campaign ID is required');
    }
    // Check if campaign_id already exists
    const existingCampaign = await this.prisma.apiKey.findUnique({
      where: {
        campaign_id: dto.campaign_id,
      },
    });

    if (existingCampaign) {
      throw new ConflictException('Campaign already exists');
    }

    const key = generateApiKey();
    return this.prisma.apiKey.create({
      data: {
        key,
        campaign_name: dto.campaign_name,
        campaign_id: dto.campaign_id,
      },
    });
  }
}

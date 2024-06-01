import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { isAddress } from 'web3-validator';
import { PointsService } from './points.service';
import { DistributePointsDto } from './dto/distribute-points.dto';
import { QueryPointsDto } from './dto/query-points.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post('distribute')
  async distribute(
    @Body() distributePointsDto: DistributePointsDto,
    @Request() req: Request,
  ) {
    const { event_name, address, points } = distributePointsDto;
    const campaign_id = req['campaign'];

    if (!address || !event_name || points === undefined) {
      throw new BadRequestException(
        'Event name, address, and points are required',
      );
    }

    if (!isAddress(address)) {
      throw new BadRequestException('Address is not a wallet address');
    }

    return this.pointsService.distribute(
      event_name,
      address.toLowerCase(),
      points,
      campaign_id,
    );
  }

  @Get()
  async getPoints(@Query() query: QueryPointsDto, @Request() req: Request) {
    const campaign_id = req['campaign'];

    if (!query.address) {
      throw new BadRequestException('Address is required');
    }

    if (!isAddress(query.address)) {
      throw new BadRequestException('Address is not a wallet address');
    }

    return this.pointsService.getPoints({ ...query, campaign_id });
  }
}

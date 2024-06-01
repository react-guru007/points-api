import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('api-key')
  async createApiKey(@Body() createApiKeyDto: CreateApiKeyDto) {
    return this.authService.createApiKey(createApiKeyDto);
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PointsModule } from './points/points.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, PointsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('points');
  }
}

import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [CommonModule, PrismaModule, NewsModule],
})
export class AppModule {}

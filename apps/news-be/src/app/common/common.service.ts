import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
type commonType = 'author' | 'category';
@Injectable()
export class CommonService {
  constructor(private prismaService: PrismaService) {}
  get(type: commonType, params?: any) {
    if (type == 'author') return this.prismaService.author.findMany();
    else if (type == 'category')
      return this, this.prismaService.category.findMany();
  }
  update(type: commonType, id: number, name: string) {
    const input = {
      data: {
        name,
      },
      where: {
        id,
      },
    };
    if (type == 'category') return this.prismaService.category.update(input);
    else if (type == 'author') return this.prismaService.author.update(input);
  }
  create(type: commonType, name: string) {
    const data = {
      data: {
        name: name,
      },
    };
    if (type == 'category') return this.prismaService.category.create(data);
    return this.prismaService.author.create(data);
  }
  async delete(type: commonType, id: number) {
    const cond = {
      where: {
        id,
      },
    };
    if (type == 'author') {
      if (!(await this.prismaService.author.findFirst(cond)))
        throw new NotFoundException();
      await this.prismaService.author.delete(cond);
    } else if (type == 'category') {
      if (!(await this.prismaService.category.findFirst(cond)))
        throw new NotFoundException();
      await this.prismaService.category.delete(cond);
    }
  }
}

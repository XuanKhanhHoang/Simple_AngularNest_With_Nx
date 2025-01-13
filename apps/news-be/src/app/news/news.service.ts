import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GetNewsParamsDTO } from './dto/GetNewsParams.dto';
import { CreateNewsDTO } from './dto/CreateNews.dto';
import { UpdateNewsDTO } from './dto/UpdateNews.dto';
import { CRUDServiceInterface } from '../share/service/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedAndSortResponse } from '../share/dto/PaginatedAndSortResponse.dto';

@Injectable()
export class NewsService implements CRUDServiceInterface {
  constructor(private prismaService: PrismaService) {}
  async gets(params: GetNewsParamsDTO): Promise<PaginatedAndSortResponse<any>> {
    const {
      author_name,
      create_at,
      id,
      title,
      sort_type,
      sort_by,
      author_id,
      category_id,
    } = params;
    const page = params.page - 1 || 0;
    const limit = params.limit || 6;
    const totalCount = await this.prismaService.news.count({
      where: {
        author: author_name ? { name: { contains: author_name } } : undefined,
        create_at,
        id,
        title,
        author_id,
        category_refs: category_id
          ? { every: { category_id: category_id } }
          : undefined,
      },
    });
    const res = await this.prismaService.news.findMany({
      select: {
        author: true,
        category_refs: {
          include: {
            category: true,
          },
        },
        content: true,
        create_at: true,
        id: true,
        title: true,
      },
      where: {
        author:
          author_name != undefined
            ? {
                name: {
                  contains: author_name,
                },
              }
            : undefined,
        create_at,
        id,
        title:
          title != undefined
            ? {
                contains: title,
              }
            : undefined,
        author_id,
        category_refs:
          category_id != undefined
            ? {
                every: {
                  category_id: category_id,
                },
              }
            : undefined,
      },
      skip: page * limit,
      take: limit,
      orderBy:
        sort_by != undefined
          ? {
              [sort_by]: sort_type || 'asc',
            }
          : undefined,
    });
    return {
      data: res,
      page: page + 1,
      total_page: Math.ceil(totalCount / limit),
    };
  }
  async get(id: number): Promise<any> {
    const res = await this.prismaService.news.findUnique({
      where: {
        id,
      },
      select: {
        author: true,
        category_refs: {
          include: {
            category: true,
          },
        },
        content: true,
        create_at: true,
        id: true,
        title: true,
      },
    });
    if (!res) throw new NotFoundException();
    return res;
  }
  async create(data: CreateNewsDTO): Promise<any> {
    const { title, content, author_id, category_ids, create_at } = data;
    try {
      return await this.prismaService.$transaction(
        async (service: PrismaService) => {
          const { id } = await service.news.create({
            data: {
              content,
              title,
              author_id,
              create_at: new Date(),
            },
            select: {
              id: true,
            },
          });
          await service.category_Ref.createMany({
            data: category_ids.map((item) => ({
              category_id: item,
              product_id: id,
            })),
          });
          return {
            id,
            message: 'Created success fully',
          };
        }
      );
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
  async update(data: UpdateNewsDTO): Promise<any> {
    const { author_id, category_ids, content, create_at, id, title } =
      data as UpdateNewsDTO;
    try {
      return await this.prismaService.$transaction(
        async (service: PrismaService) => {
          await service.news.update({
            data: {
              content,
              title,
              author_id,
              create_at: new Date(),
            },
            where: {
              id,
            },
          });
          if (category_ids != undefined) {
            await service.category_Ref.deleteMany({
              where: {
                product_id: id,
              },
            });
            await service.category_Ref.createMany({
              data: category_ids.map((item) => ({
                category_id: item,
                product_id: id,
              })),
            });
          }
          return {
            id,
            message: 'update success fully',
          };
        }
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
  async delete(id: number): Promise<void> {
    const cond = {
      where: {
        id,
      },
    };
    if (!(await this.prismaService.news.findFirst(cond)))
      throw new NotFoundException();
    await this.prismaService.news.delete(cond);
  }
}

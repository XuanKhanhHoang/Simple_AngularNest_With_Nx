import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { IdAndNameDTO } from './dto/IdAndNameDTO.dto';

@Controller('common')
export class CommonController {
  constructor(private service: CommonService) {}

  @Get('get_categories')
  getCategories() {
    return this.service.get('category');
  }
  @Post('create_category')
  addCategory(@Body('name') categoryName: string) {
    if (!categoryName || categoryName.trim().length == 0)
      throw new BadRequestException();
    return this.service.create('category', categoryName);
  }
  @Put('update_category')
  @HttpCode(200)
  updateCategory(@Body() body: IdAndNameDTO) {
    const { id, name } = body;
    return this.service.update('category', id, name);
  }
  @Delete('delete_category')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCategory(@Query('id', new ParseIntPipe()) id: number) {
    return this.service.delete('category', id);
  }
  @Get('get_authors')
  getAuthors() {
    return this.service.get('author');
  }
  @Post('create_author')
  createAuthor(@Body('name') name: string) {
    if (!name || name.trim().length == 0) throw new BadRequestException();
    return this.service.create('author', name);
  }
  @Put('update_author')
  @HttpCode(200)
  updateAuthor(@Body() body: IdAndNameDTO) {
    const { id, name } = body;
    return this.service.update('author', id, name);
  }
  @Delete('delete_category')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAuthor(@Query('id', new ParseIntPipe()) id: number) {
    return this.service.delete('author', id);
  }
}

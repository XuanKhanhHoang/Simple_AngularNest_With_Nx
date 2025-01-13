import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CRUDServiceInterface } from '../service/crud.service';
import { PaginatedAndSortParams } from '../dto/PaginatedAndSortParams.dto';

//*Need @Controller
export class CRUDController<T extends PaginatedAndSortParams, C, U> {
  constructor(protected service: CRUDServiceInterface) {}

  @Get('gets')
  gets(@Query() params: T) {
    return this.service.gets(params);
  }
  @Get('get')
  get(@Query('id', new ParseIntPipe()) id: number) {
    return this.service.get(id);
  }
  @Post('create')
  create(@Body() body: C) {
    return this.service.create(body);
  }
  @Put('update')
  update<U extends { id: number }>(@Body() body: U) {
    return this.service.update(body);
  }
  @Delete('delete')
  delete(@Query('id', new ParseIntPipe()) id: number) {
    return this.service.delete(id);
  }
}

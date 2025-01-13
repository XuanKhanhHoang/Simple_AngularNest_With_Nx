import {
  Body,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Type,
  UsePipes,
} from '@nestjs/common';
import { AbstractValidationPipe } from '../pipes/CustomValidationPipe.pipe';
import { PaginatedAndSortParams } from '../dto/PaginatedAndSortParams.dto';
import { CRUDServiceInterface } from '../service/crud.service';

export function CRUDControllerFactory<
  C,
  U extends { id: number },
  T extends PaginatedAndSortParams
>(createDto: Type<C>, updateDto: Type<U>, queryDto: Type<T>): any {
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createDto }
  );
  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateDto }
  );
  const queryPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { query: queryDto }
  );

  class CRUDController<T, C, U> {
    constructor(protected service: CRUDServiceInterface) {}

    @Get('gets')
    @UsePipes(queryPipe)
    gets(@Query() params: T) {
      return this.service.gets(params);
    }
    @Get('get')
    get(@Query('id', new ParseIntPipe()) id: number) {
      return this.service.get(id);
    }
    @Post('create')
    @UsePipes(createPipe)
    create(@Body() body: C) {
      return this.service.create(body);
    }
    @Put('update')
    @UsePipes(updatePipe)
    update(@Body() body: U) {
      return this.service.update(body as { id: number } & Partial<any>);
    }
    @Delete('delete')
    delete(@Query('id', new ParseIntPipe()) id: number) {
      return this.service.delete(id);
    }
  }

  return CRUDController;
}

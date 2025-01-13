import { Controller } from '@nestjs/common';
import { NewsService } from './news.service';
import { GetNewsParamsDTO } from './dto/GetNewsParams.dto';
import { CreateNewsDTO } from './dto/CreateNews.dto';
import { UpdateNewsDTO } from './dto/UpdateNews.dto';
import { CRUDControllerFactory } from '../share/controller/ControllerFactory';

@Controller('news')
export class NewsController extends CRUDControllerFactory<
  CreateNewsDTO,
  UpdateNewsDTO,
  GetNewsParamsDTO
>(CreateNewsDTO, UpdateNewsDTO, GetNewsParamsDTO) {
  constructor(service: NewsService) {
    super(service);
  }
}

import { Injectable } from '@angular/core';
import { GetNewsParams } from './params.dto';
import {
  CreateNewDTO,
  NameAndIdObject,
  PaginatedAndSortResponse,
  UpdateNewsDTO,
} from '../dto/dto';
import { News } from '../../news_management/dto/GetNewsResponse.dto';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor() {}
  private serverHref = 'http://localhost:8081/';
  async getNewsList(params?: GetNewsParams) {
    let url = this.serverHref + 'news/gets' + '?';
    const pr = new URLSearchParams();
    for (const key in params) {
      if (params[key as keyof GetNewsParams]) {
        pr.append(key, params[key as keyof GetNewsParams] as string);
      }
    }
    console.log(params);
    try {
      let res: PaginatedAndSortResponse<News> = await fetch(
        url + pr.toString()
      ).then((r) => r.json());
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async getNews(id: number): Promise<News | null> {
    let url = this.serverHref + 'news/get' + '?id=' + id;
    try {
      let res: News = await fetch(url).then((r) => r.json());
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteNews(id: number) {
    try {
      let res = await fetch(this.serverHref + 'news/delete?id=' + id, {
        method: 'DELETE',
      });
      if (res.ok) return true;
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async getAuthors() {
    let url = this.serverHref + 'common/get_authors';
    try {
      let res: NameAndIdObject[] = await fetch(url).then((r) => r.json());
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async getCategories() {
    let url = this.serverHref + 'common/get_categories';
    try {
      let res: NameAndIdObject[] = await fetch(url).then((r) => r.json());
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async updateNews(body: UpdateNewsDTO) {
    let url = this.serverHref + 'news/update';
    try {
      let res: any = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify({
          ...body,
          create_at: encodeURI(new Date().toDateString()),
        }),
      })
        .then((r) => r.json())
        .catch((e) => null);

      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async createNews(body: CreateNewDTO) {
    let url = this.serverHref + 'news/create';
    try {
      let res: any = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify({
          ...body,
          create_at: encodeURI(new Date().toDateString()),
        }),
      })
        .then((r) => r.json())
        .catch((e) => null);

      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

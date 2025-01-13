import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../share/http_service/http_service.service';
import { News } from '../news_management/dto/GetNewsResponse.dto';
import { ToastService } from 'angular-toastify';
import { NgFor } from '@angular/common';
import { formatDate } from '../share/utils/formatDate';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-news-detail',
  imports: [NgFor, QuillModule],
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer
  ) {}
  news: News | undefined;
  safeContent: SafeHtml = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(async ({ params }: any) => {
      const id: string | null = params.id;
      if (id) {
        const idN = Number(id);
        if (isNaN(idN)) {
          this.router.navigate(['/']);
          return;
        }
        await this.loadItemData(idN);
        return;
      }
      this.router.navigate(['/news/1']);
    });
  }
  async loadItemData(idN: number) {
    const res = await this.httpService.getNews(idN);
    if (res == null) return this.toastService.error('Có lỗi xảy ra');
    this.news = res;
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
      this.news.content
    );
    this.news.create_at = formatDate(new Date(this.news.create_at));
  }
}

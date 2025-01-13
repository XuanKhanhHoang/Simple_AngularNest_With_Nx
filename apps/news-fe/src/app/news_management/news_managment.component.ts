import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PaginatedAndSortResponse } from '../share/dto/dto';
import { News } from './dto/GetNewsResponse.dto';
import { HttpService } from '../share/http_service/http_service.service';
import { NgFor, NgIf } from '@angular/common';
import { formatDate } from '../share/utils/formatDate';
import { WarningModalComponent } from '../share/warning_modal/warning_modal.component';
import { ToastService } from 'angular-toastify';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { GetNewsParams } from '../share/http_service/params.dto';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'news_management',
  imports: [
    WarningModalComponent,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
  ],
  templateUrl: './news_management.component.html',
})
export class NewsManagementComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isLoading = true;
  isError = false;
  news: News[] = [];
  page = 1;
  total_page = 1;
  choosingId = -1;
  searchCol: 'id' | 'title' | 'author_name' = 'id';
  searchControl: FormControl = new FormControl();

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe(({ params }: any) => {
      const id: string | null = params.page;
      if (id) {
        const idN = Number(id);
        if (isNaN(idN)) {
          this.router.navigate(['/']);
          return;
        }
        this.page = idN;
        return;
      }
      this.page = 1;
    });
    await this.getData();

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.getData(value);
      });
  }
  changeSearchCol(event: any) {
    const newValue = event.target.value;
    this.searchCol = newValue as any;
  }
  async getData(value?: string) {
    let params: GetNewsParams | undefined;
    if (value != undefined) params = { [this.searchCol]: value };
    await this.httpService
      .getNewsList({ ...params, page: this.page })
      .then((res) => {
        if (!res) {
          this.isError = true;
          return;
        }
        this.news = res.data;
        this.total_page = res.total_page;
      });
    this.isLoading = false;
  }
  formatDateForView(date: string, condition: string): string {
    return formatDate(new Date(date), condition);
  }
  async handleDelete() {
    const res = await this.httpService.deleteNews(this.choosingId);
    if (res) this.toastService.success('Xóa thành công');
    else this.toastService.error('Có lỗi xảy ra');

    this.handleModal(-1);
    await this.getData();
  }
  handleModal(id: number) {
    this.choosingId = this.choosingId != -1 ? -1 : id;
  }
  async warningModalReturn(isAccept: boolean) {
    if (isAccept) return await this.handleDelete();
    this.handleModal(-1);
  }
  async onPageChange(newPage: number) {
    this.page = newPage;
    this.router.navigate(['/'], { queryParams: { page: newPage } });
    await this.getData();
  }
}

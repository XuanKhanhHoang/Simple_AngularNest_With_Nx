import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../share/http_service/http_service.service';
import { ToastService } from 'angular-toastify';
import { News } from '../news_management/dto/GetNewsResponse.dto';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CreateNewDTO, NameAndIdObject } from '../share/dto/dto';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-create-update-news',
  imports: [
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgFor,
  ],
  templateUrl: './create-update-news.component.html',
})
export class CreateUpdateNewsComponent implements OnInit {
  async handleSubmit() {
    if (this.isLoading) return this.toastService.warn('Vui lòng chờ');
    if (!this.myForm.valid)
      return this.toastService.error('Vui lòng nhập đủ dữ liệu');
    this.isLoading = true;
    const data = {
      author_id: this.myForm.get('author_id')!.value,
      category_ids: this.myForm.get('category_ids')!.value,
      content: this.myForm.get('editor')!.value,
      title: this.myForm.get('title')!.value,
    };
    if (this.isEditMode) await this.handleUpdate(data);
    else await this.handleCreate(data);
    this.isLoading = false;
  }
  async handleUpdate(data: CreateNewDTO) {
    const res = await this.httpService.updateNews({
      ...data,
      id: this.idN,
    });
    if (res != null) {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 600);
      return this.toastService.success('Tạo dữ liệu thành công');
    }
    return this.toastService.error('Có lỗi xảy ra.');
  }
  async handleCreate(data: CreateNewDTO) {
    const res = await this.httpService.createNews(data);
    if (res != null) {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 600);
      return this.toastService.success('Tạo dữ liệu thành công');
    }
    return this.toastService.error('Có lỗi xảy ra.');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      editor: new FormControl('', [Validators.required]),
      author_id: new FormControl(-1, [Validators.required]),
      title: new FormControl('', [Validators.required]),
      category_ids: new FormControl([], [Validators.required]),
    });
  }
  isEditMode = false;
  isLoading = true;
  news: News | undefined;
  myForm!: FormGroup;
  categories: NameAndIdObject[] = [];
  authors: NameAndIdObject[] = [];
  idN = -1;
  async ngOnInit(): Promise<void> {
    const url: string = this.route.snapshot.url
      .map((segment: { path: string }) => segment.path)
      .join('/');
    [this.categories, this.authors] = await Promise.all([
      this.httpService.getCategories().then((res) => (res != null ? res : [])),
      this.httpService.getAuthors().then((res) => (res != null ? res : [])),
    ]);
    if (url.includes('update')) {
      this.isEditMode = true;
      this.route.paramMap.subscribe(async ({ params }: any) => {
        const id: string | null = params.id;
        if (id) {
          this.idN = Number(id);
          if (isNaN(this.idN)) {
            this.router.navigate(['/']);
            return;
          }
          await this.loadItemData(this.idN);

          this.isLoading = false;
          return;
        }
        this.router.navigate(['/news/create']);
      });
    } else {
      this.isEditMode = false;
      this.isLoading = false;
    }
  }
  async loadItemData(id: number) {
    const res = await this.httpService.getNews(id);
    if (res == null) return this.toastService.error('Có lỗi khi tải dữ liệu');
    this.news = res;

    this.myForm = this.fb.group({
      editor: new FormControl(this.news?.content || '', [Validators.required]),
      author_id: new FormControl(this.news.author.id, [Validators.required]),
      title: new FormControl(this.news.title, [Validators.required]),
      category_ids: new FormControl(
        this.news.category_refs.map((item) => item.category_id),
        [Validators.required]
      ),
    });
  }
}

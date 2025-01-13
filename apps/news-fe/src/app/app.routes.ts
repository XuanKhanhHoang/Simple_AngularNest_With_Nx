import { Routes } from '@angular/router';
import { NewsManagementComponent } from './news_management/news_managment.component';
import { CreateUpdateNewsComponent } from './create-update-news/create-update-news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: NewsManagementComponent,
  },
  {
    path: 'news/create',
    component: CreateUpdateNewsComponent,
  },
  {
    path: 'news/update/:id',
    component: CreateUpdateNewsComponent,
  },
  {
    path: 'news/:id',
    component: NewsDetailComponent,
  },
];

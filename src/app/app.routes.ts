import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SentenceCasePageComponent } from './sentence-case-page/sentence-case-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'format-text',
    pathMatch: 'full',
    component: SentenceCasePageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

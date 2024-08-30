import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Route } from './router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  routes = signal<Route[]>([]);
  url = signal<string>('');

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe((event) => {
        let url = event.url;

        url = url.slice(0, url.indexOf('?')); // remove query params
        const paths = url.split('/').filter((route) => route !== '');

        const routes = paths.map((path, i) => {
          return {
            path: '/' + paths.slice(0, i + 1).join('/'),
            route: path,
          };
        });

        this.url.set(url);
        this.routes.set(routes);
      });
  }
}

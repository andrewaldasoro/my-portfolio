import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { ChangeColorService } from './change-color.service';
import { BACKGROUND_COLOR, COLOR } from './constants';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsButtonComponent } from './settings-button/settings-button.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent, SettingsButtonComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  @HostListener('document:mousemove', ['$event']) handleMouseMove(
    event: MouseEvent
  ) {
    const x = event.clientX;
    const y = event.clientY;

    gsap.to('#cursor', {
      x: x - 16,
      y: y - 16,
      ease: 'power3',
    });
  }

  @HostListener('document:mouseleave', ['$event']) handleMouseLeave(
    event: MouseEvent
  ) {
    gsap.to('#cursor', {
      scale: 0,
      duration: 0.1,
      ease: 'none',
    });
  }

  @HostListener('document:mouseenter', ['$event']) handleMouseEnter(
    event: MouseEvent
  ) {
    const cursor = document.getElementById('cursor') as HTMLDivElement | null;
    if (cursor && cursor.style.display === '') {
      cursor.style.display = 'block';
    }

    gsap.to('#cursor', {
      scale: 1,
      duration: 0.1,
      ease: 'none',
    });
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeColorService: ChangeColorService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.addCursorAttributesAndEvents();

      this.setTheme();
    }
  }

  private addCursorAttributesAndEvents() {
    const pointerElementTags = ['a', 'button'];

    for (const elementTag of pointerElementTags) {
      for (const element of document.getElementsByTagName(elementTag)) {
        element.setAttribute('data-cursor', 'pointer');
      }
    }

    gsap.set('#cursor', { force3D: true });

    const textContainers = document.querySelectorAll('[data-cursor="text"]');

    textContainers.forEach((container) => {
      container.addEventListener('mouseenter', () => {
        // console.log(container.clientHeight);
        gsap.to('#cursor', {
          borderRadius: 0,
          width: '10px',
          height: container.clientHeight * 0.95,
          scale: 0.6,
          duration: 0.2,
        });
      });

      container.addEventListener('mouseleave', () => {
        gsap.to('#cursor', {
          borderRadius: '50%',
          width: '32px', // this must match with the style sheet #cursor
          height: '32px', // this must match with the style sheet #cursor
          scale: 1,
          duration: 0.2,
        });
      });
    });

    const pointerContainers = document.querySelectorAll(
      '[data-cursor="pointer"]'
    );

    pointerContainers.forEach((container) => {
      container.addEventListener('mouseenter', () => {
        gsap.to('#cursor', {
          scale: 0.5,
          duration: 0.2,
        });
      });

      container.addEventListener('mouseleave', () => {
        gsap.to('#cursor', {
          scale: 1,
          duration: 0.2,
        });
      });
    });
  }

  private setTheme() {
    const backgroundColor = localStorage.getItem(BACKGROUND_COLOR);
    const color = localStorage.getItem(COLOR);

    if (backgroundColor && color) {
      this.changeColorService.changeColor(backgroundColor, color);
    } else {
      this.changeColorService.changeColor('#f5ce4d', '#000000');
    }
  }
}

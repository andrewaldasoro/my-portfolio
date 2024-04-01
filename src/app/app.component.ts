import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @HostListener('document:mousemove', ['$event']) handleMouseMove(
    event: MouseEvent,
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
    event: MouseEvent,
  ) {
    gsap.to('#cursor', {
      scale: 0,
      duration: 0.1,
      ease: 'none',
    });
  }

  @HostListener('document:mouseenter', ['$event']) handleMouseEnter(
    event: MouseEvent,
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      for (const anchor of document.getElementsByTagName('a')) {
        anchor.setAttribute('data-cursor', 'pointer');
      }

      gsap.set('#cursor', { force3D: true });

      const textContainers = document.querySelectorAll('[data-cursor="text"]');

      textContainers.forEach((container) => {
        container.addEventListener('mouseenter', () => {
          gsap.to('#cursor', {
            borderRadius: 0,
            width: '10px',
            scale: 0.6,
            duration: 0.2,
          });
        });

        container.addEventListener('mouseleave', () => {
          gsap.to('#cursor', {
            borderRadius: '50%',
            width: '32px',
            scale: 1,
            duration: 0.2,
          });
        });
      });

      const pointerContainers = document.querySelectorAll(
        '[data-cursor="pointer"]',
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
  }
}

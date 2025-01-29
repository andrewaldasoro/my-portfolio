import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { convertString, SentenceCase } from '../../sentence-case';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sentence-case-page.component.html',
  styleUrl: './sentence-case-page.component.scss',
})
export class SentenceCasePageComponent {
  formats = Object.values(SentenceCase);
  selectedFormat: SentenceCase;
  translate = '';
  translated = '';

  constructor() {
    this.selectedFormat = this.formats[0];
  }

  onFormatChange(event: Event): void {
    const format = (event.target as HTMLSelectElement).value as SentenceCase;
    this.selectedFormat = format;
    this.onTranslate();
  }

  onTranslateChange(s: string): void {
    this.translate = s;
    this.onTranslate();
  }

  onTranslate() {
    if (this.translate === '') {
      this.translated = '';
      return;
    }

    this.translated = convertString(this.translate, this.selectedFormat);
  }
}

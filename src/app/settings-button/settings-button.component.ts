import { Component, ViewChild } from '@angular/core';
import { ChangeColorButtonComponent } from '../change-color-button/change-color-button.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [DialogComponent, ChangeColorButtonComponent],
  templateUrl: './settings-button.component.html',
  styleUrl: './settings-button.component.scss',
})
export class SettingsButtonComponent {
  @ViewChild(DialogComponent) dialog!: DialogComponent;
}

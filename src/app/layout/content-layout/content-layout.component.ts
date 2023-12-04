import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, SideNavComponent, RouterModule]
})
export class ContentLayoutComponent {

}

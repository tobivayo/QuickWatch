import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SideNavService } from '../services/side-nav.service';
import { GlobalStoreService } from 'src/app/core/store/global-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SideNavComponent {
  @Input() optionsList: string[] = [];
  @Output() toggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public store$ = this.storeService.state$;

  public isSidenavExpanded: boolean = false;
  public navWidth: string = '72px';

  constructor(
    private sidenavService: SideNavService,
    public storeService: GlobalStoreService,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    if (this.storeService.currentStateValue.isSidenavFixed) {
      this.isSidenavExpanded = true;
      this.changeSidenavWidth('oninit');
    }
  }

  public onToggleClick() {
    this.changeSidenavWidth('toggle');
    this.storeService.updateIsSideNavFixedState(
      !this.storeService.currentStateValue.isSidenavFixed
    );
  }

  public changeSidenavWidth(from: string) {
    if (this.storeService.currentStateValue.isSidenavFixed && from == 'mouse') {
      return;
    }
    this.navWidth = this.sidenavService.changeSidenavWidth(
      from,
      this.isSidenavExpanded,
      this.storeService.currentStateValue.isSidenavFixed
    );
    if (!this.isSidenavExpanded) {
      this.isSidenavExpanded = true;
    } else if (this.isSidenavExpanded && from == 'mouse') {
      this.isSidenavExpanded = false;
    }
  }
}

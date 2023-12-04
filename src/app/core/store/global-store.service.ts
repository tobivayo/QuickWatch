import { Injectable } from '@angular/core';
import { Store } from '../base/store';
import { GlobalStoreState } from './global-store.state';

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService extends Store<any>{

  constructor() {
    super(GlobalStoreState);
  }

  updateIsSideNavFixedState(newState: boolean) {
    this.setState({
      ...this.currentStateValue,
      isSidenavFixed: newState,
    });
  }

  updateHeaderPageTitleState(newTitle: string) {
    this.setState({
      ...this.currentStateValue,
      headerPageTitle: newTitle
    });
  }
}

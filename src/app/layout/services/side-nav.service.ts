import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  constructor(private http: HttpClient) { }

  public changeSidenavWidth(
    from: string,
    isSidenavExpanded: boolean,
    isSidenavFixed: boolean
  ): string {
    if (isSidenavFixed) {
      return '240px';
    } else if (!isSidenavExpanded && from === 'mouse') {
      return '240px';
    } else if (isSidenavExpanded && from === 'mouse' && !isSidenavFixed) {
      return '72px';
    }
    return '240px';
  }
}

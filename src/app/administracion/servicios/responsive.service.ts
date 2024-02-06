import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private screenSize$ = new Subject<string>();

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 576) {
      this.screenSize$.next('xs');
    } else if (screenWidth < 768) {
      this.screenSize$.next('sm');
    } else if (screenWidth < 992) {
      this.screenSize$.next('md');
    } else if (screenWidth < 1200) {
      this.screenSize$.next('lg');
    } else {
      this.screenSize$.next('xl');
    }
  }

  getScreenSize(): Subject<string> {
    return this.screenSize$;
  }
}

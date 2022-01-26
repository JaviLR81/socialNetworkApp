import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SimilarState } from '../../interfaces/similar-state.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  @Output() onEnter  : EventEmitter<SimilarState[]> = new EventEmitter();
  @Output() onSearch : EventEmitter<string> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  search(): void{
    // console.log(this.txtSearch);
    const value = this.txtSearch.nativeElement.value;

    if(value.trim().length == 0){
      return;
    }

    // Register new state in the action service for example
    console.log("~ value", value);

    this.dashboardService.getSimilarStates()
      .subscribe({
        next: (resp) => {
          this.onEnter.emit(resp);
          this.onSearch.emit(value);
        },
        error: (error) => {
          console.log("Ha ocurrido un error en la llamada http");
          console.log(error);
        }
      });
  }

  setSearchToService(){
    const value = this.txtSearch.nativeElement.value;
    this.dashboardService.lastSearchFromHeader = value;
  }

}

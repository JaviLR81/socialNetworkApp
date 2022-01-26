import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SimilarState } from '../../interfaces/similar-state.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('txtPublishState') txtPS!: ElementRef<HTMLInputElement>;
  similarStates!: SimilarState[];

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

  publishState(): void{
    // console.log(this.txtPS);
    const value = this.txtPS.nativeElement.value;

    if(value.trim().length == 0){
      return;
    }

    // Register new state in the action service for example
    console.log("~ value", value);

    this.dashboardService.getSimilarStates()
      .subscribe({
        next: (resp) => {
          this.similarStates = resp;
        },
        error: (error) => {
          console.log("Ha ocurrido un error en la llamada http");
          console.log(error);
        }
      });
  }

}

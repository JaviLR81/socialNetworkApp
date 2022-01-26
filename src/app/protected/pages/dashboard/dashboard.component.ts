import { Component, OnInit } from '@angular/core';
import { SimilarState } from '../../interfaces/similar-state.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  fieldToSearch: string = '';
  newState!: SimilarState;

  ngOnInit(): void {
  }

  saveNewState(){

    if(this.fieldToSearch.trim().length == 0){
      console.log('El campo esta vacio');
      return;
    }

    this.newState = {
      id: 1,
      title: this.fieldToSearch,
      userId: 100
    };

    this.dashboardService.saveState(this.newState)
      .subscribe( resp => {
        console.log("~ resp", resp)
        alert('New state correctly saved');
      });

    // Clean the previos values in the object
    // this.newState = undefined;
    this.newState = {
      id: 0,
      title: '',
      userId: 0
    };
  }

}

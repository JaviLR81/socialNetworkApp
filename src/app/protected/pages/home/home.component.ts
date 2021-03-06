import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SimilarState } from '../../interfaces/similar-state.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  similarStates!: SimilarState[];
  lastSearch: string = '';

  profileName: string = 'Javier Lozano';

  constructor(
    private authService: AuthService
  ){ }

  get user(){
    return this.authService.user;
  }

  ngOnInit(): void {
  }

  search(similarStates: SimilarState[]){
    this.similarStates = similarStates;
  }

  lastlySearch(lastSearch: string){
    this.lastSearch = lastSearch;
  }


}

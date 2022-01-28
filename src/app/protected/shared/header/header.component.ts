import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SimilarState } from '../../interfaces/similar-state.interface';
import { DashboardService } from '../../services/dashboard.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.css'],
  styles: [
    `
    `
  ]
})
export class HeaderComponent implements OnInit {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  @Output() onEnter  : EventEmitter<SimilarState[]> = new EventEmitter();
  @Output() onSearch : EventEmitter<string> = new EventEmitter();

  color: string = 'btn btn-primary';

  // Modal
  closeResult = '';

  myReasonsForm: FormGroup = this.fb.group({
    language: ['',[Validators.required,Validators.minLength(6)]],
    reason  : ['',[Validators.required]],
    reasons : this.fb.array([
      ['Component Combination', Validators.required],
      ['Good practices', Validators.required],
    ])
  });

  newReason: FormControl = this.fb.control('', Validators.required );

  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService,
    private modalService: NgbModal,
    private fb: FormBuilder
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

  // Modal Form
  openHobbiesModal(content: any): void{
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  get reasonsArr(){
      return this.myReasonsForm.get('reasons') as FormArray;
  }

  validField(field: string){
    return this.myReasonsForm.controls[field].errors
            && this.myReasonsForm.controls[field].touched;
  }

  getErrorMessage(field: string): string{
    const errors = this.myReasonsForm.controls[field].errors;

    if(errors?.['required']){
      return 'The field is required';
    }else  if(errors?.['minlength']){
      return 'The min leght is not valid';
    }else{
      return 'The field is invalid';
    }
  }

  addReason() {
    // if ( this.newReason.invalid ) { return; }
    // Another form to do it
    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    this.reasonsArr.push( this.fb.control(this.newReason.value, Validators.required));
    this.newReason.reset();
  }

  saveReasons(): void{
    if(this.myReasonsForm.invalid){
      console.log('The reasons form is invalid');
      this.myReasonsForm.markAllAsTouched();
      return;
    }

    console.log('Wupi is valid');
    console.log(this.myReasonsForm.value);
  }

  deleteReason(i: number): void{
    this.reasonsArr.removeAt(i);
  }

  changeColor(color: string){
    if(color == 'red'){
      this.color = 'btn btn-success';
    }else{
      this.color = 'btn btn-primary';
    }
  }



}

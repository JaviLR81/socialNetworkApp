import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    userName: ['Javie',[Validators.required, Validators.minLength(3)]],
    password: ['123456',[Validators.required]]
  });

  constructor(
      private fb:FormBuilder,
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  // Cuando no valido devuelve false, cuando valido devuelve NULL
  isValidField( campo: string ) {
    return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
  }


  getErrorsDescription(campo: string): string {
    // const errors = this.miFormulario.get(campo)?.errors;
    const errors = this.miFormulario.controls[campo].errors;

    if ( errors?.['required'] ) {
      return 'El campo es obligatorio';
    }
    else if(errors?.['minlength']){
      return 'El campo no cumple el minLength';
    }
    else if ( errors?.['pattern'] ) {
      return 'El valor ingresado no cumple la expresión regular';
    }
    return '';
  }

  login(): void{

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    const { userName , password } = this.miFormulario.value;

    // Making the request to the service
    this.authService.login(userName,password)
        .subscribe( resp => {
            if(resp == true){
              // Then redirect to the main panel
              this.router.navigateByUrl('/home/dashboard');
            }else{
              // Show alert error messages
              alert("Ha ocurrido un error las credenciales no son correctas");
            }
        });
  }

}

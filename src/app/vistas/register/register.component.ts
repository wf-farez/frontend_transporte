import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../service/auth/login.service';
import { LoginRequest } from '../../service/auth/loginRequest';
import { RegisterRequest } from '../../service/auth/registerRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerError:string="";

  registerForm=this.formBuilder.group({
    username:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    name: ['',Validators.required],
  })

  constructor(private formBuilder:FormBuilder,
    private messageService: MessageService,
     private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }


register() {
  if (this.registerForm.valid) {
    this.loginService.registrarse(this.registerForm.value as RegisterRequest).subscribe({
      next: (userData) => {
        console.log(userData);

      },
      error: (errorData) => {
        console.error(errorData);
        this.registerError = errorData.message || 'Error en el registro. Por favor intente nuevamente.';
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro exitoso' });

        console.info("Registro completo");
        this.registerForm.reset();
      }
    });
  } else {
    this.registerForm.markAllAsTouched();
    this.registerError = "Por favor, complete todos los campos correctamente.";
  }
}


regresarlogin(){
  this.router.navigateByUrl('/login');
}


   cancelar(){
    
    this.registerForm.reset();
  }
}

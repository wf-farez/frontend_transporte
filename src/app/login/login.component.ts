import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    usuario: ["", Validators.required],
    contraseña: ["", Validators.required],
  });

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ingresar() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.value.usuario;
      const contraseña = this.loginForm.value.contraseña;
      
      // Verifica las credenciales (aquí puedes agregar tu lógica de autenticación)
      if (usuario === 'root' && contraseña === 'root') {
        // Las credenciales son válidas, puedes permitir el acceso al usuario
        this.messageService.add({severity:'success', summary:'Success', detail:'Logged in successfully'});
       console.log(usuario,contraseña,"ingreso exitoso");
       
       this.router.navigate(['/dashboard']);

      } else {
        // Las credenciales son inválidas, muestra un mensaje de error
        this.messageService.add({severity:'error', summary:'Error', detail:'Invalid credentials'});
        console.log("credenciales incorrectas");
      }
    } else {
      // El formulario no es válido, muestra un mensaje de error
      this.messageService.add({severity:'error', summary:'Error', detail:'Please fill in all fields'});
    }
  }
}

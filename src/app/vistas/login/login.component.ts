import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../service/auth/login.service';
import { LoginRequest } from '../../service/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginError:string="";

  loginForm=this.formBuilder.group({
    username:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }


   cancelar(){
    this.loginForm.reset();
  }
}


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators} from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginService } from '../service/auth/login.service';
// import { LoginRequest } from '../service/auth/loginRequest';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginError:string="";
//   loginForm=this.formBuilder.group({
//     username:['',[Validators.required,Validators.email]],
//     password: ['',Validators.required],
//   })
//   constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

//   ngOnInit(): void {
//   }

//   get email(){
//     return this.loginForm.controls.username;
//   }

//   get password()
//   {
//     return this.loginForm.controls.password;
//   }

//   login(){
//     if(this.loginForm.valid){
//       this.loginError="";
//       this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
//         next: (userData) => {
//           console.log(userData);
//         },
//         error: (errorData) => {
//           console.error(errorData);
//           this.loginError=errorData;
//         },
//         complete: () => {
//           console.info("Login completo");
//           this.router.navigateByUrl('/dashboard');
//           this.loginForm.reset();
//         }
//       })

//     }
//     else{
//       this.loginForm.markAllAsTouched();
//       alert("Error al ingresar los datos.");
//     }
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  acno = ""

  pswd = ""


  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })





  constructor(private routerLogin: Router, private ds: DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  accnoChange(event: any) {
    this.acno = event.target.value
    console.log(this.acno);

  }
  pswdChange(event: any) {
    this.pswd = event.target.value
    console.log(this.pswd);
  }

  login() {

    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    

      if(this.loginForm.valid){
        let result=this.ds.login(acno,pswd)
        if(result){
          alert("login success")
          this.routerLogin.navigateByUrl('home')
        }
        
        }
        else{
          alert("form invalid")
          
      }
    
    

  }

}

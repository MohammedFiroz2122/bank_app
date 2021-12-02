import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  


  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amt:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  withdrawForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amt:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  user=this.ds.currentUsername

  constructor(private ds:DataService,private routerLogin:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  deposit(){
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amt=this.depositForm.value.amt

    let result=this.ds.deposit(acno,pswd,amt)
    if(result){
      alert(`${amt} credited successfully...Your current Balance is ${result}`)
      this.routerLogin.navigateByUrl('home')
    }
    else{
      alert("Something Went Wrong")
      this.routerLogin.navigateByUrl('home')
    }
    
  }

  withdraw(){
    var acno=this.withdrawForm.value.acno
    var pswd=this.withdrawForm.value.pswd
    var amt=this.withdrawForm.value.amt

    let result=this.ds.withdraw(acno,pswd,amt)
    if(result){
      alert(`${amt} debited successfully...Your current Balance is ${result}`)
      this.routerLogin.navigateByUrl('home')
    }
    else{
      alert("Something Went Wrong")
      this.routerLogin.navigateByUrl('home')
    }
  }
}

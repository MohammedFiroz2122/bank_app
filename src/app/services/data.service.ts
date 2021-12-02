import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUsername=""
  currentAcno=""
  data:any={
    1000:{acno:1000,password:"123",uname:"Aadhu",balance:5000,transaction:[]},
    1001:{acno:1001,password:"123",uname:"Aswin",balance:6000,transaction:[]},
    1002:{acno:1002,password:"123",uname:"Shibin",balance:7000,transaction:[]}
  }

  constructor() { 
    this.getDetails()
   }

   getTransaction(acno:any){
     return this.data[acno]["transaction"]
   }

  saveDetails(){
    if(this.data){
      localStorage.setItem("data",JSON.stringify(this.data))
      console.log(this.data);
      
    }

    if(this.currentUsername){
      localStorage.setItem("currentUsername",JSON.stringify(this.currentUsername))
    }

    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }


  getDetails(){
    if(localStorage.getItem("data")){
      this.data=JSON.parse(localStorage.getItem("data") || '')
    }
    if(localStorage.getItem("currentUsername")){
      this.currentUsername=JSON.parse(localStorage.getItem("currentUsername") || '')
    }

    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno") || '')
    }
  }



  register(acno:any,uname:any,password:any){
    let database=this.data

    if(acno in database){
      return false
    }
    else{
      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      this.saveDetails()
      return true
    }
  }

  login(acno:any,password:any){
    let database=this.data
    if (acno in database) {
      if (password == database[acno]["password"]) {
        this.currentUsername=database[acno]["uname"]
        this.currentAcno=acno
        this.saveDetails()
        return true
        
      }
      else {
        alert("invalid password")
        return false
      }
    }
    else {
      alert("user does not exist")
      return false
    }
  }


  deposit(acno:any,pswd:any,amt:any){
    let database=this.data
    let amount=parseInt(amt)
    if(acno in database){
      if(pswd==database[acno]["password"]){
         database[acno]["balance"]+=amount
          database[acno]["transaction"].push({
            amount:amount,
            type:"CREDIT"
          })
         this.saveDetails()
        return database[acno]["balance"]
      }
      else{
        alert("invalid password")
        return false
      }
    }
    else{
      
      return false
    }
  }
  withdraw(acno:any,pswd:any,amt:any){
    let database=this.data
    let amount=parseInt(amt)
    if(acno in database){
      if(pswd==database[acno]["password"]){
        if(database[acno]["balance"]>amount){
          database[acno]["balance"]-=amount
          database[acno]["transaction"].push({
            amount:amount,
            type:"DEBIT"
          })
          this.saveDetails()
          return database[acno]["balance"]
        }
        else{
          alert("insufficient balance")
        }
        
      }
      else{
        alert("invalid password")
        return false
      }
    }
    else{
      
      return false
    }
  }

}

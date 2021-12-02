import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  acno=''
  transaction:any

  constructor(private ds:DataService) { 
    this.acno=this.ds.currentAcno
    this.transaction=this.ds.getTransaction(this.acno)
  }

  ngOnInit(): void {
  }

}

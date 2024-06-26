import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listaccreditedinvestor',
  templateUrl: './listaccreditedinvestor.component.html',
  styleUrls: ['./listaccreditedinvestor.component.css']
})
export class ListaccreditedinvestorComponent implements OnInit {
  public accreditedList:any= [];
  public accreditedDataList:any= [];
  public title: any;
  constructor() { }

  ngOnInit(): void {
  }
 ///Search
 Search() {
  if (this.title == "") {
   // this.getAccreditedMaster();
  }
  else {
    this.accreditedList = this.accreditedDataList.filter(res => {
      return (
        res.name.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
      );
    });
  }
}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPropertyBase } from 'src/app/Model/IPropertyBase';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRentOpt="Sell";
  Cars: Array<IPropertyBase>;
  Status='';
  Search = '';
  SortbyParam = '';
  SortDirection = 'asc';
  constructor(private route: ActivatedRoute, private service:CarServiceService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.SellRentOpt="Rent"
    }
    this.service.getAllProperties(this.SellRentOpt).subscribe(
      data=>{
       this.Cars=data;
      }, error=>{
        console.log(error);

      }
    )}
    // this.http.get('Data/Properties.json').subscribe(
    //   data=>{
    //     this.Cars=data;
    //     console.log(data)
    //   }
    // );
    onFilter() {
      this.Search = this.Status;
    }

    onFilterClear() {
      this.Search = '';
      this.Status = '';
    }

    onSortDirection() {
      if (this.SortDirection === 'desc') {
        this.SortDirection = 'asc';
      } else {
        this.SortDirection = 'desc';
      }
    }
  }



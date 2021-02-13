import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/Model/iproperty';
import { IPropertyBase } from 'src/app/Model/IPropertyBase';
import { Property } from 'src/app/Model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
// @ViewChild('Form') addCarForm: NgForm;
@ViewChild('formTabs') formTabs: TabsetComponent;
 addCarForm: FormGroup;
 Nextclicked:boolean;
property = new Property();
CarList:any[];
 carView:IPropertyBase ={
   Brand: '',
   Id:null,
   Price:null,
   SellRent:null,
   SellRentOpt:'',
   KiloMeter:null,
   CarLabel:'',
   Modelyear:null
 };
  constructor(private fb: FormBuilder,private router:Router,
    private CarServiceService:CarServiceService, private alertify:AlertifyService) { }

  ngOnInit() {
    this.CreateAddCarForm();
    this.CarServiceService.getAllCars().subscribe(data=> {
      this.CarList=data;
      console.log(data);
    })
  }
  CreateAddCarForm(){
    this.addCarForm=this.fb.group({
      BasicInfo: this.fb.group({
      Brand: [null,Validators.required],
      //Id: [null,Validators.required],
      Price: [null,Validators.required],
     // SellRent: [null,Validators.required],
      SellRentOpt: [null,Validators.required],
    }),
      CarDetails:this.fb.group({
      KiloMeter: [null,Validators.required],
      CarLabel: [null,Validators.required],
      Modelyear: [null,Validators.required]
    }),
  });
  }
  get BasicInfo() {
    return this.addCarForm.controls.BasicInfo as FormGroup;
  }
  get CarDetails() {
    return this.addCarForm.controls.CarDetails as FormGroup;
  }
  get SellRentOpt() {
    return this.BasicInfo.controls.SellRentOpt as FormControl;
  }
  get Brand() {
    return this.BasicInfo.controls.Brand as FormControl;
  }
  get Price() {
    return this.BasicInfo.controls.Price as FormControl;
  }
  get KiloMeter() {
    return this.CarDetails.controls.KiloMeter as FormControl;
  }
  get CarLabel() {
    return this.CarDetails.controls.CarLabel as FormControl;
  }
  get Modelyear() {
    return this.CarDetails.controls.Modelyear as FormControl;
  }
  v
  onBack(){
    this.router.navigate(["/"]);
  }
  onSubmit(){
    this.Nextclicked=true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.CarServiceService.addProperty(this.property);
      this.alertify.success("Congrats, your property listed successfully on our website");
      console.log(this.addCarForm);
      if(this.SellRentOpt.value === 'Rent'){
        this.router.navigate(['/rent-property'])
      }else{
        this.router.navigate(['/'])

      }
    }else{
      this.alertify.error("Please review the form and provide all valid entries");
    }

  }


  mapProperty(): void {
    this.property.Id=this.CarServiceService.newPropID();
    this.property.SellRentOpt = this.SellRentOpt.value;
    this.property.Brand = this.Brand.value;
    this.property.Price = +this.Price.value;
    this.property.CarLabel = this.CarLabel.value;
    this.property.KiloMeter = +this.KiloMeter.value;
    this.property.Modelyear = +this.Modelyear.value;
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.CarDetails.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    return true;
  }
  selectTab(tabId: number, IsCurrentTabValid:boolean) {
    // debugger
    this.Nextclicked=true;
    if(IsCurrentTabValid){
      this.formTabs.tabs[tabId].active = true;
    }
  }
}

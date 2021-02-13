import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';
import { Property } from '../Model/property';
import { IPropertyBase } from '../Model/IPropertyBase';
@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

constructor(private http:HttpClient) { }

getAllCars(): Observable<string[]>{
  return this.http.get<string[]>('http://localhost:50897/api/car');
}
getProperty(id: number) {
  return this.getAllProperties().pipe(
    map(propertiesArray => {
      return propertiesArray.find(p => p.Id === id);
    })
  );
}

getAllProperties(SellRentOpt?: string): Observable<Property[]>{
  return this.http.get('Data/Properties.json').pipe(
    map(data=>{
      const PropertiesArray: Array<Property>=[];
      const localProperties = JSON.parse(localStorage.getItem('newProp'));
      if (localProperties) {
        for (const id in localProperties) {
          if(SellRentOpt){
        if (localProperties.hasOwnProperty(id) && localProperties[id].SellRentOpt === SellRentOpt) {
          PropertiesArray.push(localProperties[id]);
        }
      }else{
        PropertiesArray.push(localProperties[id]);
      }
      }
      }
        for(const i in data){
          if(SellRentOpt){
        if(data.hasOwnProperty(i) && data[i].SellRentOpt === SellRentOpt){
          PropertiesArray.push(data[i]);
        }
      } else{
        PropertiesArray.push(data[i]);
      }
    }
      return PropertiesArray;
    })
  );
  return this.http.get<Property[]>('data/properties.json');

}
addProperty(property: Property) {
 let newProp=[property];
 if (localStorage.getItem('newProp')) {
  newProp = [property,
              ...JSON.parse(localStorage.getItem('newProp'))];
}
  localStorage.setItem('newProp', JSON.stringify(newProp));
}
newPropID() {
  if (localStorage.getItem('PID')) {
    localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
    return +localStorage.getItem('PID');
  } else {
    localStorage.setItem('PID', '101');
    return 101;
  }
}
}

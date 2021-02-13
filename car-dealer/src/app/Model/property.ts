import { IPropertyBase } from 'src/app/Model/IPropertyBase';

export class Property implements IPropertyBase{
  Id: number;
  SellRent: number;
  Brand: string;
  Price: number;
  SellRentOpt: string;
  CarLabel: string;
  KiloMeter: number;
  Modelyear: number;
  Image?: string;

}

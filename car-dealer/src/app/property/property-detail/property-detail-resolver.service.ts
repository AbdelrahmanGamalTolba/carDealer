import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from 'src/app/Model/property';
import { CarServiceService } from 'src/app/services/car-service.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private router: Router,  private CarService: CarServiceService) { }
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<Property>|Property {
    const propId = route.params['id'];
    return this.CarService.getProperty(+propId).pipe(
      catchError(error => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
}
}

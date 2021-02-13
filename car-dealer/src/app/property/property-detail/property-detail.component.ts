import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/Model/property';
import { CarServiceService } from 'src/app/services/car-service.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
public propertyId:number;
property= new Property();
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
  constructor(private route:ActivatedRoute, private router:Router,private CarService:CarServiceService) { }

  ngOnInit() {
    this.propertyId=+this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      }
    );
    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id'];
    //     this.CarService.getProperty(this.propertyId).subscribe(
    //       (data: Property) => {
    //         this.property = data;
    //       }
    //     );
    //   }
    // );
    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];
    this.galleryImages = [
      {
        small: 'assets/images/a.jpg',
        medium: 'assets/images/a.jpg',
        big: 'assets/images/a.jpg'
      },
      {
        small: 'assets/images/b.jpg',
        medium: 'assets/images/b.jpg',
        big: 'assets/images/b.jpg'
      },
      {
        small: 'assets/images/c.jpg',
        medium: 'assets/images/c.jpg',
        big: 'assets/images/c.jpg'
      },
      {
        small: 'assets/images/d.jpg',
        medium: 'assets/images/d.jpg',
        big: 'assets/images/d.jpg'
      },
      {
        small: 'assets/images/e.jpg',
        medium: 'assets/images/e.jpg',
        big: 'assets/images/e.jpg'
      }
    ];

  }

}

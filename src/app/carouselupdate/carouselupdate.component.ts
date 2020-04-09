import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CarouselService } from '../Service/carousel.service';
import { carousel } from '../model/carousel.model';
import { CarouselInsert } from '../Model/Carouselinsert.model';
import { ActivatedRoute, Route, Routes, } from '@angular/router';

@Component({
  selector: 'app-carouselupdate',
  templateUrl: './carouselupdate.component.html',
  styleUrls: ['./carouselupdate.component.css']
})
export class CarouselupdateComponent implements OnInit {
result:boolean;
var:carousel;
variable:string;
myForm:FormGroup;
carousel:carousel;
appData:CarouselInsert;
submitted:boolean = false;
showdata:number;
details:any;
Carousel:CarouselInsert;

  constructor(private carouselService:CarouselService,private myroutes:Router,private myActivateRoute:ActivatedRoute) { 
   
    this.carousel=new carousel();
    if(myActivateRoute.snapshot.paramMap.get('data')){
      this.carousel=JSON.parse(myActivateRoute.snapshot.paramMap.get('data'));
      console.log(this.carousel)
  }
    this.carouselService.getCarouselDataFromApI().subscribe((data:any)=>{
      this.appData = data;
      console.log(this.appData)
    })
  }

  
  update()
  {
    this.submitted=true;
     this.carouselService.update(this.carousel.CarouselId,this.carousel).subscribe((data:boolean)=>{
      this.result=data;
      if(this.result=true)
       {
         this.variable="Successfully Updated";
       }
     })
    
    
  }
  back(){
    this.myroutes.navigateByUrl('carousel');
  }

  selectApplicationName(event:any) {
    this.carousel.ApplicationName = event.target.value;
    console.log(this.carousel.ApplicationName);
 }
   selectUser(event:any) {
     this.carousel.UserName = event.target.value;
     console.log(this.carousel.UserName);
   }
     fromDate(event:any) {
       this.carousel.ValidFrom = event.target.value;
       console.log(this.carousel.ValidFrom);  
     }
       toDate(event:any) {
         this.carousel.ValidTo = event.target.value;
         console.log(this.carousel.ValidTo);
       }
      
         
 ngOnInit() {
  }
}

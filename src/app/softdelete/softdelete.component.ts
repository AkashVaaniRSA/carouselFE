import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftDeleteService } from '../service/softdelete.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarouselService } from '../Service/carousel.service';
import { carousel } from '../model/carousel.model';
import { ActivatedRoute, Route, Routes, } from '@angular/router';


@Component({
  selector: 'app-softdelete',
  templateUrl: './softdelete.component.html',
  styleUrls: ['./softdelete.component.css']
})
export class SoftdeleteComponent implements OnInit {
result:boolean;
myform:FormGroup;
carousel:number;
variable:string;
  constructor(private myroutes:Router,private Softdeleteservice:SoftDeleteService, private myActivateRoute:ActivatedRoute)
   {
    if(myActivateRoute.snapshot.paramMap.get('data')){
      this.carousel=JSON.parse(myActivateRoute.snapshot.paramMap.get('data'));
      console.log(this.carousel);
  }

    }


  back(){
    this.myroutes.navigateByUrl('carousel');
  }

  delete(){
    this.Softdeleteservice.SoftDelete(this.carousel).subscribe ((data:boolean)=>{
      this.result=data;
      if(this.result=true)
      {
        this.variable="Successfully Deleted";
      }
    })
  }

  public get CarouselId(){
    return this.myform.get("CarouselId");
  }
  
  ngOnInit() {
    this.myform=new FormGroup({
    CarouselId:new FormControl(null,Validators.compose([Validators.required]))
    })

  }

}

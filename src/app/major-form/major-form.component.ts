import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-major-form',
  templateUrl: './major-form.component.html',
  styleUrls: ['./major-form.component.css']
})
export class MajorFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  majorObj: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major", +params['id']))
      .subscribe(majorData => this.majorObj = majorData);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });

  }

  saveMajor(majorForm: NgForm){
    if(typeof majorForm.value.major_id === "number"){
      this.dataService.editRecord("major", majorForm.value, majorForm.value.major_id)
          .subscribe(
            major => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("major", majorForm.value)
          .subscribe(
            major => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.majorObj = {};
    }

  }

}

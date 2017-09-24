import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  instructorObj: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("instructor", +params['id']))
      .subscribe(instructorData => this.instructorObj = instructorData);
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

  saveInstructor(instructorForm: NgForm){
    if(typeof instructorForm.value.instructor_id === "number"){
      this.dataService.editRecord("instructor", instructorForm.value, instructorForm.value.instructor_id)
          .subscribe(
            instructor => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("instructor", instructorForm.value)
          .subscribe(
            instructor => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.instructorObj = {};
    }

  }

}
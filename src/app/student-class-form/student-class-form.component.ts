import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-student-class-form',
  templateUrl: './student-class-form.component.html',
  styleUrls: ['./student-class-form.component.css']
})
export class StudentClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  student_classObj: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student-class", +params['id']))
      .subscribe(studentClassData => this.student_classObj = studentClassData);
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

  saveStudentClass(studentClassForm: NgForm){
    if(typeof studentClassForm.value.instructor_id === "number"){
      this.dataService.editRecord("student-class", studentClassForm.value, studentClassForm.value.instructor_id)
          .subscribe(
            instructor => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student-class", studentClassForm.value)
          .subscribe(
            instructor => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.student_classObj = {};
    }

  }

}
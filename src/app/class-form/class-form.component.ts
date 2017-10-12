import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {

  classForm: NgForm;
  @ViewChild('classForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  classObj: object;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("class", +params['id']))
      .subscribe(ClassData => this.classObj = ClassData);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });

  }

  saveClass(classForm: NgForm){
    console.log(classForm.value)
    if(typeof classForm.value.class_id === "number"){
      this.dataService.editRecord("class", classForm.value, classForm.value.instructor_id)
          .subscribe(
            instructor => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("class", classForm.value)
          .subscribe(
            instructor => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.classObj = {};
    }

  }
  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.classForm = this.currentForm;
    this.classForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.classForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'instructor_id': '',
    'subject': '',
    'course': ''
  };

  validationMessages = {
    'instructor_id': {
      'required': 'Instructor ID is required.',
      'maxlength': 'Instructor cannot be more than 30 characters long.'
    },
    'subject': {
      'required': 'Subject is required.',
      'maxlength': 'Subject cannot be more than 30 characters long.'
    },
    'course': {
      'maxlength': 'SAT cannot be more than 4 numbers in length.'
    }
  };
}
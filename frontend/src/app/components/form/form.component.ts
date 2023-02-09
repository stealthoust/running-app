import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  trainingForm!: FormGroup;
hours:string= "00";
minutes :number= 0;
seconds= "00";
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      kilometers: ['', Validators.required],
      calculateCalories: [true],
      calories: ['']
    });
  }
  submitForm() {
    console.log(this.trainingForm.value);
  }


}

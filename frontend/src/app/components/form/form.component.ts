import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  trainingForm!: FormGroup;
  hoursValue: string = '00';
  minutesValue: string = '00';
  secondsValue: string = '00';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      kilometers: ['', Validators.required],
      calculateCalories: [true],
      calories: [''],

    });
  }

  submitForm() {
    console.log(this.trainingForm.value);
  }

  display(value: any) {
    console.log(value);
  }

  setHours(number: any) {
    if (number.length == 1) this.hoursValue = "0" + number;
    else this.hoursValue = number;

  }

  setMinutes(number: any) {
    if (number.length == 1) this.minutesValue = "0" + number;
    else this.minutesValue = number;

  }

  setSeconds(number: any) {
    if (number.length == 1) this.secondsValue = "0" + number;
    else this.secondsValue = number;

  }

  onInputChange(value: any) {
    console.log(value);
  }
}

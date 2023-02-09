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

  /*  currentDate:Date=new Date();
  maxDate=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDay());*/
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      date: new FormControl(new Date(), [Validators.required]),
      kilometers: new FormControl('0', [Validators.required, Validators.min(0.01), Validators.max(200)]),
      calculateCalories: [true],
      calories: new FormControl('0', [Validators.required, Validators.min(1), Validators.max(15600)]),
      hours: new FormControl('0', [Validators.required]),
      minutes: new FormControl('0', [Validators.required]),
      seconds: new FormControl('0', [Validators.required]),

    });
  }

  get date() {
    return this.trainingForm.get('date');
  }

  get kilometers() {
    return this.trainingForm.get('kilometers');
  }
get calories() {
    return this.trainingForm.get('calories');
}
  get hours() {
    return this.trainingForm.get('hours');
  }

  get minutes() {
    return this.trainingForm.get('minutes');
  }

  get seconds() {
    return this.trainingForm.get('seconds');
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

  onSubmit() {
    console.log(this.trainingForm.get('date')?.value);
  }
}

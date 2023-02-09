import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HomeComponent} from "../home/home.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Training} from "../../common/Training/training";
import {Observable} from "rxjs";
import {TrainingService} from "../../services/trainingService/training.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";


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
  checkboxState: boolean = false;

  constructor(private formBuilder: FormBuilder, private trainingService: TrainingService, private toast: ToastrService, private datePipe: DatePipe, private router: Router) {
  }

  ngOnInit() {

    this.trainingForm = this.formBuilder.group({
      date: new FormControl(new Date(), [Validators.required]),
      kilometers: new FormControl('', [Validators.required, Validators.min(0.01), Validators.max(200)]),
      calories: new FormControl('', [Validators.required, Validators.min(1), Validators.max(15600)]),
      hours: new FormControl('0', [Validators.required]),
      minutes: new FormControl('0', [Validators.required]),
      seconds: new FormControl('0', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(255)]),

    });
  }

  durationValidator() {

    let totalDuration = this.trainingForm.get('hours')?.value * 3600 + this.trainingForm.get('minutes')?.value * 60 + this.trainingForm.get('seconds')?.value;

    return totalDuration < 60 ? {'durationTooShort': true} : null;
  }

  checkboxChangeState() {
    if (!this.checkboxState) {
      this.trainingForm.get('calories')?.disable();
      this.checkboxState = true;

      this.calculateCalories();
    } else {
      this.trainingForm.get('calories')?.enable();
      this.checkboxState = false;
    }
  }

  calculateCalories() {
    if (this.checkboxState) {
      const kilometers = this.trainingForm.get('kilometers')!.value;
      //const timeInMinutes = (this.trainingForm.get('hours')!.value * 60) + this.trainingForm.get('minutes')!.value + (this.trainingForm.get('seconds')!.value / 60);
      const calories = (75 * kilometers);
      this.trainingForm.patchValue({calories: Math.round(calories)});
    }

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

  get time(): string {
    return `${this.hoursValue}:${this.minutesValue}:${this.secondsValue}`;
  }

  get description() {
    return this.trainingForm.get('description');
  }

  get durationValid() {
    return this.trainingForm.get('durationValid');
  }

  display(value: any) {
    console.log(value);
  }

  setHours(number: any) {
    if (number.length == 1) this.hoursValue = "0" + number;
    else this.hoursValue = number;
    this.calculateCalories();
  }

  setMinutes(number: any) {
    if (number.length == 1) this.minutesValue = "0" + number;
    else this.minutesValue = number;
    this.calculateCalories();
  }

  setSeconds(number: any) {
    if (number.length == 1) this.secondsValue = "0" + number;
    else this.secondsValue = number;
    this.calculateCalories();
  }

  onInputChange(value: any) {
    console.log(value);
  }

  onSubmit() {
    if (this.trainingForm.invalid) {
      this.trainingForm.markAllAsTouched();
      return;
    }
    let training = new Training();
    training.dateCreated = this.datePipe.transform(this.trainingForm.get('date')!.value, 'yyyy/MM/dd')!;
    training.kilometers = this.trainingForm.get('kilometers')?.value;
    training.calories = this.trainingForm.get('calories')?.value;
    training.time = this.time;
    training.description = this.trainingForm.get('description')?.value;

    this.trainingService.addTraining(training).subscribe(
      (res) => {
        this.toast.success("Training added successfully");
        this.router.navigateByUrl('/home');

      },
      (error) => {
        this.toast.error("Faoled to add training");
        console.log(error);
      }
    );

  }
}

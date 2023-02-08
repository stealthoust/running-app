import { Component } from '@angular/core';
import {Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {TrainingService} from "../../services/trainingService/training.service";
import {Training} from "../../common/Training/training";
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = [ 'id','dateCreated', 'lastUpdated', 'runTime', 'kilometers','avgSpeed','calories','actions'];
  trainingsList:Training[] = [];
  pageNumber:number = 1;
  pageSize:number = 10;
  totalElements:number = 0;

  constructor(private trainingService:TrainingService) {}

  ngOnInit(): void {
this.getTrainings();
  }

  getTrainings(){
    this.trainingService.getTrainingsPaginated(this.pageNumber-1,this.pageSize).subscribe(
this.getNestedData()
    )
  }

calculateAvgSpeed(trainings: Training[]) {
    trainings.forEach((training:Training)=> {
      training.avgSpeed = this.trainingService.calculateAvgSpeed(training.time!, training.kilometers!) ;


    });
}
  OnPageChange(e: PageEvent) {
    this.pageSize=e.pageSize;
    this.totalElements=e.length;
    this.pageNumber=e.pageIndex+1;
    this.getTrainings();
  }

  getNestedData(){
    return(data:any)=>{
      this.trainingsList = data._embedded.trainings;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }
}

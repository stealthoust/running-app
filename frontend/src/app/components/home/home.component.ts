import {Component} from '@angular/core';
import {TrainingService} from "../../services/trainingService/training.service";
import {Training} from "../../common/Training/training";
import {PageEvent} from "@angular/material/paginator";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {DetailsComponent} from "../../dialogs/details/details/details.component";
import {FormComponent} from "../form/form.component";
import {DeleteComponent} from "../../dialogs/delete/delete/delete.component";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'dateCreated', 'lastUpdated', 'runTime', 'kilometers', 'avgSpeed', 'calories', 'actions'];
  trainingsList: Training[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  name:string = "name";
  animal:string = "animal";
  constructor(private trainingService: TrainingService, private toast: ToastrService,private matDialog:MatDialog) {
  }

  ngOnInit(): void {
    this.getTrainings();
  }

  getTrainings() {
    this.trainingService.getTrainingsPaginated(this.pageNumber - 1, this.pageSize).subscribe(data => {
        this.getNestedData(data);
        this.calculateAvgSpeed(this.trainingsList);
      }
    )

  }

  calculateAvgSpeed(trainings: Training[]) {
    trainings.forEach((training: Training) => {
      training.avgSpeed = this.trainingService.calculateAvgSpeed(training.time!, training.kilometers!);


    });
  }

  OnPageChange(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.totalElements = e.length;
    this.pageNumber = e.pageIndex + 1;
    this.getTrainings();
  }
display(desc:string){
  this.toast.success("Clicked "+desc);
}
  getNestedData(data: any) {
    this.trainingsList = data._embedded.trainings;
    this.pageNumber = data.page.number + 1;
    this.pageSize = data.page.size;
    this.totalElements = data.page.totalElements;
  }

  deleteTraining(id: number) {
      this.trainingService.deleteTraining(id).subscribe(
        (res) => {
          if (res.status === 204) this.toast.success("Training deleted successfully");
          this.getTrainings();
        },
        (error) => {
          this.toast.error("Error deleting training");
        }
      );


  }
openDeleteDialog(id:number,data:string){
    const dialogRef=this.matDialog.open(DeleteComponent,{data});
    dialogRef.afterClosed().subscribe(result=>{
      if(result==='yes') this.deleteTraining(id);
    })
}
  openDetailsDialog(training:Training){
this.matDialog.open(DetailsComponent, {
    data: training
  }
);
  }

  openUpdateDialog(){
    this.matDialog.open(FormComponent);
  }

}

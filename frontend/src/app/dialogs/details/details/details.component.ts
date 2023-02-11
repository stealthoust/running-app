import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Training} from "../../../common/Training/training";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public run: Training,
              private matDialogRef: MatDialogRef<DetailsComponent>) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.matDialogRef.close();
  }

  onClose(){
    this.matDialogRef.close();
  }
}

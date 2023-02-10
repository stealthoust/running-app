import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Training} from "../../common/Training/training";
import {map, Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl = 'http://localhost:8080/api/trainings'

  constructor(private httpClient: HttpClient) {
  }

  getTrainings(): Observable<Training[]> {
    return this.httpClient.get<getTrainingsResponse>(this.baseUrl).pipe(
      map(response => response._embedded.trainings));
  }

  getTrainingsPaginated(page: number, size: number) {
    return this.httpClient.get<getTrainingsResponse>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getById(id:string)
  {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  deleteTraining(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, {observe: "response"});
  }

  addTraining(training: Training) {
    return this.httpClient.post<Training>(this.baseUrl, training);

  }

  calculateAvgSpeed(time: string, distance: number): number {

    let timeInMs = this.convertTimeToMs(time);

    let avgSpeed = distance / (timeInMs / 60 / 60);

    return parseFloat(avgSpeed.toFixed(2));
  }

  convertTimeToMs(time: string) {

    let timeArr = time.split(":");
    let hours = parseInt(timeArr[0]) * 60 * 60;
    let minutes = parseInt(timeArr[1]) * 60;
    let seconds = parseInt(timeArr[2]);

    return hours + minutes + seconds;
  }
}

interface getTrainingsResponse {
  _embedded: {
    trainings: Training[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

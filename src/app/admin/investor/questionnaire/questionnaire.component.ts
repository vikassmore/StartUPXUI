import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  //public SeriesList=[];
  maximumInvestent: string;
  acceptInvestment: string;
  releventInvestment: string;
  squestionId: number;
  liquidWorth: string;
  riskFector: string;
  confiditialAgreement: string;
  isActive: boolean;
  userId: string | any;
  panelOpenState = false;
  constructor(public appService: AppService, private snackBar: MatSnackBar, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != 'undefined' || this.userId != 0) {
      this.getQuestionnaireDeatails(this.userId);
    }
  }
  //Get Questionnery details by user
  public getQuestionnaireDeatails(userId) {
    this.appService.getAllById("api/SuitabilityQuestion/GetSuitabilityQuestionByuserId/", userId).subscribe(data => {
      this.squestionId = data.squestionId;
      this.userId = data.userId;
      this.maximumInvestent = data.maximumInvestent;
      this.acceptInvestment = data.acceptInvestment;
      this.releventInvestment = data.releventInvestment;
      this.liquidWorth = data.liquidWorth;
      this.riskFector = data.riskFector;
      this.confiditialAgreement = data.confiditialAgreement;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-investmentprofile',
  templateUrl: './investmentprofile.component.html',
  styleUrls: ['./investmentprofile.component.css']
})
export class InvestmentprofileComponent implements OnInit {
  investmentId: number;
  investmentStage: string;
  investmentSector: string;
  investmentAmount: number;
  userId: string | any;
  constructor(public appService: AppService, private snackBar: MatSnackBar, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != 'undefined' || this.userId != 0) {
      this.getprimaryinvestmentDeatails(this.userId);
    }
  }
  //Get primary investment details by user
  public getprimaryinvestmentDeatails(userId) {
    this.appService.getAllById("api/InvestmentDetail/GetInvestmentDetailByuserId/", userId).subscribe(data => {
      this.investmentId = data.investmentId;
      this.investmentStage = data.investmentStage;
      this.investmentSector = data.investmentSector;
      this.investmentAmount = data.investmentAmount;
      this.userId = data.loggedUserId;
    });
  }
}

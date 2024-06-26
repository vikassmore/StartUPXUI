import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import {saveAs} from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-viewinvestor',
  templateUrl: './viewinvestor.component.html',
  styleUrls: ['./viewinvestor.component.css']
})
export class ViewinvestorComponent implements OnInit {
  panelOpenState = false;
  investorVerifyId: number;
  userId: number;
  public sub: any;
  investorId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNo: string;
  entityType: string;
  zipCode: string;
  address1: string;
  formType: string | any;
  investmentAmount: string;
  investmentStage: string;
  investmentSector: string;
  documentList: any = [];
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.investorVerifyId = this.route.snapshot.params['id2'];
    this.formType = this.route.snapshot.params['id3'];
    if (this.userId != null && this.investorVerifyId != null) {
      this.getinvestordetails(this.userId, this.investorVerifyId);
    }
  }
  //Get Investor details by id
  public getinvestordetails(userId, investorVerifyId) {
    this.appService.getAllById("api/InvestorVerification/GetAllDetailsById/", userId + "/" + investorVerifyId).subscribe(data => {
      this.investorId = data.investorDetailModel.investorId;
      this.firstName = data.investorDetailModel.firstName;
      this.lastName = data.investorDetailModel.lastName;
      this.emailId = data.investorDetailModel.emailId;
      this.entityType = data.investorDetailModel.founderTypeId;
      this.zipCode = data.investorDetailModel.zipCode;
      this.address1 = data.investorDetailModel.address1;
      this.mobileNo = data.investorDetailModel.mobileNo;
      this.investmentAmount = data.investmentDeatail.investmentAmount;
      this.investmentSector = data.investmentDeatail.investmentSector;
      this.investmentStage = data.investmentDeatail.investmentStage;
      this.documentList = data.founderInvestorDocumentList;
    });
  }
  ///download file
  public downloadDocument(userId, documentId,fileName) {
    this.appService.downloadById("api/FounderInvestorDocument/DownloadDocumentByUserId/", userId + '/' + documentId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      saveAs(blob, fileName); 
    });
  }
}


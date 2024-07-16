import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SuitabilityQuestionModel } from './QuestionnaireDetails..Model';

@Component({
  selector: 'app-questionnairedetails',
  templateUrl: './questionnairedetails.component.html',
  styleUrls: ['./questionnairedetails.component.css']
})
export class QuestionnairedetailsComponent implements OnInit {
  public form: FormGroup;
  squestionId: string | any;
  private sub: any;
  confiditialAggre: string | any;
  riskfactor: string | any;
  user: any = [];
  userId: string | any;
  uploadForm = new FormGroup({
    squestionId: new FormControl(''),
    maximumInvestent: new FormControl('', [Validators.required]),
    acceptInvestment: new FormControl('', [Validators.required]),
    releventInvestment: new FormControl('', [Validators.required]),
    liquidWorth: new FormControl('', [Validators.required]),
    riskFector: new FormControl('', [Validators.required]),
    confiditialAgreement: new FormControl('', [Validators.required]),
    isActive: new FormControl(true),
    userId: new FormControl(''),
  })
  isAddMode: boolean;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.squestionId = this.route.snapshot.params['id'];
    if (this.userId != 'undefined' || this.userId != 0) {
      this.getQuestionnaireDeatails(this.userId);
    }
  }
  //Get Questionnere detauls by user
  public getQuestionnaireDeatails(userId) {
    this.appService.getAllById("api/SuitabilityQuestion/GetSuitabilityQuestionByuserId/", userId).subscribe(data => {
      this.uploadForm.controls['maximumInvestent'].setValue(data.maximumInvestent);
      this.uploadForm.controls['acceptInvestment'].setValue(data.acceptInvestment);
      this.uploadForm.controls['releventInvestment'].setValue(data.releventInvestment);
      this.uploadForm.controls['liquidWorth'].setValue(data.liquidWorth);
      if (data.riskFector != null) {
        this.uploadForm.controls['riskFector'].setValue(true);
        this.riskfactor = data.riskFector;
      } else {
        this.uploadForm.controls['riskFector'].setValue(null);
        this.riskfactor = '';
      }
      if (data.confiditialAgreement != null) {
        this.uploadForm.controls['confiditialAgreement'].setValue(true);
        this.confiditialAggre = data.confiditialAgreement;
      } else {
        this.uploadForm.controls['confiditialAgreement'].setValue(null);
        this.confiditialAggre = '';
      }
      this.uploadForm.controls['isActive'].setValue(data.isActive);
      this.uploadForm.controls['squestionId'].setValue(data.squestionId);
      this.uploadForm.controls['userId'].setValue(data.userId);
    });
  }
  //On Submit
  public onSuitabilityQuestionSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.addSuitabilityQuestion(value);
    }
  }
  //Change maximum Investment value
  public onSelectionChangemaxInv(e) {
    this.uploadForm.controls['maximumInvestent'].setValue(e.target.value);
  }
  //Change accept Investment value
  public onSelectionChangeaccInv(e) {
    this.uploadForm.controls['acceptInvestment'].setValue(e.target.value);
  }
  //Change relevent Investment value
  public onSelectionChangerelInv(e) {
    this.uploadForm.controls['releventInvestment'].setValue(e.target.value);
  }
  //Change liquid worth value
  public onSelectionChangeliquidWorth(e) {
    this.uploadForm.controls['liquidWorth'].setValue(e.target.value);
  }
  //Change risk factor value
  public onSelectionChangeriskFector(e) {
    if (e.target.checked) {
      this.uploadForm.controls['riskFector'].setValue(e.target.value);
      this.riskfactor = e.target.value;
    } else {
      this.uploadForm.controls['riskFector'].setValue('');
      this.riskfactor = '';
    }
  }
  //Change confiditial agreement value
  public onSelectionChangeConAgree(e) {
    if (e.target.checked) {
      this.uploadForm.controls['confiditialAgreement'].setValue(e.target.value);
      this.confiditialAggre = e.target.value;
    } else {
      this.uploadForm.controls['confiditialAgreement'].setValue('');
      this.confiditialAggre = '';
    }
  }
  //Add user Data addbankDetail
  private addSuitabilityQuestion = (SuitabilityQuestionFormData) => {
    let SuitabilityQuestionmodel1: SuitabilityQuestionModel = {
      SquestionId: SuitabilityQuestionFormData.squestionId,
      MaximumInvestent: SuitabilityQuestionFormData.maximumInvestent,
      AcceptInvestment: SuitabilityQuestionFormData.acceptInvestment,
      ReleventInvestment: SuitabilityQuestionFormData.releventInvestment,
      UserId: this.userId,
      LiquidWorth: SuitabilityQuestionFormData.liquidWorth,
      RiskFector: this.riskfactor,
      ConfiditialAgreement: this.confiditialAggre,
      IsActive: true
    }
    this.appService.add('api/SuitabilityQuestion/AddSuitability', SuitabilityQuestionmodel1).subscribe((response) => {

      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/investor/questionnaire'], { relativeTo: this.route });
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AppService, Data } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FAQModel } from '../listfaq/FAQ.Model';

@Component({
  selector: 'app-editfaq',
  templateUrl: './editfaq.component.html',
  styleUrls: ['./editfaq.component.css']
})
export class EditfaqComponent implements OnInit {
  public form: FormGroup;
  faqMasterId: string | any;
  private sub: any;
  questionName: string | any;
  answerName: string | any;
  uploadForm = new FormGroup({
    questionName: new FormControl('', [Validators.required]),
    answerName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.faqMasterId = params['id'];
      if (this.faqMasterId != undefined || this.faqMasterId > 0) {
        this.getFAQById(this.faqMasterId);
      }
    });
  }
  ///Get FAQ By faqMasterId
  getFAQById(faqMasterId): void {
    this.appService.getById('api/Master/GetFAQById/', faqMasterId).subscribe((data: any) => {
      debugger;
      this.uploadForm.controls['questionName'].setValue(data.question);
      this.uploadForm.controls['answerName'].setValue(data.answer);
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //On Submit
  public onFAQSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.updateFAQ(value);
    }
  }

  ////Update FAQ Record
  private updateFAQ = (faqFormData) => {
    var faqMasterId = Number(this.faqMasterId);
    let faqModel1: FAQModel = {
      frequentlyAqid: faqMasterId,
      question: faqFormData.questionName,
      answer: faqFormData.answerName,
    }
    this.appService.edit('api/Master/AddFAQ', faqModel1).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Updated Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/masters/listfaq'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }


}

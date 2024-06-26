import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FAQModel } from '../listfaq/FAQ.Model';

@Component({
  selector: 'app-addfaq',
  templateUrl: './addfaq.component.html',
  styleUrls: ['./addfaq.component.css']
})
export class AddfaqComponent implements OnInit {
  public form: FormGroup;
  faqMasterId: string | any;
  private sub: any;
  uploadForm = new FormGroup({
    questionName: new FormControl('', [Validators.required]),
    answerName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  isAddMode!: boolean;
  submitted = false;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }
  //On submit
  public onFAQSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.createFAQ(value);
    }
  }
  ////Add FAQ record
  private createFAQ = (faqFormData) => {
    if (this.faqMasterId == null) {
      faqFormData.faqMasterId = 0;
      let FAQModel1: FAQModel = {
        frequentlyAqid: faqFormData.faqMasterId,
        question: faqFormData.questionName,
        answer: faqFormData.answerName,
      }
      this.appService.add('api/Master/AddFAQ', FAQModel1).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/admin/masters/listfaq'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
}

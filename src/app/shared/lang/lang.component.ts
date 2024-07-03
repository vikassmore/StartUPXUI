import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
    public langList = new Map<string, string>();
    public language: any;
  constructor(public translateService: TranslateService) { }

    ngOnInit() {
       
        this.language = this.translateService.getLangs();
        for (let i = 0; i < this.language.length; i++)
        {
            switch (this.language[i]) {
                case "en":
                    this.langList.set(this.language[i], "India");
                    break;
                case "de":
                    this.langList.set(this.language[i], "Germany");
                    break;
                case "fr":
                    this.langList.set(this.language[i], "France");
                    break;
                case "ru":
                    this.langList.set(this.language[i], "Russia");
                    break;

                case "tr":
                    this.langList.set(this.language[i], "Turkey");
                    break;
                default:
                    this.langList.set(this.language[i], " ");
                    break;
            }
            console.log("language-", this.langList);
        }
    } 

  public changeLang(lang:string){ 
    this.translateService.use(lang);   
  } 

}

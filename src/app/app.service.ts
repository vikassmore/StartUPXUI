import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category, Product } from './app.models';
import { environment } from 'src/environments/environment';  

import { EnvironmentUrlService } from './services/env-url';

export class Data {
    constructor(public categories: Category[],
                public compareList: Product[],
                public wishList: Product[],
                public cartList: Product[],
                public totalPrice: number,
                public totalCartCount: number) { }
}

@Injectable()
export class AppService {
    public Data = new Data(
        [], // categories
        [], // compareList
        [],  // wishList
        [],  // cartList
        null, //totalPrice,
        0 //totalCartCount
    )
    
    public url = environment.url + '/assets/data/'; 


    public getMonthWiseExpense = (route: string) => {
      return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
    }

    public getCityWiseExpense = (route: string) => {
      return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
    }

    public getCityWiseDepartmentalExpense = (route: string) => {
      return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
    }

    public getExpenseList = (route: string) => {
        return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }

      public addExpenseHead = (route: string, body: any) => {
        return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
      public addPayment = (route: string, body: any) => {
        return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
      public deletePayment = (route: string, body: any) => {
        return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
    public getPaymentList = (route: string) => {
        return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
      public editExpenseHeadById = (route: string, body: any) => {
        return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
      public editTeamById = (route: string, body: any) => {
        return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
      public getExpenseHeadById = (route: string) => {
        return this.http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
      public deleteExpenseHead = (route: string, body: any) => {
        return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
    public getUserList = (route: string) => {
        return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
    public getDepartMentList = (route: string) => {
        return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
      public addDepartMent = (route: string, body: any) => {
        return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
  
      public editDepartMentById = (route: string, body: any) => {
        return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
  
      public getDepartMentById = (route: string) => {
        return this.http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
      public deleteDepartMent = (route: string, body: any) => {
        return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
      public getRoleList = (route: string) => {
        return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
      public addFilm = (route: string, body: any) => {
        return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
      public getFilmList = (route: string) => {
        return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
  
      public editFilmById = (route: string, body: any) => {
        return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
  
      public getFilmById = (route: string) => {
        return this.http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
      public addevent = (route: string, body: any) => {
        return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
      public getEventList = (route: string) => {
        return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
  
      public editEventById = (route: string, body: any) => {
        return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
      }
  
      public geEventById = (route: string) => {
        return this.http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
  
      public deleteProjectDetail = (route: string, body: any) => {
        return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }
      public deleteProject = (route: string, body: any) => {
        return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }


      public getPaymentById = (route: string) => {
        return this.http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }

     
       public addService = (route: string, body: any) => {
        return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, {responseType:'text'});
       }
       public editCityById = (route: string, body: any) => {
        return this.http.patch(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
    }

    public getStateMaster = (route: string) => {
      return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }
  
    public getCityById = (route: string) => {
        return this.http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
    }

    public getfundingDetailId = (route: string) => {
      return this.http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }
    
    
       public deletecity = (route: string, body: any) => {
        return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
       }

      public getCity = (route: string) => {
        return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
      }


    constructor(public http:HttpClient, public snackBar: MatSnackBar,private _envUrl: EnvironmentUrlService) { }
    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
      }
     
    
    public adduser = (route: string, body: any) => {
        return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
    }

    public getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(this.url + 'categories.json');
    }
   
    public getProducts(type): Observable<Product[]>{        
        return this.http.get<Product[]>(this.url + type + '-products.json');
    }

    public getProductById(id): Observable<Product>{
        return this.http.get<Product>(this.url + 'product-' + id + '.json');
    }

    public getBanners(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'banners.json');
    }

    public addToCompare(product:Product){
        let message, status;
        if(this.Data.compareList.filter(item=>item.id == product.id)[0]){
            message = 'The product ' + product.name + ' already added to comparison list.'; 
            status = 'error';     
        }
        else{
            this.Data.compareList.push(product);
            message = 'The product ' + product.name + ' has been added to comparison list.'; 
            status = 'success';  
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public addToWishList(product:Product){
        let message, status;
        if(this.Data.wishList.filter(item=>item.id == product.id)[0]){
            message = 'The product ' + product.name + ' already added to wish list.'; 
            status = 'error';     
        }
        else{
            this.Data.wishList.push(product);
            message = 'The product ' + product.name + ' has been added to wish list.'; 
            status = 'success';  
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    } 

    public addToCart(product:Product){
        let message, status;        
       
        this.Data.totalPrice = null;
        this.Data.totalCartCount = null;

        if(this.Data.cartList.filter(item=>item.id == product.id)[0]){ 
            let item = this.Data.cartList.filter(item=>item.id == product.id)[0];
            item.cartCount = product.cartCount;  
        }
        else{           
            this.Data.cartList.push(product);
        }        
        this.Data.cartList.forEach(product=>{
            this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
            this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;
        });

        message = 'The product ' + product.name + ' has been added to cart.'; 
        status = 'success';          
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public resetProductCartCount(product:Product){
        product.cartCount = 0;
        let compareProduct = this.Data.compareList.filter(item=>item.id == product.id)[0];
        if(compareProduct){
            compareProduct.cartCount = 0;
        };
        let wishProduct = this.Data.wishList.filter(item=>item.id == product.id)[0];
        if(wishProduct){
            wishProduct.cartCount = 0;
        }; 
    }
    

//All Services For StartUPX
public getAll = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }
public getById = (path, serviceId) => {
  return this.http.get<any>(this.createCompleteRoute(path + serviceId, this._envUrl.urlAddress));
}
public deleteById = (route: string, body: any) => {

  return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public downloadById = (path, id) => {
  return this.http.get(this.createCompleteRoute(path+id, this._envUrl.urlAddress),{ responseType: 'blob' });
}
public getfundingId = (path, fundingDetailId) => {
  return this.http.get<any>(this.createCompleteRoute(path + fundingDetailId, this._envUrl.urlAddress));
}


public getByInvestorId = (path, investorId) => {
  return this.http.get<any>(this.createCompleteRoute(path + investorId, this._envUrl.urlAddress));
}
public getByuserId = (path) => {
  return this.http.get<any>(this.createCompleteRoute(path , this._envUrl.urlAddress));
}

public getByUserId = (path, userId) => {
  return this.http.get<any>(this.createCompleteRoute(path + userId, this._envUrl.urlAddress));
}
public add(path, body: any) {
  return this.http.post(this.createCompleteRoute(path , this._envUrl.urlAddress), body, { responseType: 'text' });
 }
 public addnotableinvestor(path, body: any) {
  return this.http.post(this.createCompleteRoute(path , this._envUrl.urlAddress), body, { responseType: 'text' });
 }
 public addserviceuser(path, body: any) {
  return this.http.post(this.createCompleteRoute(path , this._envUrl.urlAddress), body, { responseType: 'text' });
 }
public edit(path, body: any) {
 
 return this.http.post(this.createCompleteRoute(path , this._envUrl.urlAddress), body, { responseType: 'text' });
}
public edituser(path, body: any) {

 return this.http.put(this.createCompleteRoute(path , this._envUrl.urlAddress), body, { responseType: 'text' });
}
public editserviceuser(path, body: any) {

 return this.http.put(this.createCompleteRoute(path , this._envUrl.urlAddress), body, { responseType: 'text' });
}
public editnotableinvestor(path, body: any) {

 return this.http.put(this.createCompleteRoute(path , this._envUrl.urlAddress), body, { responseType: 'text' });
}
public editServiceStatus(path, body: any) {

 return this.http.put(this.createCompleteRoute(path , this._envUrl.urlAddress), body, { responseType: 'text' });
}

public getAllById = (path, id) => {
  return this.http.get<any>(this.createCompleteRoute(path +id, this._envUrl.urlAddress));
  }
  public getAllByonwatch = (path:any) => {
    return this.http.get<any>(this.createCompleteRoute(path , this._envUrl.urlAddress));
    }
  public getAllService = (route: string) => {
      return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }
  public addSector = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
}
public addfounder = (route: string, body: any) => {
  return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
}
public getAllSector = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}

public getAllFundingDetails = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}

public getAllFounders = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}

public getfounderById = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public getuserById = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public getinvestmentById = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}

public getAllFounderDetails = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}


// public resetPassword = (route: string, formData: any ) => {
//   return this.http.get<any>(this.createCompleteRoute(route,  this._envUrl.urlAddress),formData);
// }
public resetPassword = (route: string, body: any) => {
   return this.http.patch(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
  }
public addFunding = (route: string, body: any) => {
  return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
}
public getAllFunding = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public addInvestmentCategory = (route: string, body: any) => {
  return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
}
public getAllInvestmentCategory = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public addStartUpCategory = (route: string, body: any) => {
  return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
}
public addUser = (route: string, body: any) => {
  return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
}
public addprimaryinvestmentdetails = (route: string, body: any) => {
  return this.http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body,{responseType:'text'});
}
public getAllStartUp = (route: string) => {
  return this.http.get<any>(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public deletefunding = (route: string, body: any) => {
  return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public deleteservice = (route: string, body: any) => {
  return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public deletesector = (route: string, body: any) => {
  return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
}

public deletefounder = (route: string, body: any) => {
  return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public deleteinvestmentCategory = (route: string, body: any) => {
  return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public deletesatrtupCategory = (route: string, body: any) => {
  return this.http.delete(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
public getUserId = (route: string) => {
  return this.http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
}
// public editFunding = (route: string, body: any) => {
//   return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
// }
// public editSector = (route: string, body: any) => {
//   return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
// }
// public editService = (route: string, body: any) => {
//   return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
// }
// public editInvestmentCategory = (route: string, body: any) => {
//   return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
// }
// public editStartupCategory = (route: string, body: any) => {
//   return this.http.put(this.createCompleteRoute(route, this._envUrl.urlAddress), body, { responseType: 'text' });
// }
    public getBrands(){
        return [  
            { name: 'aloha', image: 'assets/images/brands/aloha.png' },
            { name: 'dream', image: 'assets/images/brands/dream.png' },  
            { name: 'congrats', image: 'assets/images/brands/congrats.png' },
            { name: 'best', image: 'assets/images/brands/best.png' },
            { name: 'original', image: 'assets/images/brands/original.png' },
            { name: 'retro', image: 'assets/images/brands/retro.png' },
            { name: 'king', image: 'assets/images/brands/king.png' },
            { name: 'love', image: 'assets/images/brands/love.png' },
            { name: 'the', image: 'assets/images/brands/the.png' },
            { name: 'easter', image: 'assets/images/brands/easter.png' },
            { name: 'with', image: 'assets/images/brands/with.png' },
            { name: 'special', image: 'assets/images/brands/special.png' },
            { name: 'bravo', image: 'assets/images/brands/bravo.png' }
        ];
    }

    public getCountries(){
        return [ 
            {name: 'Afghanistan', code: 'AF'}, 
            {name: 'Aland Islands', code: 'AX'}, 
            {name: 'Albania', code: 'AL'}, 
            {name: 'Algeria', code: 'DZ'}, 
            {name: 'American Samoa', code: 'AS'}, 
            {name: 'AndorrA', code: 'AD'}, 
            {name: 'Angola', code: 'AO'}, 
            {name: 'Anguilla', code: 'AI'}, 
            {name: 'Antarctica', code: 'AQ'}, 
            {name: 'Antigua and Barbuda', code: 'AG'}, 
            {name: 'Argentina', code: 'AR'}, 
            {name: 'Armenia', code: 'AM'}, 
            {name: 'Aruba', code: 'AW'}, 
            {name: 'Australia', code: 'AU'}, 
            {name: 'Austria', code: 'AT'}, 
            {name: 'Azerbaijan', code: 'AZ'}, 
            {name: 'Bahamas', code: 'BS'}, 
            {name: 'Bahrain', code: 'BH'}, 
            {name: 'Bangladesh', code: 'BD'}, 
            {name: 'Barbados', code: 'BB'}, 
            {name: 'Belarus', code: 'BY'}, 
            {name: 'Belgium', code: 'BE'}, 
            {name: 'Belize', code: 'BZ'}, 
            {name: 'Benin', code: 'BJ'}, 
            {name: 'Bermuda', code: 'BM'}, 
            {name: 'Bhutan', code: 'BT'}, 
            {name: 'Bolivia', code: 'BO'}, 
            {name: 'Bosnia and Herzegovina', code: 'BA'}, 
            {name: 'Botswana', code: 'BW'}, 
            {name: 'Bouvet Island', code: 'BV'}, 
            {name: 'Brazil', code: 'BR'}, 
            {name: 'British Indian Ocean Territory', code: 'IO'}, 
            {name: 'Brunei Darussalam', code: 'BN'}, 
            {name: 'Bulgaria', code: 'BG'}, 
            {name: 'Burkina Faso', code: 'BF'}, 
            {name: 'Burundi', code: 'BI'}, 
            {name: 'Cambodia', code: 'KH'}, 
            {name: 'Cameroon', code: 'CM'}, 
            {name: 'Canada', code: 'CA'}, 
            {name: 'Cape Verde', code: 'CV'}, 
            {name: 'Cayman Islands', code: 'KY'}, 
            {name: 'Central African Republic', code: 'CF'}, 
            {name: 'Chad', code: 'TD'}, 
            {name: 'Chile', code: 'CL'}, 
            {name: 'China', code: 'CN'}, 
            {name: 'Christmas Island', code: 'CX'}, 
            {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
            {name: 'Colombia', code: 'CO'}, 
            {name: 'Comoros', code: 'KM'}, 
            {name: 'Congo', code: 'CG'}, 
            {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
            {name: 'Cook Islands', code: 'CK'}, 
            {name: 'Costa Rica', code: 'CR'}, 
            {name: 'Cote D\'Ivoire', code: 'CI'}, 
            {name: 'Croatia', code: 'HR'}, 
            {name: 'Cuba', code: 'CU'}, 
            {name: 'Cyprus', code: 'CY'}, 
            {name: 'Czech Republic', code: 'CZ'}, 
            {name: 'Denmark', code: 'DK'}, 
            {name: 'Djibouti', code: 'DJ'}, 
            {name: 'Dominica', code: 'DM'}, 
            {name: 'Dominican Republic', code: 'DO'}, 
            {name: 'Ecuador', code: 'EC'}, 
            {name: 'Egypt', code: 'EG'}, 
            {name: 'El Salvador', code: 'SV'}, 
            {name: 'Equatorial Guinea', code: 'GQ'}, 
            {name: 'Eritrea', code: 'ER'}, 
            {name: 'Estonia', code: 'EE'}, 
            {name: 'Ethiopia', code: 'ET'}, 
            {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
            {name: 'Faroe Islands', code: 'FO'}, 
            {name: 'Fiji', code: 'FJ'}, 
            {name: 'Finland', code: 'FI'}, 
            {name: 'France', code: 'FR'}, 
            {name: 'French Guiana', code: 'GF'}, 
            {name: 'French Polynesia', code: 'PF'}, 
            {name: 'French Southern Territories', code: 'TF'}, 
            {name: 'Gabon', code: 'GA'}, 
            {name: 'Gambia', code: 'GM'}, 
            {name: 'Georgia', code: 'GE'}, 
            {name: 'Germany', code: 'DE'}, 
            {name: 'Ghana', code: 'GH'}, 
            {name: 'Gibraltar', code: 'GI'}, 
            {name: 'Greece', code: 'GR'}, 
            {name: 'Greenland', code: 'GL'}, 
            {name: 'Grenada', code: 'GD'}, 
            {name: 'Guadeloupe', code: 'GP'}, 
            {name: 'Guam', code: 'GU'}, 
            {name: 'Guatemala', code: 'GT'}, 
            {name: 'Guernsey', code: 'GG'}, 
            {name: 'Guinea', code: 'GN'}, 
            {name: 'Guinea-Bissau', code: 'GW'}, 
            {name: 'Guyana', code: 'GY'}, 
            {name: 'Haiti', code: 'HT'}, 
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
            {name: 'Holy See (Vatican City State)', code: 'VA'}, 
            {name: 'Honduras', code: 'HN'}, 
            {name: 'Hong Kong', code: 'HK'}, 
            {name: 'Hungary', code: 'HU'}, 
            {name: 'Iceland', code: 'IS'}, 
            {name: 'India', code: 'IN'}, 
            {name: 'Indonesia', code: 'ID'}, 
            {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
            {name: 'Iraq', code: 'IQ'}, 
            {name: 'Ireland', code: 'IE'}, 
            {name: 'Isle of Man', code: 'IM'}, 
            {name: 'Israel', code: 'IL'}, 
            {name: 'Italy', code: 'IT'}, 
            {name: 'Jamaica', code: 'JM'}, 
            {name: 'Japan', code: 'JP'}, 
            {name: 'Jersey', code: 'JE'}, 
            {name: 'Jordan', code: 'JO'}, 
            {name: 'Kazakhstan', code: 'KZ'}, 
            {name: 'Kenya', code: 'KE'}, 
            {name: 'Kiribati', code: 'KI'}, 
            {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
            {name: 'Korea, Republic of', code: 'KR'}, 
            {name: 'Kuwait', code: 'KW'}, 
            {name: 'Kyrgyzstan', code: 'KG'}, 
            {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
            {name: 'Latvia', code: 'LV'}, 
            {name: 'Lebanon', code: 'LB'}, 
            {name: 'Lesotho', code: 'LS'}, 
            {name: 'Liberia', code: 'LR'}, 
            {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
            {name: 'Liechtenstein', code: 'LI'}, 
            {name: 'Lithuania', code: 'LT'}, 
            {name: 'Luxembourg', code: 'LU'}, 
            {name: 'Macao', code: 'MO'}, 
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
            {name: 'Madagascar', code: 'MG'}, 
            {name: 'Malawi', code: 'MW'}, 
            {name: 'Malaysia', code: 'MY'}, 
            {name: 'Maldives', code: 'MV'}, 
            {name: 'Mali', code: 'ML'}, 
            {name: 'Malta', code: 'MT'}, 
            {name: 'Marshall Islands', code: 'MH'}, 
            {name: 'Martinique', code: 'MQ'}, 
            {name: 'Mauritania', code: 'MR'}, 
            {name: 'Mauritius', code: 'MU'}, 
            {name: 'Mayotte', code: 'YT'}, 
            {name: 'Mexico', code: 'MX'}, 
            {name: 'Micronesia, Federated States of', code: 'FM'}, 
            {name: 'Moldova, Republic of', code: 'MD'}, 
            {name: 'Monaco', code: 'MC'}, 
            {name: 'Mongolia', code: 'MN'}, 
            {name: 'Montserrat', code: 'MS'}, 
            {name: 'Morocco', code: 'MA'}, 
            {name: 'Mozambique', code: 'MZ'}, 
            {name: 'Myanmar', code: 'MM'}, 
            {name: 'Namibia', code: 'NA'}, 
            {name: 'Nauru', code: 'NR'}, 
            {name: 'Nepal', code: 'NP'}, 
            {name: 'Netherlands', code: 'NL'}, 
            {name: 'Netherlands Antilles', code: 'AN'}, 
            {name: 'New Caledonia', code: 'NC'}, 
            {name: 'New Zealand', code: 'NZ'}, 
            {name: 'Nicaragua', code: 'NI'}, 
            {name: 'Niger', code: 'NE'}, 
            {name: 'Nigeria', code: 'NG'}, 
            {name: 'Niue', code: 'NU'}, 
            {name: 'Norfolk Island', code: 'NF'}, 
            {name: 'Northern Mariana Islands', code: 'MP'}, 
            {name: 'Norway', code: 'NO'}, 
            {name: 'Oman', code: 'OM'}, 
            {name: 'Pakistan', code: 'PK'}, 
            {name: 'Palau', code: 'PW'}, 
            {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
            {name: 'Panama', code: 'PA'}, 
            {name: 'Papua New Guinea', code: 'PG'}, 
            {name: 'Paraguay', code: 'PY'}, 
            {name: 'Peru', code: 'PE'}, 
            {name: 'Philippines', code: 'PH'}, 
            {name: 'Pitcairn', code: 'PN'}, 
            {name: 'Poland', code: 'PL'}, 
            {name: 'Portugal', code: 'PT'}, 
            {name: 'Puerto Rico', code: 'PR'}, 
            {name: 'Qatar', code: 'QA'}, 
            {name: 'Reunion', code: 'RE'}, 
            {name: 'Romania', code: 'RO'}, 
            {name: 'Russian Federation', code: 'RU'}, 
            {name: 'RWANDA', code: 'RW'}, 
            {name: 'Saint Helena', code: 'SH'}, 
            {name: 'Saint Kitts and Nevis', code: 'KN'}, 
            {name: 'Saint Lucia', code: 'LC'}, 
            {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
            {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
            {name: 'Samoa', code: 'WS'}, 
            {name: 'San Marino', code: 'SM'}, 
            {name: 'Sao Tome and Principe', code: 'ST'}, 
            {name: 'Saudi Arabia', code: 'SA'}, 
            {name: 'Senegal', code: 'SN'}, 
            {name: 'Serbia and Montenegro', code: 'CS'}, 
            {name: 'Seychelles', code: 'SC'}, 
            {name: 'Sierra Leone', code: 'SL'}, 
            {name: 'Singapore', code: 'SG'}, 
            {name: 'Slovakia', code: 'SK'}, 
            {name: 'Slovenia', code: 'SI'}, 
            {name: 'Solomon Islands', code: 'SB'}, 
            {name: 'Somalia', code: 'SO'}, 
            {name: 'South Africa', code: 'ZA'}, 
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
            {name: 'Spain', code: 'ES'}, 
            {name: 'Sri Lanka', code: 'LK'}, 
            {name: 'Sudan', code: 'SD'}, 
            {name: 'Suriname', code: 'SR'}, 
            {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
            {name: 'Swaziland', code: 'SZ'}, 
            {name: 'Sweden', code: 'SE'}, 
            {name: 'Switzerland', code: 'CH'}, 
            {name: 'Syrian Arab Republic', code: 'SY'}, 
            {name: 'Taiwan, Province of China', code: 'TW'}, 
            {name: 'Tajikistan', code: 'TJ'}, 
            {name: 'Tanzania, United Republic of', code: 'TZ'}, 
            {name: 'Thailand', code: 'TH'}, 
            {name: 'Timor-Leste', code: 'TL'}, 
            {name: 'Togo', code: 'TG'}, 
            {name: 'Tokelau', code: 'TK'}, 
            {name: 'Tonga', code: 'TO'}, 
            {name: 'Trinidad and Tobago', code: 'TT'}, 
            {name: 'Tunisia', code: 'TN'}, 
            {name: 'Turkey', code: 'TR'}, 
            {name: 'Turkmenistan', code: 'TM'}, 
            {name: 'Turks and Caicos Islands', code: 'TC'}, 
            {name: 'Tuvalu', code: 'TV'}, 
            {name: 'Uganda', code: 'UG'}, 
            {name: 'Ukraine', code: 'UA'}, 
            {name: 'United Arab Emirates', code: 'AE'}, 
            {name: 'United Kingdom', code: 'GB'}, 
            {name: 'United States', code: 'US'}, 
            {name: 'United States Minor Outlying Islands', code: 'UM'}, 
            {name: 'Uruguay', code: 'UY'}, 
            {name: 'Uzbekistan', code: 'UZ'}, 
            {name: 'Vanuatu', code: 'VU'}, 
            {name: 'Venezuela', code: 'VE'}, 
            {name: 'Viet Nam', code: 'VN'}, 
            {name: 'Virgin Islands, British', code: 'VG'}, 
            {name: 'Virgin Islands, U.S.', code: 'VI'}, 
            {name: 'Wallis and Futuna', code: 'WF'}, 
            {name: 'Western Sahara', code: 'EH'}, 
            {name: 'Yemen', code: 'YE'}, 
            {name: 'Zambia', code: 'ZM'}, 
            {name: 'Zimbabwe', code: 'ZW'} 
        ]
    }

    public getMonths(){
        return [
            { value: '01', name: 'January' },
            { value: '02', name: 'February' },
            { value: '03', name: 'March' },
            { value: '04', name: 'April' },
            { value: '05', name: 'May' },
            { value: '06', name: 'June' },
            { value: '07', name: 'July' },
            { value: '08', name: 'August' },
            { value: '09', name: 'September' },
            { value: '10', name: 'October' },
            { value: '11', name: 'November' },
            { value: '12', name: 'December' }
        ]
    }
    

    public getYears(){
        return ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030" ]
    }

    public getDeliveryMethods(){
        return [
            { value: 'free', name: 'Free Delivery', desc: '$0.00 / Delivery in 7 to 14 business Days' },
            { value: 'standard', name: 'Standard Delivery', desc: '$7.99 / Delivery in 5 to 7 business Days' },
            { value: 'express', name: 'Express Delivery', desc: '$29.99 / Delivery in 1 business Days' }
        ]
    }

} 
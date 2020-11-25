import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  getDateMySQL() {
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    let dd;
    let mm;
    mm = currentDate.getMonth() + 1;
    dd = currentDate.getDate();
    let today;
    try {
        //
        if (dd < 10)  { dd = `0${dd}`; }
        //
        if (mm < 10) { mm = `0${mm}`; }
        //
        today = yyyy + '-' + mm + '-' + dd;

    } catch (error) {
        today = '';
    }
    return today;
}

}

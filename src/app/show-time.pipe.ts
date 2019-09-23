import { Pipe, PipeTransform } from '@angular/core';

//import moment = require('moment');
import * as moment from 'moment';

@Pipe({
  name: 'showTime'
})
export class ShowTimePipe implements PipeTransform {


  transform(value: any, args?: any): any {
    value = new Date(value);
    if (value && (value instanceof Date ||
      typeof value === 'number')) {
      return moment(value).calendar();
    }
  }

}

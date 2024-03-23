import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment-timezone';
import 'moment-timezone'

@Injectable()
export class DateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.data) {
          const formattedData = {
            ...data,
            data: this.formatData(data.data),
          };
          return formattedData;
        }
        return data;
      }),
    );
  }

  private formatData(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.formatDates(item));
    } else {
      return this.formatDates(data);
    }
  }

  private formatDates(data: any): any {
    const formattedData = { ...data };
    Object.keys(formattedData).forEach((key) => {
      if (formattedData[key] instanceof Date) {
        formattedData[key] = this.formatDate(formattedData[key]);
      } else if (typeof formattedData[key] === 'object') {
        formattedData[key] = formattedData[key]
      }
    });
    return formattedData;
  }


    private formatDate(date: Date): string {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
}
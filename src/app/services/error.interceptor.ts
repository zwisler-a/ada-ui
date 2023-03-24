import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {NotificationService} from "../notifications/notification.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notify: NotificationService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.notify.display({title: 'Error', text: 'An error occurred!', type: 'failure'})
        return err;
      })
    ) as Observable<HttpEvent<any>>;
  }

}

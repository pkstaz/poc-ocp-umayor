import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActiveToast } from '../interfaces/active-toast';


@Injectable({
  providedIn: 'root'
})
export class ToastrAlertService {

  constructor( private toastr: ToastrService ) {
		console.log('%c<<< Start services Toastr >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;'); 
	 }

	 showSuccess(message: any, title: any, ToastConfig: any) {
    this.toastr.success(message,title, {
          timeOut: 5000,
          extendedTimeOut: 3000,
          positionClass: 'toast-bottom-right',
      });
  }

  showError(message: any, title: any, ToastConfig: any) {
    this.toastr.error(message,title,{
          timeOut: 5000,
          extendedTimeOut: 3000,
          positionClass: 'toast-bottom-right',
      });
  }

  showWarning(message: any, title: any, ToastConfig: any) {
    this.toastr.warning(message,title,{
          timeOut: 5000,
          extendedTimeOut: 3000,
          positionClass: 'toast-bottom-right',
      });
  }

  showInfo(message: any, title: any, ToastConfig: any) {
    this.toastr.info(message,title,{
          timeOut: 5000,
          extendedTimeOut: 3000,
          positionClass: 'toast-bottom-right',
      });
  }
}

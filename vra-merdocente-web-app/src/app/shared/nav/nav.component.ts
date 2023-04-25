import { Component, OnInit, Inject, OnDestroy  } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalCustomNavigationClient } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest, EventMessage, EventType, PublicClientApplication } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { filter, takeUntil } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { ToastrAlertService } from 'src/app/services/toastr-alert.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit, OnDestroy {
	private readonly _destroying$ = new Subject<void>();


	constructor(
		private route: Router,
		@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private _authService: MsalService,
    private _msalBroadcastService: MsalBroadcastService,
		private _toastr: ToastrAlertService,
		private location: Location
	) {
const customNavigationClient = new MsalCustomNavigationClient(_authService, this.route, this.location);
    this._authService.instance.setNavigationClient(customNavigationClient);
	}

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.	

			this._msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
      });
		
	}

	checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this._authService.instance.getActiveAccount();

    if (!activeAccount && this._authService.instance.getAllAccounts().length > 0) {
      let accounts = this._authService.instance.getAllAccounts();
      this._authService.instance.setActiveAccount(accounts[0]);
    }
  }


/* logout(popup?: boolean) {
    if (popup) {
      this._authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
			return this._authService.logoutRedirect();  
      //this._authService.logoutRedirect();
    }
  } */

	logout(popup?: boolean) {
    if (popup) {
      this._authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this._authService.logoutRedirect();
    }
	}

	ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }


}

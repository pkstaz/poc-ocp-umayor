import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest, EventMessage, EventType, PublicClientApplication } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


/* Servicios */
import { ToastrAlertService } from '../../services/toastr-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy  {

	public isChecking = false;
	isIframe = false;
	loginDisplay = false;
	public authentication: boolean  = false;
	private readonly _destroying$ = new Subject<void>();

	//private userAgentApp = new PublicClientApplication(getMsalConfig());

  constructor( 
    private route: Router,
		@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private _authService: MsalService,
    private _msalBroadcastService: MsalBroadcastService,
		private _toastr: ToastrAlertService
		) {}

	ngOnInit(): void {
		 this.isIframe = window !== window.parent && !window.opener;

		 	//this.setLoginDisplay();
			//this.signIn();
		  this._authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window


			this._msalBroadcastService.msalSubject$
			.pipe(
				filter( (msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED )
			)
			.subscribe( (result: EventMessage) => {
				if( this._authService.instance.getAllAccounts().length === 0 ) {
					console.log('resultado de obserbable login >>>',result);
					window.location.pathname = '/';
				} else {
					this.setLoginDisplay();
				}
			});

			this._msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });


		this._authService.handleRedirectObservable().subscribe({

			

      next: (result: AuthenticationResult) => {
				const lorem = this._authService.instance.getActiveAccount()?.username;
				//const lorem2 = this._authService.instance.getAccountByHomeId(result.idToken)?.idToken;
				const lorem3 = this._authService.instance.getAccountByLocalId;
				const lorem4 = this._authService.instance.getAccountByUsername.name;
				const lorem5 = this._authService.instance.getActiveAccount;
				const lorem6 = this._authService.instance.setActiveAccount;
				const lorem7 = this._authService.instance.getConfiguration.length;
				const lorem8 = this._authService.instance.getAllAccounts;


        console.log('%cHTTP request result','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', result);
				console.log('%cHTTP request all lorem','background: #0dcaf0; color: #FFFFFF; padding: 2px 5px;','lorem1:',lorem, 'lorem3:', lorem3,'lorem4:', lorem4, 'lorem5:',lorem5,'lorem6:', lorem6, 'lorem7:', lorem7, 'lorem6:', lorem8);

				let activeAccount = this._authService.instance.getActiveAccount();
				console.log('%cHTTP request let activeAccount','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', activeAccount);
					 
				if (!activeAccount) {
						let accounts = this._authService.instance.getAllAccounts();
						this._authService.instance.setActiveAccount(accounts[0]);
						console.log('%cHTTP request let accounts','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', accounts);
					}
			
				
      },
      error: (error) => console.log('Este el error del subscribe ',error)
    });

  }

		loginRedirect() {
			console.log('%cHTTP request this.msalGuardConfig.authRequest','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this.msalGuardConfig.authRequest)
	  if (this.msalGuardConfig.authRequest){					
			this._authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
					console.log('%cHTTP request loginRedirect()','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this._authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest))
					 
						//console.log('%cHTTP request loginPopup()','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', response)
					//console.log('%cHTTP request loginPopup()','background: #fd7e14; color: #FFFFFF; padding: 2px 5px;', response)
          //this._authService.instance.setActiveAccount(response.account);
      	
			} else {
				this._authService.loginRedirect();				
			} 
		}


		setLoginDisplay() {
			console.log('%c[Before]: setLoginDisplay()  >>>','background: #20c997; color: #fff;padding: 2px 5px;', this.loginDisplay);
    	this.loginDisplay = this._authService.instance.getAllAccounts().length > 0;
			console.log('%c[After]: setLoginDisplay()  >>>','background: #20c997; color: #fff;padding: 2px 5px;', this.loginDisplay);
			this.signIn()			
  	}

		signIn() {
		 //this.authentication = this._authService.instance.getAllAccounts().length  > 0;
			if(this.loginDisplay) {
				this._toastr.showSuccess('Enhorabuena, ya estas autenticado!', 'OK!', null);
				console.log('%cSI esta authentication','background: #198754; color: #cff4fc;padding: 2px 5px;', this.authentication);
				this.route.navigate(['dashboard'])				
			} else {
				//this._toastr.showError('Ha ocurrido un problema, no estas autenticado!', 'Oooops!', null);
				console.log('%cNO esta authentication ','background: #dc3545; color: #fff;padding: 2px 5px;', this.authentication);
			}
		}

		

		loginPopup() {
			if (this.msalGuardConfig.authRequest){
      this._authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
					console.log('%cHTTP request loginPopup()','background: #fd7e14; color: #FFFFFF; padding: 2px 5px;', response)
          this._authService.instance.setActiveAccount(response.account);
					this.route.navigate(['dashboard'])
        });
      } else {
        this._authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this._authService.instance.setActiveAccount(response.account);
      });
    }
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

	

	refreshSession() {
    console.log('start refreshSession login from login.component.ts');
  }

 

	/* logout(popup?: boolean) {
    if (popup) {
      this._authService.logoutPopup({
        mainWindowRedirectUri: "/dashboard"
      });
    } else {
      this._authService.logoutRedirect();
    }
  } */
		logout() {
     
      return this._authService.logoutRedirect();  
    
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
function getMsalConfig(): import("@azure/msal-browser").Configuration {
	throw new Error('Function not implemented.');
}
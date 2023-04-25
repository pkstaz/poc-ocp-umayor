import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import {  AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest, EventMessage, EventType, PublicClientApplication, SilentRequest } from '@azure/msal-browser';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthUser } from '../interfaces/auth-user';
import { ToastrAlertService } from './toastr-alert.service';
import { Router } from '@angular/router';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements OnDestroy {


	private _authenticationContext$: Subject<AuthUser | null>;
  private readonly _destroying$ = new Subject<void>();
	public authentication: boolean  = false;
  public loginDisplay: boolean = false;


  constructor (
		@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService, 
		private _msalService: MsalService,
		private _toastr: ToastrAlertService,
		private route: Router
	) { 
			console.log('%c<<< Start AuthServiceService >>>','background: #fff3cd; color: #664d03; padding: 2px 5px;');

		
			this._authenticationContext$ = new Subject();
			this._destroying$ = new Subject<void>();
			this.broadcastService.inProgress$.pipe(
				filter((status: InteractionStatus) => status === InteractionStatus.None),
				takeUntil(this._destroying$)
			).subscribe(() => {
					this.refreshAuthUser();
			});	 

			//this.setLoginDisplay();
			
	} //-----> end constructor 

	get authenticationContext(): Observable<AuthUser | null> {
		return this._authenticationContext$.asObservable(); 
	}



	ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

	loginRedirect() {
		console.log('%c[ANTES] HTTP request loginRedirect()','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this.msalGuardConfig.authRequest)
	if (this.msalGuardConfig.authRequest){					
		this._msalService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
				console.log('%c[DESPUES] HTTP request loginRedirect()','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this.msalGuardConfig.authRequest)
		} else {
			this._msalService.loginRedirect();				
		} 
	}

	loginPopup() {
			console.log('%cHTTP request << click button loginPopup() >>','background: #6610f2; color: #FFFFFF; padding: 2px 5px;');
			
			 if (this.msalGuardConfig.authRequest){
      this._msalService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
					console.log('%cHTTP request loginPopup()','background: #fd7e14; color: #FFFFFF; padding: 2px 5px;', response)
          this._msalService.instance.setActiveAccount(response.account);
					this.route.navigate(['dashboard'])
        });
      } else {
        this._msalService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this._msalService.instance.setActiveAccount(response.account);
      });
     } 
		}

	setLoginDisplay() {
		console.log('%c[ANTES]: setLoginDisplay()  >>>','background: #20c997; color: #fff;padding: 2px 5px;', this.loginDisplay);
		this.loginDisplay = this._msalService.instance.getAllAccounts().length > 0;
		console.log('%c[DESPUES]: setLoginDisplay()  >>>','background: #20c997; color: #fff;padding: 2px 5px;', this.loginDisplay);


		/* 	this._msalService.handleRedirectObservable().subscribe({ 
				next: (result: AuthenticationResult) => {
						if (!this._msalService.instance.getActiveAccount() && this._msalService.instance.getAllAccounts().length > 0) {
							
							this._msalService.instance.setActiveAccount(result.account);
							this.route.navigate(['dashboard']);
							console.log('%c[debug] getActiveAccount() >>>','background: #0dcaf0; color: #000; padding: 2px 5px;',this._msalService.instance.getActiveAccount());
							console.log('%c[debug] getAllAccounts() >>>s','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;',  this._msalService.instance.getAllAccounts())
						}
				},
				error: (error) => console.log(error)
			}); */
	 		
  	}

	signIn() {
		console.log('%c[ANTES] HTTP request this.msalGuardConfig.authRequest','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this.msalGuardConfig.authRequest);
		console.log('%c[ANTES] this.loginDisplay','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this.loginDisplay);
		this.loginRedirect()
		console.log('%c[DEPUES] HTTP request this.msalGuardConfig.authRequest','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;', this.msalGuardConfig.authRequest);
		console.log('%c[DEPUES] this.loginDisplay','background: #0d6efd; color: #FFFFFF; padding: 2px 5px;', this.loginDisplay);
   
/*  if (this.msalGuardConfig.authRequest && this.loginDisplay){
			console.log('%c this.loginDisplay','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this.loginDisplay);
      /* this.msalGuardConfig.authRequest.account = this._msalService.instance.getAllAccounts()[0];  
			this._msalService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
      this._msalService.acquireTokenSilent({...this.msalGuardConfig.authRequest} as SilentRequest)
        .subscribe((response: AuthenticationResult) => {
          this._msalService.instance.setActiveAccount(response.account);
					console.log('%c response.accessToken','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', response.accessToken);
        
					console.log('%c this._msalService.instance.getAllAccounts()','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this._msalService.instance.getAllAccounts());
          
        });
      } else {
        this._msalService.loginRedirect();
    }   */
  







		
		 /* if (this.msalGuardConfig.authRequest){ 
			console.log('%c [ANTES] HTTP request loginRedirect()','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this.msalGuardConfig.authRequest);
			this._msalService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);	
			console.log('%c[DESPUES] HTTP request loginRedirect()','background: #6610f2; color: #FFFFFF; padding: 2px 5px;', this.msalGuardConfig.authRequest)
		} else {
			this._msalService.loginRedirect();				
		}  */ 


	/* 	this._msalService.handleRedirectObservable().subscribe({ 
				next: (result: AuthenticationResult) => {
						if (!this._msalService.instance.getActiveAccount() && this._msalService.instance.getAllAccounts().length > 0) {
							this._msalService.instance.setActiveAccount(result.account);
							console.log('%c[debug...]HTTP signIn()','background: #6610f2; color: #FFFFFF; padding: 2px 5px;',result)
						}
				},
				error: (error) => console.log(error)
			}); */
		
	
	
	 
		/* if(!this.authentication) {
			console.log('%c[After]: this.authentication  >>>','background: #20c997; color: #fff;padding: 2px 5px;', this.authentication);
	 
			 this._toastr.showSuccess('Enhorabuena, ya estas autenticado!', 'OK!', null);  

			  console.log('%cSI esta authentication','background: #198754; color: #cff4fc;padding: 2px 5px;', this.authentication);
			this.route.navigate(['dashboard'])	 		
		} else {
			//this._toastr.showError('Ha ocurrido un problema, no estas autenticado!', 'Oooops!', null);
			console.log('%cNO esta authentication ','background: #dc3545; color: #fff;padding: 2px 5px;', this.authentication);
		} */
  }



  signOut() {
    return this._msalService.logoutRedirect(); 
  }
  private refreshAuthUser() {
    /**
   * If no active account set but there are accounts signed in, sets first account to active account
   * To use active account set here, subscribe to inProgress$ first in your component
   * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
   */
    let activeAccount = this._msalService.instance.getActiveAccount();
    if (!activeAccount && this._msalService.instance.getAllAccounts().length > 0) {
      let accounts = this._msalService.instance.getAllAccounts();
      activeAccount = accounts[0];
      this._msalService.instance.setActiveAccount(activeAccount);
    }
    if (activeAccount) {
      this._authenticationContext$.next({
        firstName: activeAccount.name,
        id: activeAccount.homeAccountId,
        email: activeAccount.username
      })
    } else {
      this._authenticationContext$.next(null);
    }
  }
}

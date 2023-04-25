import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChatBubleComponent } from './academic-chat/chat-buble/chat-buble.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MiServicioEjecutorService  } from "../app/core/academic-chat/mi-servicio-ejecutor.service";

/* Azure */
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

/* Functions 
* Estas funcionaes son ejecutdas en los providers del app module
*/

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // clientId: '3fba556e-5d4a-48e3-8e1a-fd57c12cb82e', // PPE testing environment
      clientId: '78b8adf4-a20f-4c52-a550-9c843c4598c9',
      authority:'https://login.microsoftonline.com/0dc2d1a0-913c-4a0d-b1a7-3e857d4cccdb',
      // authority: 'https://login.windows-ppe.net/common', // PPE testing environment
      redirectUri: '/',
			//redirectUri: '/',
      postLogoutRedirectUri: '/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
  // protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']); // PPE testing environment

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    },
    loginFailedRoute: '/login-failed'
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ChatBubleComponent 
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
    AppRoutingModule,
		HttpClientModule,
		AuthModule,
		CoreModule,
		ReactiveFormsModule,
		FormsModule,
		ToastrModule.forRoot(),
		CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
		MsalModule
  ],
	exports: [],
  providers: [
		MiServicioEjecutorService,
	{
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
	],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

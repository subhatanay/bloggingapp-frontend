import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthIntercepter } from './auth/services/authinterceptor.service';
import { TopbarModule } from './shared/modules/topbar/topbar.module';
import { PersistanceServoce } from './shared/services/persistance.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    TopbarModule
  ],
  providers: [
    PersistanceServoce,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepter,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

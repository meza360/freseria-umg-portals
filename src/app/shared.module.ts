import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FunctionKeyInterceptor } from './core/interceptors/function-key.interceptor';
@NgModule({

    imports: [
        BrowserModule,
        CommonModule
    ], exports: [
        BrowserModule,
        CommonModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: FunctionKeyInterceptor, multi: true }
    ]
})

export class SharedModule { }
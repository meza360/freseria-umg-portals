import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@NgModule({

    imports: [
        BrowserModule,
        CommonModule
    ], exports: [
        BrowserModule,
        CommonModule
    ],
    providers: [
        provideHttpClient()
    ]
})

export class SharedModule { }
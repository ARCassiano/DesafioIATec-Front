import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule, MatSortModule, MatPaginatorModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatListModule, MatDividerModule, MatToolbarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PessoasListComponent } from './pessoas-list/pessoas-list.component';
import { MessagesComponent } from './messages/messages.component';

import { HttpClientModule }    from '@angular/common/http';
import { PessoaComponent } from './pessoa/pessoa.component';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { TelefonesComponent } from './telefones/telefones.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoasListComponent,
    MessagesComponent,
    PessoaComponent,
    EnderecosComponent,
    TelefonesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTabsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSnackBarModule,
    MatListModule, 
    MatDividerModule,
    CommonModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

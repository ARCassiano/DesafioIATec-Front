import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasListComponent }      from './pessoas-list/pessoas-list.component';
import { PessoaComponent }      from './pessoa/pessoa.component';


const routes: Routes = [
  {path: '', component: PessoasListComponent},
  {path: 'pessoas', component: PessoasListComponent},
  {path: 'pessoas/:id', component: PessoaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

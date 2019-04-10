import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import {Router} from "@angular/router"
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { Pessoa }         from '../Pessoa';
import { PessoaService }  from '../pessoa.service';
import { Endereco } from '../Endereco';
import { isEmpty } from 'rxjs/operators';
import { Telefone } from '../Telefone';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  @Input() pessoa: Pessoa;

  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getPessoa(id);
  }

  getPessoa(id: number): void {
    
    if(id && id > 0)
      this.pessoaService.getPessoa(id)
        .subscribe(pessoa => {
          pessoa.enderecos.unshift(new Endereco());
          pessoa.telefones.unshift(new Telefone());
          this.pessoa = pessoa;
        });
    else{
      this.pessoa = new Pessoa();
      this.pessoa.enderecos = [new Endereco()];
      this.pessoa.telefones = [new Telefone()];
    }
  }

  save(): void {
    
    this.pessoa.enderecos = this.pessoa.enderecos.filter(x => this.isEmpty(x) == false);
    this.pessoa.telefones = this.pessoa.telefones.filter(x => this.isEmpty(x) == false);

    if(this.pessoa.id > 0)
      this.pessoaService.updatePessoa(this.pessoa)
        .subscribe(pessoa => {
          let existeObjetoVazio = false;
          this.pessoa.enderecos.forEach(element => {
            if(this.isEmpty(element))
              existeObjetoVazio = true;
          });

          if(!existeObjetoVazio)
            this.pessoa.enderecos.unshift(new Endereco());
          
          existeObjetoVazio = false;
          this.pessoa.telefones.forEach(element => {
            if(this.isEmpty(element))
              existeObjetoVazio = true;
          });

          if(!existeObjetoVazio)
            this.pessoa.telefones.unshift(new Telefone());
          
        });
    else{
      this.pessoaService.addPessoa(this.pessoa)
        .subscribe(pessoa => {
          this.router.navigate(['/pessoas/', pessoa.id]);
          this.getPessoa(pessoa.id);
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

  isEmpty(obj): Boolean {
    return Object.keys(obj).length === 0;
  }
}

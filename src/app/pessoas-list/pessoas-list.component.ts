import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Pessoa } from '../Pessoa';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-list',
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.css']
})
export class PessoasListComponent implements OnInit {

  myDataArray: MatTableDataSource<Pessoa>;
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getContatos();
  }

  applyFilter(filterValue: string) {
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }

  getContatos(): void { 
    this.pessoaService.getPessoas()
        .subscribe(pessoas => {
          this.myDataArray = new MatTableDataSource<Pessoa>(pessoas);
          this.myDataArray.sort = this.sort;
          this.myDataArray.paginator = this.paginator;
        });
  }

  removePessoa(pessoa: Pessoa): void {
    if(confirm('Deseja remover a pessoa selecionada?'))
      this.pessoaService.deletePessoa(pessoa)
        .subscribe(pessoa => {
          this.getContatos();
        })
  }
}

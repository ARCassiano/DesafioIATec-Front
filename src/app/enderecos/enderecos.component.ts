import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Endereco} from '../Endereco';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {
  
  @Input() enderecos: Endereco[];
  options: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.options = formBuilder.group({
      floatLabel: 'never'
    });
  }

  ngOnInit() {
  }

  removeEndereco(endereco: Endereco): void{
    this.enderecos.forEach((element, index) => {
      if(element.id == endereco.id)
        this.enderecos.splice(index, 1);
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Telefone} from '../Telefone';

@Component({
  selector: 'app-telefones',
  templateUrl: './telefones.component.html',
  styleUrls: ['./telefones.component.css']
})
export class TelefonesComponent implements OnInit {
  
  @Input() telefones: Telefone[];
  options: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.options = formBuilder.group({
      floatLabel: 'never'
    });
  }

  ngOnInit() {
  }

  removeTelefone(telefone: Telefone): void{
    this.telefones.forEach((element, index) => {
      if(element.id == telefone.id)
        this.telefones.splice(index, 1);
    });
  }
}

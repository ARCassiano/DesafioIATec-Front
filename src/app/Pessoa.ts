import {Endereco} from './Endereco';
import { Telefone } from './Telefone';

export class Pessoa {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    telefones: Telefone[];
    enderecos: Endereco[];
}
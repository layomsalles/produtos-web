import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cadastro-produto',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-produto.html',
  styleUrl: './cadastro-produto.css',
})
export class CadastroProduto {

  //signal para armazenar a mensagem do servidor
  mensagem = signal<string>('')

  //HttpClient para integração com o backend
  http = inject(HttpClient)

  //criando formulario reativo
  formCadastro = new FormGroup({
    nome: new FormControl('', [
      Validators.required, Validators.minLength(6), Validators.maxLength(150)
    ]),

    preco: new FormControl('', [
      Validators.required, Validators.min(0.01), Validators.max(99999.99)
    ]),

    quantidade: new FormControl('', [
      Validators.required, Validators.min(0), Validators.max(9999)
    ])
  })

  //funcão para realizar o cadastro do produto
  cadastrarProduto(){
    //Requisição POST para a API cadastrar o produto
    this.http.post(environment.apiUrl, this.formCadastro.value).subscribe((data: any) => {
      //capturando a mensagem do backend para exibir na página
      this.mensagem.set(data.menssagem)
      //limpar o furmulario
      this.formCadastro.reset()
    })
  }
}

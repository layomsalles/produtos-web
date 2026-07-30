import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-produto',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-produto.html',
  styleUrl: './edicao-produto.css',
})
export class EdicaoProduto {

  http = inject(HttpClient);
  activated = inject(ActivatedRoute);

  id: string = '';

  mensagem = signal<string>('');

  ngOnInit() {
    this.id = this.activated.snapshot.paramMap.get('id') as string;
    this.http.get(`${environment.apiUrl}/${this.id}`)
      .subscribe((data: any) => {
        //preencher o formulário
        this.formEdicao.patchValue(data);
      });
  }

  //criando o formulário reativo
  formEdicao = new FormGroup({
    nome : new FormControl('', [
      Validators.required, Validators.minLength(6), Validators.maxLength(150)
    ]),
    preco : new FormControl('', [
      Validators.required, Validators.min(0.01), Validators.max(99999.99)
    ]),
    quantidade : new FormControl('', [
      Validators.required, Validators.min(0), Validators.max(9999)
    ])
  });

  //função para realizar a atualização do produto
  atualizarProduto() {
    
    //Requisição POST para a API atualizar o produto
    this.http.put(`${environment.apiUrl}/${this.id}`, this.formEdicao.value)
      .subscribe((data: any) => {
        //capturando a mensagem do backend para exibir na página
        this.mensagem.set(data.mensagem);
      });
  }

}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-consulta-produtos',
  imports: [
    CommonModule
  ],
  templateUrl: './consulta-produtos.html',
  styleUrl: './consulta-produtos.css',
})
export class ConsultaProdutos {

  //Variavel para armazenar a listagem de produtos
  produtos = signal<any[]>([])

  //Criar um objeto da biblioteca HttpClient
  http = inject(HttpClient)

  //Evento executando sempre que o component abre
  ngOnInit(){
     //Executando a conslta de produtos na API
     this.http.get(environment.apiUrl).subscribe((data) => {
      //Capturando o retorno da consulta
      //Armazenadno o conteudo da variavel em um signial
      this.produtos.set(data as any[])
     });
  }

  //Fução excutada qunado o botão de exclusão quando for clicado pelo usuario
  excluirProduto(produto: any){
    const confirmacao = confirm(`Deseja realmente excluir o produto "${produto.nome}"?`)

    if(!confirmacao){ //Não confirmou a exclusão
      return //Cancelar a função
    }

    //Executando a exclusão do produto na API
    this.http.delete(`${environment.apiUrl}/${produto.id}`).subscribe((data: any) => {
      alert(data.menssagem) // exibir uma pop-up com as mensagem
      this.ngOnInit() //executando a consulta novamente
    })
  }
}

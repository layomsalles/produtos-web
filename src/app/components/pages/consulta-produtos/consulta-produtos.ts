import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-consulta-produtos',
  imports: [],
  templateUrl: './consulta-produtos.html',
  styleUrl: './consulta-produtos.css',
})
export class ConsultaProdutos {
  //Criar um objeto da biblioteca HttpClient
  http = inject(HttpClient)

  //Evento executando sempre que o component abre
  ngOnInit(){
     //Executando a conslta de produtos na API
     this.http.get('http://localhost:5090/api/v1/Produtos').subscribe((produtos) => {
      console.log(produtos)
     });
  }
}

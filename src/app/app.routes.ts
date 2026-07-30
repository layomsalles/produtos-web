import { Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { CadastroProduto } from './components/pages/cadastro-produto/cadastro-produto';
import { ConsultaProdutos } from './components/pages/consulta-produtos/consulta-produtos';
import { EdicaoProduto } from './components/pages/edicao-produto/edicao-produto';

export const routes: Routes = [
    {
        path: 'pages/dashboard',
        component: Dashboard
    },
    {
        path: 'pages/cadastro-produto',
        component: CadastroProduto
    },
    {
        path: 'pages/consulta-produtos',
        component: ConsultaProdutos
    },
    {
        path: 'pages/edicao-produto/:id',
        component: EdicaoProduto
    },
    {
        path: '', pathMatch:'full', //Definindo rota inicial do projeto
        redirectTo: '/pages/dashboard' //Fazendo o redirecionamento
    }
];

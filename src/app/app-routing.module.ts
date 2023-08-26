import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPedidoComponent } from './modules/pedido.component.ts/listado-pedido/listado-pedido.component';
import { PedidoComponent } from './modules/pedido.component.ts/pedido.component';

const routes: Routes = [
  { path: '', redirectTo: '/pedido', pathMatch: 'full' },
  { path: 'pedido', component: PedidoComponent },
  { path: 'listado-pedido/:numero', component: ListadoPedidoComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

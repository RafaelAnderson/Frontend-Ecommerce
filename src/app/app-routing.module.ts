import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './modules/pedido.component.ts/pedido.component';

const routes: Routes = [
  { path: '', redirectTo: '/pedido', pathMatch: 'full' },
  { path: 'pedido', component: PedidoComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

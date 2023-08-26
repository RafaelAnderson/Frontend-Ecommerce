import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { ListadoPedidoComponent } from './modules/pedido.component.ts/listado-pedido/listado-pedido.component';
import { PedidoComponent } from './modules/pedido.component.ts/pedido.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PedidoComponent, ListadoPedidoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

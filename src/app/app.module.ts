import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { ListadoPedidoComponent } from './modules/pedido.component.ts/listado-pedido/listado-pedido.component';
import { PedidoComponent } from './modules/pedido.component.ts/pedido.component';
import { FormsModule } from '@angular/forms';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridDetailModule } from '@grapecity/wijmo.angular2.grid.detail';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';

@NgModule({
  declarations: [AppComponent, PedidoComponent, ListadoPedidoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    WjGridModule,
    WjGridDetailModule,
    WjInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

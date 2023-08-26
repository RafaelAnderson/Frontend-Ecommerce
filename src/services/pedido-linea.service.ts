import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoLineaDto } from 'src/app/dto/pedidoLineaDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoLineaService {
  private url: string = `${environment.BACKEND_ECOMMERCE}pedido_linea/`;

  constructor(private http: HttpClient) {}

  insertar(obj: PedidoLineaDto[]) {
    return this.http.post(`${this.url}insertar`, obj);
  }

  actualizar(id: number, obj: PedidoLineaDto[]) {
    return this.http.put(`${this.url}actualizar/${id}`, obj);
  }
}

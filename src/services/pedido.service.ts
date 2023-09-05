import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PedidoDto } from 'src/app/dto/pedidoDto';
import { ApiResponse } from 'src/app/models/apiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private url: string = `${environment.BACKEND_ECOMMERCE}pedido/`;
  opPedido: number;
  crudProperty: string;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<ApiResponse<PedidoDto[]>>(`${this.url}listar`);
  }

  listarPedido(id: number) {
    return this.http
      .get<ApiResponse<PedidoDto>>(`${this.url}listarPedido/${id}`)
      .pipe(map((apiResponse) => apiResponse.data));
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}delete/${id}`);
  }
}

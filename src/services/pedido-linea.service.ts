import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PedidoLineaDto } from 'src/app/dto/pedidoLineaDto';
import { ApiResponse } from 'src/app/models/apiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoLineaService {
  private url: string = `${environment.BACKEND_ECOMMERCE}pedido_linea/`;

  constructor(private http: HttpClient) { }

  insertar(obj: PedidoLineaDto[]) {
    return this.http.post<ApiResponse<PedidoLineaDto[]>>(`${this.url}insertar`, obj).pipe(
      map(apiResponse => apiResponse.error)
    )
  }

  actualizar(id: number, obj: PedidoLineaDto[]) {
    return this.http.put<ApiResponse<PedidoLineaDto[]>>(`${this.url}actualizar/${id}`, obj).pipe(
      map(apiResponse => apiResponse.error)
    );
  }
}

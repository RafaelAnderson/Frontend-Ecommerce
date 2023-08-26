import { PedidoLineaDto } from "./pedidoLineaDto";

export interface PedidoDto {
    total_count: number;
    op: number;
    numero: string;
    fecha: string;
    pedidoLineaDtoList: PedidoLineaDto[];
}
export interface PedidoLineaDto {
    op?: number;
    producto: string;
    descripcion: string;
    cantidad: number;
    precio: number;
    importe: number;
}
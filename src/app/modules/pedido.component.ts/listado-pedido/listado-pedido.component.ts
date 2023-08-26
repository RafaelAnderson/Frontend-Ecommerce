import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoLineaDto } from 'src/app/dto/pedidoLineaDto';
import { PedidoLineaService } from 'src/services/pedido-linea.service';
import { PedidoService } from 'src/services/pedido.service';

@Component({
  selector: 'app-listado-pedido',
  templateUrl: './listado-pedido.component.html',
  styleUrls: ['./listado-pedido.component.scss'],
})
export class ListadoPedidoComponent implements OnInit {
  title = 'front-ecommerce';
  tituloPedido: string = 'Pantalla Pedido';
  idPedido: number;
  numeroPedido: string = '';
  crudProperty: string;
  pedidosLineaList: PedidoLineaDto[] = [];
  resultsLength: number;
  displayedColumns: string[] = [
    'producto',
    'cantidad',
    'precio',
    'importe',
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private pedidoLineaService: PedidoLineaService
  ) {
    if (this.pedidoService.getOpPedido() === undefined) {
      this.router.navigate(['pedido']);
    } else {
      this.idPedido = this.pedidoService.getOpPedido();
      this.crudProperty = this.pedidoService.getCrudProperty();
    }
  }

  ngOnInit(): void {
    this.pedidoService.listarPedido(this.idPedido).subscribe((data) => {
      this.numeroPedido = `${data.numero}`;
      let listado: any[] = [];
      this.resultsLength = data.pedidoLineaDtoList.length;
      data.pedidoLineaDtoList.forEach((item) => {
        let obj = {
          producto: item.producto,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          precio: item.precio,
          importe: item.importe,
        };
        listado.push(obj);
      });
      this.pedidosLineaList = data.pedidoLineaDtoList;
      this.dataSource = new MatTableDataSource<any>(listado);
      this.dataSource.paginator = this.paginator;
    });
  }
}

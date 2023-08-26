import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { PedidoDto } from 'src/app/dto/pedidoDto';
import { PedidoService } from 'src/services/pedido.service';

@Component({
  selector: 'app-pedido.component',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  title = 'front-ecommerce';
  pedidos: PedidoDto[] = [];
  resultsLength: number;
  displayedColumns: string[] = ['op', 'numero', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.pedidoService.listar().subscribe((items) => {
      let listado: any[] = [];
      this.resultsLength = items.data.length;
      items.data.forEach((item) => {
        let obj = {
          op: item.op,
          numero: item.numero,
        };
        listado.push(obj);
      });
      this.pedidos = items.data;
      this.dataSource = new MatTableDataSource<any>(listado);
      this.dataSource.paginator = this.paginator;
    });
  }

  verRegistro(element: PedidoDto): void {
    let numero = element.op;
    this.pedidoService.setOpPedido(numero);
    this.pedidoService.setCrudProperty('vista');
    this.router.navigate(['listado-pedido', numero]);
  }

  editarRegistro(element: any): void {
    let numero = element.op;
    this.pedidoService.setOpPedido(numero);
    this.pedidoService.setCrudProperty('vista');
    this.router.navigate(['listado-pedido', numero]);
  }

  eliminarRegistro(element: any) {
    let op = element.op;
    this.pedidoService.eliminar(op).subscribe(() => {
      this.cargarData();
    });
  }
}

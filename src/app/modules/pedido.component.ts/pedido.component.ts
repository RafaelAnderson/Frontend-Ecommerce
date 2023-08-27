import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoDto } from 'src/app/dto/pedidoDto';
import { PedidoService } from 'src/services/pedido.service';
import { ListadoPedidoComponent } from './listado-pedido/listado-pedido.component';

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

  constructor(
    private matDialog: MatDialog,
    private pedidoService: PedidoService
  ) { }

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

  aplicarFiltro(event: any) {
    const filtro = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filtro;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearRegistro(): void {
    let dialogo = this.matDialog.open(ListadoPedidoComponent, {
      width: '80%',
      data: {
        numero: null,
        crudProperty: 'creacion',
      },
    });
    dialogo.afterClosed().subscribe(() => {
      this.cargarData();
    });
  }

  verRegistro(element: PedidoDto): void {
    let numero = element.op;
    let dialogo = this.matDialog.open(ListadoPedidoComponent, {
      width: '80%',
      data: {
        numero: numero,
        crudProperty: 'visualizar',
      },
    });
    dialogo.afterClosed().subscribe(() => {
    });
  }

  editarRegistro(element: any): void {
    let numero = element.op;
    let dialogo = this.matDialog.open(ListadoPedidoComponent, {
      width: '70%',
      data: {
        numero: numero,
        crudProperty: 'edicion',
      },
    });
    dialogo.afterClosed().subscribe(() => {
    });
  }

  eliminarRegistro(element: any) {
    let op = element.op;
    this.pedidoService.eliminar(op).subscribe(() => {
      this.cargarData();
    });
  }
}

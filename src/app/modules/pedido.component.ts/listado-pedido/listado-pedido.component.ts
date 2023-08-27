import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  block: boolean = false;
  creacion: boolean = false;
  total: number = 0;
  pedidosLineaList: PedidoLineaDto[] = [];
  resultsLength: number;
  displayedColumns: string[] = ['producto', 'descripcion', 'cantidad', 'precio', 'importe'];
  dataSource = new MatTableDataSource<PedidoLineaDto>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private pedidoService: PedidoService,
    private pedidoLineaService: PedidoLineaService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public pedidoData: any
  ) { }

  ngOnInit(): void {
    this.inicializarVariables();
    this.listarTabla();
  }

  inicializarVariables(): void {
    this.idPedido = this.pedidoData['numero'];
    this.crudProperty = this.pedidoData['crudProperty'];
  }

  listarTabla(): void {
    if (this.crudProperty === 'creacion') {
      this.creacion = true;
      for (let i = 0; i < 5; i++) {
        this.agregarRegistroVacio(this.pedidosLineaList);
      }
      this.dataSource.data = [...this.pedidosLineaList];
      this.dataSource.paginator = this.paginator;
    } else if (this.crudProperty === 'visualizar') {
      this.pedidoService.listarPedido(this.idPedido).subscribe((data) => {
        this.numeroPedido = `${data.numero}`;
        this.resultsLength = data.pedidoLineaDtoList.length;
        data.pedidoLineaDtoList.forEach((item) => {
          let obj = {
            op: null,
            producto: item.producto,
            descripcion: item.descripcion,
            cantidad: item.cantidad,
            precio: item.precio,
            importe: item.importe,
          };
          this.total += (item.cantidad * item.precio);
          this.pedidosLineaList.push(obj);
        });
        this.dataSource.data = [...this.pedidosLineaList];
        this.dataSource.paginator = this.paginator;
      });
      this.block = true;
    } else if (this.crudProperty === 'edicion') {
      this.pedidoService.listarPedido(this.idPedido).subscribe((data) => {
        this.numeroPedido = `${data.numero}`;
        data.pedidoLineaDtoList.forEach((item) => {
          let obj = {
            op: null,
            producto: item.producto,
            descripcion: item.descripcion,
            cantidad: item.cantidad,
            precio: item.precio,
            importe: item.importe,
          };
          this.total += (item.cantidad * item.precio);
          this.pedidosLineaList.push(obj);
        });
        this.resultsLength = this.pedidosLineaList.length;

        if (this.resultsLength < 5) {
          for (let i = 0; i < 5 - this.resultsLength; i++) {
            this.agregarRegistroVacio(this.pedidosLineaList);
          }
        } else {
          this.agregarRegistroVacio(this.pedidosLineaList);
        }

        this.dataSource.data = [...this.pedidosLineaList];
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  agregarRegistroVacio(listado: PedidoLineaDto[]): void {
    listado.push({
      op: null,
      producto: '',
      descripcion: '',
      cantidad: null,
      precio: null,
      importe: null,
    });
  }

  grabarPedido() {
    let registros = this.dataSource.data;
    let listado: PedidoLineaDto[] = [];
    let valido = false;
    registros.forEach(item => {
      if (item.producto !== '') {
        if (item.cantidad !== 0 && item.cantidad !== null) {
          if (item.precio !== 0 && item.precio !== null) {
            listado.push(item)
          } else {
            alert(`Para el producto ${item.producto} se debe insertar un precio mayor a 0`);
            valido = true;
            return;
          }
        } else {
          alert(`Para el producto ${item.producto} se debe insertar una cantidad mayor a 0`);
          valido = true;
          return;
        }
      }
    })

    if (valido) {
      return;
    }

    if (listado.length === 0) {
      alert(`Debe ingresar al menos un producto`);
      return;
    }

    if (this.crudProperty === "creacion") {
      this.pedidoLineaService.insertar(listado).subscribe(error => {
        if (!error) {
          this.dialogRef.close();
        }
      })
    } else {
      this.pedidoLineaService.actualizar(this.idPedido, listado).subscribe(error => {
        if (!error) {
          this.dialogRef.close();
        }
      })
    }
  }

  formatImporte(cantidad: number, precio: number) {
    if (cantidad === null || precio === null) {
      return null;
    }
    return Number((cantidad * precio).toFixed(2));
  }

  calcularImporte(element: any): number {
    return element.cantidad * element.precio;
  }

  actualizarTotal() {
    this.total = this.dataSource.data.reduce((sum, element) => sum + this.calcularImporte(element), 0);
    this.validarInsercion();
  }

  actualizarProducto(input: any) {
    if (input.length >= 2) {
      return;
    }
    this.validarInsercion();
  }
  validarInsercion() {
    let listado = this.dataSource.data;
    let listadoLenght = this.dataSource.data.length - 1;

    for (let i = listadoLenght; i >= 0; i--) {
      if (listado[i].producto === "" || listado[i].cantidad === null || listado[i].cantidad <= 0 ||
        listado[i].precio === null || listado[i].precio <= 0) {
        return;
      }
    }

    this.agregarRegistroVacio(this.dataSource.data);
    this.dataSource.data = [...this.dataSource.data];
  }

  aplicarFiltro(event: any) {
    const filtro = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filtro;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { PedidoDto } from 'src/app/dto/pedidoDto';
import { PedidoService } from 'src/services/pedido.service';
import { ListadoPedidoComponent } from './listado-pedido/listado-pedido.component';
import { ODataCollectionView } from '@grapecity/wijmo.odata';


const url = 'https://services.odata.org/Northwind/Northwind.svc';

@Component({
  selector: 'app-pedido.component',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent {
  categories: ODataCollectionView;
  products: ODataCollectionView;
  private _catToProductMap: Map<string, any> = new Map();

  constructor() {
      this.categories = new ODataCollectionView(url, 'Categories', {
          fields: ['CategoryID', 'CategoryName', 'Description']
      });
      this.products = new ODataCollectionView(url, 'Products');
  }

  getProducts(categoryID: string): any[] {
      let categoryProducts = this._catToProductMap.get(categoryID);
      if (!categoryProducts) {
          categoryProducts = this.products.items.filter(product => product.CategoryID === categoryID);
          this._catToProductMap.set(categoryID, categoryProducts);
      }
      return categoryProducts;
  }

  detailVisibilityMode = 'ExpandSingle';
  maxHeight = 0;
  isAnimated = true;
  keyActionEnter = 'None';
  readonly rowHasDetailFn = (row: any) => !(row.dataItem.CategoryID % 2);
  evenRowHasDetail = false;
}

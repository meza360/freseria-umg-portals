import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService, SaleService } from '../../../core/services';
import { Sale } from '../../../core/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  order: Sale | null = null;
  constructor (
    private activeRoute: ActivatedRoute,
    private saleService: SaleService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (params: Params): void => {
        console.debug('Ruta a buscar: ', params['id']);
        if (params['id'] != null) {
          this.saleService.getSale(params['id'])
            .subscribe({
              next: (response) => {
                console.debug('Respuesta: ', response);
                this.order = <Sale>response.value;
              },
              error: (error) => {
                console.error('Error: ', error);
              }
            });
        };
      }
    });
  }
}

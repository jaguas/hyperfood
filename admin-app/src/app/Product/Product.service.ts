import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../org.hyperfood';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ProductService {

	
		private NAMESPACE: string = 'Product';
	



    constructor(private dataService: DataService<Product>) {
    };

    public getAll(): Observable<Product[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Product> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Product> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Product> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Product> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Audit } from '../org.hyperfood';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AuditService {

	
		private NAMESPACE: string = 'Audit';
	



    constructor(private dataService: DataService<Audit>) {
    };

    public getAll(): Observable<Audit[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Audit> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Audit> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Audit> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Audit> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

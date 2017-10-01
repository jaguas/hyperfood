import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './Product.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Product',
	templateUrl: './Product.component.html',
	styleUrls: ['./Product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          productId = new FormControl("", Validators.required);
        
  
      
          waterPh = new FormControl("", Validators.required);
        
  
      
          seeds = new FormControl("", Validators.required);
        
  
      
          pesticides = { value: [] };
        
  
      
          soil = new FormControl("", Validators.required);
        
  
      
          fertilizer = new FormControl("", Validators.required);
        
  
      
          origin = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          producer = new FormControl("", Validators.required);
        
  
      
          audits = new FormControl("", Validators.required);
        
  


  constructor(private serviceProduct:ProductService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          productId:this.productId,
        
    
        
          waterPh:this.waterPh,
        
    
        
          seeds:this.seeds,
        
    
        
          pesticides:this.pesticides,
        
    
        
          soil:this.soil,
        
    
        
          fertilizer:this.fertilizer,
        
    
        
          origin:this.origin,
        
    
        
          status:this.status,
        
    
        
          producer:this.producer,
        
    
        
          audits:this.audits
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProduct.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.hyperfood.Product",
      
        
          "productId":this.productId.value,
        
      
        
          "waterPh":this.waterPh.value,
        
      
        
          "seeds":this.seeds.value,
        
      
        
          "pesticides":this.pesticides.value,
        
      
        
          "soil":this.soil.value,
        
      
        
          "fertilizer":this.fertilizer.value,
        
      
        
          "origin":this.origin.value,
        
      
        
          "status":this.status.value,
        
      
        
          "producer":this.producer.value,
        
      
        
          "audits":this.audits.value
        
      
    };

    this.myForm.setValue({
      
        
          "productId":null,
        
      
        
          "waterPh":null,
        
      
        
          "seeds":null,
        
      
        
          "pesticides":null,
        
      
        
          "soil":null,
        
      
        
          "fertilizer":null,
        
      
        
          "origin":null,
        
      
        
          "status":null,
        
      
        
          "producer":null,
        
      
        
          "audits":null
        
      
    });

    return this.serviceProduct.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "productId":null,
        
      
        
          "waterPh":null,
        
      
        
          "seeds":null,
        
      
        
          "pesticides":null,
        
      
        
          "soil":null,
        
      
        
          "fertilizer":null,
        
      
        
          "origin":null,
        
      
        
          "status":null,
        
      
        
          "producer":null,
        
      
        
          "audits":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.hyperfood.Product",
      
        
          
        
    
        
          
            "waterPh":this.waterPh.value,
          
        
    
        
          
            "seeds":this.seeds.value,
          
        
    
        
          
            "pesticides":this.pesticides.value,
          
        
    
        
          
            "soil":this.soil.value,
          
        
    
        
          
            "fertilizer":this.fertilizer.value,
          
        
    
        
          
            "origin":this.origin.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "producer":this.producer.value,
          
        
    
        
          
            "audits":this.audits.value
          
        
    
    };

    return this.serviceProduct.updateAsset(form.get("productId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProduct.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceProduct.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "productId":null,
          
        
          
            "waterPh":null,
          
        
          
            "seeds":null,
          
        
          
            "pesticides":null,
          
        
          
            "soil":null,
          
        
          
            "fertilizer":null,
          
        
          
            "origin":null,
          
        
          
            "status":null,
          
        
          
            "producer":null,
          
        
          
            "audits":null 
          
        
      };



      
        if(result.productId){
          
            formObject.productId = result.productId;
          
        }else{
          formObject.productId = null;
        }
      
        if(result.waterPh){
          
            formObject.waterPh = result.waterPh;
          
        }else{
          formObject.waterPh = null;
        }
      
        if(result.seeds){
          
            formObject.seeds = result.seeds;
          
        }else{
          formObject.seeds = null;
        }
      
        if(result.pesticides){
          
            this.pesticides = { value: result.pesticides };
          
        }else{
          formObject.pesticides = null;
        }
      
        if(result.soil){
          
            formObject.soil = result.soil;
          
        }else{
          formObject.soil = null;
        }
      
        if(result.fertilizer){
          
            formObject.fertilizer = result.fertilizer;
          
        }else{
          formObject.fertilizer = null;
        }
      
        if(result.origin){
          
            formObject.origin = result.origin;
          
        }else{
          formObject.origin = null;
        }
      
        if(result.status){
          
            formObject.status = result.status;
          
        }else{
          formObject.status = null;
        }
      
        if(result.producer){
          
            formObject.producer = result.producer;
          
        }else{
          formObject.producer = null;
        }
      
        if(result.audits){
          
            formObject.audits = result.audits;
          
        }else{
          formObject.audits = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "productId":null,
        
      
        
          "waterPh":null,
        
      
        
          "seeds":null,
        
      
        
          "pesticides":null,
        
      
        
          "soil":null,
        
      
        
          "fertilizer":null,
        
      
        
          "origin":null,
        
      
        
          "status":null,
        
      
        
          "producer":null,
        
      
        
          "audits":null 
        
      
      });
  }

}

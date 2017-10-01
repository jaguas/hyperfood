import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuditService } from './Audit.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Audit',
	templateUrl: './Audit.component.html',
	styleUrls: ['./Audit.component.css'],
  providers: [AuditService]
})
export class AuditComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          auditId = new FormControl("", Validators.required);
        
  
      
          date = new FormControl("", Validators.required);
        
  
      
          sucess = new FormControl("", Validators.required);
        
  
      
          notes = new FormControl("", Validators.required);
        
  
      
          auditor = new FormControl("", Validators.required);
        
  


  constructor(private serviceAudit:AuditService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          auditId:this.auditId,
        
    
        
          date:this.date,
        
    
        
          sucess:this.sucess,
        
    
        
          notes:this.notes,
        
    
        
          auditor:this.auditor
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceAudit.getAll()
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
      $class: "org.hyperfood.Audit",
      
        
          "auditId":this.auditId.value,
        
      
        
          "date":this.date.value,
        
      
        
          "sucess":this.sucess.value,
        
      
        
          "notes":this.notes.value,
        
      
        
          "auditor":this.auditor.value
        
      
    };

    this.myForm.setValue({
      
        
          "auditId":null,
        
      
        
          "date":null,
        
      
        
          "sucess":null,
        
      
        
          "notes":null,
        
      
        
          "auditor":null
        
      
    });

    return this.serviceAudit.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "auditId":null,
        
      
        
          "date":null,
        
      
        
          "sucess":null,
        
      
        
          "notes":null,
        
      
        
          "auditor":null 
        
      
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
      $class: "org.hyperfood.Audit",
      
        
          
        
    
        
          
            "date":this.date.value,
          
        
    
        
          
            "sucess":this.sucess.value,
          
        
    
        
          
            "notes":this.notes.value,
          
        
    
        
          
            "auditor":this.auditor.value
          
        
    
    };

    return this.serviceAudit.updateAsset(form.get("auditId").value,this.asset)
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

    return this.serviceAudit.deleteAsset(this.currentId)
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

    return this.serviceAudit.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "auditId":null,
          
        
          
            "date":null,
          
        
          
            "sucess":null,
          
        
          
            "notes":null,
          
        
          
            "auditor":null 
          
        
      };



      
        if(result.auditId){
          
            formObject.auditId = result.auditId;
          
        }else{
          formObject.auditId = null;
        }
      
        if(result.date){
          
            formObject.date = result.date;
          
        }else{
          formObject.date = null;
        }
      
        if(result.sucess){
          
            formObject.sucess = result.sucess;
          
        }else{
          formObject.sucess = null;
        }
      
        if(result.notes){
          
            formObject.notes = result.notes;
          
        }else{
          formObject.notes = null;
        }
      
        if(result.auditor){
          
            formObject.auditor = result.auditor;
          
        }else{
          formObject.auditor = null;
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
      
        
          "auditId":null,
        
      
        
          "date":null,
        
      
        
          "sucess":null,
        
      
        
          "notes":null,
        
      
        
          "auditor":null 
        
      
      });
  }

}

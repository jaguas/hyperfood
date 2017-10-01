/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Change the status of a product
 * @param {org.hyperfood.changeProductStatus} tx A funtion to change the status of a product.
 * @transaction
 */
function changeProductStatus(tx) {

    // Save the old value of the asset.
    var oldStatus = tx.product.status;

    // Update the asset with the new value.
    tx.product.status = tx.newStatus;

    // Get the asset registry for the asset.
    return getAssetRegistry('org.hyperfood.Product')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.product);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.hyperfood', 'ProductStatusChanged');
            event.product = tx.product;
            event.oldStatus = oldStatus;
            event.newStatus = tx.newStatus;
            emit(event);

        });

}

/**
 * Regulator audit funciton
 * @param {org.hyperfood.auditProduct} tx A function to audit any product
 * @transaction
*/

function auditProduct(tx){

  // Create an audit
  var factory = getFactory();
  var NS = 'org.hyperfood';
  var audit = null;

  return getAssetRegistry(NS + '.Audit')
         .then(function(auditRegistry){
        	audit = factory.newResource(NS,'Audit',tx.getIdentifier());
                audit.date = tx.date;
                audit.success = tx.success;
           	audit.notes = tx.notes;
                audit.auditor = tx.auditor; 
       		return auditRegistry.addAll([audit]);
         })
  // Add Audit to Product
         .then(function() {
         	return getAssetRegistry(NS + '.Product')
         })
         .then(function(productRegistry) {
 		if(tx.product.audits!=undefined){
		 tx.product.audits.push(audit);
		}
		else{
		 tx.product.audits=[audit];
		}
	        return productRegistry.update(tx.product);
         })
  // Emit an event saying product was audited
        .then(function () {

            // Emit an event for the modified asset.
            var event = factory.newEvent('org.hyperfood', 'ProductAudited');
            event.product = tx.product;
            event.date = audit.date;
            event.auditor = tx.auditor;
            emit(event);

        });
         
} 



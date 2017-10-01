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
    var oldValue = tx.product.status;

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
            event.oldValue = oldValue;
            event.newValue = tx.newValue;
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

  return getAssetRegistry(NS + '.Audit')
         .then(function(auditRegistry){
        	var audit = factory.newResourse(NS,'Audit',makeId(15));
                audit.date = tx.date;
                audit.success = tx.success;
           	audit.notes = tx.notes;
       		return auditRegistry.addAll([audit]);
         })
  // Add Audit to Product
         .then(function() {
         	return getAssetRegistry(NS + '.Product')
         })
         .then(function(productRegistry) {
		tx.product.audits.push(audit);
	        return productRegistry.update(tx.product);
         })
  // Emit an event saying product was audited
        .then(function () {

            // Emit an event for the modified asset.
            var event = factory.newEvent('org.hyperfood', 'ProductAudited');
            event.product = tx.product;
            event.date = audit.date;
            event.auditor = tx.auditor.lastName + ', ' + tx.auditor.firstName;
            emit(event);

        });
         
} 


function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


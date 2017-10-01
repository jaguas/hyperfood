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
 * Sample transaction processor function.
 * @param {org.hyperfood.changeProductStatus} tx The sample transaction instance.
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
            var event = getFactory().newEvent('org.hyperfood', 'SampleEvent');
            event.asset = tx.asset;
            event.oldValue = oldValue;
            event.newValue = tx.newValue;
            emit(event);

        });

}

/* 
 * The object representing an Order.
 * Author	: Rubisetcie
 */

class Order {
    clientId;
    restaurantId;
    address;        // Reference to an Address object
    date;
    status;
    taxes;          // Reference to a Price object
    menus = [];     // Reference to a list of Menu objects
    assign;
    
    toJson = function() {
        const json = {};
        
        json["clientId"] = this.clientId;
        json["restaurantId"] = this.restaurantId;
        json["address"] = this.address === null ? null : this.address.toJson();
        json["date"] = this.date.toString();
        json["status"] = this.status;
        json["taxes"] = this.taxes === null ? null : this.taxes.toJson();
        
        json["menus"] = [];
        this.menus.forEach((obj) => {
            json["menus"].push(obj.toJson());
        });
        
        json["assign"] = this.assign;

        return json;
    }
}

module.exports = Order;
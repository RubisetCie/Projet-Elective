/* 
 * The object representing an Order.
 * Author	: Rubisetcie
 */

class Order {
    id;
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
        
        json["id"] = this.id;
        json["clientId"] = this.clientId;
        json["restaurantId"] = this.restaurantId;
        json["address"] = this.address ? this.address.toJson() : null;
        json["date"] = this.date.toString();
        json["status"] = this.status;
        json["taxes"] = this.taxes ? this.taxes.toJson() : null;
        
        json["menus"] = [];
        this.menus.forEach((obj) => {
            json["menus"].push(obj.toJson());
        });
        
        json["assign"] = this.assign;

        return json;
    }
}

module.exports = Order;
/* 
 * The object representing an Order.
 * Author	: Rubisetcie
 */

// Importing the models
const Menu = require("../model/menu");

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
        
        if (this.id)    json["id"] = this.id;
        
        json["clientId"] = this.clientId;
        json["restaurantId"] = this.restaurantId;
        json["address"] = this.address ? this.address.toJson() : null;
        json["date"] = this.date ? this.date : null;
        json["status"] = this.status;
        json["taxes"] = this.taxes ? this.taxes.toJson() : null;
        
        json["menus"] = [];
        this.menus.forEach((obj) => {
            if (obj instanceof Menu)
                obj = obj.toJson();
            
            json["menus"].push(obj);
        });
        
        json["assign"] = this.assign;

        return json;
    }
}

module.exports = Order;
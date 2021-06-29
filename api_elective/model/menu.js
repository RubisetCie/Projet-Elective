/* 
 * The object representing a Menu.
 * Author	: Rubisetcie
 */

class Menu {
    id;
    name;
    image;          // Reference to an Image object
    price;          // Reference to a Price object
    items = [];
    
    toJson = function() {
        const json = {};
        
        json["id"] = this.id;
        json["name"] = this.name;
        json["image"] = this.image === null ? null : this.image.toJson();
        json["price"] = this.price === null ? null : this.price.toJson();
        json["items"] = this.items;

        return json;
    }
}

module.exports = Menu;
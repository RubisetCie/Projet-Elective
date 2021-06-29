/* 
 * The object representing a Restaurant.
 * Author	: Rubisetcie
 */

class Restaurant {
    name;
    address;        // Reference to an Address object
    status;
    image;          // Reference to an Image object
    openings = [];  // Reference to a list of Opening objects
    tags = [];
    description;
    menus = [];     // Reference to a list of Menu objects
    
    toJson = function() {
        const json = {};
        
        json["name"] = this.name;
        json["address"] = this.address === null ? null : this.address.toJson();
        json["status"] = this.status;
        json["image"] = this.image === null ? null : this.image.toJson();
        
        json["openings"] = [];
        this.openings.forEach((obj) => {
            json["openings"].push(obj.toJson());
        });
        
        json["tags"] = this.tags;
        json["description"] = this.description;
        
        json["menus"] = [];
        this.menus.forEach((obj) => {
            json["menus"].push(obj.toJson());
        });

        return json;
    }
}

module.exports = Restaurant;
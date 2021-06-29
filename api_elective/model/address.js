/* 
 * The object representing an user's Address.
 * Author	: Rubisetcie
 */

class Address {
    country;
    zipcode;
    city;
    address;
    
    toJson = function() {
        const json = {};
        
        json["country"] = this.country;
        json["zipcode"] = this.zipcode;
        json["city"] = this.city;
        json["address"] = this.address;

        return json;
    }
}

module.exports = Address;
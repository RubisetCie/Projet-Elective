/* 
 * The object representing a monetary value in the application.
 * Author	: Rubisetcie
 */

class Price {
    value;
    currency;
    
    toJson = function() {
        const json = {};
        
        json["value"] = this.value;
        json["currency"] = this.currency;

        return json;
    }
}

module.exports = Price;
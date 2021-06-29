/* 
 * The object representing an user's Billing.
 * Author	: Rubisetcie
 */

class Billing {
    number;
    crypto;
    owner;
    
    toJson = function() {
        const json = {};
        
        json["number"] = this.number;
        json["crypto"] = this.crypto;
        json["owner"] = this.owner;
        
        return json;
    }
}

module.exports = Billing;
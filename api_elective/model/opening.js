/* 
 * The object representing a restaurant's Opening.
 * Author	: Rubisetcie
 */

class Opening {
    open;
    close;
    
    toJson = function() {
        const json = {};
        
        json["open"] = this.open;
        json["close"] = this.close;

        return json;
    }
}

module.exports = Opening;
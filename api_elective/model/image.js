/* 
 * The object representing an image for the application.
 * Author	: Rubisetcie
 */

class Image {
    url;
    alt;
    
    toJson = function() {
        const json = {};
        
        json["url"] = this.url;
        json["alt"] = this.alt;

        return json;
    }
}

module.exports = Image;
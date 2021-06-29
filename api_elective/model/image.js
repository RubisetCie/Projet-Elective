/* 
 * The object representing an image for the application.
 * Author	: Rubisetcie
 */

class Image {
    url;
    name;
    
    toJson = function() {
        const json = {};
        
        json["url"] = this.url;
        json["name"] = this.name;

        return json;
    }
}

module.exports = Image;
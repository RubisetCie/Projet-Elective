/* 
 * The object representing an User.
 * Author	: Rubisetcie
 */

class User {
    id;
    username;
    usertype;
    email;
    password;
    firstname;
    lastname;
    address = [];   // Reference to a list of Address objects
    billing = [];   // Reference to a list of Billing objects
    
    toJson = function() {
        const json = {};
        
        json["id"] = this.id;
        json["username"] = this.username;
        json["usertype"] = this.usertype;
        json["email"] = this.email;
        json["password"] = this.password;
        json["firstname"] = this.firstname;
        json["lastname"] = this.lastname;
        
        json["address"] = [];
        this.address.forEach((obj) => {
            json["address"].push(obj.toJson());
        });
        
        json["billing"] = [];
        this.billing.forEach((obj) => {
            json["billing"].push(obj.toJson());
        });
        
        return json;
    }
}

module.exports = User;
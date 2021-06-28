/* 
 * The object representing an User.
 * Author	: Rubisetcie
 */

class User {
    username;
    usertype;
    email;
    password;
    firstname;
    lastname;
    country;
    zipcode;
    city;
    address;
    billingnumber;
    billincrypto;
    billinowner;
    
    toJson = function() {
        const json = {};
        
        json["username"] = this.username;
        json["usertype"] = this.usertype;
        json["email"] = this.email;
        json["password"] = this.password;
        json["firstname"] = this.firstname;
        json["lastname"] = this.lastname;
        json["country"] = this.country;
        json["zipcode"] = this.zipcode;
        json["city"] = this.city;
        json["address"] = this.address;
        json["billingnumber"] = this.billingnumber;
        json["billincrypto"] = this.billincrypto;
        json["billinowner"] = this.billinowner;
        
        return json;
    }
}

module.exports = User;
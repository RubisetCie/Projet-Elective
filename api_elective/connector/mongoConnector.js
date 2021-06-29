/* 
 * The code containing the connection procedures to the MongoDB database.
 * Author	: Rubisetcie
 */

// Importing the connector components
const MongoClient = require("mongodb").MongoClient;

// Importing the models
const Restaurant = require("../model/restaurant");
const Menu = require("../model/menu");
const Order = require("../model/order");
const Opening = require("../model/opening");
const Address = require("../model/address");
const Price = require("../model/price");
const Image = require("../model/image");

// Connection constants
const HOST = process.env.MONGO_HOST;
const DATABASE = process.env.MONGO_DATABASE;

const client = new MongoClient(HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Select restaurant by ID
module.exports.selectRestaurantById = function(id) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = { _id: id };
        
        db.collection("restaurants").findOne(query, function(err, result) {
            try {
                if (err)
                    throw err;
                
                const restaurant = deserializeRestaurant(result)
                
                console.log("AR Request finished");

                resolve(restaurant);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Creates a Restaurant object from JSON
deserializeRestaurant = function(json) {
    const restaurant = new Restaurant;
    const address = new Address;
    const image = new Image;
            
    const restaurantAddress = json["address"] === null ? null : json["address"];
    if (restaurantAddress) {
        address.country = restaurantAddress["country"] === null ? null : restaurantAddress["country"];
        address.zipcode = restaurantAddress["zipcode"] === null ? null : restaurantAddress["zipcode"];
        address.city = restaurantAddress["city"] === null ? null : restaurantAddress["city"];
        address.country = restaurantAddress["address"] === null ? null : restaurantAddress["address"];
    }

    const restaurantImage = json["image"] === null ? null : json["image"];
    if (restaurantImage) {
        image.url = restaurantImage["url"] === null ? null : restaurantImage["url"];
        image.alt = restaurantImage["alt"] === null ? null : restaurantImage["alt"];
    }

    restaurant.name = json["name"] === null ? null : json["name"];
    restaurant.address = address;
    restaurant.status = json["status"] === null ? null : json["status"];
    restaurant.image = image;

    restaurant.openings = [];
    json["openings"].forEach((op) => {
        const opening = new Opening;

        opening.open = op["open"];
        opening.close = op["close"];

        restaurant.openings.push(opening);
    });

    restaurant.tags = json["tags"] === null ? [] : json["tags"];
    restaurant.description = json["description"] === null ? null : json["description"];

    restaurant.menus = [];
    json["menus"].forEach((me) => {
        restaurant.menus.push(deserializeMenu(me));
    });
    
    return restaurant;
};

// Creates a Menu object from JSON
deserializeMenu = function(json) {
    const menu = new Menu;
    const image = new Image;
    const price = new Price;
    
    const menuImage = json["image"] === null ? null : json["image"];
    if (menuImage) {
        image.url = menuImage["url"] === null ? null : menuImage["url"];
        image.alt = menuImage["alt"] === null ? null : menuImage["alt"];
    }

    const menuPrice = json["price"] === null ? null : json["price"];
    if (menuPrice) {
        price.value = menuPrice["value"] === null ? null : menuPrice["value"];
        price.currency = menuPrice["currency"] === null ? null : menuPrice["currency"];
    }

    menu.name = json["name"] === null ? null : json["name"];
    menu.image = image;
    menu.price = price;

    menu.items = json["items"] === null ? [] : json["items"];
    
    return menu;
};

// Trigger connection
client.connect((err) => {
    if (err) {
        console.error("Error while connecting to MongoDB Database", err);
    } else {
        console.log("Connected to MongoDB Database");
    }
});
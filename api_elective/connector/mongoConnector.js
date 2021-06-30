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
        const query = [
            {
                $match: { _id: id }
            },
            {
                $lookup: {
                    from: "menus",
                    localField: "menus._id",
                    foreignField: "_id",
                    as: "menus"
                }
            }
        ];
        
        db.collection("restaurants").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const restaurant = deserializeRestaurant(await result.next());
                
                console.log("Request finished");

                resolve(restaurant);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select restaurant
module.exports.selectRestaurant = function(limit, offset, status) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = [
            {
                $lookup: {
                    from: "menus",
                    localField: "menus._id",
                    foreignField: "_id",
                    as: "menus"
                }
            },
            {
                $sort: { _id: 1 }
            }
        ];
        
        // Filter by status
        if (status) {
            const statusFilter = [];
            status.forEach((s) => {statusFilter.push({ status: s });});
            query.unshift({
                $match: {
                    $or: statusFilter
                }
            });
        }
        
        // Offset handling
        if (offset)
            query.push({ $skip: offset });

        // Limit handling
        if (limit)
            query.push({ $limit: limit });
        
        db.collection("restaurants").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const restaurants = [];
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    restaurants.push(deserializeRestaurant(await result.next()));
                    count++;
                }
                
                console.log(count + " rows returned");

                resolve(restaurants);
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
            
    const restaurantAddress = json["address"] ? null : json["address"];
    if (restaurantAddress) {
        address.country = restaurantAddress["country"] ? restaurantAddress["country"] : null;
        address.zipcode = restaurantAddress["zipcode"] ? restaurantAddress["zipcode"] : null;
        address.city = restaurantAddress["city"] ? restaurantAddress["city"] : null;
        address.country = restaurantAddress["address"] ? restaurantAddress["address"] : null;
    }

    const restaurantImage = json["image"] ? json["image"] : null;
    if (restaurantImage) {
        image.url = restaurantImage["url"] ? restaurantImage["url"] : null;
        image.alt = restaurantImage["alt"] ? restaurantImage["alt"] : null;
    }

    restaurant.name = json["name"] ? json["name"] : null;
    restaurant.address = address;
    restaurant.status = json["status"] ? json["status"] : null;
    restaurant.image = image;

    restaurant.openings = [];
    if (json["openings"]) {
        json["openings"].forEach((op) => {
            const opening = new Opening;

            opening.open = op["open"];
            opening.close = op["close"];

            restaurant.openings.push(opening);
        });
    }

    restaurant.tags = json["tags"] ? json["tags"] : [];
    restaurant.description = json["description"] ? json["description"] : null;

    restaurant.menus = [];
    if (json["menus"]) {
        json["menus"].forEach((me) => {
            restaurant.menus.push(deserializeMenu(me));
        });
    }
    
    return restaurant;
};

// Creates a Menu object from JSON
deserializeMenu = function(json) {
    const menu = new Menu;
    const image = new Image;
    const price = new Price;
    
    const menuImage = json["image"] ? json["image"] : null;
    if (menuImage) {
        image.url = menuImage["url"] ? menuImage["url"] : null;
        image.alt = menuImage["alt"] ? menuImage["alt"] : null;
    }

    const menuPrice = json["price"] ? json["price"] : null;
    if (menuPrice) {
        price.value = menuPrice["value"] ? menuPrice["value"] : null;
        price.currency = menuPrice["currency"] ? menuPrice["currency"] : null;
    }

    menu.name = json["name"] ? json["name"] : null;
    menu.image = image;
    menu.price = price;

    menu.items = json["items"] ? json["items"] : [];
    
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
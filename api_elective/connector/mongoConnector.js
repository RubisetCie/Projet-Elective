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

// Importing the ApiError exception class
const ApiError = require("../exception/apiError");

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
                
                if (!await result.hasNext())
                    throw new ApiError("Query returned nothing", 400);
                
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

// Select menu by ID
module.exports.selectMenuById = function(id) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = { _id: id };
        
        db.collection("menus").findOne(query, function(err, result) {
            try {
                if (err)
                    throw err;
                
                const menu = deserializeMenu(result);
                
                console.log("Request finished");

                resolve(menu);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select menu by restaurant ID
module.exports.selectMenuByRestaurantId = function(id) {
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
            },
            {
		$unwind: "$menus"
            },
            {
		$project:
		{
                    _id: "$menus._id",
                    name: "$menus.name",
                    image: "$menus.image",
                    price: "$menus.price",
                    items: "$menus.items"
		}
            },
            {
                $sort: { _id: 1 }
            }
        ];
        
        db.collection("restaurants").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const menus = [];
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    menus.push(deserializeMenu(await result.next()));
                    count++;
                }
                
                console.log(count + " rows returned");

                resolve(menus);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select menu
module.exports.selectMenu = function(limit, offset) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        
        db.collection("menus").find(async function(err, result) {
            try {
                if (err)
                    throw err;
                
                // Offset handling
                if (offset)
                    result.skip(offset);

                // Limit handling
                if (limit)
                    result.limit(limit);
                
                const menus = [];
                const count = await result.count(true);

                while (await result.hasNext())
                    menus.push(deserializeMenu(await result.next()));
                
                console.log(count + " rows returned");

                resolve(menus);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select order by client ID
module.exports.selectOrderByClientId = function(id) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = [
            {
                $match: { clientId: id }
            },
            {
                $lookup: {
                    from: "menus",
                    localField: "menus._id",
                    foreignField: "_id",
                    as: "menus"
                }
            },
            {
                $sort: { clientId: 1 }
            }
        ];
        
        db.collection("orders").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const orders = [];
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    orders.push(deserializeOrder(await result.next()));
                    count++;
                }
                
                console.log(count + " rows returned");

                resolve(orders);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select order by restaurant ID
module.exports.selectOrderByRestaurantId = function(id) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = [
            {
                $match: { restaurantId: id }
            },
            {
                $lookup: {
                    from: "menus",
                    localField: "menus._id",
                    foreignField: "_id",
                    as: "menus"
                }
            },
            {
                $sort: { restaurantId: 1 }
            }
        ];
        
        db.collection("orders").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const orders = [];
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    orders.push(deserializeOrder(await result.next()));
                    count++;
                }
                
                console.log(count + " rows returned");

                resolve(orders);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Select order
module.exports.selectOrder = function(limit, offset, clientId, status) {
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
        
        const filter = [];
        
        // Filter by clientId
        if (clientId) {
            filter.push({clientId: clientId});
        }
        
        // Filter by status
        if (status) {
            const statusFilter = [];
            status.forEach((s) => {statusFilter.push({ status: s });});
            filter.push({ $or: statusFilter });
        }
        
        // Applying the filter
        if (filter.length !== 0) {
            query.unshift({
                $match: {
                    $and: filter
                }
            });
        }
        
        // Offset handling
        if (offset)
            query.push({ $skip: offset });

        // Limit handling
        if (limit)
            query.push({ $limit: limit });
        
        db.collection("orders").aggregate(query, async function(err, result) {
            try {
                if (err)
                    throw err;
                
                const orders = [];
                var count = 0;  // Counter for retrieved rows

                while (await result.hasNext())
                {
                    orders.push(deserializeOrder(await result.next()));
                    count++;
                }
                
                console.log(count + " rows returned");

                resolve(orders);
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Insert order
module.exports.insertOrder = function(order) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        
        db.collection("orders").insertOne(order.toJson(), function(err) {
            try {
                if (err)
                    throw err;
                
                console.log("Request finished");

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
};

// Insert order
module.exports.updateOrder = function(order) {
    return new Promise((resolve, reject) => {
        const db = client.db(DATABASE);
        const query = { _id: order.id };
        const update = {};
        
        if (order.clientId)     update["clientId"] = order.clientId;
        if (order.restaurantId) update["restaurantId"] = order.restaurantId;
        if (order.address)      update["address"] = order.address;
        if (order.date)         update["date"] = order.date;
        if (order.status)       update["status"] = order.status;
        if (order.taxes)        update["taxes"] = order.taxes;
        if (order.menus)        update["menus"] = order.menus;
        if (order.assign)       update["assign"] = order.assign;
        
        db.collection("orders").updateOne(query, {$set: update}, function(err) {
            try {
                if (err)
                    throw err;
                
                console.log("Request finished");

                resolve();
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
            
    const restaurantAddress = json["address"];
    if (restaurantAddress) {
        address.country = restaurantAddress["country"] ? restaurantAddress["country"] : null;
        address.zipcode = restaurantAddress["zipcode"] ? restaurantAddress["zipcode"] : null;
        address.city = restaurantAddress["city"] ? restaurantAddress["city"] : null;
        address.country = restaurantAddress["address"] ? restaurantAddress["address"] : null;
    }

    const restaurantImage = json["image"];
    if (restaurantImage) {
        image.url = restaurantImage["url"] ? restaurantImage["url"] : null;
        image.alt = restaurantImage["alt"] ? restaurantImage["alt"] : null;
    }

    restaurant.id = json["_id"];
    restaurant.name = json["name"] ? json["name"] : null;
    restaurant.address = address;
    restaurant.status = json["status"] ? json["status"] : null;
    restaurant.image = image;

    restaurant.openings = [];
    if (json["openings"] && Array.isArray(json["openings"])) {
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
    if (json["menus"] && Array.isArray(json["menus"])) {
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
    
    const menuImage = json["image"];
    if (menuImage) {
        image.url = menuImage["url"] ? menuImage["url"] : null;
        image.alt = menuImage["alt"] ? menuImage["alt"] : null;
    }

    const menuPrice = json["price"];
    if (menuPrice) {
        price.value = menuPrice["value"] ? menuPrice["value"] : null;
        price.currency = menuPrice["currency"] ? menuPrice["currency"] : null;
    }

    menu.id = json["_id"];
    menu.name = json["name"] ? json["name"] : null;
    menu.image = image;
    menu.price = price;

    menu.items = json["items"] ? json["items"] : [];
    
    return menu;
};

// Creates an Order object from JSON
deserializeOrder = function(json) {
    const order = new Order;
    const address = new Address;
    const taxes = new Price;
            
    const orderAddress = json["address"];
    if (orderAddress) {
        address.country = orderAddress["country"] ? orderAddress["country"] : null;
        address.zipcode = orderAddress["zipcode"] ? orderAddress["zipcode"] : null;
        address.city = orderAddress["city"] ? orderAddress["city"] : null;
        address.country = orderAddress["address"] ? orderAddress["address"] : null;
    }
    
    const orderTaxes = json["taxes"];
    if (orderTaxes) {
        taxes.value = orderTaxes["value"] ? orderTaxes["value"] : null;
        taxes.currency = orderTaxes["currency"] ? orderTaxes["currency"] : null;
    }
    
    order.id = json["_id"];
    order.clientId = json["clientId"];
    order.restaurantId = json["restaurantId"];
    order.address = address;
    order.date = json["date"] ? new Date(json["date"]) : null;
    order.status = json["status"] ? json["status"] : null;
    order.taxes = taxes;
    order.menus = [];
    order.assign = json["assign"] ? json["assign"] : null;
    
    order.menus = [];
    if (json["menus"] && Array.isArray(json["menus"])) {
        json["menus"].forEach((me) => {
            order.menus.push(deserializeMenu(me));
        });
    }
    
    return order;
};

// Trigger connection
client.connect((err) => {
    if (err) {
        console.error("Error while connecting to MongoDB Database", err);
    } else {
        console.log("Connected to MongoDB Database");
    }
});
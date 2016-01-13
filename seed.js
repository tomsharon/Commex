/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Item = Promise.promisifyAll(mongoose.model('Item'));
var createdItems = [];
var quality = ['Poor', 'Average', 'Above Average', 'Perfect']
var shortDescription = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', 'Far far away, behind the word mountains, far from the house.', 'One morning, when Gregor Samsa woke from troubled dreams.', 'The quick, brown fox jumps over a lazy dog.'];
var longDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
var seedUsers = function () {
    var users = [];
    var emails = [];
    var password = 'password123';

    for(var i = 0; i < 100; i++){
      users.push(new User({
        email: 'user'+i+'@gmail.com',
        password: 'password123',
        salt: 'xyz',
        isAdmin: false,
        name: 'user'+i,
        streetName: '123 fish street',
        city: 'New York',
        zipCode: 77379,
        state: 'New York',
      }));
    }
    return User.createAsync(users);
};

function randomGenerator(){
  var rand = Math.floor(Math.random() * 100) + 1
  return rand.toString();
}

function seedItems (){
  var items = [].concat(engergyGenerator()).concat(metalGenerator()).concat(grainGenerator()).concat(oilseedsGenerator()).concat(softsGenerator()).concat(livestockGenerator())
  return Item.createAsync(items);
}

function engergyGenerator () {
    var engeries = ["Oil", "Natural Gas", "Electricity"]

    var result = []
    for(var i = 0; i < engeries.length; i++){
            result.push(new Item({
              itemName: engeries[i],
              category: 'Energy',
              price: parseInt(randomGenerator()) * 10,
              unit: 'Kilowatts',
              inventory: parseInt(randomGenerator()) * 10,
              shortDescription: shortDescription,
              longDescription: longDescription
            }))
    }
    return result;
}

function metalGenerator () {
    var metals = ["Base Metals", " Precous Metals"]

    var result = [];

    for(var i = 0; i < metals.length; i++){
          result.push(new Item({
            itemName: metals[i],
            category: 'Metal',
            price: parseInt(randomGenerator()) * 10,
            unit: 'Metric Tons',
            inventory: parseInt(randomGenerator()) * 10,
            shortDescription: shortDescription,
            longDescription: longDescription
          }))
    }
    return result;
}

function grainGenerator () {
    var grains = ["Corn", "Wheat", "Barley", "Rice"]

    var result = [];

    for(var i = 0; i < grains.length; i++){
          result.push(new Item({
            itemName: grains[i],
            category: 'Grain',
            price: parseInt(randomGenerator()) * 10,
            unit: 'Bushels',
            inventory: parseInt(randomGenerator()) * 10,
            shortDescription: shortDescription,
            longDescription: longDescription
          }))
    }
    return result;
}

function oilseedsGenerator(){
  var oilseeds = ['Soybeans', 'Rapeseed', 'Palm Oil'];
  var result = [];
  for(var i = 0; i < oilseeds.length; i++){
      result.push(new Item({
        itemName: oilseeds[i],
        category: 'Energy',
        price: parseInt(randomGenerator()) * 10,
        unit: 'Metric Tons',
        inventory: parseInt(randomGenerator()) * 10,
        shortDescription: shortDescription,
        longDescription: longDescription
      }))
  }
  return result;
}

function softsGenerator(){
  var softs = ['Sugar', 'Coffee', 'Cocoa', 'Rubber', 'Citrus', 'Cotton'];
  var result = [];
  for(var i = 0; i < softs.length; i++){
      result.push(new Item({
        itemName: softs[i],
        category: 'Softs',
        price: parseInt(randomGenerator()) * 10,
        unit: 'Kilograms',
        inventory: parseInt(randomGenerator()) * 10,
        shortDescription: shortDescription,
        longDescription: longDescription
      }))
  }
  return result;
}

function livestockGenerator(){
  var livestock = ['Lean Hogs', 'Live Cattle'];
  var result = [];
  for(var i = 0; i < livestock.length; i++){
      result.push(new Item({
        itemName: livestock[i],
        category: 'Live Stock',
        price: parseInt(randomGenerator()) * 10,
        unit: 'Heads',
        inventory: parseInt(randomGenerator()) * 10,
        shortDescription: shortDescription,
        longDescription: longDescription
      }));
  }
  return result;
}

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function(){
      return Item.findAsync({})
    })
    .then(function(items){
      if(items.length === 0){
        return seedItems()
      } else {
        console.log(chalk.magenta('Seems to already be item data, exiting!'));
        process.kill(0);
      }
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

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
    var quality = ['Poor', 'Average', 'Above Average', 'Pefect'];
    var result = []
    for(var i = 0; i < engeries.length; i++){
        for(var j = 0; j < quality.length; j++){
            result.push(new Item({
              itemName: quality[j] + " " + engeries[i],
              category: 'Energy',
              price: parseInt(randomGenerator()) * 10,
              unit: 'Kilowatts',
              inventory: parseInt(randomGenerator()) * 10
            }))
        }
    }
    return result;
}

function metalGenerator () {
    var metals = ["Base Metals", " Precous Metals"]
    var quality = ['Poor', 'Average', 'Above Average', 'Pefect'];
    var result = [];

    for(var i = 0; i < metals.length; i++){
        for(var j = 0; j < quality.length; j++){
          result.push(new Item({
            itemName: quality[j] + " " + metals[i],
            category: 'Metal',
            price: parseInt(randomGenerator()) * 10,
            unit: 'Metric Tons',
            inventory: parseInt(randomGenerator()) * 10
          }))
        }
    }
    return result;
}

function grainGenerator () {
    var grains = ["Corn", "Wheat", "Barley", "Rice"]
    var quality = ['Poor', 'Average', 'Above Average', 'Pefect'];
    var result = [];

    for(var i = 0; i < grains.length; i++){
        for(var j = 0; j < quality.length; j++){
          result.push(new Item({
            itemName: quality[j] + " " + grains[i],
            category: 'Grain',
            price: parseInt(randomGenerator()) * 10,
            unit: 'Bushels',
            inventory: parseInt(randomGenerator()) * 10
          }))
        }
    }
    return result;
}

function oilseedsGenerator(){
  var oilseeds = ['Soybeans', 'Rapeseed', 'Palm Oil'];
  var quality = ['Poor', 'Average', 'Above Average', 'Perfect'];
  var result = [];
  for(var i = 0; i < oilseeds.length; i++){
    for(var j = 0; j < quality.length; j++){
      result.push(new Item({
        itemName: quality[j] + " " + oilseeds[i],
        category: 'Energy',
        price: parseInt(randomGenerator()) * 10,
        unit: 'Metric Tons',
        inventory: parseInt(randomGenerator()) * 10
      }))
    }
  }
  return result;
}

function softsGenerator(){
  var softs = ['Sugar', 'Coffee', 'Cocoa', 'Rubber', 'Citrus', 'Cotton'];
  var quality = ['Poor', 'Average', 'Above Average', 'Perfect'];
  var result = [];
  for(var i = 0; i < softs.length; i++){
    for(var j = 0; j < quality.length; j++){
      result.push(new Item({
        itemName: quality[j] + " " + softs[i],
        category: 'Softs',
        price: parseInt(randomGenerator()) * 10,
        unit: 'Kilograms',
        inventory: parseInt(randomGenerator()) * 10
      }))
    }
  }
  return result;
}

function livestockGenerator(){
  var livestock = ['Lean Hogs', 'Live Cattle'];
  var quality = ['Poor', 'Average', 'Above Average', 'Perfect'];
  var result = [];
  for(var i = 0; i < livestock.length; i++){
    for(var j = 0; j < quality.length; j++){
      result.push(new Item({
        itemName: quality[j] + " " + livestock[i],
        category: 'Live Stock',
        price: parseInt(randomGenerator()) * 10,
        unit: 'Heads',
        inventory: parseInt(randomGenerator()) * 10
      }));
    }
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

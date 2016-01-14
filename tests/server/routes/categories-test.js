// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');

var Item = mongoose.model('Item');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

//supertest makes HTTP requests
var supertest = require('supertest');
var app = require('../../../server/app');

describe("Category Routes", function() {
	var testAgent = supertest.agent(app);

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe("all category routes", function() {

		var testItem;

		Item.create({
			itemName: "DummyItem",
			category: "Energy",
			price: 10,
			unit: "kw",
			inventory: 100,
			shortDescription: "That good good"
		})
			.then(function(createdItem) {
				testItem = createdItem;
			})

		it('/api/categories/', function (done) {

			testAgent.get("/api/categories")
				.expect(200)
				.end(done);


		});

		it("/api/categories/Energy", function(done) {

			testAgent.get("/api/categories/Energy")
				.expect(200)
				.end(done)
		})

		it("/api/categories/Energy/itemId", function(done) {

			testAgent.get("/api/categories/Energy" + testItem._id)
				.expect(200)
				.end(done)
		})
	})
})
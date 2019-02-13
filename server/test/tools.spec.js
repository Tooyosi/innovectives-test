var expect = require("chai").expect;
var route = require("../routes/index.js");
var app = require("../app.js");

var request = require("supertest")

describe("GET /files", function(){

    it("should print the details from the scanned folder", function(done){

        request(app)
            .get("/files")
            .set("Accept", "Application/json")
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            })
    });
})
var expect = require("chai").expect;
var route = require("../routes/index.js");
var app = require("../app.js");


var request = require("supertest")

const userCredentials = {name: "admin", password: "admin"} || {name: "guest", password: "guest"}

var authenticatedUser = request.agent(app);

var token = '';

// authenyicate the users
beforeEach(function(done){
    authenticatedUser
        .post('/login')
        .send(userCredentials)
        .end((err, response) => {
            expect(response.statusCode).to.equal(200)
            var result = JSON.parse(response.text);
            token = result.access_token;
            
        })
        done();
})

describe("GET /files", function(done){
    it("should return a 401 response if not logged in", function(done){
        request(app)
            .get("/files")
            .expect(401, done)
    })

    it("should print the details from the scanned folder", function(done){
        authenticatedUser
            .get("/files")
            .set('Authorization', 'Bearer ' + token)
            .set("Accept", "Application/json")
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            })
    });
})
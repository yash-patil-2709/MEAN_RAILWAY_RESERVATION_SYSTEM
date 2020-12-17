let chai= require("chai");
let chaiHttp= require('chai-http');
let server= require("../admins");

//assertion style
chai.should();

chai.use(chaiHttp);
var expect = chai.expect;

describe('Admins API', () => {

  /**
   * Test the GET route
   */
  describe("GET /admin/trains", () => {
    it("It should GET all the trains", (done) => {
        chai.request(server)
            .get("/admin/trains")
            .end((err,response) =>{
                // response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(14);
            done();
          });
    });
  });

  /**
   * Test the GET route
   */
  describe("GET /admin/bookings", () => {
    it("It should GET all the bookings", (done) => {
        chai.request(server)
            .get("/admin/bookings")
            .end((err,response) =>{
                // response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(8);
            done();
          });
    });
  });


  /**
   * Test the GET (by name) route
   */
  describe("GET /admin/:name", () => {
    it("It should GET the train by NAME", (done) => {
        const trainname= "Mumbai Express";
        chai.request(server)
            .get("/admin/" + trainname)
            .end((err,response) =>{
              //console.log(response);
                // response.should.have.status(200);
                response.body.should.be.a('array');

            done();
          });
    });
  });

  /**
     * Test the POST route
     */
    describe("POST /admin/trains", () => {
        it("It should POST a new train", (done) => {
            const train = {
                trainno: 561,
                trainname: "Delhi Express",
                source: "Mumbai",
                destination: "Delhi",
                seatavail:14,
                depttime:"14:05",
                arrivename:"13:04",
                fare: 158
            };
            chai.request(server)
                .post("/admin/trains")
                .send(train)
                .end((err, response) => {
                    // console.log(response);
                     response.should.have.status(200);
                    // response.body.should.be.a('object');

                done();
                });
        });

  });

  /**
    * Test the PUT route
    */
   // describe("PUT /admin/:name", () => {
   //     it("It should PUT an existing train", (done) => {
   //         const trainname = "Mumbai Express";
   //         const train = {
   //           trainno: 1010,
   //           trainname: "Mumbai Express",
   //           source: "Mumbai",
   //           destination: "Pune",
   //           seatavail:10,
   //           depttime:"06:00",
   //           arrivename:"10:00",
   //           fare: 120
   //         };
   //         chai.request(server)
   //             .put("/admin/" + trainname)
   //             .send(train)
   //             .end((err, response) => {
   //                 response.body.should.be.a('object');
   //             done();
   //           });
   //     });
   //
   //  });

    /**
     * Test the DELETE route
     */
    describe("DELETE /admin/:trainname", () => {
        it("It should DELETE an existing train", (done) => {
            const trainname = "Konkan Express";
            chai.request(server)
                .delete("/admin/" + trainname)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
    });




});

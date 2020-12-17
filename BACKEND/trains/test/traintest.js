let chai= require("chai");
let chaiHttp= require('chai-http');
let server= require("../trains");

//assertion style
chai.should();

chai.use(chaiHttp);
var expect = chai.expect;

describe('Trains API', () => {

  /**
   * Test the GET route
   */
  describe("GET /trains", () => {
    it("It should GET all the trains", (done) => {
        chai.request(server)
            .get("/trains")
            .end((err,response) =>{
                // response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(14);
            done();
          });
    });
  });

  /**
   * Test the GET (by name) route
   */
  describe("GET /train/:name", () => {
    it("It should GET the train by NAME", (done) => {
        const trainname= "Mumbai Express";
        chai.request(server)
            .get("/train/" + trainname)
            .end((err,response) =>{
              // console.log(response);
                // response.should.have.status(200);
                response.body.should.be.a('array');

            done();
          });
    });
  });

  /**
   * Test the GET (by source and destination) route
   */
  describe("GET /train/:source/:destination", () => {
    it("It should GET the train by SOURCE and DESTINATION", (done) => {
        const source= "Mumbai";
        const destination= "Pune";
        chai.request(server)
            .get("/train/" + source +'/'+ destination)
            .end((err,response) =>{
              // console.log(response);
                response.body.should.be.a('array');
            done();
          });
    });
  });

  /**
     * Test the POST route
     */
    describe("POST /train", () => {
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
                .post("/train")
                .send(train)
                .end((err, response) => {
                    // response.should.have.status(201);
                    response.body.should.be.a('object');

                done();
                });
        });

  });


  /**
    * Test the PUT route
    */
   // describe("PUT /train/:name", () => {
   //     it("It should PUT an existing train", (done) => {
   //         const trainname = "Mumbai Express";
   //         const train = {
   //           trainno: 1002,
   //           trainname: "Mumbai Express",
   //           source: "Mumbai",
   //           destination: "Pune",
   //           seatavail:10,
   //           depttime:"06:00",
   //           arrivename:"10:00",
   //           fare: 120
   //         };
   //         chai.request(server)
   //             .put("/train/" + trainname)
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
    describe("DELETE /train/:trainname", () => {
        it("It should DELETE an existing train", (done) => {
            const trainname = "Delhi Express";
            chai.request(server)
                .delete("/train/" + trainname)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
    });
});

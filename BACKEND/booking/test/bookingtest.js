let chai= require("chai");
let chaiHttp= require('chai-http');
let server= require("../bookings");

//assertion style
chai.should();

chai.use(chaiHttp);
var expect = chai.expect;

describe('Bookings API', () => {

  /**
   * Test the GET route
   */
  describe("GET /bookings", () => {
    it("It should GET all the bookings", (done) => {
        chai.request(server)
            .get("/bookings")
            .end((err,response) =>{
                // response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(7);
            done();
          });
    });
  });

  describe("GET /booking/:source/:destination", () => {
    it("It should GET the booking train search by SOURCE and DESTINATION", (done) => {
        const source= "Mumbai";
        const destination= "Pune";
        chai.request(server)
            .get("/booking/" + source +'/'+ destination)
            .end((err,response) =>{
                //console.log(response);
                response.body.should.be.a('array');
            done();
          });
    });
  });

  /**
   * Test the GET (by name) route
   */
  describe("GET /b/:name", () => {
    it("It should GET the booking train by NAME", (done) => {
        const trainname= "Mumbai Express";
        chai.request(server)
            .get("/b/" + trainname)
            .end((err,response) =>{
              //console.log(response);
                // response.should.have.status(200);
                response.body.should.be.a('array');
            done();
          });
    });
  });

  /**
   * Test the GET (by name) route
   */
  // describe("GET /booking/:pnr", () => {
  //   it("It should GET the booking train by pnr", (done) => {
  //       const pnr= 902;
  //       chai.request(server)
  //           .get("/booking/" + pnr)
  //           .end((err,response) =>{
  //             console.log(response);
  //               // response.should.have.status(200);
  //               response.body.should.be.a('object');
  //           done();
  //         });
  //   });
  // });

  /**
   * Test the DELETE route
   */
  describe("DELETE /cancelling/:pnr", () => {
      it("It should DELETE an existing booking", (done) => {
          const pnr = 908;
          chai.request(server)
              .delete("/cancelling/" + pnr)
              .end((err, response) => {
                  response.should.have.status(200);
              done();
              });
      });
  });

});

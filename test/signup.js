const expect = require("chai").expect;
const auth = require("../src/controllers/auth");

it("should throw an error if user already exist", function () {
  const req = {
    firstName: "Daniel",
    lastName: "Okyere",
    email: "daniel@mail.com",
    password: "12345",
  };
  expect(auth.signup.bind(this, req, {}, () => {})).to.throw(
    "User Already Exist"
  );
});

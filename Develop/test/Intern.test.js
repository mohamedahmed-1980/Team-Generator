const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
  const testValue = "UCLA";
  const e = new Intern("Foo", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
// initialize
const intrtn =  new Intern("Foo", 1, "test@test.com", "UCLA");

// invoke 
const actual = intrtn.getRole();

// assert
expect(actual).toBe("Intern")

//   const testValue = "Intern";
//   const e = new Intern("Foo", 1, "test@test.com", "UCLA");
//   expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "UCLA";
  const e = new Intern("Foo", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});

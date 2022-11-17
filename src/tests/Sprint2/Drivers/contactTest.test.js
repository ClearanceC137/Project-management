const contactdetails = require("../Stubs/contactTest");

test("check valid name and email", () => {
    expect(contactdetails(["tiisetso"])).toBe(false)
})
const signup = require("../Stubs/signupTest");


test("checks for valid signup details", () => {
    expect(signup("tii", "0855853845", "tii@gmail.com", "password", "password")).toBe(true)
})
test("checks for valid signup details", () => {
    expect(signup("david", "9044405950495059", "tiisetso@gmail.com", "2344", "2344")).toBe("Number invalid")
})
test("checks for valid signup details", () => {
    expect(signup("tii", "0855853845", "tiiset", "password", "password")).toBe("Email too short")
})
test("checks for valid signup details", () => {
    expect(signup("tii", "0855853845", "tii@gmail.com", "pass", "pass")).toBe("Password too short")
})
test("checks for valid signup details", () => {
    expect(signup("ti", "0855853845", "tii@gmail.com", "password", "password")).toBe("Name too short")
})
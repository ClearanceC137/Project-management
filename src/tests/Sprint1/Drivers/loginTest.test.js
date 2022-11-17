const login = require("../Stubs/loginTest");


test("checks for valid login details", () => {
    expect(login("tii@gmail.com", "password", "password")).toBe(true)
})
test("checks for valid login details", () => {
    expect(login("tii", "234", "234")).toBe(false)
})
test("checks for valid login details", () => {
    expect(login("tii@gmail.com", "pass", "pass")).toBe("Password too short")
})
test("checks for valid login details", () => {
    expect(login("tiiset", "password", "password")).toBe("Email too short")
})
test("checks for valid login details", () => {
    expect(login("tii@gmail.com", "password", "passwordd")).toBe("Passwords do not match")
})
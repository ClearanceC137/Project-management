function login(email, password, repass) {
    if (password === repass) {
        if (email.length > 6 && password.length > 4) {
            return true;
        }
        else if (email.length <= 6 && password.length <= 4) {
            return false
        }
        else if (password.length <= 4) {
            return "Password too short"
        }
        else if (email.length <= 6) {
            return "Email too short"
        }
    }
    else {
        return "Passwords do not match"
    }
}

module.exports = login;
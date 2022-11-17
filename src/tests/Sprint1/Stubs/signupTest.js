function signup(name, cell, email, password, repass) {
    if (password === repass) {
        if (name.length > 2 && cell.length === 10 && email.length > 6 && password.length > 4) {
            return true;
        }
        else if (email.length <= 6 && password.length <= 4 && cell.length != 10 && name.length < 2) {
            return false
        }
        else if (name.length <= 2) {
            return "Name too short"
        }
        else if (cell.length != 10) {
            return "Number invalid"
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

module.exports = signup
// RegEx rules can be tested on https://regexr.com/

// Error texts for different fields
const errorTextName = "Name should contain only alphabets.";
const errorTextUsername = "Username should start with an alphabet. \nIt should not contain any special character other than underscore, period, or dash. \nIt should not contain undercore, period, or dash consecutively.";
const errorTextEmail = "Invalid Email";
const errorTextPassword = "Password should be a combination of lowercase & uppercase alphabets, numbers, and symbols only";
const errorTextAddress = "Address should not contain special characters.";
const errorTextCity = "City should contain only alphabets.";
const errorTextState = "State should contain only alphabets & space.";
const errorTextContactNumber = "Invalid contact no.";
const errorTextGSTIN = "Invalid GSTIN.";
const errorTextSellerName = "Seller name should contain only alphabets & space.";
const errorTextCategory = "Category should contain only alphabets & space.";

// This function calls different functions for validating all fields
// If any field is invalid, then assigning errorText of that field to validationMsg variable & returning that.
export function validateUser(requestBody) {
    console.log("\nsrc / validation.js / validateUser() called");
    const { f_name, l_name, username, email, password, address, city, state, mobile } = requestBody;
    let validationMsg;

    if (!validName(f_name) || !validName(l_name)) {
        validationMsg = errorTextName;
    }
    else if (!validUsername(username)) {
        validationMsg = errorTextUsername;
    }
    else if (!validEmail(email)) {
        validationMsg = errorTextEmail;
    }
    else if (!validPassword(password)) {
        validationMsg = errorTextPassword;
    }
    else if (!validAddress(address)) {
        validationMsg = errorTextAddress;
    }
    else if (!validCity(city)) {
        validationMsg = errorTextCity;
    }
    else if (!validState(state)) {
        validationMsg = errorTextState;
    }
    else if (!validContactNumber(mobile)) {
        validationMsg = errorTextContactNumber;
    }
    else {
        validationMsg = "OK";
    }
    console.log(`\nValidation message: ${validationMsg}`);
    return validationMsg;
}

// This function calls different functions for validating all fields
// If any field is invalid, then assigning errorText of that field to validationMsg variable & returning that.
export function validateSeller(requestBody) {
    console.log("\nsrc / validation.js / validateSeller() called");
    const { name, category, username, email, password, pickup_address, city, state, phone, gstin } = requestBody;
    let validationMsg;

    if (!validSellerName(name)) {
        validationMsg = errorTextSellerName;
    }
    else if (!validName(category)) {
        validationMsg = errorTextCategory;
    }
    else if (!validUsername(username)) {
        validationMsg = errorTextUsername;
    }
    else if (!validEmail(email)) {
        validationMsg = errorTextEmail;
    }
    else if (!validPassword(password)) {
        validationMsg = errorTextPassword;
    }
    else if (!validAddress(pickup_address)) {
        validationMsg = errorTextAddress;
    }
    else if (!validCity(city)) {
        validationMsg = errorTextCity;
    }
    else if (!validState(state)) {
        validationMsg = errorTextState;
    }
    else if (!validContactNumber(phone)) {
        validationMsg = errorTextContactNumber;
    }
    else if (!validGSTIN(gstin)) {
        validationMsg = errorTextGSTIN;
    }
    else {
        validationMsg = "OK"
    }
    console.log(`\nValidation message: ${validationMsg}`);
    return validationMsg;
}

// Name should contain only alphabets & length should lie b/w 2 & 50
function validName(name) {
    console.log("\nsrc / validation.js / validName() called");
    const nameRegex = /^[a-zA-Z ]{2,50}$/;

    if (nameRegex.test(name)) {
        console.log("--> Valid name");
        return true;
    }
    else {
        console.log("--> Invalid name");
        return false;
    }
}

// same rule as of name
function validCity(city) {
    console.log("\nsrc / validation.js / validCity() called");
    const cityRegex = /^[a-zA-Z ]{2,40}$/;

    if (cityRegex.test(city)) {
        console.log("--> Valid city name");
        return true;
    }
    else {
        console.log("--> Invalid city name");
        return false;
    }
}

// same rule as of name
function validState(state) {
    console.log("\nsrc / validation.js / validState() called");
    const stateRegex = /^[a-zA-Z ]{2,40}$/;

    if (stateRegex.test(state)) {
        console.log("--> Valid state name");
        return true;
    }
    else {
        console.log("--> Invalid state name");
        return false;
    }
}

// Username should start with an alphabet
// should not contain any character other than alphabets, numbers, underscore, period, dash
// should not contain underscore, period, dash consecutively
function validUsername(username) {
    console.log("\nsrc / validation.js / validUsername() called");

    const usernameRegex = /^(?!.*\.\.)(?!.*__)(?!.*--)(?!.*-_)(?!.*-\.)(?!.*_-)(?!.*_\.)(?!.*\.-)(?!.*\._)[a-zA-Z]+[a-zA-Z0-9_.-]{2,}$/;
    if (usernameRegex.test(username)) {
        console.log("--> Valid username");
        return true;
    }
    else {
        console.log("--> Invalid username");
        return false;
    }
}

// https://help.xmatters.com/ondemand/trial/valid_email_format.htm
export function validEmail(email) {
    console.log("\nsrc / validation.js / validEmail() called");
    const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9_-]+[.]*[a-zA-Z0-9]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
        console.log("--> Valid email");
        return true;
    } else {
        console.log("--> Invalid email");
        return false;
    }
}

// Password should contain atleast 1 uppercase, 1 lowercase, 1 symbol, and 1 number
function validPassword(password) {
    console.log("\nsrc / validation.js / validPassword() called");
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9!@#$%^&*()_+=`~[\]{}\-;:'",.<>\\/?]{6,50}$/;

    if (passwordRegex.test(password)) {
        console.log("--> Valid password");
        return true;
    }
    else {
        console.log("--> Invalid password");
        return false;
    }
}

// Address should not contain any special character other than space, comma, dash, or period
// Address should not contain any special character other than space, slash, backslash comma, dash, or period
function validAddress(address) {
    console.log("\nsrc / validation.js / validAddress() called");
    const addressRegex = /^[a-zA-Z0-9\-/\.,)( ]+$/;

    if (addressRegex.test(address)) {
        console.log("--> Valid address");
        return true;
    }
    else {
        console.log("--> Invalid address");
        return false;
    }
}

// should contain exactly 10 numbers
function validContactNumber(contactNumber) {
    console.log("\nsrc / validation.js / validContactNumber() called");
    const contactNumberRegex = /^\d{10}$/;

    if (contactNumberRegex.test(contactNumber)) {
        console.log("--> Valid contact number");
        return true;
    }
    else {
        console.log("--> Invalid contact number");
        return false;
    }
}

// Seller name should contain only alhpabets & spaces
function validSellerName(name) {
    console.log("\nsrc / validation.js / validSellerName() called");
    const nameRegex = /^[0-9a-zA-Z ]{2,50}$/;

    if (nameRegex.test(name)) {
        console.log("--> Valid name");
        return true;
    }
    else {
        console.log("--> Invalid name");
        return false;
    }
}

// https://www.gstzen.in/a/format-of-a-gst-number-gstin.html
function validGSTIN(gstin) {
    console.log("\nsrc / validation.js / validGSTIN() called");
    const gstinRegex = /^[0-9]{2}[0-9a-zA-Z]{11}[1-9a-jA-Zm-nM-Nr-sR-SzZ]{1}[0-9a-zA-Z]{1}$/;

    if (gstinRegex.test(gstin)) {
        console.log("--> Valid GSTIN");
        return true;
    }
    else {
        console.log("--> Invalid GSTIN");
        return false;
    }
}
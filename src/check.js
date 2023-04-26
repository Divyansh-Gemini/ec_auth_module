export function isUserDataComplete(body) {
    let params = Object.keys(body);

    // checking that body should contain exactly 9 elements
    if (params.length != 9) {
        return "Body should contain f_name, l_name, username, email, password, address, city, state, mobile";
    }

    // checking that any required field should not missing
    else if (!params.includes("f_name")) {
        return "f_name not found";
    }
    else if (!params.includes("l_name")) {
        return "l_name not found";
    }
    else if (!params.includes("username")) {
        return "username not found";
    }
    else if (!params.includes("email")) {
        return "email not found";
    }
    else if (!params.includes("password")) {
        return "password not found";
    }
    else if (!params.includes("address")) {
        return "address not found";
    }
    else if (!params.includes("city")) {
        return "city not found";
    }
    else if (!params.includes("state")) {
        return "state not found";
    }
    else if (!params.includes("mobile")) {
        return "mobile not found";
    }

    // checking that no field should be empty (except l_name)
    else if (body.f_name.trim().length == 0) {
        return "f_name should not empty";
    }
    else if (body.username.trim().length == 0) {
        return "username should not empty";
    }
    else if (body.email.trim().length == 0) {
        return "email should not empty";
    }
    else if (body.password.trim().length == 0) {
        return "password should not empty"
    }
    else if (body.address.trim().length == 0) {
        return "address should not empty";
    }
    else if (body.city.trim().length == 0) {
        return "city should not empty";
    }
    else if (body.state.trim().length == 0) {
        return "state should not empty";
    }
    else if (body.mobile.trim().length == 0) {
        return "mobile should not empty";
    }

    // checking any data should not be too long
    else if (body.f_name.trim().length > 50) {
        return "f_name should be of less than or equal to 50 characters";
    }
    else if (body.l_name.trim().length > 50) {
        return "l_name should be of less than or equal to 50 characters";
    }
    else if (body.username.trim().length > 50) {
        return "username should be of less than or equal to 50 characters";
    }
    else if (body.email.trim().length > 50) {
        return "email should be of less than or equal to 50 characters";
    }
    else if (body.password.trim().length > 30) {
        return "password should be of less than or equal to 30 characters";
    }
    else if (body.address.trim().length > 70) {
        return "address should be of less than or equal to 70 characters";
    }
    else if (body.city.trim().length > 40) {
        return "city should be of less than or equal to 40 characters";
    }
    else if (body.state.trim().length > 40) {
        return "state should be of less than or equal to 40 characters";
    }
    else {
        return "Ok";
    }
}

export function isSellerDataComplete(body) {
    let params = Object.keys(body);

    // checking body should have exactly 10 elements
    if (params.length != 10) {
        return "Body should contain name, category, username, email, password, pickup_address, city, state, phone, gstin";
    }

    // checking that no required field should be missing
    else if (!params.includes("name")) {
        return "name not found";
    }
    else if (!params.includes("category")) {
        return "category not found";
    }
    else if (!params.includes("username")) {
        return "username not found";
    }
    else if (!params.includes("password")) {
        return "password not found";
    }
    else if (!params.includes("email")) {
        return "email not found";
    }
    else if (!params.includes("pickup_address")) {
        return "pickup_address not found";
    }
    else if (!params.includes("city")) {
        return "city not found";
    }
    else if (!params.includes("state")) {
        return "state not found";
    }
    else if (!params.includes("phone")) {
        return "phone not found";
    }
    else if (!params.includes("gstin")) {
        return "gstin not found";
    }

    else if (body.name.trim().length == 0) {
        return "name should not empty";
    }
    else if (body.category.trim().length == 0) {
        return "category should not empty";
    }
    else if (body.username.trim().length == 0) {
        return "username should not empty";
    }
    else if (body.email.trim().length == 0) {
        return "email should not empty";
    }
    else if (body.password.trim().length == 0) {
        return "password should not empty";
    }
    else if (body.pickup_address.trim().length == 0) {
        return "pickup_address should not empty";
    }
    else if (body.city.trim().length == 0) {
        return "city should not empty";
    }
    else if (body.state.trim().length == 0) {
        return "state should not empty";
    }
    else if (body.phone.trim().length == 0) {
        return "phone should not empty";
    }
    else if (body.gstin.trim().length == 0) {
        return "gstin should not empty";
    }

    // checking that no value should be too long
    else if (body.name.trim().length > 50) {
        return "name should be of less than 50 characters";
    }
    else if (body.category.trim().length > 50) {
        return "category should be of less than 50 characters";
    }
    else if (body.username.trim().length > 50) {
        return "username should be of less than 50 characters";
    }
    else if (body.email.trim().length > 50) {
        return "email should be of less than 50 characters";
    }
    else if (body.password.trim().length > 30) {
        return "password should be of less than 30 characters";
    }
    else if (body.pickup_address.trim().length > 70) {
        return "pickup_address should be of less than 70 characters";
    }
    else if (body.city.trim().length > 40) {
        return "city should be of less than 40 characters";
    }
    else if (body.state.trim().length > 40) {
        return "state should be of less than 40 characters";
    }
    else {
        return "Ok";
    }
}
import { createSeller, getSellerWithEmail, getSellerWithUsername, getSellerWithPhoneNumber } from '../database/database.js';
import { isSellerDataComplete } from '../check.js';
import { validateSeller, validEmail } from '../validator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "QWERTY";

export const signup = async (req, res) => {
    console.log("\nsrc / controllers / sellerController.js / signup() called");
    const { name, category, username, email, password, pickup_address, city, state, phone, gstin } = req.body;

    try {
        // checking if data is complete
        const message = isSellerDataComplete(req.body);
        if (message != "Ok") {
            return res.status(400).send({
                status: "Failure",
                message: message
            });
        }

        // Existing seller check
        const existingSeller = await getSellerWithEmail(email.toLowerCase().trim());
        if (existingSeller) {
            console.log("\n--> Failure: Seller already registered");
            return res.status(400).json({
                status: "Failure",
                message: "Seller already registered"
            });
        }

        // Duplicate username check
        const existingUsername = await getSellerWithUsername(username.toLowerCase().trim());
        if (existingUsername) {
            console.log("\n--> Failure: Username is already in use");
            return res.status(400).json({
                status: "Failure",
                message: "Username is already in use"
            });
        }

        // Duplicate phone number check
        const existingPhoneNumber = await getSellerWithPhoneNumber(phone.toLowerCase().trim());
        if (existingPhoneNumber) {
            console.log("\n--> Failure: Phone number already registered with another seller");
            return res.status(400).json({
                status: "Failure",
                message: "Phone number already registered with another seller"
            });
        }

        // Validating fields
        const validationMsg = validateSeller(req.body);
        if (validationMsg != "OK") {
            return res.status(400).send({
                status: "Failure",
                message: validationMsg
            });
        }
        else {
            // Encrypting password
            bcrypt.hash(password, 10, async (error, hashedPassword) => {
                if (error) {
                    console.log(error.message);
                    return res.status(200).json({
                        status: "Failure",
                        message: error.message,
                        authToken: token
                    });
                }
                else {
                    // Sending seller data to database
                    const result = await createSeller(name.trim(), category.trim(), username.trim(), email.toLowerCase().trim(), hashedPassword.trim(), pickup_address.trim(), city.trim(), state.trim(), phone.trim(), gstin.trim());

                    try {
                        // Signing up & getting a web token
                        const token = jwt.sign({
                            email: result.email,
                            id: result._id
                        }, SECRET_KEY);

                        console.log("--> Registered successfully");
                        return res.status(200).json({
                            status: "Success",
                            message: "Registered successfully",
                            authToken: token
                        });

                    } catch (error) {
                        return res.status(200).json({
                            status: "Failure",
                            message: error.message,
                        });
                    }
                }
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "Failure",
            message: error.message
        });
    }
}

export const signin = async (req, res) => {
    console.log("\nsrc / controllers / sellerController.js / signin() called");
    const { email, password } = req.body;

    if (Object.keys(req.body).length != 2) {
        console.log("--> Failure: Required email & password");
        return res.status(404).json({
            status: "Failure",
            message: "Required email & password"
        });
    }
    else if (req.body.email.trim().length == 0) {
        console.log("--> Failure: Email is empty");
        return res.status(404).json({
            status: "Failure",
            message: "Email should not be empty"
        });
    }

    try {
        // Checking if email is invalid
        if (!validEmail(email.trim())) {
            console.log("--> Failure: Invalid Email");
            return res.status(404).json({
                status: "Failure",
                message: "Invalid Email"
            });
        }

        // Existing seller check
        const existingSeller = await getSellerWithEmail(email.toLowerCase().trim());
        if (!existingSeller) {
            console.log("--> Failure: Seller not registered");
            return res.status(404).json({
                status: "Failure",
                message: "Seller not registered"
            });
        }

        // Verfying password
        const matchPassword = await bcrypt.compare(password.trim(), existingSeller.password.trim());
        if (!matchPassword) {
            console.log("--> Failure: Wrong Password");
            return res.status(400).json({
                status: "Failure",
                message: "Invalid login credentials"
            });
        }

        // Signing in & getting a web token
        const token = jwt.sign({
            email: existingSeller.email,
            id: existingSeller._id
        }, SECRET_KEY);

        console.log("--> Login Successful");
        return res.status(200).json({
            // user: existingSeller,
            status: "Success",
            message: "Login Successful",
            authToken: token
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "Failure",
            message: error.message
        });
    }
}
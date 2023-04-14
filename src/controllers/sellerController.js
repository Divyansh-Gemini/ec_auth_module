import { createSeller, getSellerWithEmail } from '../database/database.js';
import { validateSeller, validEmail } from '../validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "QWERTY";

export const signup = async (req, res) => {
    console.log("\nsrc / controllers / sellerController.js / signup() called");
    const { name, category, username, email, password, pickup_address, city, state, phone, gstin } = req.body;

    try {
        // Existing seller check
        const existingSeller = await getSellerWithEmail(email.toLowerCase().trim());
        if (existingSeller) {
            console.log("\n--> Failure: Seller already registered");
            return res.status(400).json({
                status: "Failure",
                message: "Seller already registered"
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
            const hashedPassword = await bcrypt.hash(password, 10);

            // Sending seller data to database
            const result = await createSeller(name.trim(), category.trim(), username.trim(), email.toLowerCase().trim(), hashedPassword.trim(), pickup_address.trim(), city.trim(), state.trim(), phone.trim(), gstin.trim());

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
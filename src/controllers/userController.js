import { createUser, getUserWithEmail, getUserWithUsername, getUserWithMobileNumber } from '../database/database.js';
import { isUserDataComplete } from '../check.js';
import { validateUser, validEmail } from '../validator.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "QWERTY";

export const signup = async (req, res) => {
    console.log("\nsrc / controllers / userController.js / signup() called");
    const { f_name, l_name, username, email, password, address, city, state, mobile } = req.body;

    try {
        // checking if data is complete
        const message = isUserDataComplete(req.body);
        if (message != "Ok") {
            return res.status(400).send({
                status: "Failure",
                message: message
            });
        }

        // Existing user check
        const existingUser = await getUserWithEmail(email.toLowerCase().trim());
        if (existingUser) {
            console.log("\n--> Failure: User already registered");
            return res.status(400).json({
                status: "Failure",
                message: "User already registered"
            });
        }

        // Duplicate username check
        const existingUsername = await getUserWithUsername(username.toLowerCase().trim());
        if (existingUsername) {
            console.log("\n--> Failure: Username is already in use");
            return res.status(400).json({
                status: "Failure",
                message: "Username is already in use"
            });
        }

        // Duplicate mobile number check
        const existingMobileNumber = await getUserWithMobileNumber(mobile.toLowerCase().trim());
        if (existingMobileNumber) {
            console.log("\n--> Failure: Mobile number already registered with another user");
            return res.status(400).json({
                status: "Failure",
                message: "Mobile number already registered with another user"
            });
        }

        // Validating fields
        const validationMsg = validateUser(req.body);
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
                    // Sending user data to database
                    const result = await createUser(f_name.trim(), l_name.trim(), username.trim(), email.toLowerCase().trim(), hashedPassword.trim(), address.trim(), city.trim(), state.trim(), mobile.trim());

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
    console.log("\nsrc / controllers / userController.js / signin() called");
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

        // Existing user check
        const existingUser = await getUserWithEmail(email.toLowerCase().trim());
        if (!existingUser) {
            console.log("--> Failure: User not registered");
            return res.status(404).json({
                status: "Failure",
                message: "User not registered"
            });
        }

        // Verifying password
        const matchPassword = await bcrypt.compare(password.trim(), existingUser.password.trim());
        if (!matchPassword) {
            console.log("--> Failure: Wrong Password");
            return res.status(400).json({
                status: "Failure",
                message: "Invalid login credentials"
            });
        }

        // Signing in & getting a web token
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, SECRET_KEY);

        console.log("--> Login Successful");
        return res.status(200).json({
            // user: existingUser,
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
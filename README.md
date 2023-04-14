# E-Commerce Authentication module

## PROJECT DEFINITION
### TASK DESCRIPTION
* User can register with basic information like (Name, username, email, address, mobile).
* Seller can register with his business information like (Business Category, Name, username, email, pick up address, mobile, GSTIN no (15 char must be)).
* Above both login processes as well.

### TASK DETAIL
*	Create API in NodeJS & store the data in MySQL database.
*	Need to properly check all APIs in Postman with different types like (GET, POST, DELETE, PUT).
*	Required fields validation needs to be handled with proper error messages as well.
*	Need to create 4 APIs.
1.	User Register API with Basic details needs.
2.	User LOGIN API (email & password) and response json should have below format.
  ```
  {
    status: ‘Success / Failure’,
    message: proper message base valid / invalid traditional details’,
    authToken: encrypted token string (Refer jwt npm package) - only for Success case only
  }
  ```
3. & 4. Above 2 similar API for Seller with mentioned details.

### EXPECTATION
*	E-Commerce is based on a standard goal that makes customers and sellers sell / purchase entirely digital platforms only.
*	TEchnical requirements are fulfill as per standard industry level.
*	For API creation, use NodeJS framework as it is popular technically.
*	Database design should have standard level & most secure power.
*	Coding writing should be properly formatted from a technical perspective.
* API request & response should be executed from the Postman tool.
*	Good to have - Integrate with SwaggerUI

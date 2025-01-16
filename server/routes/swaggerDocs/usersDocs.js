/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: >
 *       User must send an object containing the following properties:
 *         - **name**: A string between 3 and 50 characters,
 *         - **email**: A valid email address,
 *         - **password**: A string with at least 8 characters, including at least one uppercase, one lowercase, and one digit.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *                 minLength: 3
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 description: The email of the new user
 *                 example: johndoe@example.com
 *                 format: email
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *                 example: Password123
 *                 minLength: 8
 *                 pattern: ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           description: The email of the new user.
 *                           example: johndoe@example.com
 *                         name:
 *                           type: string
 *                           description: The name of the new user.
 *                           example: John Doe
 *                         theme:
 *                           type: string
 *                           description: The user's theme preference (violet => default).
 *                           example: violet
 *                         profilePhotoUrl:
 *                           type: string
 *                           description: The link to the user's profile picture.
 *                           example: null
 *                         isGoogleUser:
 *                           type: Boolean
 *                           description: true => if the user authenticated using Google Auth, false => if the user used login/password
 *                           example: false
 *       409:
 *         description: Conflict - this email is already used
 *       400:
 *         description: Validation error - the submitted data does not meet the requirements
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in an existing account
 *     description: >
 *       User must send an object containing the following properties:
 *         - **email**: The account's email address,
 *         - **password**: The account's password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the account
 *                 example: johndoe@example.com
 *                 format: email
 *               password:
 *                 type: string
 *                 description: The password for the account
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           description: The email of the account
 *                           example: johndoe@example.com
 *                         name:
 *                           type: string
 *                           description: The name of the user.
 *                           example: John Doe
 *                         theme:
 *                           type: string
 *                           description: The user's theme preference.
 *                           example: violet
 *                         profilePhotoUrl:
 *                           type: string
 *                           description: The link to the user's profile picture.
 *                           example: "https://res.cloudinary.com/userImage"
 *                         isGoogleUser:
 *                           type: Boolean
 *                           description: true => if the user authenticated using Google Auth, false => if the user used login/password
 *                           example: false
 *       400:
 *         description: Login credentials are missing or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/logout:
 *   delete:
 *     summary: Log out user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Send password recovery email
 *     description: >
 *       User must send an object containing the following properties:
 *         - **email**: The account's email address
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the account
 *                 example: johndoe@example.com
 *                 format: email
 *     responses:
 *       200:
 *         description: Password recovery email sent successfully
 *       400:
 *         description: Missing email field
 *       403:
 *         description: Password change not supported. The account associated with this email is linked with Google
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/update-password:
 *   patch:
 *     summary: Update account's password
 *     description: >
 *       The previous endpoint sends an email with a link that contains the validationToken as a query parameter. So, the request to this endpoint will have a body (which will contain newPassword) and a query parameter (?validationToken=tokenValue).
 *         - **newPassword**: A string with at least 8 characters, including at least one uppercase, one lowercase, and one digit.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: validationToken
 *         schema:
 *           type: string
 *           required: true
 *           description: Token used for validating the password reset request. Expiry time - 15 min.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the account
 *                 minLength: 8
 *                 pattern: ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           description: The email of the account
 *                           example: johndoe@example.com
 *                         name:
 *                           type: string
 *                           description: The name of the user.
 *                           example: John Doe
 *                         theme:
 *                           type: string
 *                           description: The user's theme preference.
 *                           example: violet
 *                         profilePhotoUrl:
 *                           type: string
 *                           description: The link to the user's profile picture.
 *                           example: "https://res.cloudinary.com/userImage"
 *                         isGoogleUser:
 *                           type: Boolean
 *                           description: true => if the user authenticated using Google Auth, false => if the user used login/password
 *                           example: false
 *       400:
 *         description: >
 *           Two possible cases:
 *            - Missing or invalid validationToken
 *            - Missing newPassword field or invalid value
 *       403:
 *         description: Validation token expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user's profile
 *     description: >
 *       This endpoint allows the user to update their profile. It is necessary to send an object containing the following properties:
 *         - **name**: A string between 3 and 50 characters,
 *         - **email**: A valid email address,
 *         - **profilePhoto** (optional): Avatar or profile picture, of type image file.
 *     consumes:
 *       - multipart/form-data
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *                 minLength: 3
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 description: The email of the account
 *                 example: johndoe@example.com
 *                 format: email
 *               profilePhoto:
 *                 type: string
 *                 description: User's profile photo (optional)
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           description: The email of the account
 *                           example: johndoe@example.com
 *                         name:
 *                           type: string
 *                           description: The name of the user.
 *                           example: John Doe
 *                         theme:
 *                           type: string
 *                           description: The user's theme preference.
 *                           example: violet
 *                         profilePhotoUrl:
 *                           type: string
 *                           description: The link to the user's profile picture.
 *                           example: "https://res.cloudinary.com/userImage"
 *                         isGoogleUser:
 *                           type: Boolean
 *                           description: true => if the user authenticated using Google Auth, false => if the user used login/password
 *                           example: false
 *       400:
 *         description: Bad request - missing or invalid data sent
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       409:
 *         description: Conflict - this email is already in use by another account
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/theme:
 *   patch:
 *     summary: Update user's theme preference
 *     description: >
 *       This endpoint allows the user to change the theme to one of the following versions: **light**, **dark**, or **violet**.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 description: >
 *                   User's selected theme: light, dark, or violet.
 *                 enum: [light, dark, violet]
 *                 example: light
 *     responses:
 *       200:
 *         description: Theme updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           description: The email of the account
 *                           example: johndoe@example.com
 *                         name:
 *                           type: string
 *                           description: The name of the user.
 *                           example: John Doe
 *                         theme:
 *                           type: string
 *                           description: The user's theme preference.
 *                           example: light
 *                         profilePhotoUrl:
 *                           type: string
 *                           description: The link to the user's profile picture.
 *                           example: "https://res.cloudinary.com/userImage"
 *                         isGoogleUser:
 *                           type: Boolean
 *                           description: true => if the user authenticated using Google Auth, false => if the user used login/password
 *                           example: false
 *       400:
 *         description: Bad request - missing or invalid data sent
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/support:
 *   post:
 *     summary: Reach customer support
 *     description: >
 *       This endpoint allows user to reach customer support. The request must include an object containing the user's comment.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The comment the user wants to send to customer support.
 *                 example: I have a problem with my account. I can't add more projects.
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Bad request - missing or invalid data sent
 *       401:
 *         description: Unauthorized - missing or invalid access cookie/refresh cookie pair
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/google-auth/getUser:
 *   get:
 *     summary: Google authentication
 *     description: >
 *       In order to use Google authentication in the app, you should follow a couple of steps:
 *         - In the UI, you should have a button or link that navigates to this endpoint: `/api/users/google-auth`. This allows the user to access the Google login screen, where they can choose their account and authenticate.
 *
 *         - **In case of error**: the server will send a redirect link that will contain the error as a query parameter. **Example**: ?googleAuthFailed="ErorrValue"
 *         - **In case of success**: the server will send a redirect link that will contain the validation token as a query parameter. **Example**: ?googleAuthSuccess=validationTokenValue.
 *           - Next, you should take that validation token and make a request to this endpoint, having that token as a query parameter. **Example**: `/api/users/google-auth/getUser?validationToken=validationTokenValue`
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: validationToken
 *         schema:
 *           type: string
 *           required: true
 *           description: Token used to validate the Google authentication process. Expiry time - 15 min.
 *     responses:
 *       200:
 *         description: Google authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           description: The email of the account
 *                           example: johndoe@example.com
 *                         name:
 *                           type: string
 *                           description: The name of the user.
 *                           example: John Doe
 *                         theme:
 *                           type: string
 *                           description: The user's theme preference.
 *                           example: violet
 *                         profilePhotoUrl:
 *                           type: string
 *                           description: The link to the user's profile picture.
 *                           example: "https://res.cloudinary.com/userImage"
 *                         isGoogleUser:
 *                           type: Boolean
 *                           description: true => if the user authenticated using Google Auth, false => if the user used login/password
 *                           example: true
 *       400:
 *         description: Missing or invalid validationToken
 *       403:
 *         description: Validation token expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

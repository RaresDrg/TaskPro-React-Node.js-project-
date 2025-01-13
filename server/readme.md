### Commands:

- `npm start` &mdash; starts the server in production mode.
- `npm run start:dev` &mdash; starts the server in development mode.
- `npm run lint` &mdash; runs code verification with ESLint.
- `npm run create-env` &mdash; creates the .env file.

### Important:

- `.env file` &mdash; after it has been generated with the command above (npm run create-env), it must be filled out with the following:
  -DB_HOST = the URI value of the database (MongoDD)
  -SALT_ROUNDS = number of salt rounds for bcrypt
  -ACCESS_TOKEN_SECRET = random secret string
  -RANDOM_BYTES_LENGTH = number of crypto bytes length
  -COOKIE_PARSER_SECRET = random secret string
  -CLOUD_NAME = Cloudinary config
  -API_KEY = Cloudinary config
  -API_SECRET = Cloudinary config
  -EMAIL = email for sending messages (Nodemailer)
  -PASSWORD = password of the email's account (Nodemailer)
  -GOOGLE_CLIENT_ID = OAuth config
  -GOOGLE_CLIENT_SECRET = OAuth config

# Bicycle Store API

A Node.js and TypeScript-based API for managing a bicycle store. This application provides a streamlined interface for storing and retrieving data, making it easy to manage products, inventory, and orders.

## Features

- **Product Management**: Add, update, and retrieve information about bicycles and related products.
- **Database Integration**: Uses MongoDB with Mongoose for data persistence.
- **Environment Variables**: Managed using `dotenv` for secure configuration.
- **TypeScript Support**: Ensures a robust codebase with static type checking.
- **Auto Build & Watch**: Streamlined development process with `tsc-watch`.

## Prerequisites

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

Clone the Repository:

```bash
git clone https://github.com/Kamanashis-Biswas/Bicycle-Store-API.git
cd bicycle-store
```

Install Dependencies:

```bash
npm install
```

Set Up Environment Variables:

```bash
MONGO_URI=your mongodb uri
PORT=5000
NODE_ENV=development
```

## Running the Project

Start the Development Server:

```bash
npm run watch
```

Build and Start in Production:

```bash
npm start
```

**Access the API**: The server will run on http://localhost:5000/api (or the port specified in your .env file).

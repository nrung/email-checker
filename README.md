# Email Checker

An email address checker made for a coding challenge. It will start up a webserver that takes in an array of email addresses. It then deduplicates them and returns the number of **truly unique** emails. The application also takes into consideration the usage of `+` and `.` in Gmail email addresses.

## Table of Contents

- [Email Checker](#email-checker)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
  - [Coverage](#coverage)
  - [Assumptions](#assumptions)

## Prerequisites

This application requires the installation of Node.js 12.18.4 or higher. The installer for Node.js can be downloaded from [here](https://nodejs.org/en/download/). I recommend the latest LTS version. Optionally you can install Postman to make HTTP requests to the webserver. The installer for Postman can be found [here](https://www.postman.com/downloads/).

## Installation

Clone the project and navigate to the project directory. From the directory containing the package.json, run `npm install` in your command line.

## Usage

Execute the below commands via commandline. 

To start the web service run `npm start` and then use <kbd>Ctrl</kbd> + <kbd>C</kbd> to stop the server.

The following payload should be sent as a POST request to `http://<host>:3000/checkemails`. Replace value for the data attribute with your own array of valid email addresses.

```json
{
  "data": ["user@example.com", "test@example.com"]
}
```

## Testing

Use `npm test` to run the test suite.

## Coverage

Use `npm run coverage` to run the test suite followed by a coverage report.

## Assumptions

- All email addresses received in the array are valid and contain only one @.
- The application does not need to be production-ready. (eg. load-bearing and super secure)
- User is capable of installing Node.js on their own.
- The application doesn't need to explicitly support specific domain suffixes (TLDs) for the Gmail emails. Supporting only the @gmail.com domain is fine.
# CSV Parser NodeJs

This is an API that process and store CSV files data containing car info from car providers.

## Setup

- Create .env file in root folder
- Add the following to .env
```
PORT=3000
```

## Starting Server

- Run `yarn dev`

## Running Tests

- Run `yarn test` on your terminal


## Requirements

- Receive a file upload in CSV format with provider name
- Store CSV data into an in-memory database with the defined column layout
- Accept less columns than the standard layout
- Accept more columns than the standard layout but ignore the extras
- Process small and huge files
- Accept only CSV files

## Assumptions

- Columns UUID, Created Date and Updated Date should be internal
- Asynchronous processing in order only to store data, no need to inform the end of processing externally
- Provider name is required
- File is required

# Solution

Receive the file, inform that it was sucessfully received and start processing asynchronously, buffering the file to memory and processing it in stream to ensure performance when processing huge files, validating, striping columns and persisting during the streaming.

In addition to the main POST cars upload endpoint, we have the GET cars paged endpoint for visualization purporses.

## API info
* The base URL is: **http://localhost:3000/api**
* [Postman Documentation](https://documenter.getpostman.com/view/2146553/U16kpQFa)

## API Routes


```
POST /cars
```
**Request FormData:**

Name | Type | Required | Description
------------ | ------------ | ------------ | ------------
data | FILE | YES | A csv file separated by semicolon
provider | STRING | YES | A provider name

**Response Sample:**
```json
{
  "message": "File received"
}
```

---

```
GET /cars
```

Name | Type | Required | Example
------------ | ------------ | ------------ | ------------
page | INTEGER | NO | e.g. 1
pageSize | INTEGER | NO | e.g. 20

**Response Sample:**
```json
{
    "total": 6,
    "page": 1,
    "pageSize": 20,
    "pageTotal": 1,
    "data": [
        {
          "uuid": "e2eee29a-3785-498d-bfc3-7f9aa766c235",
          "vin": "sada546a51s",
          "make": "honda6",
          "model": "civic",
          "mileage": "26 kmpl",
          "year": "2021",
          "price": "$56.000",
          "zipCode": "99951",
          "provider": "Sunset",
          "createdAt": "2021-09-10T11:28:08.000Z",
          "updatedAt": "2021-09-10T11:28:08.000Z"
        },
        {
          ...
        }
    ]
}
```

## Techs/Libs

- Nodejs with express
- [SQLite](https://www.npmjs.com/package/sqlite) for in-memory database
- [Multer](https://www.npmjs.com/package/multer) to receive file upload
- [Csvtojson](https://www.npmjs.com/package/csvtojson) to process csv file in streams
- [Joi](https://www.npmjs.com/package/joi) for validations

## Improvements

- Inform the end of processing by socketIO or Webhook
- Queue structure to receive multiple uploads at the same time, improving scalability

# CodeSandbox Limitations

CodeSandbox only accepts upload up to 1mb, any upload bigger than that is blocked by their Cloudflare, so we need to run locally to test big csv files.
# Api Server

## Installation

  clone repo, and then run the 'npm i' command while in the root directory to install dependencies.

## Summary of Problem Domain

  Create an RESTful API server using Express. This server should have the following:
  
  Complete unit testing of routes, db operations, and middleware using the Jest framework
  
  A Collections interface that consumes a Sequelize Model and performs generic Database CRUD operations

  A api route that can handle any type of model that is passed to it and have the correct CRUD operations performed

  Proper CI/CD configuration

## Links to application deployment

  App deployed on Heroku [here](https://api-server-lab04.herokuapp.com/)

  Pull req from dev found [here](https://github.com/Beers15/api-server/pull/1)

## Uml Diagram

![diagram](./uml-diagram.png)

## Routes

* REST Method GET
  * Path: /api/book
    * returns all books in db as an array
  * Path: /api/book/:id
    * returns the book at the given id

  * Path: /api/author
    * returns all authors items in db as an array
  * Path: /api/author/:id
    * returns the author at the given id

* REST Method POST
  * Path: /api/book
    * takes a JSON obj as input and returns the record that was added to the DB

  * Path: /api/author
    * takes a JSON obj as input and returns the record that was added to the DB

* REST Method PUT
  * Path: /api/book/:id
    * takes a JSON obj as input and returns the record that was updated in the DB, with updated data included

  * Path: /api/author/:id
    * takes a JSON obj as input and returns the record that was updated in the DB, with updated data included

* REST Method DELETE
  * Path: /api/book/:id
    * deletes the record with the specified id and returns the deleted item upon successful deletion

  * Path: /api/author/:id
    * deletes the record with the specified id and returns the deleted item upon successful deletion

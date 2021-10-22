'use strict';

//both models have same schema, including test for just 1 model
const { db, Book, Author } = require('../src/models/');
// Initialize any things that our tests need
beforeAll(async () => {
  await db.drop();
  // make sure that my tables exist.
  await db.sync(); // creates our tables if they do not exist
});

// remove any side effects from our test
afterAll(async () => {
  // drops all table rows within our database instance.  After all tests 
  await db.drop();
});

describe('Testing our Book Sequelize model', () => {
  it('Should be able to create a nook', async () => {
    let newBook = await Book.create({
      title: 'JavaScript for Dummies',
      description: 'Not false advertising',
    });

    console.log(newBook);
    expect(newBook.id).toBe(1);
    expect(newBook.title).toBe('JavaScript for Dummies');
    expect(newBook.description).toBe('Not false advertising');
  });

  it('Should be able to delete a book', async () => {
    await Book.create({
      title: 'The Dictionary',
      description: 'Has all the words',
    });

    await Book.destroy({
      where: {
        id: 2,
        title: 'The Dictionary',
        description: 'Has all the words',
      },
    });

    let result = await Book.findByPk(2);
    expect(result).toBeNull();
  });

  it('Should be able to update a book', async () => {
    //using item from first test
    let existingRecord = await Book.findByPk(1);

    console.log(existingRecord);
    expect(existingRecord.id).toBe(1);
    expect(existingRecord.title).toBe('JavaScript for Dummies');
    expect(existingRecord.description).toBe('Not false advertising');


    existingRecord.title = 'C++ for Dummies';
    existingRecord.description = '300 pages on pointers';
    existingRecord.save();

    //check to see if updates stuck
    let existingRecordCheck = await Book.findByPk(1);
    expect(existingRecordCheck.id).toBe(1);
    expect(existingRecordCheck.title).toBe('C++ for Dummies');
    expect(existingRecordCheck.description).toBe('300 pages on pointers');
  });

  it('Should be able to get all books', async () => {
    //adding a 2nd item, 2 total records in db
    await Book.create({
      title: 'The Lord of the Rings: The 2 Towers',
      description: 'They\'re taking the hobbits to Isengard',
    });

    let allRecords = await Book.findAll();
    expect(allRecords.length).toBe(2);
  });

  it('Should be able to get a specific book', async () => {
    let result = await Book.findByPk(3);
 
    expect(result.id).toBe(3);
    expect(result.title).toBe('The Lord of the Rings: The 2 Towers');
    expect(result.description).toBe('They\'re taking the hobbits to Isengard');
  });
});


describe('Testing our author Sequelize model', () => {
  it('Should be able to create an author', async () => {
    let newAuthor = await Author.create({
      name: 'Joe Smith',
      bio: 'Ex ad veniam nostrud labore qui labore quis et anim.',
    });

    console.log(newAuthor);
    expect(newAuthor.id).toBe(1);
    expect(newAuthor.name).toBe('Joe Smith');
    expect(newAuthor.bio).toBe('Ex ad veniam nostrud labore qui labore quis et anim.');
  });

  it('Should be able to delete an author', async () => {
    await Author.create({
      name: 'Jimmy Jab',
      bio: 'Voluptate consectetur labore aliqua nisi elit sint aliqua voluptate proident officia pariatur deserunt ea irure.',
    });

    await Author.destroy({
      where: {
        id: 2,
        name: 'Jimmy Jab',
        bio: 'Voluptate consectetur labore aliqua nisi elit sint aliqua voluptate proident officia pariatur deserunt ea irure.',
      },
    });

    let result = await Author.findByPk(2);
    expect(result).toBeNull();
  });

  it('Should be able to update an author', async () => {
    //using item from first test
    let existingRecord = await Author.findByPk(1);

    console.log(existingRecord);
    expect(existingRecord.id).toBe(1);
    expect(existingRecord.name).toBe('Joe Smith');
    expect(existingRecord.bio).toBe('Ex ad veniam nostrud labore qui labore quis et anim.');


    existingRecord.name = 'Joey Smith';
    existingRecord.bio = 'Sint reprehenderit commodo qui exercitation eu.';
    existingRecord.save();

    //check to see if updates stuck
    let existingRecordCheck = await Author.findByPk(1);
    expect(existingRecordCheck.id).toBe(1);
    expect(existingRecordCheck.name).toBe('Joey Smith');
    expect(existingRecordCheck.bio).toBe('Sint reprehenderit commodo qui exercitation eu.');
  });

  it('Should be able to get all authors', async () => {
    //adding a 2nd item, 2 total records in db
    await Author.create({
      name: 'Johhny Bravo',
      bio: 'Dolor aliquip sunt eu exercitation ea sit sint sunt fugiat incididunt cillum.',
    });

    let allRecords = await Author.findAll();
    expect(allRecords.length).toBe(2);
  });

  it('Should be able to get a specific author', async () => {
    let result = await Author.findByPk(3);
 
    expect(result.id).toBe(3);
    expect(result.name).toBe('Johhny Bravo');
    expect(result.bio).toBe('Dolor aliquip sunt eu exercitation ea sit sint sunt fugiat incididunt cillum.');
  });
});

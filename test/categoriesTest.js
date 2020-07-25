const request = require('supertest');
const { expect } = require('chai');
const app = require('../src');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/database.sqlite');

describe('POST /api/categories', () => {
  let newCategory = {
    name: 'NewCategoryName'
  };

  it('should create a valid category', async() => {
    await request(app)
    .post('/api/categories')
    .send(newCategory);
    db.all('SELECT * FROM Categories', (err, result) => {
      const category = result.find(category => category.name === newCategory.name);
      expect(category).to.exist;
      expect(category.name).to.exist;
      expect(category.name).to.equal(newCategory.name);
    });

  });
  it('should return the new category created after category creation', async() => {
    const response = await request(app)
    .post('/api/categories')
    .send(newCategory);
    const category = response.body.categories;
    expect(category.length).to.equal(1);
    expect(category[0].name).to.exist;
    expect(category[0].name).to.equal(newCategory.name);
  });

  it('should return a 201 status code after category creation', async() => {
    const response = await request(app)
    .post('/api/categories')
    .send(newCategory);
    expect(response.status).to.equal(201);
  });

  it('should return a 400 status code for invalid categories', async() => {
    let newCategory = {};
    const response = await  request(app)
    .post('/api/categories')
    .send(newCategory);
    expect(response.status).to.equal(400);
  });
});

describe('GET /api/categories', () => {
  it('should return all categories', async() => {
    const response = await request(app)
    .get('/api/categories')
    .send();
    const categories = response.body.categories;
    expect(categories.length).to.greaterThan(0);
    expect(categories.find(category => category.id === 2)).to.exist;
    expect(categories.find(category => category.id === 5)).to.exist;
    expect(categories.find(category => category.id === 9999)).to.not.exist;
  });

  it('should return a status code of 200', async() => {
    const response = await request(app)
      .get('/api/categories')
      .send();
      expect(response.statusCode).to.equal(200);
  })
});

describe('GET /api/categories/:id', () => {
  it('should return the category with the given ID', async() => {
    const response = await request(app)
    .get('/api/categories/2')
    .send();
    const category = response.body.categories[0];
    expect(category.id).to.equal(2);
    expect(category.name).to.exist;
  });

  it('should return a 200 status code for valid IDs', async() => {
    const response = await request(app)
    .get('/api/categories/2')
    .send();
    expect(response.statusCode).to.equal(200);
  });

  it('should return a 404 status code for invalid IDs', async() => {
    const response = await request(app)
    .get('/api/categories/9999')
    .send();
    expect(response.statusCode).to.equal(404);
  });
});

describe('PUT /api/categories/:id', () => {
  let updateCategory = {
    name: 'UpdatedCategoryName'
  };

  it('should update the category with the given ID', async() => {
    await request(app)
    .put('/api/categories/1')
    .send(updateCategory);
    db.all('SELECT * FROM Categories', (err, result) => {
      const category = result.find(category => category.name === updateCategory.name);
      expect(category).to.exist;
      expect(category.name).to.equal(updateCategory.name);
    })
  });

  it('should return the updated category after update ', async() => {
    const response = await request(app)
    .put('/api/categories/3')
    .send(updateCategory);
    const category = response.body.categories[0];
    expect(category).to.exist;
    expect(category.name).to.equal(updateCategory.name);
  });

  it('should return a 200 status code after category update', async() => {
    const response =  await request(app)
    .put('/api/categories/4')
    .send(updateCategory);
    expect(response.status).to.equal(200);
  });

  it('should return a 400 status code for a invalid category', async() => {
    let updateCategory = {};
    const response =  await request(app)
    .put('/api/categories/4')
    .send(updateCategory);
    expect(response.status).to.equal(400);
  });

  it('should return a 404 status code for a invalid ID', async() => {
    const response =  await request(app)
    .put('/api/categories/9999')
    .send(updateCategory);
    expect(response.status).to.equal(404);
  });
});

describe('DELETE /api/categories/:id', () => {
  it('should delete a category without transactions', async() => {
    await request(app)
    .delete('/api/categories/1')
    .send();
    db.get(
      `SELECT * FROM Categories WHERE Categories.id_category = $idCategory`,
      {$idCategory: 1},
      (err, category) => {
        console.log(category);
        expect(category).to.equal(undefined);
      }
    );
  });

  it('should return a 405 status code after try to delete a category with transactions', async() => {
    const response = await request(app)
    .delete('/api/categories/2')
    .send();
    expect(response.status).to.equal(405);
  });

  it('should return a 204 status code after category delete', async() => {
    const response = await request(app)
    .delete('/api/categories/3')
    .send();
    expect(response.status).to.equal(204)
  });

  it('should return a 404 status code for a invalid ID', async() => {
    const response =  await request(app)
    .put('/api/categories/9999')
    .send();
    expect(response.status).to.equal(404);
  });
});
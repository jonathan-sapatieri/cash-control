const request = require('supertest');
const { expect } = require('chai');

module.exports.categoriesTest = (app, db, url) => {

  describe('POST /api/categories', () => {

    let newCategory;

    beforeEach( async() => {
      newCategory = { name: 'Tax' };
    });

    it('should create a valid category', async() => {
      await request(app)
      .post(url)
      .send(newCategory);
      
      db.all('SELECT * FROM Categories', (err, result) => {
        const category = result.find(category => category.name === newCategory.name);
        expect(category).to.exist;
        expect(category.id_category).to.exist;
        expect(category.name).to.exist.and.to.equal(newCategory.name);
      })
    });

    it('should return the created category', async() => {
      const response = await request(app)
      .post(url)
      .send(newCategory);
      
      validateCategories(response.body.categories);
      const category = response.body.categories[0];
      expect(category.name).to.equal(newCategory.name);
    });

    it('should return 201 code for category creation', async() => {
      const response = await request(app)
      .post(url)
      .send(newCategory);
      expect(response.status).to.equal(201);
    });
    
    it('should return 400 code for invalid category', async() => {
      newCategory = { name: '' };
      const response = await request(app)
      .post(url)
      .send(newCategory);
      expect(response.status).to.equal(400);
    });
  });
  
  describe('GET /api/categories', () => {

    it('should return all categories', async() => {
      const response = await request(app)
      .get(url)
      .send();
      
      const categories = response.body.categories;
      validateCategories(categories);
      expect(categories.length).to.be.greaterThan(2);
    });

    it('should return 200 code for all categories', async() => {
      const response = await request(app)
      .get(url)
      .send();
      expect(response.status).to.equal(200);
    })
  });
  
  describe('GET /api/categories/:id', () => {

    it('should return a category with the given id,', async() => {
      const idCategory = 1;

      const response = await request(app)
      .get(`${url}/${idCategory}`)
      .send();

      const categories = response.body.categories;
      expect(categories.length).to.equal(1);
      
      validateCategories(categories);

      const category = categories[0];
      expect(category.id).to.equal(idCategory);
    });

    it('should return 200 code for valid id', async() => {
      const response = await request(app)
      .get(url + '/1')
      .send();
      expect(response.status).to.equal(200);
    });

    it('should return 404 code for invalid id', async() => {
      const response = await request(app)
      .get(url + '/9999')
      .send();
      expect(response.status).to.equal(404);
    });
  });
  
  describe('PUT /api/categories/:id', () => {
    
    let newCategory;
    let idCategory;

    beforeEach(async() => {
      newCategory = { name: 'Food' };
      idCategory = 1;
    })

    it('should update a category with the given id', async() => {
      await request(app)
      .put(`${url}/${idCategory}`)
      .send(newCategory);

      db.get(
        `SELECT * FROM Categories WHERE id_category = ${idCategory}`,
        (err, category) => {
          expect(category).to.exist;
          expect(category.id_category).to.equal(idCategory);
          expect(category.name).to.equal(newCategory.name);
        }
      );
    });

    it('should return the updated category', async() => {
      const response = await request(app)
      .put(`${url}/${idCategory}`)
      .send(newCategory);

      const categories = response.body.categories;
      validateCategories(categories);

      const category = categories[0];
      expect(category.id).to.equal(idCategory);
      expect(category.name).to.equal(newCategory.name);
    });

    it('should return 200 code for category updated', async() => {
      const response = await request(app)
      .put(`${url}/${idCategory}`)
      .send(newCategory);
      expect(response.status).to.equal(200);
    });

    it('should return 400 code for invalid category', async() => {
      newCategory = {};
      const response = await request(app)
      .put(`${url}/${idCategory}`)
      .send(newCategory);
      expect(response.status).to.equal(400);
    });

    it('should return 404 code for invalid id', async() => {
      const response = await request(app)
      .put(`${url}/9999`)
      .send();
      expect(response.status).to.equal(404);
    });
  });
  
  describe('DELETE /api/categories/:id', () => {
    let idCategory = 0;

    beforeEach(async() => {
      idCategory++; 
    });

    it('should delete a category without transactions', async() => {
      await request(app)
      .delete(`${url}/${idCategory}`)
      .send();

      db.get(
        `SELECT * FROM Categories WHERE id_category = ${idCategory}`,
        (err, category) => {
          console.log(category);
          expect(category).to.be.undefined;
        }
      );
    });

    it('should return 405 code for try to delete category with transaction', async() => {
      let transaction;
      
      db.get(
        `SELECT * FROM Transactions WHERE id_categories = ${idCategory}`,
        (err, result) => {
          if(result) { transaction = result };
        }
      );

      if(transaction) {
        const response = await request(app)
        .delete(`${url}/${idCategory}`)
        .send();
        expect(response.status).to.equal(405);
      };
    });

    it('should return 204 code for deleted category', async() => {
      const response = await request(app)
      .delete(`${url}/${idCategory}`)
      .send();
      expect(response.status).to.equal(204);
    });

    it('should return 404 code for a invalid id', async() => {
      const response = await request(app)
      .delete(`${url}/9999`)
      .send();
      expect(response.status).to.equal(404);
    });
  });

};

const validateCategories = (categories) => {
  expect(categories).to.exist;
  expect(categories).to.be.an('array');
  
  const category = categories[0];
  
  expect(category).to.exist;
  expect(category).to.be.an('object')
  
  expect(category.id).to.exist;
  expect(category.id).to.be.a('number');

  expect(category.name).to.exist;
  expect(category.name).to.be.a('string');
};
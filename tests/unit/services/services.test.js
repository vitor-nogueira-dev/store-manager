const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/db/connection");
const Mock = require("../mocks/mocks");
const Services = require("../../../src/services");
const Models = require("../../../src/models");

describe("Testando camada Service", function () {
  describe("Testando camada Service /products", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Testando se GET /products/:id retorna um erro, caso não encontre o id no banco de dados", async function () {
      // arrange
      sinon.stub(Models, "getProductById").resolves(undefined);

      // act
      const result = await Services.getProductById(999);

      // assert
      expect(result.type).to.be.equal("ERROR");
      expect(result.statusCode).to.be.equal(404);
      expect(result.message).to.be.equal("Product not found");
    });
    it("Testando se GET /products retorna a lista completa de produtos", async function () {
      // arrange
      sinon.stub(Models, "getAllProducts").resolves(Mock.storeManager);

      // act
      const result = await Services.getAllProducts();

      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(200);
      expect(result.message).to.deep.equal(Mock.storeManager);
    });
    it("Testando se POST /products insere um produto corretamente", async function () {
      // arrange
      sinon.stub(Models, "insertProduct").resolves([{ insertId: 1 }]);
      // act
      const result = await Services.insertProduct(Mock.insertProduct.name);
      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(201);
      // expect(result.message).to.equal(insertedProduct);
    });
  });
  describe("Testando camada Service /sales", function () {
    // Error: Access denied for user ''@'172.18.0.1' (using password: NO)
    // it("Testando se POST /sales insere uma venda corretamente", async function () {
    //   // arrange
    //   sinon.stub(Models, "insertDateSales").resolves([{ insertId: 1 }]);
    //   // act
    //   const result = await Services.insertSales(Mock.arraySales);
    //   // assert
    //   expect(result.type).to.be.equal("SUCCESS");
    //   expect(result.statusCode).to.be.equal(201);
    //   // expect(result.message).to.deep.equal(insertedSale);
    // });
    it("Testando se GET /sales retorna uma lista de vendas", async function () {
      // arrange
      sinon.stub(Models, "getAllSales").resolves(Mock.sales);

      // act
      const result = await Services.getAllSales();

      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(200);
      expect(result.message).to.deep.equal(Mock.sales);
    });
    it("Testando se GET /sales/:id retorna a venda com o id corresponte", async function () {
      // arrange
      sinon.stub(Models, "getSaleById").resolves([[Mock.saleById]]);

      // act
      const result = await Services.getSaleById(1);

      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(200);
      // expect(result.message).to.deep.equal(saleById);
    });
  });
    
});

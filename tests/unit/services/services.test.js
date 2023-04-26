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
  });
});

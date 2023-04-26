const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/db/connection");
const Mock = require("../mocks/mocks");
const Models = require("../../../src/models");

describe("Testando camada Model", function () {
  afterEach(function () {
    sinon.restore();
  });
  describe("Testando a camada Model /products", () => {
    it("Testando se GET /products retorna o array com todos os produtos", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([Mock.storeManager]);

      // act
      const result = await Models.getAllProducts();

      // assert
      expect(result).to.be.an("array");
      expect(result).to.deep.equal(Mock.storeManager);
    });
    it("Testando se GET /products/:id retorna o produto com o id passado", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([[Mock.storeManagerById]]);

      // act
      const result = await Models.getProductById(1);

      // assert
      expect(result).to.be.an("object");
      expect(result).to.deep.equal(Mock.storeManagerById);
    });
  });
});

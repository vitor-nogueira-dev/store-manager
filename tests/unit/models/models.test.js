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
    it("Testando se PUT /products edita um produto corretamente", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      // act
      const result = await Models.updateProductById(Mock.updateProduct);

      // assert
      expect(result).to.deep.equal(Mock.updateProduct.id);
    });
    it("Testando se POST /products insere um produto corretamente", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

      // act
      const result = await Models.insertProduct(Mock.insertProduct);

      // assert
      expect(result).to.deep.equal(Mock.insertedProduct.id);
    });
    it("Testando se DELETE /products deleta um produto corretamente", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      // act
      const result = await Models.deleteProductById(1);

      // assert
      expect(result).to.deep.equal(1);
    });
  });
  describe("Testando a camada Model /sales", () => {
    it("Testando se GET /sales retorna o array de vendas", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([Mock.sales]);

      // act
      const result = await Models.getAllSales();

      // assert
      expect(result).to.be.an("array");
      expect(result).to.deep.equal(Mock.sales);
    });
    it("Testando se GET /sales/:id retorna a venda com o id passado", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([Mock.saleById]);

      // act
      const result = await Models.getSaleById(1);

      // assert
      expect(result).to.be.an("object");
      expect(result).to.deep.equal(Mock.saleById);
    });
    it("Testando se POST /sales insere uma venda corretamente", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

      // act
      const { insertIdSale, produtId, quantity } = Mock.insertSales;
      const insertId = await Models.insertDateSales();
      const result = await Models.insertProductsSales(
        insertIdSale,
        produtId,
        quantity
      );

      // assert
      expect(insertId).to.deep.equal(Mock.insertedProduct.id);
      expect(result).to.deep.equal(Mock.insertedProduct.id);
    });
    it("Testando se DELETE /sales deleta uma venda corretamente", async function () {
      // arrange
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      // act
      const result = await Models.deleteSaleById(1);

      // assert
      expect(result).to.deep.equal(1);
    });
  });
});

const { expect } = require("chai");
const sinon = require("sinon");

const Mock = require("../mocks/mocks");
const Services = require("../../../src/services/store.manager.services");
const Models = require("../../../src/models/store.manager.models");

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
    it("Testando se GET /products/:id retorna o produto com id buscado no param", async function () {
      // arrange
      sinon.stub(Models, "getProductById").resolves([Mock.storeManagerById]);

      // act
      const result = await Services.getProductById();

      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(200);
      expect(result.message[0]).to.be.equal(Mock.storeManagerById);
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
      sinon.stub(Models, "insertProduct").resolves({ insertId: 1 });
      // act
      const result = await Services.insertProduct(Mock.insertProduct.name);
      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(201);
      // expect(result.message).to.equal(Mock.insertedProduct);
      expect(result.message).to.deep.equal({
        id: { insertId: 1 },
        name: "Macbook Pro",
      });
    });

    it("Testando se PUT /products edita um produto corretamente", async function () {
      // arrange
      sinon.stub(Models, "updateProductById").resolves([{ affectedRows: 1 }]);
      // act
      const result = await Services.updateProductById(1, "teste");
      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(200);
      // expect(result.message).to.equal(insertedProduct);
    });
    it("Testando se DELETE /products deleta um produto corretamente", async function () {
      // arrange
      sinon.stub(Models, "deleteProductById").resolves([{ affectedRows: 1 }]);
      // act
      const result = await Services.deleteProductById(1);
      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(204);
    });
  });
  describe("Testando camada Service /sales", function () {
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
    it("Testando se DELETE /sales deleta uma venda corretamente", async function () {
      // arrange
      sinon.stub(Models, "deleteSaleById").resolves([{ affectedRows: 1 }]);
      // act
      const result = await Services.deleteSaleById(1);
      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(204);
    });
    it("Testando se PUT /sales edita uma venda corretamente", async function () {
      // arrange
      sinon.stub(Models, "updateSaleById").resolves([{ affectedRows: 1 }]);
      // act
      const result = await Services.updateSaleById(1, Mock.arraySalesAll);
      // assert
      expect(result.type).to.be.equal("SUCCESS");
      expect(result.statusCode).to.be.equal(200);
    });
  });
});

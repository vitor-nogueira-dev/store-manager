const { expect } = require("chai");
const sinon = require("sinon");

const Mock = require("../mocks/mocks");
const Services = require("../../../src/services/store.manager.services");
const Models = require("../../../src/models/store.manager.models");
const Helpers = require("../../../src/helpers/functions");

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
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(200);
      expect(result.message[0]).to.be.equal(Mock.storeManagerById);
    });
    it("Testando se GET /products retorna a lista completa de produtos", async function () {
      // arrange
      sinon.stub(Models, "getAllProducts").resolves(Mock.storeManager);

      // act
      const result = await Services.getAllProducts();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(200);
      expect(result.message).to.deep.equal(Mock.storeManager);
    });
    it("Testando se POST /products insere um produto corretamente", async function () {
      // arrange
      sinon.stub(Models, "insertProduct").resolves({ insertId: 1 });
      // act
      const result = await Services.insertProduct(Mock.insertProduct.name);
      // assert
      expect(result.type).to.be.equal(null);
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
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(200);
      // expect(result.message).to.equal(insertedProduct);
    });
    it("Testando se DELETE /products deleta um produto corretamente", async function () {
      // arrange
      sinon.stub(Models, "deleteProductById").resolves([{ affectedRows: 1 }]);
      // act
      const result = await Services.deleteProductById(1);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(204);
    });
    it("Testando POST /products se tentar editar um produto com id inválido ele retorna um erro", async function () {
      // arrange
      sinon.stub(Models, "updateProductById").resolves(undefined);
      // act
      const result = await Services.updateProductById(999, "Iphone");
      // assert
      expect(result.type).to.be.equal("ERROR");
      expect(result.statusCode).to.be.equal(404);
      expect(result.message).to.be.equal("Product not found");
    });
    it("Testando DELETE /products se tentar deletar um produto com id inválido ele retorna um erro", async function () {
      // arrange
      sinon.stub(Models, "deleteProductById").resolves(undefined);
      // act
      const result = await Services.deleteProductById(999);
      // assert
      expect(result.type).to.be.equal("ERROR");
      expect(result.statusCode).to.be.equal(404);
      expect(result.message).to.be.equal("Product not found");
    });
  });
  describe("Testando camada Service /sales", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Testando se GET /sales retorna uma lista de vendas", async function () {
      // arrange
      sinon.stub(Models, "getAllSales").resolves(Mock.sales);

      // act
      const result = await Services.getAllSales();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(200);
      expect(result.message).to.deep.equal(Mock.sales);
    });
    it("Testando se GET /sales/:id retorna a venda com o id corresponte", async function () {
      // arrange
      sinon.stub(Models, "getSaleById").resolves([[Mock.saleById]]);

      // act
      const result = await Services.getSaleById(1);

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(200);
      // expect(result.message).to.deep.equal(saleById);
    });
    it("Testando se POST /sales insere uma venda corretamente", async function () {
      // arrange
      sinon.stub(Models, "getAllProducts").resolves([Mock.arrayProductAll]);
      sinon.stub(Helpers, "verifyProductId").resolves(true);
      sinon.stub(Models, "insertDateSales").resolves({ insertId: 1 });
      sinon.stub(Helpers, "insertedSales").resolves(Mock.resultInsertSale);
      sinon.stub(Models, "insertProductsSales").resolves({ insertId: 1 });
      // act
      const result = await Services.insertSales(Mock.arraySalesAll);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(201);
      expect(result.message).to.deep.equal(Mock.resultInsertSale);
    });
    it("Testando se POST /sales não insere uma venda com productId inválido", async function () {
      // arrange
      sinon.stub(Models, "getAllProducts").resolves([]);

      // act
      const result = await Services.insertSales(Mock.arraySalesAll);

      // assert
      expect(result.type).to.be.equal("ERROR");
      expect(result.statusCode).to.be.equal(404);
      expect(result.message).to.be.equal("Product not found");
    });

    it("Testando se PUT /sales edita uma venda corretamente", async function () {
      // arrange

      sinon.stub(Models, "getAllProducts").resolves([Mock.arrayProductAll]);
      sinon.stub(Helpers, "verifyProductId").resolves(true);
      sinon.stub(Models, "getSaleById").resolves(Mock.saleById);
     
      // act
      const result = await Services.updateSaleById(1, Mock.arrayBody);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(200);
    });
    it("Testando se PUT /sales não edita uma venda corretamente com id inválido", async function () {
      sinon.stub(Models, "getAllProducts").resolves([]);

      const result = await Services.updateSaleById(1, Mock.arrayBody);

      expect(result.type).to.equal("ERROR");
      expect(result.statusCode).to.equal(404);
      expect(result.message).to.equal("Product not found");
    });
    it("Testando se PUT /sales não edita uma venda corretamente com productId inválido", async function () {
      sinon.stub(Models, "getAllProducts").resolves([Mock.arrayProductAll]);

      const result = await Services.updateSaleById(999, Mock.arrayBody);

      expect(result.type).to.equal("ERROR");
      expect(result.statusCode).to.equal(404);
      expect(result.message).to.equal("Product not found");
    });
    it("Testando se GET /sales/:id retorna um erro ao busar uma venda com id inválido", async function () {
      // arrange
      sinon.stub(Models, "getSaleById").resolves([]);
      // act
      const result = await Services.getSaleById(999);
      // assert
      expect(result.type).to.be.equal("ERROR");
      expect(result.statusCode).to.be.equal(404);
      expect(result.message).to.be.equal("Sale not found");
    });
    it("Testando se DELETE /sales deleta uma venda corretamente", async function () {
      // arrange
      sinon.stub(Models, "deleteSaleById").resolves([{ affectedRows: 1 }]);
      // act
      const result = await Services.deleteSaleById(1);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(204);
    });
    it("Testando se DELETE /sales deleta uma venda corretamente", async function () {
      // arrange
      sinon.stub(Models, "deleteSaleById").resolves(undefined);
      // act
      const result = await Services.deleteSaleById(999);
      // assert
      expect(result.type).to.be.equal("ERROR");
      expect(result.statusCode).to.be.equal(404);
    });
    it("Testando se PUT /sales não edita uma venda inexistente", async function () {
      // arrange
      sinon.stub(Models, "getAllProducts").resolves([Mock.arrayProductAll]);
      sinon.stub(Helpers, "verifyProductId").resolves(true);
      sinon.stub(Models, "getSaleById").resolves([]);

      // act
      const result = await Services.updateSaleById(999, Mock.arrayBody);

      // assert
      expect(result.type).to.equal("ERROR");
      expect(result.statusCode).to.equal(404);
      expect(result.message).to.equal("Sale not found");
    });
    it("Testando GET /search se pesquisa corretamente pelo termo de pesquisa", async function () {
      // arrange
      sinon.stub(Models, "searchByQuery").resolves(Mock.searchName);

      // act
      const result = await Services.searchByQuery("Thor");

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.statusCode).to.be.equal(200);
      expect(result.message).to.be.deep.equal(Mock.searchName);
    });
  });
});

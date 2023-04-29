const { expect } = require("chai");
const chai = require("chai");

const sinon = require("sinon");
const Mock = require("../mocks/mocks");
const Services = require("../../../src/services/store.manager.services");
const Controllers = require("../../../src/controllers/store.manager.controller");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe("Testando camada Controller Store Manager", function () {
  describe("Testando camada Controller /products", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Testando se GET /products retorna todos os produtos", async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "getAllProducts").resolves({
        type: "SUCCESS",
        message: Mock.storeManager,
        statusCode: 200,
      });

      // act
      await Controllers.getAllProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(Mock.storeManager);
      expect(res.json).to.have.been.calledOnce;
    });
    it("Testando se GET /products/:id retorna o produto com o id buscado", async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "getProductById").resolves({
        type: null,
        message: Mock.storeManager[0],
        statusCode: 200,
      });

      // act
      await Controllers.getById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(Mock.storeManager[0]);
      expect(res.json).to.have.been.calledOnce;
    });
    it("Testando se PUT /products/:id edita um produto corretamente", async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
        body: {
          name: "MacBook Pro",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "updateProductById").resolves({
        type: null,
        message: Mock.updateProduct,
        statusCode: 200,
      });

      // act
      await Controllers.updateProductById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(Mock.updateProduct);
      expect(res.json).to.have.been.calledOnce;
    });
    it("Deve retornar o status 404 Not Found quando não encontrar o id no banco de dados", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 33 }, // id fictício para forçar o erro
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "getProductById").resolves({
        type: "ERROR",
        statusCode: 404,
        message: "Product not found",
      });

      // Act
      await Controllers.getById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
      expect(res.status).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledOnce;
    });
    it("Testando se DELETE /products/:id deleta um produto corretamente e retorn 204 sem json", async function () {
      // assert
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(Services, "deleteProductById").resolves({
        type: null,
        statusCode: 204,
        message: null,
      });

      // act
      const result = await Controllers.deleteProductById(req, res);

      // assert
      expect(result).to.be.undefined;
      expect(res.status).to.have.been.calledWith(204);
    });
    it("Deve retornar o status 201 quando inserir um novo produto com sucesso", async function () {
      // Arrange
      const res = {};
      const req = {
        body: {
          name: "MacBook Pro",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "insertProduct").resolves({
        type: null,
        statusCode: 201,
        message: Mock.insertedProduct,
      });

      // Act
      await Controllers.insertProductController(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(Mock.insertedProduct);
    });
    it("Ao tentar cadastrar um produto com menos de 5 letras, deve retornar o status 422", async function () {
      // Arrange
      const res = {};
      const req = {
        body: {
          name: "Mac",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "insertProduct").resolves({
        type: "ERROR",
        message: '"name" length must be at least 5 characters long',
        statusCode: 422,
      });

      // Act
      await Controllers.insertProductController(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(
        '"name" length must be at least 5 characters long'
      );
    });
    it("Testando se PUT /products edita um produto corretamente", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
        body: {
          name: "MacBook Pro",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "updateProductById").resolves({
        type: "SUCCESS",
        statusCode: 200,
        message: Mock.updateProduct,
      });

      // Act
      await Controllers.updateProductById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: Mock.updateProduct });
    });
    it("Testando se DELETE /products deleta um produto corretamente", async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      res.json = sinon.stub().returns();
      sinon.stub(Services, "deleteProductById").resolves({
        type: "SUCCESS",
        statusCode: 204,
      });

      //act
      await Controllers.deleteProductById(req, res);
      //assert
      expect(res.status).to.have.been.calledWith(204);
    });
  });
  describe("Testando camada Controller /sales", function () {
    afterEach(function () {
      sinon.restore();
    });
    it("Ao cadastrar uma venda com sucesso deve retornar 201", async function () {
      // Arrange
      const res = {};
      const req = {
        body: Mock.arraySales,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "insertSales").resolves({
        type: null,
        message: Mock.insertedSale,
        statusCode: 201,
      });

      // Act
      await Controllers.insertSalesController(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith(Mock.insertedSale);
    });
    it("Testando se o status é 200 e a lista de vendas", async function () {
      // Arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "getAllSales").resolves({
        type: "SUCCESS",
        message: Mock.sales,
        statusCode: 200,
      });

      // Act
      await Controllers.getAllSales(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(Mock.sales);
      expect(res.json).to.have.been.calledOnce;
    });
    it("Testando se GET /sales/:id não retorna a venda com id inváido", async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "getSaleById").resolves({
        type: "ERROR",
        message: "Sale not found",
        statusCode: 404,
      });

      // act
      await Controllers.getSaleById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
      expect(res.json).to.have.been.calledOnce;
    });
    it("Testando se o status é 200 e a lista de vendas por id", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "getSaleById").resolves({
        type: null,
        message: Mock.saleById,
        statusCode: 200,
      });

      // Act
      await Controllers.getSaleById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(Mock.saleById);
      expect(res.json).to.have.been.calledOnce;
    });
    it("Testando se DELETE /sales deleta uma venda corretamente", async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      res.json = sinon.stub().returns();
      sinon.stub(Services, "deleteSaleById").resolves({
        type: null,
        statusCode: 204,
      });

      //act
      await Controllers.deleteSaleById(req, res);
      //assert
      expect(res.status).to.have.been.calledWith(204);
    });
    it("Testando se POST /sales insere uma venda corretamente", async function () {
      // Arrange
      const res = {};
      const req = {
        body: Mock.arraySales,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "insertSales").resolves({
        type: null,
        message: Mock.insertedSale,
        statusCode: 201,
      });

      // Act
      await Controllers.insertSalesController(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith(Mock.insertedSale);
    });
    it("Testando se PUT /sales não insere uma venda se o produto não existir", async function () {
      // Arrange
      const res = {};
      const req = {
        body: Mock.arraySales,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "insertSales").resolves({
        type: "ERROR",
        message: "Product not found",
        statusCode: 404,
      });

      // Act
      await Controllers.insertSalesController(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
    it("Testando se /PUT sales/:id edita uma venda corretamente", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
        body: Mock.arraySales,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "updateSaleById").resolves({
        type: null,
        message: Mock.updateSale,
        statusCode: 200,
      });

      // Act
      await Controllers.updateSaleById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith(Mock.updateSale);
    });
    it("Testando se PUT /sales n edita uma venda se product não existir", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 999 },
        body: Mock.arraySales,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "updateSaleById").resolves({
        type: "ERROR",
        message: "Product not found",
        statusCode: 404,
      });

      // Act
      await Controllers.updateSaleById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
    it("Testando se DELETE /sales/:id não deleta uma venda se o id não existir", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "deleteSaleById").resolves({
        type: "ERROR",
        message: "Sale not found",
        statusCode: 404,
      });

      // Act
      await Controllers.deleteSaleById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });

    it("Testando se GET /search retora os produtos corretamente de acordo com o termo de pesquisa", async function () {
      // Arrange
      const res = {};
      const req = {
        query: { q: "Thor" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "searchByQuery").resolves({
        type: null,
        message: Mock.searchName,
        statusCode: 200,
      });

      // Act
      await Controllers.searchByQuery(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith(Mock.searchName);
    });
  });
});

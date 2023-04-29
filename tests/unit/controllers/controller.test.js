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
    it("Deve retornar o status 200 e a lista de Store Manager", async function () {
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
        type: "SUCCESS",
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
    it("Ao cadastrar uma venda com sucesso deve retornar 201", async function () {
      // Arrange
      const res = {};
      const req = {
        body: Mock.arraySales,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "insertSales").resolves({
        type: "SUCCESS",
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
    it("Testando se o status é 200 e a lista de vendas por id", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(Services, "getSaleById").resolves({
        type: "SUCCESS",
        message: Mock.saleById,
        statusCode: 200,
      });

      // Act
      await Controllers.getSaleById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: Mock.saleById });
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
        type: "SUCCESS",
        statusCode: 204,
      });

      //act
      await Controllers.deleteSaleById(req, res);
      //assert
      expect(res.status).to.have.been.calledWith(204);
    });
  });
});

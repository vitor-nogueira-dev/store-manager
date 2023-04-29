const { expect } = require("chai");
const sinon = require("sinon");

const Middleware = require("../../../src/middlewares/store.manager.middleware");

describe("Testando Middlewares camada de Middlewares", () => {
  describe("Testando Middlewares GET /products", () => {
    it("Testando se o quando o name não é passado no body ele retorna 400, name is required", () => {
      const res = {};
      const req = {
        body: {
          // name not provided
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const next = sinon.stub();

      Middleware.validName(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
      expect(next).to.not.have.been.called;
    });

    it("Testando se quando o nome é passado, ele chama o Controller corretamente", () => {
      const req = {
        body: {
          name: "Mac Book Pro",
        },
      };
      const res = {};
      const next = sinon.stub();

      Middleware.validName(req, res, next);

      expect(next).to.have.been.calledOnce;
    });
  });
});

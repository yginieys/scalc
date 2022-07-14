import { Const, Var, Som, Expr, Prod } from "expr";
import { Type } from "./Type";
import { Visitor } from "./Visitor";

export class Print implements Visitor {

  private _result: string = "";
  private type: Type = new Type();

  public get result() {
    return this._result;
  }

  visitConst(expr: Const): void {
    this._result += expr.val;
  }

  visitVar(expr: Var): void {
    this._result += expr.name;
  }

  visitSom(expr: Som): void {
    expr.args.forEach((arg: Expr, index, array) => {
      arg.accept(this);
      if(index < array.length - 1) {
        this._result += "+";
      }
    });
    this._result = this._result.replaceAll('+-', '-');
  }

  visitProd(expr: Prod): void {
    expr.args.forEach((arg: Expr, index, array) => {
      arg.accept(this.type);
      this._result += this.type.isSom ? "(" : "";
      arg.accept(this);
      this._result += this.type.isSom ? ")" : "";
      if(index < array.length - 1) {
        this._result += "*";
      }
    });
  }
}
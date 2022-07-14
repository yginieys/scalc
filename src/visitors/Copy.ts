import { Const, Var, Som, Prod, Expr } from "expr";
import { Visitor } from "./Visitor";

export class Copy implements Visitor {

  protected _result: Expr|null = null;

  public get result(): Expr|null {
    return this._result;
  }

  visitConst(expr: Const): void {
    this._result = new Const(expr.val);
  }

  visitVar(expr: Var): void {
    this._result = new Var(expr.name, expr.coefficient, expr.exposant);
  }

  visitSom(expr: Som): void {
    const argsCopy: Expr[] = [];
    expr.args.forEach(arg => {
      arg.accept(this);
      if(this.result) {
        argsCopy.push(this.result);
      } else {
        throw new Error("Should never happen!");
      }
    })
    this._result = new Som(argsCopy);
  }

  visitProd(expr: Prod): void {
    const argsCopy: Expr[] = [];
    expr.args.forEach(arg => {
      arg.accept(this);
      if(this.result) {
        argsCopy.push(this.result);
      } else {
        throw new Error("Should never happen!");
      }
    })
    this._result = new Prod(argsCopy);
  }
}
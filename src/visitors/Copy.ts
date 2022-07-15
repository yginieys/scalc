import { Const, Var, Som, Prod, Expr } from "expr";
import { Visitor } from "./Visitor";

export class Copy implements Visitor {

  protected _result: Expr|null = null;

  public get result(): Expr|null {
    return this._result;
  }

  visitConst(expr: Const): void {
    this._result = this.processConst(expr.val);
  }

  visitVar(expr: Var): void {
    this._result = this.processVar(expr.name, expr.coefficient, expr.exposant);
  }

  visitSom(expr: Som): void {
    const argsCopy: Expr[] = [];
    expr.args.forEach(arg => {
      arg.accept(this);
      if(!this.result) {
        throw new Error("Should never happen!");
      }
      argsCopy.push(this.result);
    })
    this._result = this.processSom(argsCopy);
  }

  visitProd(expr: Prod): void {
    const argsCopy: Expr[] = [];
    expr.args.forEach(arg => {
      arg.accept(this);
      if(!this.result) {
        throw new Error("Should never happen!");
      }
      argsCopy.push(this.result);
    })
    this._result = this.processProd(argsCopy);
  }

  protected processConst(constVal: number): Expr {
    return new Const(constVal);
  }

  protected processVar(varName: string, coefficient: number, exposant: number): Expr {
    return new Var(varName, coefficient, exposant);
  }

  protected processSom(args: Expr[]): Expr {
    return new Som(args);
  }

  protected processProd(args: Expr[]): Expr {
    return new Prod(args);
  }
}
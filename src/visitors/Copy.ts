import { Term, Som, Prod, Expr } from "expr";
import { Visitor } from "./Visitor";

export class Copy implements Visitor {

  protected _result: Expr|null = null;

  public get result(): Expr|null {
    return this._result;
  }

  visitTerm(expr: Term): void {
    this._result = this.processTerm(expr.coefficient, expr.name, expr.exposant);
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

  // @TODO Change variable order to coefficient, varName, exposant
  protected processTerm(coefficient: number, varName: string, exposant: number): Expr {
    return new Term(coefficient, varName, exposant);
  }

  protected processSom(args: Expr[]): Expr {
    return new Som(args);
  }

  protected processProd(args: Expr[]): Expr {
    return new Prod(args);
  }
}
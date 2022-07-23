import { Term, Som, Expr, Prod } from "expr";
import { Type } from "./Type";
import { Visitor } from "./Visitor";

export class Print implements Visitor {

  private _result = "";
  private isRoot = true;

  public get result() {
    return this._result;
  }

  visitVar(expr: Term): void {
    if(expr.exposant != 0) {
      if(expr.coefficient != 1 && expr.coefficient != -1) {
        this._result += expr.coefficient;
      } else if(expr.coefficient == -1) {
        this._result += '-';
      }
      this._result += expr.name;
      if(expr.exposant != 1) {
        this._result += '^';
        this._result += expr.exposant;
      }
    } else {
      this._result += expr.coefficient;
    }
  }

  visitSom(expr: Som): void {
    const isRoot = this.isRoot;
    if(expr.args.length > 1 && !isRoot) {
      this._result += "(";
    }
    expr.args.forEach((arg: Expr, index, array) => {
      this.isRoot = false;
      arg.accept(this);
      if(index < array.length - 1) {
        this._result += "+";
      }
    });
    if(expr.args.length > 1 && !isRoot) {
      this._result += ")";
    } 
    this._result = this._result.replaceAll('+-', '-');
  }

  visitProd(expr: Prod): void {
    const isRoot = this.isRoot;
    if(expr.args.length > 1 && !isRoot) {
      this._result += "(";
    }
    expr.args.forEach((arg: Expr, index, array) => {
      //arg.accept(this.type);
      //this._result += this.type.isSom ? "(" : "";
      this.isRoot = false;
      arg.accept(this);
      //this._result += this.type.isSom ? ")" : "";
      if(index < array.length - 1) {
        this._result += "*";
      }
    });
    if(expr.args.length > 1 && !isRoot) {
      this._result += ")";
    }
  }
}
import { Const, Expr, Prod, Som, Var } from "expr";
import { Copy } from "./Copy";
import { Visitor } from "./Visitor";

export class Flatten extends Copy {

  protected processSom(args: Expr[]): Expr {
    const flatten = new FlattenSom();
    args.forEach(arg => {
      arg.accept(flatten);
    });
    if(flatten.args.length == 1) {
      return flatten.args[0];
    } else {
      return new Som(flatten.args);
    }
  }

  protected processProd(args: Expr[]): Expr {
    const flatten = new FlattenProd();
    args.forEach(arg => {
      arg.accept(flatten);
    });
    if(flatten.args.length == 1) {
      return flatten.args[0];
    } else {
      return new Prod(flatten.args);
    }
  }
}

abstract class FlattenBase implements Visitor {
  public args: Expr[] = [];

  visitConst(expr: Const): void {
    this.args.push(expr);
  }
  visitVar(expr: Var): void {
    this.args.push(expr);
  }
  visitSom(expr: Som): void {
    this.args.push(expr);
  }
  visitProd(expr: Prod): void {
    this.args.push(expr);
  }
  flattenArgs(args: Expr[]) {
    this.args.push(...args);
  }
}

class FlattenSom extends FlattenBase {
  visitSom(expr: Prod): void {
    this.flattenArgs(expr.args);
  }
}

class FlattenProd extends FlattenBase {
  visitProd(expr: Prod): void {
    this.flattenArgs(expr.args);
  }
}
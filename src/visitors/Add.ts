import { Const, Var, Som, Prod, Expr } from "expr";
import { Print } from "./Print";
import { Visitor } from "./Visitor";

export class Add implements Visitor {
  private constValue: number = 0;
  private varByName: {[key:string]: { name: string, coefficient: number, exposant: number }} = {};
  private otherExprs: Expr [] = [];

  public get result(): Expr {
    // process Vars
    const args: Expr[] = [];
    let varNames = Object.keys(this.varByName);
    varNames = varNames.sort();
    varNames.forEach(varName => {
      args.push(new Var(
        this.varByName[varName].name, 
        this.varByName[varName].coefficient, 
        this.varByName[varName].exposant
      ));
    });
    // Process const
    if(this.constValue != 0) {
      args.push(new Const(this.constValue));
    }
    // Process Others exprs
    args.push(...this.otherExprs);

    return new Som(args);
  }

  public add(expr: Expr) {
    expr.accept(this);
  }

  visitConst(expr: Const): void {
    // Add constants in a single value
    this.constValue += expr.val;
  }

  visitVar(expr: Var): void {
    // Add var by name^exp
    const key = expr.name+(1/expr.exposant);
    let varData = this.varByName[key];
    if(!varData) {
      varData = { name: expr.name, coefficient: 0, exposant: expr.exposant }
      this.varByName[key] = varData;
    }
    varData.coefficient += expr.coefficient;
  }

  visitSom(expr: Som): void {
    // Flatten Som
    expr.args.forEach(arg => {
      this.add(arg);
    });
  }

  visitProd(expr: Prod): void {
    this.otherExprs.push(expr);
  }

}
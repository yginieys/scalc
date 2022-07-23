import { Expr, Prod, Som, Term } from "expr";
import { Copy } from "./Copy";
import { Visitor } from "./Visitor";

export class Normalize extends Copy {

  protected processVar(varName: string, coefficient: number, exposant: number): Expr {
    const newVar = new Term(1, varName, exposant);
    if(coefficient != 1) {
      // Get coefficient out of var
      return new Prod([Term.const(coefficient), newVar]);
    } else {
      return newVar;
    }
  }

  protected processProd(args: Expr[]): Expr {
    const normalizeProd = new NormalizeProd();
    args.forEach(arg => {
      arg.accept(normalizeProd);
    })
    return normalizeProd.getExpr();
  }

}

class NormalizeProd implements Visitor {
  public constValue = 1;
  public varByName:{[key:string]: { coefficient: number, exposant: number }} = {};
  public otherExpr: Expr[] = [];

  visitVar(expr: Term): void {
    // Regroup var by name
    let varData = this.varByName[expr.name];
    if(!varData) {
      varData = { coefficient: 1, exposant: 0 }
      this.varByName[expr.name] = varData;
    }
    this.constValue *= expr.coefficient;
    varData.exposant += expr.exposant;
  }
  visitSom(expr: Som): void {
    this.otherExpr.push(expr);
  }
  visitProd(expr: Prod): void {
    expr.args.forEach(arg => {
      arg.accept(this);
    });
  }

  getExpr(): Expr {
    const args: Expr[] = [];
    // Process Const
    if(this.constValue != 1) {
      args.push(Term.const(this.constValue));
    }
    // Process Vars
    let varNames = Object.keys(this.varByName);
    varNames = varNames.sort();
    varNames.forEach(varName => {
      if(this.varByName[varName].exposant != 0 || this.varByName[varName].coefficient != 1) {
        args.push(new Term(this.varByName[varName].coefficient, varName, this.varByName[varName].exposant));
      }
    });
    // Process Others exprs
    args.push(...this.otherExpr);

    return new Prod(args);
  }
}
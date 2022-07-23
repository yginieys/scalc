import { Term, Som, Prod, Expr } from "expr";
import { Visitor } from "./Visitor";

export class Multiply implements Visitor {
  private constValue: number = 1;
  private varByName: {[key:string]: { coefficient: number, exposant: number }} = {};
  public otherExpr: Expr[] = [];

  /**
   * Build the result of this Multiplication
   * @returns Prod
   */
   public eval(): Prod {
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

  /**
   * Push expr to this Multiplication
   * Convenient alias for expr.accept(this);
   * @param expr 
   */
  public push(expr: Expr) {
    expr.accept(this);
  }

  visitTerm(expr: Term): void {
    // Regroup var by name
    const key = expr.name;
    let varData = this.varByName[key];
    if(!varData) {
      varData = { coefficient: 1, exposant: 0 }
      this.varByName[key] = varData;
    }
    this.constValue *= expr.coefficient;
    varData.exposant += expr.exposant;
  }

  visitSom(expr: Som): void {
    this.otherExpr.push(expr);
  }

  visitProd(expr: Prod): void {
    // Flatten Prod
    expr.args.forEach(arg => {
      arg.accept(this);
    });
  }

}
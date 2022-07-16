import { Const, Var, Som, Prod, Expr } from "expr";
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
      args.push(new Const(this.constValue));
    }
    // Process Vars
    let varNames = Object.keys(this.varByName);
    varNames = varNames.sort();
    varNames.forEach(varName => {
      args.push(new Var(varName, this.varByName[varName].coefficient, this.varByName[varName].exposant));
    });
    // Process Others exprs
    args.push(...this.otherExpr);

    return new Prod(args);
   }

  /**
   * Push expr to this Addition
   * Convenient alias for expr.accept(this);
   * @param expr 
   */
  public push(expr: Expr) {
    expr.accept(this);
  }

  visitConst(expr: Const): void {
    this.constValue *= expr.val;
  }

  visitVar(expr: Var): void {
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
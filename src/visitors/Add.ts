import { Term, Som, Prod, Expr } from "expr";
import { Visitor } from "./Visitor";

export class Add implements Visitor {
  private varByName: {[key:string]: { name: string, coefficient: number, exposant: number }} = {};
  private otherExprs: Expr [] = [];


  /**
   * Build the result of this Add
   * @returns Som
   */
  public eval(): Som {
    // process Vars
    const args: Expr[] = [];
    let varNames = Object.keys(this.varByName);
    varNames = varNames.sort();
    varNames.forEach(varName => {
      args.push(new Term( 
        this.varByName[varName].coefficient,
        this.varByName[varName].name,
        this.varByName[varName].exposant
      ));
    });
    // Process Others exprs
    args.push(...this.otherExprs);

    return new Som(args);
  }

  /**
   * Push expr to this Addition
   * Convenient alias for expr.accept(this);
   * @param expr 
   */
  public push(expr: Expr) {
    expr.accept(this);
  }

  visitVar(expr: Term): void {
    // Add var by name^exp
    const key = expr.exposant != 0 ? expr.name+(1/expr.exposant) : 'zz_CONST';     // For ordering
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
      this.push(arg);
    });
  }

  visitProd(expr: Prod): void {
    this.otherExprs.push(expr);
  }

}
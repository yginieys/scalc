import { Term, Som, Prod, Expr } from "expr";
import { Add } from "./Add";
import { Visitor } from "./Visitor";

type Options = { extractConst: boolean, debug?: boolean };

export class Multiply implements Visitor {
  private options: Options;
  private constValue: number = 1;
  private varByName: {[key:string]: { coefficient: number, exposant: number }} = {};
  public otherExpr: Expr[] = [];

  constructor(options: Options = { extractConst: true, debug: false }) {
    this.options = options;
  }

  /**
   * Build the result of this Multiplication
   * @returns Prod
   */
   public eval(): Expr {
    const args: Expr[] = [];
    if(this.options.debug) {
      console.log(this);
    }
    // Process Const
    if(this.options.extractConst && this.constValue != 1) {
      args.push(Term.const(this.constValue));
    }
    // Process Vars
    let varNames = Object.keys(this.varByName);
    let constIntegrated = false;
    varNames = varNames.sort();
    varNames.forEach((varName) => {
      if(this.varByName[varName].exposant != 0) {
        if(!this.options.extractConst && !constIntegrated) {
          args.push(new Term(this.varByName[varName].coefficient * this.constValue, varName, this.varByName[varName].exposant));
          constIntegrated = true;
        } else {
          args.push(new Term(this.varByName[varName].coefficient, varName, this.varByName[varName].exposant));
        }
      }
    });
    // Process Others exprs
    args.push(...this.otherExpr);

    if(args.length == 1) {
      return args[0];  
    } else {
      return new Prod(args);
    }
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
    const add = new Add();
    expr.args.forEach(term => {
      add.push(term);
    });
    this.push(add.eval());
    //this.otherExpr.push(expr);
  }

  visitProd(expr: Prod): void {
    // Flatten Prod
    expr.args.forEach(arg => {
      arg.accept(this);
    });
  }

}
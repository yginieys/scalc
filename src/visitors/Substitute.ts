import { Var,  Expr, Prod } from "expr";
import { isInt } from "Utils";
import { Copy } from "./Copy";
import { Type } from "./Type";

export class Substitute extends Copy {

  constructor(
    private varToReplace: string,
    private replacement: Expr
  ) {
    super();
  }

  visitVar(expr: Var): void {
    if(expr.name === this.varToReplace) {
      const type = new Type();
      this.replacement.accept(type);
      if(type.var) {
        this._result = new Var(
          type.var.name,
          type.var.coefficient * expr.coefficient,
          type.var.exposant * expr.exposant,
        );
      } else {
        const args: Expr[] = [];
        if(expr.coefficient != 1) {
          args.push(new Var('CONST', expr.coefficient, 0));
        }
        if(!isInt(expr.exposant) || expr.exposant < 0) {
          throw new Error("Not yet supported exposant "+expr.exposant);
        }
        for(let i=0; i < expr.exposant; ++i) {
          // @TODO Works only for exposant integer > 1
          // Require Power Expr type
          const copy: Copy = new Copy();
          this.replacement.accept(copy);
          if(!copy.result) {
            throw new Error("Should never happen");
          } 
          args.push(copy.result);
        }
        if(args.length == 0) {
          this._result = new Var('CONST', 1, 0);
        } else if(args.length == 1) {
          this._result = args[0];
        } else {
          this._result = new Prod(args);
        }
      }
      
    } else {
      this._result = new Var(expr.name, expr.coefficient, expr.exposant);
    }
  }
}
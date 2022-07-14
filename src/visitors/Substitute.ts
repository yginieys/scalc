import { Var,  Expr, Const, Prod } from "expr";
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
      if(type.isVar) {
        this._result = new Var(
          (this.replacement as Var).name,
          (this.replacement as Var).coefficient * expr.coefficient,
          (this.replacement as Var).exposant * expr.exposant,
        );
      } else {
        const args: Expr[] = [];
        if(expr.coefficient != 1) {
          args.push(new Const(expr.coefficient));
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
          this._result = new Const(1);    
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
import { Var,  Expr } from "expr";
import { Copy } from "./Copy";

export class Substitute extends Copy {

  constructor(
    private varToReplace: string,
    private replacement: Expr
  ) {
    super();
  }

  visitVar(expr: Var): void {
    if(expr.name === this.varToReplace) {
      const copy: Copy = new Copy();
      this.replacement.accept(copy);
      if(copy.result) {
        this._result = copy.result;
      } else {
        throw new Error("Should never happen!");
      }
    } else {
      this._result = new Var(expr.name);
    }
  }
}
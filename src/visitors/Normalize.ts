import { Expr, Prod, Term } from "expr";
import { Add } from "./Add";
import { Copy } from "./Copy";
import { Multiply } from "./Multiply";

export class Normalize extends Copy {

  protected processSom(args: Expr[]): Expr {
    const add = new Add();
    args.forEach(arg => {
      arg.accept(add);
    })
    return add.eval();
  }

  protected processProd(args: Expr[]): Expr {
    const multi = new Multiply();
    args.forEach(arg => {
      arg.accept(multi);
    })
    return multi.eval();
  }
}
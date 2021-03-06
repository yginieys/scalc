import { Visitor } from "visitors/Visitor";
import { Expr } from "./Expr";

/**
 * Représente une constante
 */
export class Const extends Expr {

  constructor(
    public readonly val: number
  ) {
    super();
  }

  accept(visitor: Visitor): void {
    visitor.visitConst(this);
  }

}
import { Visitor } from "visitors/Visitor";
import { Expr } from "./Expr";

/**
 * Représente une somme
 */
export class Som extends Expr {
  
  constructor(
    public readonly args: Expr[]
  ) {
    super();
  }

  accept(visitor: Visitor): void {
    visitor.visitSom(this);
  }
}
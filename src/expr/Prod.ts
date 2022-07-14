import { Visitor } from "visitors/Visitor";
import { Expr } from "./Expr";

/**
 * Représente un produit
 */
export class Prod extends Expr {
  
  constructor(
    public readonly args: Expr[]
  ) {
    super();
  }

  accept(visitor: Visitor): void {
    visitor.visitProd(this);
  }
}
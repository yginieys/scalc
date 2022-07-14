import { Visitor } from "visitors/Visitor";
import { Expr } from "./Expr";

/**
 * Représente une variable litérale
 */
export class Var extends Expr {

  constructor(
    public readonly name: string
  ) {
    super();
  }

  accept(visitor: Visitor): void {
    visitor.visitVar(this);
  }

}
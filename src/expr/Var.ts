import { Visitor } from "visitors/Visitor";
import { Expr } from "./Expr";

/**
 * Représente une variable litérale
 */
export class Var extends Expr {

  constructor(
    public readonly name: string,
    public readonly coefficient: number = 1,
    public readonly exposant: number = 1
  ) {
    super();
  }

  accept(visitor: Visitor): void {
    visitor.visitVar(this);
  }

}
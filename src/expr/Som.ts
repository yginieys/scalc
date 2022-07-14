import { Expr } from "./Expr";

/**
 * Représente une somme
 */
export abstract class Som extends Expr {
  
  constructor(
    public readonly args: Expr[]
  ) {
    super();
  }
}
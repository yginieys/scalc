import { Term, Som, Prod } from "../expr";

/**
 * Visitor design pattern interface.
 * Represents a behavior/processing that applies to an Expression.
 */
export interface Visitor {
  visitVar(expr: Term): void;
  visitSom(expr: Som): void;
  visitProd(expr: Prod): void;
}
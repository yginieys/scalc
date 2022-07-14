import { Const, Var, Som, Prod } from "../expr";

/**
 * Visitor design pattern interface.
 * Represents a behavior/processing that applies to an Expression.
 */
export interface Visitor {
  visitConst(expr: Const): void;
  visitVar(expr: Var): void;
  visitSom(expr: Som): void;
  visitProd(expr: Prod): void;
}
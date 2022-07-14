import { Const, Var, Som } from "../expr";

/**
 * Visitor design pattern interface.
 * Represents a behavior/processing that applies to an Expression.
 */
interface Visitor {
  visitConst(expr: Const): void;
  visitVar(expr: Var): void;
  visitSom(expr: Som): void;
}
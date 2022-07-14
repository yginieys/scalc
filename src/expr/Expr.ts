import { Visitor } from "visitors/Visitor";

/**
 * Représente une expression algébrique
 */
export abstract class Expr {
  abstract accept(visitor: Visitor): void;
}
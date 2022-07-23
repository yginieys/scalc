import { Visitor } from "visitors/Visitor";
import { Expr } from "./Expr";

/**
 * Représente un terme d'une expression algebrique
 */
export class Term extends Expr {

  constructor(
    public readonly coefficient: number,
    public readonly name: string,
    public readonly exposant: number
  ) {
    super();
  }

  public static const(value: number) {
    return new Term(value, 'CONST', 0);
  }

  public static var(name: string) {
    return new Term(1, name, 1);
  }

  public static nVar(n: number, name: string) {
    return new Term(n, name, 1);
  }

  public static varN(name: string, n: number) {
    return new Term(1, name, n);
  }

  public static var2(name: string) {
    return new Term(1, name, 2);
  }

  public static var3(name: string) {
    return new Term(1, name, 3);
  }

  //    new Term(name, coef=1, exp=1)       new Term('CONST', => Term.const(        
  // => new Term(coef=1, name, exp=1)

  accept(visitor: Visitor): void {
    visitor.visitTerm(this);
  }

}
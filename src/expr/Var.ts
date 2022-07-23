import { Visitor } from "visitors/Visitor";
import { Expr } from "./Expr";

/**
 * Représente une variable litérale
 */
export class Var extends Expr {

  constructor(
    public readonly coefficient: number,
    public readonly name: string,
    public readonly exposant: number
  ) {
    super();
  }

  public static const(value: number) {
    return new Var(value, 'CONST', 0);
  }

  public static var(name: string) {
    return new Var(1, name, 1);
  }

  public static nVar(n: number, name: string) {
    return new Var(n, name, 1);
  }

  public static varN(name: string, exp: number) {
    return new Var(1, name, exp);
  }

  public static var2(name: string) {
    return new Var(1, name, 2);
  }

  public static var3(name: string) {
    return new Var(1, name, 3);
  }

  //    new Var(name, coef=1, exp=1)       new Var('CONST', => Var.const(        
  // => new Var(coef=1, name, exp=1)

  accept(visitor: Visitor): void {
    visitor.visitVar(this);
  }

}
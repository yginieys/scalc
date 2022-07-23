import { Term, Som, Prod, Expr } from "expr";
import { Visitor } from "./Visitor";

/**
 * Get the type of an Expr.
 * Sample of use :
 *   let expr: Expr = ...
 *   const type = new Type();
 *   expr.accept(type);
 *   if(type.const != null) {
 *     expr is a Const and type.const is expr casted as a Const
 *   }
 */
export class Type implements Visitor {

  private _var: Term|null = null;
  private _som: Som|null = null;;
  private _prod: Prod|null = null;;

  public get var(): Term|null {
    return this._var;
  }

  public get som(): Som|null {
    return this._som;
  }

  public get prod(): Prod|null {
    return this._prod;
  }

  /**
   * @param expr Convenient method for expr.accept(this)
   */
  public test(expr: Expr) {
    expr.accept(this);
  }

  visitTerm(expr: Term): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._prod = this._som = this._var = null;
    this._var = expr;
  }

  visitSom(expr: Som): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._prod = this._som = this._var = null;
    this._som = expr;
  }

  visitProd(expr: Prod): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._prod = this._som = this._var = null;
    this._prod = expr;
  }

}
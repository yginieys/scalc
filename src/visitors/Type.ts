import { Const, Var, Som, Prod } from "expr";
import { Visitor } from "./Visitor";

/**
 * Get the type of an Expr
 */
export class Type implements Visitor {

  private _const: Const|null = null;
  private _var: Var|null = null;
  private _som: Som|null = null;;
  private _prod: Prod|null = null;;

  public get const(): Const|null {
    return this._const;
  }

  public get var(): Var|null {
    return this._var;
  }

  public get som(): Som|null {
    return this._som;
  }

  public get prod(): Prod|null {
    return this._prod;
  }

  visitConst(expr: Const): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._const = this._prod = this._som = this._var = null;
    this._const = expr;
  }

  visitVar(expr: Var): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._const = this._prod = this._som = this._var = null;
    this._var = expr;
  }

  visitSom(expr: Som): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._const = this._prod = this._som = this._var = null;
    this._som = expr;
  }

  visitProd(expr: Prod): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._const = this._prod = this._som = this._var = null;
    this._prod = expr;
  }

}
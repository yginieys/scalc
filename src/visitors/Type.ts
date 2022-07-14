import { Const, Var, Som, Prod } from "expr";
import { Visitor } from "./Visitor";

/**
 * Get the type of an Expr
 */
export class Type implements Visitor {

  private _isConst = false;
  private _isVar = false;
  private _isSom = false;
  private _isProd = false;

  public get isConst() {
    return this._isConst;
  }

  public get isVar() {
    return this._isVar;
  }

  public get isSom() {
    return this._isSom;
  }

  public get isProd() {
    return this._isProd;
  }

  visitConst(expr: Const): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._isConst = this._isProd = this._isSom = this._isVar = false;
    this._isConst = true;
  }

  visitVar(expr: Var): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._isConst = this._isProd = this._isSom = this._isVar = false;
    this._isVar = true;
  }

  visitSom(expr: Som): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._isConst = this._isProd = this._isSom = this._isVar = false;
    this._isSom = true;
  }

  visitProd(expr: Prod): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    this._isConst = this._isProd = this._isSom = this._isVar = false;
    this._isProd = true;
  }

}
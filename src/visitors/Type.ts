import { Const, Var, Som, Prod } from "expr";
import { Visitor } from "./Visitor";

/**
 * Get the type of an Expr
 */
export class Type implements Visitor {

  private _isConst: boolean = false;
  private _isVar:   boolean = false;
  private _isSom:   boolean = false;
  private _isProd:  boolean = false;

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

  visitConst(expr: Const): void {
    this._isConst = this._isProd = this._isSom = this._isVar = false;
    this._isConst = true;
  }

  visitVar(expr: Var): void {
    this._isConst = this._isProd = this._isSom = this._isVar = false;
    this._isVar = true;
  }

  visitSom(expr: Som): void {
    this._isConst = this._isProd = this._isSom = this._isVar = false;
    this._isSom = true;
  }

  visitProd(expr: Prod): void {
    this._isConst = this._isProd = this._isSom = this._isVar = false;
    this._isProd = true;
  }

}
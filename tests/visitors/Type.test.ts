import { Const, Prod, Som, Var } from "expr";
import { Type } from "visitors/Type";

describe('testing Type visitor', () => {
  let type: Type;

  beforeEach(() => {
    type = new Type();
  });

  test('Type Const', () => {
    const expr = new Const(-2);
    expr.accept(type);
    expect(type.isConst).toBe(true);
    expect(type.isVar).toBe(false);
    expect(type.isSom).toBe(false);
    expect(type.isProd).toBe(false);
  });

  test('Type Var', () => {
    const expr = new Var('x');
    expr.accept(type);
    expect(type.isConst).toBe(false);
    expect(type.isVar).toBe(true);
    expect(type.isSom).toBe(false);
    expect(type.isProd).toBe(false);
  });

  test('Type Som', () => {
    const expr = new Som([]);
    expr.accept(type);
    expect(type.isConst).toBe(false);
    expect(type.isVar).toBe(false);
    expect(type.isSom).toBe(true);
    expect(type.isProd).toBe(false);
  });

  test('Type Prod', () => {
    const expr = new Prod([]);
    expr.accept(type);
    expect(type.isConst).toBe(false);
    expect(type.isVar).toBe(false);
    expect(type.isSom).toBe(false);
    expect(type.isProd).toBe(true);
  });
});
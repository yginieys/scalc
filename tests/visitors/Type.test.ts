import { Prod, Som, Var } from "expr";
import { Type } from "visitors/Type";

describe('testing Type visitor', () => {
  let type: Type;

  beforeAll(() => {
    type = new Type();
  });

  test('Type Var', () => {
    const expr = Var.var('x');
    expr.accept(type);
    expect(type.var).not.toBeNull();
    expect(type.som).toBeNull();
    expect(type.prod).toBeNull();
  });

  test('Type Som', () => {
    const expr = new Som([]);
    expr.accept(type);
    expect(type.var).toBeNull();
    expect(type.som).not.toBeNull();
    expect(type.prod).toBeNull();
  });

  test('Type Prod', () => {
    const expr = new Prod([]);
    expr.accept(type);
    expect(type.var).toBeNull();
    expect(type.som).toBeNull();
    expect(type.prod).not.toBeNull();
  });
});
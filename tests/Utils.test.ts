import { isInt } from "Utils"

describe('testing Utils', () => {

  test('test isInt()', () => {
    expect(isInt(0)).toEqual(true);
    expect(isInt(1)).toEqual(true);
    expect(isInt(-2)).toEqual(true);

    expect(isInt(.5)).toEqual(false);
    expect(isInt(-1.9)).toEqual(false);

    expect(isInt(null)).toEqual(false);
    expect(isInt(true)).toEqual(false);
    expect(isInt(false)).toEqual(false);
    expect(isInt("1")).toEqual(false);
    expect(isInt("")).toEqual(false);
    expect(isInt("toto")).toEqual(false);
    expect(isInt(['1', '2'])).toEqual(false);
    expect(isInt({ toto: 'tata' })).toEqual(false);
  })

})
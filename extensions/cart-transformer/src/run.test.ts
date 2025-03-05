import { describe, it, expect } from 'vitest';
import { run } from './run';
import { FunctionRunResult } from '../generated/api';

//"gid://shopify/Product/8360778891417"

describe('cart transform function', () => {
  it('returns no operations', () => {
    const result = run({
      cart: {
        lines: []
      }
    });
    const expected: FunctionRunResult = { operations: [] };

    expect(result).toEqual(expected);
  });
});
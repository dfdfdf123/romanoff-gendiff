import fs from 'fs';
import genDiff from '../src';

describe('difference', ()=> {
  const pathToResult = '__test__/__fixture__/result';
  const expected = fs.readFileSync(pathToResult, 'utf-8');

  it('toJson', () => {
    const path1 = '__test__/__fixture__/before.json';
    const path2 = '__test__/__fixture__/after.json';
    expect(genDiff(path1, path2)).toBe(expected);
  });
});
import { describe, expect, it } from '@jest/globals';
import { ObjectUtil } from '@/util/ObjectUtil';

describe('ObjectUtil', () => {
  it('returns true if object is null', () => {
    expect(ObjectUtil.isNullOrUndefined(null)).toBe(true);
  });

  it('returns true if object is undefined', () => {
    expect(ObjectUtil.isNullOrUndefined(undefined)).toBe(true);
  });

  it('returns false if object is not null or undefined', () => {
    expect(ObjectUtil.isNullOrUndefined({})).toBe(false);
  });

  it('returns true if object is null for isEmpty', () => {
    expect(ObjectUtil.isEmpty(null)).toBe(true);
  });

  it('returns true if object is undefined for isEmpty', () => {
    expect(ObjectUtil.isEmpty(undefined)).toBe(true);
  });

  it('returns true if object is empty for isEmpty', () => {
    expect(ObjectUtil.isEmpty({})).toBe(true);
  });

  it('returns false if object is not empty for isEmpty', () => {
    expect(ObjectUtil.isEmpty({ key: 'value' })).toBe(false);
  });

  it('returns false if object is not empty for isNotEmpty', () => {
    expect(ObjectUtil.isNotEmpty({ key: 'value' })).toBe(true);
  });

  it('returns true if object is empty for isNotEmpty', () => {
    expect(ObjectUtil.isNotEmpty({})).toBe(false);
  });

  it('returns true if object is empty for isObjectEmpty', () => {
    expect(ObjectUtil.isObjectEmpty({})).toBe(true);
  });

  it('returns false if object is not empty for isObjectEmpty', () => {
    expect(ObjectUtil.isObjectEmpty({ key: 'value' })).toBe(false);
  });

  it('returns false if object is not an object for isObjectEmpty', () => {
    expect(ObjectUtil.isObjectEmpty([])).toBe(false);
  });

  it('returns true if empty array is passed for isEmptyArray', () => {
    expect(ObjectUtil.isEmptyArray([])).toBe(true);
  });

  it('returns true if undefined is passed for isEmptyArray', () => {
    expect(ObjectUtil.isEmptyArray(undefined)).toBe(true);
  });

  it('returns true if null is passed for isEmptyArray', () => {
    expect(ObjectUtil.isEmptyArray(null)).toBe(true);
  });

  it('returns true if any other object is passed for isEmptyArray', () => {
    expect(ObjectUtil.isEmptyArray({})).toBe(true);
  });
});
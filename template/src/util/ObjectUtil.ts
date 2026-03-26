export class ObjectUtil {

  static isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
  }
  static isEmpty(obj: any): boolean {
    return obj === null || obj === undefined || this.isObjectEmpty(obj);
  }

  static isNotEmpty(obj: any): boolean {
    return !this.isEmpty(obj);
  }

  static isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  static isEmptyArray(obj: any): boolean {
    if (this.isNullOrUndefined(obj))
      return true;
    if(Array.isArray(obj) && obj.length === 0)
      return true;
    return this.isObjectEmpty(obj);

  }

  static isNotEmptyArray(obj: any): boolean {
    return !this.isEmptyArray(obj);
  }
}
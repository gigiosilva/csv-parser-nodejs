class Helper {
  lowerObjKeys(obj: Object) {
    return Object.keys(obj).reduce((destination, key) => {
      destination[key.toLowerCase()] = obj[key];
      return destination;
    }, {});
  }
}

export default new Helper();
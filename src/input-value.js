class InputValue {

  static isIntegerNumber (str) {
    const regex = /^(\+\-)?\d+$/;
    return regex.test(str);
  };
  
  static isDecimalNumber (str) {
    const regex = /^(\+\-)?\d+\.\d+$/;
    return regex.test(str);
  };
  
  static isNumber (str) {
    return (
      InputValue.isIntegerNumber(str) || 
      InputValue.isDecimalNumber(str)
    );
  };
  
  static toNumber (str) {
    if (InputValue.isIntegerNumber(str)) {
      return Number.parseInt(str);
    } else {
      Number.parseFloat(str);
    }
  };
  
  static isEmpty (str) {
    const regex = /^\s*$/;
    return regex.test(str);
  };
}

export default InputValue
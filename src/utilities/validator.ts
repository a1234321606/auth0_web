/**
 * Check the string is integer or not
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isInteger = (str: string) => {
  try {
    if (str) return Number.isInteger(Number(str));
  } catch (error) {
    console.error(error);
  }
  return false;
};

/**
 * Check the string is number or not
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isNumber = (str: string) => !Number.isNaN(str);

/**
 * Check the parameter is object or not
 * @param {*} obj - (object) the object to be verified
 * @returns Boolean
 */
function isEmptyObj(obj: any) {
  try {
    return Object.keys(obj).length === 0;
  } catch (error) {
    return false;
  }
}

/**
 * Check the string is latitude or not
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isLatitude = (str: string) => {
  try {
    const num = Number(str);
    return num >= -90 && num <= 90;
  } catch (error) {
    console.error(error);
  }
  return false;
};

/**
 * Check the string is longitude or not
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isLongitude = (str: string) => {
  try {
    const num = Number(str);
    return num >= -180 && num <= 180;
  } catch (error) {
    console.error(error);
  }
  return false;
};

/**
 * Check the string is MAC address or not
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isMacAddress = (str: string) => /^([a-fA-F\d]{2}:){5}[a-fA-F\d]{2}$/.test(str);

/**
 * Check the string is email or not
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isEmail = (str: string) => /\S+@\S+\.\S+/.test(str);

/**
 * Check the string is phone number or not
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isPhoneNumber = (str: string) => /^(\+?\d{1,3})?[ -]?\d{3,}[- ]?\d{4,}$/.test(str);

/**
 * Check the string is alphabetic or not
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isAlphabetic = (str: string) => !/[0-9!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]/.test(str);

/**
 * Check the string is a valid password
 * • contains at least one lower character
 * • contains at least one upper character
 * • contains at least one digit character
 * • contains at least one special character
 * • contains at least 8 characters
 * @param {*} str - (String) the string to be verified
 * @returns Boolean
 */
const isPasswordValid = (str: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(str);

export default {
  isInteger,
  isNumber,
  isEmptyObj,
  isLatitude,
  isLongitude,
  isMacAddress,
  isEmail,
  isPhoneNumber,
  isAlphabetic,
  isPasswordValid,
};

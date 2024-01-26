import { CARD_NUMBER_REGEX, CLASS_NAME_CARD_NUMBER } from './config';
/**
 * Check if given string is empty
 * @returns {boolean} true if empty, false otherwise
 */
export const isEmpty = (string) => {
  return string.length === 0 ? true : false;
};

/**
 * Check if given string matches a specific pattern
 * @returns {boolean} true if incorrect, false otherwise
 */
export const isInvalidFormat = (string, inputEl) => {
  // Check if input elem. is card number field and given string length is 16
  if (
    inputEl === CLASS_NAME_CARD_NUMBER &&
    string.replaceAll(' ', '').length === 16
  ) {
    const isInvalid = !CARD_NUMBER_REGEX.test(string);

    // If isInvalid is true, return status code 2 (errorMessageNumbersOnly)
    return [isInvalid, isInvalid ? 2 : 0];
  }

  if (
    inputEl === CLASS_NAME_CARD_NUMBER &&
    string.replaceAll(' ', '').length > 16
  ) {
    // If length > 16 return true, return status code 3 (errorMessageTooLong)
    return [true, 3];
  }

  if (
    inputEl === CLASS_NAME_CARD_NUMBER &&
    string.replaceAll(' ', '').length < 16
  ) {
    // If length > 16 return true, return status code 4 (errorMessageTooShort)
    return [true, 4];
  }

  return [false, 0];
};

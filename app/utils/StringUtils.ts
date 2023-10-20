abstract class StringUtils {
  static generateUUIDv4(): string {
    const generateRandomHex = (length: number): string =>
      Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    return (
      generateRandomHex(8) + '-' +
      generateRandomHex(4) + '-' +
      '4' + generateRandomHex(3) + '-' +
      (8 | (Math.random() * 4)) + generateRandomHex(3) + '-' +
      generateRandomHex(12)
    );
  }
}

export default StringUtils;

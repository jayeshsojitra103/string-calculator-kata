import add from "./StringCalculator";

describe("String Calculator Tests", () => {
  test("should return 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  test("should return the number itself if one number is provided", () => {
    expect(add("1")).toBe(1);
  });

  test("should return the sum of two numbers", () => {
    expect(add("1,5")).toBe(6);
  });

  test("should handle new lines between numbers", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test('should support custom delimiters', () => {
    expect(add("//;\n1;2")).toBe(3);
  });
});

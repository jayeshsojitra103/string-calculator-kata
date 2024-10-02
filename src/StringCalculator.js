export default function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    delimiter = new RegExp(parts[0][2]);
    numbers = parts[1];
  }

  const numberArray = numbers.split(delimiter).map(Number);
  return numberArray.reduce((sum, num) => sum + num, 0);
}

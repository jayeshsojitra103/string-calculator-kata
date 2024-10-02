export default function add(numbers) {
    if (numbers === "") return 0;

    const numberArray = numbers.split(/,|\n/).map(Number);
    console.log("numberArray",numberArray)
    return numberArray.reduce((sum, num) => sum + num, 0);
  }
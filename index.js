class StringCalculator {
    add(numbers) {
      if (!numbers) return 0;
  
      let delimiter = /,|\n/; // Default delimiters: comma or newline
      let customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);
  
      if (customDelimiterMatch) {
        delimiter = new RegExp(customDelimiterMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape special characters
        numbers = numbers.slice(customDelimiterMatch[0].length); // Remove delimiter declaration from the input
      }
  
      let numArray = numbers.split(delimiter).map((num) => parseInt(num, 10));
      let negativeNumbers = numArray.filter((num) => num < 0);
  
      if (negativeNumbers.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(", ")}`);
      }
  
      return numArray.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
    }
  }
  
  // Usage examples
  const calculator = new StringCalculator();
  
  console.log(calculator.add("")); // Output: 0
  console.log(calculator.add("1")); // Output: 1
  console.log(calculator.add("1,5")); // Output: 6
  console.log(calculator.add("1\n2,3")); // Output: 6
  console.log(calculator.add("//;\n1;2")); // Output: 3
  
  try {
    console.log(calculator.add("1,-2,-3"));
  } catch (error) {
    console.error(error.message); // Output: Negative numbers not allowed: -2, -3
  }
  
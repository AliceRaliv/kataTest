function calculator(string) {
  let first = 0; //первое число в формате числа
  let second = 0; //второе число в формате числа
  let i = 0; //индекс элемента массива/ порядок символа в строке

  function romanToArabic(roman) {
    if (roman == null)
      return -1;
    if (Number(roman)) {
      return roman;
    }

    var totalValue = 0,
      value = 0, // Initialise!
      prev = 0;

    for (var i = 0; i < roman.length; i++) {
      var current = char_to_int(roman.charAt(i));
      if (current > prev) {
        // Undo the addition that was done, turn it into subtraction
        totalValue -= 2 * value;
      }
      if (current !== prev) { // Different symbol?
        value = 0; // reset the sum for the new symbol
      }
      value += current; // keep adding same symbols
      totalValue += current;
      prev = current;
    }
    return totalValue;
  }

  function char_to_int(character) {
    switch (character) {
      case 'I': return 1;
      case 'V': return 5;
      case 'X': return 10;
      case 'L': return 50;
      case 'C': return 100;
      case 'D': return 500;
      case 'M': return 1000;
      default: return -1;
    }
  }

  function nums() {
    first = string.slice(0, i);
    first = Number(romanToArabic(first));

    second = string.slice(i + 1, string.length);
    second = Number(romanToArabic(second));
  }

  function check() {
    if (first <= 0 || first >= 10) {
      return -1;
    }
    if (second <= 0 || second >= 10) {
      return -1;
    }
    if (!Number.isInteger(first)) {
      return -2;
    }
    if (!Number.isInteger(second)) {
      return -2;
    }
  }

  for (i = 0; i < string.length; i++) {
    if (string[i] == "+") {
      nums();
      if (check() == -1) {
        return "Ошибка, одно из значений больше 10";
      } else if (check() == -2) {
        return "Ошибка, одно из значений не целое"
      } else {
        return first + second;
        break;
      }
    } else if (string[i] == "-") {
      nums();
      if (check() == -1) {
        return "Ошибка, одно из значений больше 10";
      } else if (check() == -2) {
        return "Ошибка, одно из значений не целое"
      } else {
        return first - second;
        break;
      }
    } else if (string[i] == "*") {
      nums();
      if (check() == -1) {
        return "Ошибка, одно из значений больше 10";
      } else if (check() == -2) {
        return "Ошибка, одно из значений не целое"
      } else {
        return first * second;
        break;
      }
    } else if (string[i] == "/") {
      nums();
        if (check() == -1) {
        return "Ошибка, одно из значений больше 10";
      } else if (check() == -2) {
        return "Ошибка, одно из значений не целое"
      } else {
        return Math.trunc(first / second);
        break;
      }
    }

  }

}


let test = calculator("2/4");
console.log(test);

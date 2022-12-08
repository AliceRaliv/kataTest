function calculator(string) {
  let first = 0; //первое число в формате числа
  let second = 0; //второе число в формате числа
  let firstIsArabic = false;
  let secondIsArabic = false;
  let i = 0; //индекс элемента массива/ порядок символа в строке

  function romanToArabic(roman) {
    if (roman == null)
      return -1;
    if (Number(roman)) {
      return -2;
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
      if(romanToArabic(first) == -2){
        firstIsArabic = true;
        first = Number(first);
      } else
    first = Number(romanToArabic(first));

    second = string.slice(i + 1, string.length);
      if(romanToArabic(second) == -2){
        secondIsArabic = true;
        second = Number(second);
      } else 
    second = Number(romanToArabic(second));
    if(/\D/.test(second)){
      throw {message: "формат математической операции не удовлетворяет заданию"}
    }
  }

  function check() {
    if (first <= -10 || first >= 10) {
      return -1;
    }
    if (second <= -10 || second >= 10) {
      return -1;
    }
    if (!Number.isInteger(first)) {
      return -2;
    }
    if (!Number.isInteger(second)) {
      return -2;
    }
    if (firstIsArabic != secondIsArabic){
      return -3;
    }      
  }

    for (i = 0; i < string.length; i++) {
      if (string[i] == "+") {
        nums();
        if (check() == -1) {
            throw {message: "Ошибка, одно из значений больше 10"};
        } else if (check() == -2) {
            throw {message: "Ошибка, одно из значений не целое"};
        } else if (check() == -3){
            throw {message: "Ошибка, складываются два разных вида числа"};
        } else {
          return first + second;
          break;
        }
      } else if (string[i] == "-") {
        nums();
        if (check() == -1) {
            throw {message: "Ошибка, одно из значений больше 10"};
        } else if (check() == -2) {
            throw {message: "Ошибка, одно из значений не целое"};
        } else if (check() == -3){
            throw {message: "Ошибка, в вычитании используется два разных вида числа"};
        } else if(first - second <= 0 && firstIsArabic == false && secondIsArabic == false) {
          return " empty~ ";
        }
        else {
          return first - second;
          break;
        }
      } else if (string[i] == "*") {
        nums();
        if (check() == -1) {
            throw {message: "Ошибка, одно из значений больше 10"};
        } else if (check() == -2) {
            throw {message: "Ошибка, одно из значений не целое"};
        } else if (check() == -3){
            throw {message: "Ошибка, умножается два разных вида числа"};
        } else {
          return first * second;
          break;
        }
      } else if (string[i] == "/") {
        nums();
        if (check() == -1) {
            throw {message: "Ошибка, одно из значений больше 10"};
        } else if (check() == -2) {
            throw {message: "Ошибка, одно из значений не целое"};
        } else if (check() == -3){
            throw {message: "Ошибка, невозможно делить два разных вида числа"};
        }
          else {
          return Math.trunc(first / second);
          break;
        }
      }
  
    }

}


let test = calculator("75-4");
console.log(test);

function calculator(string) {
    let first = 0; //первая операнда
    let second = 0; //вторая операнда
    let firstIsArabic = false; //первая операнда арабское число
    let secondIsArabic = false; //вторая операнда арабское число
    let i = 0; // порядок символа в строке

    if (string == "" || !string.match((/[0-9,a-z,A-Z].\D.[0-9,a-z,A-Z]/))) {
        throw {
            message: "Некорректные данные"
        } //проверка на формат арифметического выражения
    }
    for (i = 0; i < string.length; i++) { //цикл для поиска символа операции
        if (string[i] == "+") { //если в строке есть плюс
            nums(); // функция для нахождения в строке первой и второй операнды
            if (check() == -1) { //ошибка , если операнды больше 10 и меньше нуля
                throw {
                    message: "Ошибка, одно из значений больше 10"
                };
            } else if (check() == -2) { //ошибка, если одна из операнд не целое число
                throw {
                    message: "Ошибка, одно из значений не целое"
                };
            } else if (check() == -3) { //ошибка, если операнды относятся к разным категориям чисел (римские и арабские)
                throw {
                    message: "Ошибка, складываются два разных вида числа"
                };
            } else if (check() == -4) { //если идёт работа с римскими числами
                return String(arabicToRoman(Math.trunc(first + second))); //возвращается округлённая сумма, записанная римскими числами
            } else {
                return String(Math.trunc(first + second)); //сложение, округдение и вывод для арабских чисел
                break;
            }
        } else if (string[i] == "-") { //если в строке есть минус
            nums();
            if (check() == -1) {
                throw {
                    message: "Ошибка, одно из значений больше 10"
                };
            } else if (check() == -2) {
                throw {
                    message: "Ошибка, одно из значений не целое"
                };
            } else if (check() == -3) {
                throw {
                    message: "Ошибка, в вычитании используется два разных вида числа"
                };
            } else if (first - second <= 0 && firstIsArabic == false && secondIsArabic == false) { 
                return ""; // функция возвращает пустоту, если в результате вычитания получается ноль или отрицательное число
            } else if (check() == -4) {
                return String(arabicToRoman(Math.trunc(first - second)));
            } else {
                return String(Math.trunc(first - second));
                break;
            }
        } else if (string[i] == "*") { //если в строке есть знак умножения
            nums();
            if (check() == -1) {
                throw {
                    message: "Ошибка, одно из значений больше 10"
                };
            } else if (check() == -2) {
                throw {
                    message: "Ошибка, одно из значений не целое"
                };
            } else if (check() == -3) {
                throw {
                    message: "Ошибка, умножается два разных вида числа"
                };
            } else if (check() == -4) {
                return String(arabicToRoman(Math.trunc(first * second)));
            } else {
                return String(Math.trunc(first * second));
                break;
            }
        } else if (string[i] == "/") { //если в строке есть знак деления
            nums();
            if (check() == -1) {
                throw {
                    message: "Ошибка, одно из значений больше 10"
                };
            } else if (check() == -2) {
                throw {
                    message: "Ошибка, одно из значений не целое"
                };
            } else if (check() == -3) {
                throw {
                    message: "Ошибка, невозможно делить два разных вида числа"
                };
            } else if (check() == -4) {
                return String(arabicToRoman(Math.trunc(first / second)));
            } else {
                return String(Math.trunc(first / second));
                break;

            }
        } else if (i == string.length - 1) { //проверка, если цикл дошел до конца строки и ни одного символа арифметической операции не было найдено
            throw {
                message: "Некорректные данные"
            };
        }

    }

    function nums() { //функция для нахождения операнд и работы с ними
        first = string.slice(0, i); //первая операнда
        if (romanToArabic(first) == -2) { //проверка на тип числа
            firstIsArabic = true; //первая операнда это арабское число
            first = Number(first); //Смена типа данных на числовой
        } else
            first = Number(romanToArabic(first));

        second = string.slice(i + 1, string.length); //вторая операнда
        if (romanToArabic(second) == -2) { //проверка на тип числа
            secondIsArabic = true; //вторая операнда это арабское число
            second = Number(second); //Смена типа данных на числовой
        } else
            second = Number(romanToArabic(second)); //разветвление условия, созданное для того, чтобы в выражении было не более двух операнд
        if (/\D/.test(second)) {
            throw {
                message: "формат математической операции не удовлетворяет заданию"
            }
        }
    }

    function check() { //функция для выявления ошибок
      if (first < 0 || first > 10) { 
          return -1;
      }
      if (second < 0 || second > 10) {
          return -1;  //ошибка , если операнды больше 10 и меньше нуля
      }
       if (!Number.isInteger(first)) {
           return -2;
       }
      if (!Number.isInteger(second)) {
          return -2; //ошибка, если одна из операнд не целое число
      }
      if (firstIsArabic != secondIsArabic || secondIsArabic != firstIsArabic) {
           return -3; //ошибка, если операнды относятся к разным категориям чисел (римские и арабские)
       }
      if (!firstIsArabic && !secondIsArabic) {
          return -4; //значение, если операнды римские числа, для вывода их нужно снова перевести в римские
      }
   }

    function romanToArabic(roman) { //функция для перевода римских чисел в арабские, скопировано с сайта https://translated.turbopages.org/proxy_u/en-ru.ru.83249ce8-6391ba82-1e4972a6-74722d776562/https/stackoverflow.com/questions/48946083/convert-roman-number-to-arabic-using-javascript
        if (roman == null) //возвращается ошибка -1, если был передан аргумент со значением null
            return -1;
        if (Number(roman)) { 
            return -2; //Проверка если это римское число, то функция продолжается, если арабское, то возвращается -2
        }

        var totalValue = 0, //результат
            value = 0, // буферное значение 
            prev = 0; //предыдущее число

        for (var i = 0; i < roman.length; i++) {
            var current = char_to_int(roman.charAt(i)); //поочередно каждый символ переводится через switch в функции в римское число
            if (current > prev) {
                totalValue -= 2 * value; //по правилам римских чисел, стоящее впереди число, которое меньше следующего, уменьшает его на своё значение
            }
            if (current !== prev) {  
                value = 0; // значение обнуляется для следующего символа
            }
            value += current; // 
            totalValue += current; //totalvalue это отрицательное число и здесь происходит либо прибавление, либо увавление, в зависимости где оно находится
            prev = current; //перед новой итерацией текущее значение присваивается переменной для предыдущего значения переменной колесо сансары дало оборот
        }
        return totalValue;
    }

    function char_to_int(character) { //свитч со значениями
        switch (character) {
            case 'I':
                return 1;
            case 'V':
                return 5;
            case 'X':
                return 10;
            case 'L':
                return 50;
            case 'C':
                return 100;
            case 'D':
                return 500;
            case 'M':
                return 1000;
            default:
                return 0;
        }
    }


    function arabicToRoman(arabic) { //перевод из арабского числа в римское для вывода источник: https://ru.stackoverflow.com/questions/1121099/Алгоритм-перевода-арабские-цифр-в-римские-без-if

        let r = [ //двумерный массив
            ["I", "V"],
            ["X", "L"],
            ["C", "D"],
            ["M", ""]
        ];
        let f = [ //массив 3х10х2
            [], //0
            [
                [0, 1, 0] //1
            ],
            [
                [0, 2, 0] //2
            ],
            [
                [0, 3, 0] //3
            ],
            [
                [0, 1, 1], //4
                [0, 1, 0]
            ],
            [
                [0, 1, 1] //5
            ],
            [
                [0, 1, 0], //6
                [0, 1, 1]
            ],
            [
                [0, 2, 0], //7
                [0, 1, 1]
            ],
            [
                [0, 3, 0], //8
                [0, 1, 1]
            ],
            [
                [1, 1, 0], //9
                [0, 1, 0]
            ]
        ];
        let num = arabic; //арабское число
        let rim = ""; //переменная для результата

        String(num).split("").reverse().forEach((element, i) => //числа для удобства сменили индексы в обратную сторону
            f[element].forEach((d) => //инициируется двумерный массив
                rim = rim.concat(r[i + d[0]][d[2]].repeat(d[1])))); //к строке присоединяются значения

        return rim.split("").reverse().join("");  //вывод
    }

}
module.exports = calculator; // Не трогайте эту строчку
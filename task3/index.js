// Задача 3. Быки и коровы
// Компьютер загадывает число из нескольких различающихся цифр (от 3 до 6). Игроку дается несколько попыток на то, чтобы угадать это число.

// После каждой попытки компьютер сообщает количество совпавших цифр стоящих не на своих местах, а также количество правильных цифр на своих местах.

// Например загаданное число: 56478 предположение игрока: 52976

// ответ: совпавших цифр не на своих местах - 1 (6), цифр на своих местах - 2 (5 и 7)

// игра ведется до окончания количества ходов либо до отгадывания

const readlineSync = require("readline-sync");

let userLevel;

do {
  userLevel = readlineSync.question("Выберите сложность(3, 4, 5, 6) цифр ");
} while (!["3", "4", "5", "6"].includes(userLevel));

num = [];
while (num.length < userLevel) {
  let number = Math.floor(Math.random() * 10);
  if (num.indexOf(number) < 0) {
    num.push(number);
  }
}

const hiddenNumber = num.join("");
console.log(hiddenNumber);

let userNumber;

do {
  userNumber = readlineSync.question("Назовите число ");
  if (userNumber.length == userLevel) {
    const arrHiddenNumber = hiddenNumber.split("");
    const arrUserNumber = userNumber.split("");

    let sumNumWrongPlace = 0;
    let sumRightPlace = 0;
    const rightPlace = [];
    const wrongPlace = [];
    for (let i = 0; i < arrUserNumber.length; i++) {
      if (arrHiddenNumber.includes(arrUserNumber[i])) {
        const position = arrHiddenNumber.indexOf(arrUserNumber[i]);
        const positionUserNumber = arrUserNumber.indexOf(arrUserNumber[i]);
        if (position == positionUserNumber) {
          sumRightPlace++;
          rightPlace.push(arrUserNumber[i]);
        } else {
          sumNumWrongPlace++;
          wrongPlace.push(arrUserNumber[i]);
        }
      }
    }
    console.log(
      "совпавших цифр не на своих местах",
      sumNumWrongPlace,
      wrongPlace
    );
    console.log("цифр на своих местах", sumRightPlace, rightPlace);
  }
} while (userNumber != hiddenNumber);
console.log("Вы выиграли!");

// Задача 1
// В данном тексте изменить наименование дней недели на английский вариант. Например, строка "Старший братец ПОНЕДЕЛЬНИК ..." будет преобразована в "Старший братец MONDAY..."

let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

// const stringToArray = (str) => {
//   return str
//     .split(" ")
//     .map((elem) => {
//       let word = elem;
//       switch (elem) {
//         case "ПОНЕДЕЛЬНИК":
//           word = "MONDAY";
//           break;
//         case "ВТОРНИК":
//           word = "TUESDAY";
//       }
//       return word;
//     })
//     .join(" ");
// };

// console.log(stringToArray(str));

// Вариант 1
// const insertDash = (str) => str
//     .replaceAll("ПОНЕДЕЛЬНИК", "MONDAY")
//     .replaceAll("ВТОРНИК", "TUESDAY")
//     .replaceAll("СРЕДА", "WEDNESDAY")
//     .replaceAll("ЧЕТВЕРГ", "THURSDAY")
//     .replaceAll("ПЯТНИЦА", "FRIDAY")
//     .replaceAll("СУББОТА", "SATURDAY")
//     .replaceAll("ВОСКРЕСЕНЬЕ", "SUNDAY");

// console.log(insertDash(str));

// Вариант 2
// const translate = {
//   ПОНЕДЕЛЬНИК: "MONDAY",
//   ВТОРНИК: "TUESDAY",
//   СРЕДА: "WEDNESDAY",
//   ЧЕТВЕРГ: "THURSDAY",
//   ПЯТНИЦА: "FRIDAY",
//   СУББОТА: "SATURDAY",
//   ВОСКРЕСЕНЬЕ: "SUNDAY",
// };

// const translateText = (text) =>
//   text.replace(
//     /ПОНЕДЕЛЬНИК|ВТОРНИК|СРЕДА|ЧЕТВЕРГ|ПЯТНИЦА|СУББОТА|ВОСКРЕСЕНЬЕ/g,
//     (sym) => translate[sym]
//   );

// console.log(translateText(str));

// Вариант 3
// const stringToArray = (str) => {
//   return str.split(" ");
// };
// console.log(stringToArray(str));

// const mapArr = stringToArray(str).map((str) => str1);

// function learnJavaScript() {
//   let a = "Apples";
//   let str;
//   switch (a) {
//     case "ПОНЕДЕЛЬНИК":
//       "MONDAY";
//     case "ВТОРНИК":
//       "TUESDAY";
//     default:
//       a = a;
//   }
//   return str;
// }

// Вариант 10
const translate = {
  ПОНЕДЕЛЬНИК: "MONDAY",
  ВТОРНИК: "TUESDAY",
  СРЕДА: "WEDNESDAY",
  ЧЕТВЕРГ: "THURSDAY",
  ПЯТНИЦА: "FRIDAY",
  СУББОТА: "SATURDAY",
  ВОСКРЕСЕНЬЕ: "SUNDAY",
};

const translateText = (text) =>
  text.split(" ").map((item) => translate[item] ?? item);

console.log(translateText(str));

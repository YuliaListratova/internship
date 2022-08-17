// Задача 4. RPG баттл
// Боевой маг Евстафий сражается с лютым монстром.

// Монстр описывается таким объектом:

const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      name: "Удар когтистой лапой",
      physicalDmg: 3, // физический урон
      magicDmg: 0, // магический урон
      physicArmorPercents: 20, // физическая броня
      magicArmorPercents: 20, // магическая броня
      cooldown: 0, // ходов на восстановление
      timesToReset: 0,
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
      timesToReset: 0,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
      timesToReset: 0,
    },
  ],
};

// Боевой маг Евстафий способен на следующее:

const mage = {
  maxHealth: 20,
  name: "Евстафий",
  moves: [
    {
      name: "Удар боевым кадилом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
      timesToReset: 0,
    },
    {
      name: "Вертушка левой пяткой",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
      timesToReset: 0,
    },
    {
      name: "Каноничный фаербол",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
      timesToReset: 0,
    },
    {
      name: "Магический блок",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
      timesToReset: 0,
    },
  ],
};

// Бой идет по ходам. Каждый ход компьютер (Лютый) случайно выбирает одно из доступных действий и сообщает, что он собирается делать. В ответ на это игрок (Евстафий) должен выбрать свое действие.

// После происходит взаимное нанесение урона. Магическая броня блокирует магический урон, физическая броня блокирует физический урон.

// После совершения действия, оно не может быть повторно выбрано в течение cooldown ходов

// Бой идет до победы одного из противников.

// Перед началом боя игрок выбирает сложность (начальное здоровье Евстафия)

const readlineSync = require("readline-sync");

const userLevel = readlineSync.question("Выберите сложность(1, 2, 3) "); //ПРОВЕРКА ОПЦИОНАЛЬНО
switch (userLevel) {
  case "1":
    mage.maxHealth = 12;
    break;
  case "2":
    mage.maxHealth = 10;
    break;
  case "3":
    mage.maxHealth = 8;
    break;
}
console.log("Ваше начальное здоровье ", mage.maxHealth);

const userName = readlineSync.question("Ваше имя? ");
mage.name = userName;
const getDamage = (damage, armor) => damage - damage * (armor / 100);

while (monster.maxHealth > 0 && mage.maxHealth > 0) {
  console.log(mage.name, "Вас атакует монстр", monster.name);

  const num = []; //МАССИВ НЕ НУЖЕН
  while (num.length < 1) {
    let number = Math.floor(Math.random() * 10);
    if (number < 3 && !monster.moves[number].timesToReset) {
      num.push(number);
    }
  }

  const monsterMove = monster.moves[num[0]];
  console.log(monster.name, monsterMove);

  for (let i = 0; i < monster.moves.length; i++) {
    monster.moves[i].timesToReset = monster.moves[i].timesToReset
      ? monster.moves[i].timesToReset - 1
      : 0;
  }

  if (monsterMove.cooldown > 0) {
    monster.moves[num[0]].timesToReset = monsterMove.cooldown;
  }

  const numUser = [];
  for (let i = 0; i < mage.moves.length; i++) {
    if (mage.moves[i].timesToReset === 0) {
      numUser.push(i);
    }
  }
  console.log("массив numUser", numUser);

  let selectAction = readlineSync.question(`Выбери действие ${numUser} `); // не выводить cooldown

  const contains = (arr, elem) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == elem) {
        return true;
      }
    }
    return false;
  };
  console.log("selectAction", !!selectAction);
  while (!selectAction || !contains(numUser, selectAction)) {
    console.log(!contains(numUser, selectAction));
    selectAction = readlineSync.question(`Выбери действие ${numUser} `);
    console.log(numUser);
  }

  console.log(mage.name, mage.moves[selectAction]);
  const mageMove = mage.moves[selectAction];

  for (let i = 0; i < mage.moves.length; i++) {
    // console.log("timesToReset", i, mage.moves[i].timesToReset, mage.moves[i]);
    mage.moves[i].timesToReset = mage.moves[i].timesToReset
      ? mage.moves[i].timesToReset - 1
      : 0;
  }

  if (mageMove.cooldown > 0) {
    mage.moves[selectAction].timesToReset = mageMove.cooldown;
  }

  const dmgMonster = [];
  const physicalDamageMonster = getDamage(
    mageMove.physicalDmg,
    monsterMove.physicArmorPercents
  );
  // console.log("Ф урон М", physicalDamageMonster);
  const magicDamageMonster =
    mageMove.magicDmg -
    mageMove.magicDmg * (monsterMove.magicArmorPercents / 100); //GET DAMAGE!
  // console.log("М урон М", magicDamageMonster);
  const damageMonster = Math.round(physicalDamageMonster + magicDamageMonster);
  damageMonster > 0 && dmgMonster.push(damageMonster);
  // console.log(damageMonster);
  monster.maxHealth = monster.maxHealth - dmgMonster;

  const dmgMage = [];
  const physicalDamageMage =
    monsterMove.physicalDmg -
    monsterMove.physicalDmg * (mageMove.physicArmorPercents / 100);
  // console.log("Ф урон М", physicalDamageMage);
  const magicDamageMage =
    monsterMove.magicDmg -
    monsterMove.magicDmg * (mageMove.magicArmorPercents / 100);
  // console.log("Ф урон М", physicalDamageMage);
  const damageMage = Math.round(physicalDamageMage + magicDamageMage);
  // console.log(damageMage);
  damageMage > 0 && dmgMage.push(damageMage);
  mage.maxHealth = mage.maxHealth - dmgMage;

  console.log(
    "Здоровье после полученного урона:",
    monster.name,
    monster.maxHealth,
    ",",
    mage.name,
    mage.maxHealth
  );

  if (monster.maxHealth > 0 && mage.maxHealth > 0) {
    const action = readlineSync.question("Продолжим?");
    console.log(action);
  } else {
    console.log("Бой окончен.");
  }
}

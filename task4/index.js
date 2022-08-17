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
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};

// Боевой маг Евстафий способен на следующее:

const mage = {
  maxHealth: 10,
  name: "Евстафий",
  moves: [
    {
      name: "Удар боевым кадилом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
    },
    {
      name: "Вертушка левой пяткой",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
    },
    {
      name: "Каноничный фаербол",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Магический блок",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
    },
  ],
};

// Бой идет по ходам. Каждый ход компьютер (Лютый) случайно выбирает одно из доступных действий и сообщает, что он собирается делать. В ответ на это игрок (Евстафий) должен выбрать свое действие.

// После происходит взаимное нанесение урона. Магическая броня блокирует магический урон, физическая броня блокирует физический урон.

// После совершения действия, оно не может быть повторно выбрано в течение cooldown ходов

// Бой идет до победы одного из противников.

// Перед началом боя игрок выбирает сложность (начальное здоровье Евстафия)

const readlineSync = require("readline-sync");

const userLevel = readlineSync.question("Выберите сложность(1, 2, 3) ");
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

while (monster.maxHealth > 0 && mage.maxHealth > 0) {
  console.log("yes");

  console.log(mage.name, "Вас атакует монстр", monster.name);

  const num = [];
  while (num.length < 1) {
    let number = Math.floor(Math.random() * 10);
    if (number < 3) {
      num.push(number);
    }
  }

  console.log(monster.name, monster.moves[num]);

  const monsterMoves = monster.moves[num];
  const mageMoves = mage.moves[0];
  console.log(mageMoves.name);

  const selectAction = readlineSync.question("Выбери действие (от 0 до 3) ");

  console.log(mage.name, mage.moves[selectAction]);

  // const monsterMoves = monster.moves[num];
  // const mageMoves = mage.moves[select1Action];
  // console.log(monsterMoves.cooldown);

  const dmgMonster = [];
  const physicalDamageMonster =
    monsterMoves.physicArmorPercents - mageMoves.physicalDmg;
  const magicDamageMonster =
    monsterMoves.magicArmorPercents - mageMoves.magicDmg;
  physicalDamageMonster < 0
    ? dmgMonster.push(physicalDamageMonster * -1)
    : null;
  magicDamageMonster < 0 ? dmgMonster.push(magicDamageMonster * -1) : null;
  monster.maxHealth = monster.maxHealth - dmgMonster;

  const dmgMage = [];
  const physicalDamageMage =
    mageMoves.physicArmorPercents - monsterMoves.physicalDmg;
  const magicDamageMage = mageMoves.magicArmorPercents - monsterMoves.magicDmg;
  physicalDamageMage < 0 ? dmgMage.push(physicalDamageMage * -1) : null;
  magicDamageMage < 0 ? dmgMage.push(magicDamageMage * -1) : null;
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

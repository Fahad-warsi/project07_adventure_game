#! /usr/bin/env node
import inquirer from "inquirer";
class Player {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }
  fuel_Decrase() {
    let fuel = this.fuel - 25;
    this.fuel = fuel;
  }
  fuel_Increase() {
    this.fuel = 100;
  }
}

class Enemy {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }
  fuel_Decrase() {
    let fuel = this.fuel - 25;
    this.fuel = fuel;
  }
}

const playerName = await inquirer.prompt([
  {
    name: "playerName",
    type: "input",
    message: "Please enter Player Name : ",
  },
]);
const opponent = await inquirer.prompt([
  {
    name: "select",
    type: "list",
    message: "Select an opponent : ",
    choices: ["Skeleton", "Zombie", "Witch"],
  },
]);

let p1 = new Player(playerName.playerName);
let o1 = new Enemy(opponent.select);

do {
  if (opponent.select) {
    let ask = await inquirer.prompt([
      {
        name: "opt",
        type: "list",
        message: "What whould you like to do",
        choices: ["Attack", "Drink porition", "Run for a life"],
      },
    ]);

    if (ask.opt == "Attack") {
      let num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuel_Decrase();
        console.log(`${p1.name}, Fuel is : ${p1.fuel}`);
        console.log(`${o1.name}, Fuel is : ${o1.fuel}`);
        if (p1.fuel <= 0) {
          console.log(`You loose, better luck next time...!!`);
          process.exit();
        }
      }
      if (num <= 0) {
        o1.fuel_Decrase();
        console.log(`${p1.name}, Fuel is : ${p1.fuel}`);
        console.log(`${o1.name}, Fuel is : ${o1.fuel}`);
        if (o1.fuel <= 0) {
          console.log("You Won");
          process.exit();
        }
      }
    }
    if (ask.opt == "Drink porition") {
      p1.fuel_Increase();
      console.log(`${p1.name} health has restored. health : ${p1.fuel}`);
    }
    if (ask.opt == "Run for a life") {
      console.log(`You loose, better luck next time...!!`);
      process.exit();
    }
  }
} while (true);

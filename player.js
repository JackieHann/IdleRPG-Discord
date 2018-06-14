const Discord = require("discord.js");
//var bot;
const actions = require("./_StoredValues/actions_player.json");
const locations = require("./_StoredValues/locations.json");
const enemyNames = require("./_StoredValues/names_enemy.json");
const rarity = require("./_StoredValues/rarity.json");

//Weapon Prototype
let Weapon = require("./_Classes/Weapon.js");


function Enemy() {
    this.name = enemyNames.Chicken;
    this.level = 1;
    this.maxHP = 10;
    this.currHP = this.maxHP;
    this.maxDmg = 2;
    this.minDmg = 1;
    this.dropRate = 50;
}

class player {
    constructor(nickname, ID) {
        this.id = ID;
        this.name = nickname;

        this.level = 1;
        this.currExp = 0;
        this.nextLevelExp = 50;

        this.gold = 0;

        this.maxHP = 10;
        this.currHP = this.maxHP;

        this.maxDmg = 5;
        this.minDmg = 1;

        this.currAction = actions.Idling;
        this.location = locations.Town;
        this.currEnemy = new Enemy();

        this.playersTurn = true;

        this.weapon_mainhand = new Weapon();
        console.log(this.weapon_mainhand);

        this.weapInvLimit = 50;
        this.weapInventory = [];
    };


    progress() {
        switch (this.currAction) {
            //Change to travelling
            case actions.Idling:
                this.startTravelling();
                return ("**" + this.name + "** is travelling to " + this.getLocationName(this.location));
                break;
            case actions.Travelling:
                this.startSeaching();
                return ("**" + this.name + "** is searching around for Enemies")
                break;
            case actions.Searching:
                this.startBattling();
                return ("<@" + this.id + "> Started a battle with **" + this.getEnemyName(this.currEnemy.name) + " [ Lv " + this.currEnemy.level + " ]**");
                //
                break;
            case actions.Battling:
                if (this.currEnemy.currHP === 0) {
                    //YOu killed the enemy yahoo
                    let expGained = this.currEnemy.maxHP * this.currEnemy.maxDmg * 0.5;
                    this.currExp += expGained;
                    let goldGained = Math.floor(Math.random() * (this.currEnemy.maxDmg * this.currEnemy.maxHP)) + 1;
                    this.gold += goldGained;

                    this.startLooting();
                    return ("<@" + this.id + "> ***Won*** his battle against **" + this.getEnemyName(this.currEnemy.name) + " [lvl" + this.currEnemy.level + "]** " + "and gained **[ " + expGained + "exp ][ " + goldGained + "gold ]** \n And then started looting the corpse..");

                }
                else if (this.currHP === 0) {

                    this.startReturning();
                    return ("<@" + this.id + "> ***Failed*** to kill his enemy... what a newb");
                }
                else if (this.playersTurn) {

                    //attack enemy
                    this.attackEnemy();
                    this.playersTurn = false;
                }
                else {
                    //attack player
                    this.attackPlayer();
                    this.playersTurn = true;
                }
                break;
            case actions.Looting:
                //If found loot
                if (Math.random() * 100 <= this.currEnemy.dropRate) {
                    if (this.weapInventory.length < this.weapInvLimit) {
                        this.getLoot();
                        return ("**" + this.name + "** found an item! Checking it out...");
                    }
                    else {
                        this.dontGetLoot();
                        return ("**" + this.name + "** found an item! But has a full inventory... [" + this.weapInvLimit + " / " + this.weapInvLimit + "]");
                    }
                }
                else {
                    this.dontGetLoot();
                    return ("**" + this.name + "** couldn't find anything else...");
                }
                break;
            case actions.FoundLoot:
                let itemFound = new Weapon(this.level);
                console.log(itemFound);
                //Add to inventory
                this.weapInventory.push(itemFound)

                let rarityColour = "";
                switch (itemFound.rarity) {
                    case rarity.Common:
                        rarityColour = "#d8d8d8";
                        break;
                    case rarity.Uncommon:
                        rarityColour = "#95ce92";
                        break;
                    case rarity.Rare:
                        rarityColour = "#62b4ef";
                        break;
                    case rarity.Epic:
                        rarityColour = "#d063f2";
                        break;
                    case rarity.Legendary:
                        rarityColour = "#e5ad5e";
                        break;
                    case rarity.Unique:
                        rarityColour = "#ed4b4b";
                        break;
                    default:
                        rarityColour = "#d8d8d8";
                        break;
                }

                let pInfo = new Discord.RichEmbed()
                    .setDescription("<@" + this.id + "> FOUND: ")
                    .setColor(rarityColour)
                    .setThumbnail("https://i.imgur.com/CFivIPM.png") //sword pic
                    .addField("Name:  ", itemFound.getName())
                    .addField("Level: ", itemFound.level)
                    .addField("Rarity:", itemFound.getRarityName(itemFound.rarity))
                    .addField("Damage:", itemFound.getDamageText());

                this.dontGetLoot();
                return pInfo;
                break;
            case actions.DidntFindLoot:

                this.startReturning();
                return ("**" + this.name + "** is returning back to Town");
                break;
            case actions.Returning:
                this.startIdling();
                return ("**" + this.name + "** is idling in the Town");
                break;
        }

    };

    checkLevelUp() {
        if (this.currExp >= this.nextLevelExp) {
            this.level++;
            this.nextLevelExp = Math.floor((this.level * 10) * (this.level * 10) * 0.4)
            return true;
        }
        return false;
    };

    changeName(newName) {
        this.name = newName;
    };

    getLocationName(index) {
        for (var state in locations) {
            if (locations[state] == index) {
                return state;
            }
        }
    };

    getActionName(index) {
        for (var state in actions) {
            if (actions[state] == index) {
                return state;
            }
        }
    };

    getEnemyName(index) {
        for (var state in enemyNames) {
            if (enemyNames[state] == index) {
                return state;
            }
        }
    };

    //events
    startTravelling() {
        let newLocationID = Math.floor(Math.random() * Object.keys(locations).length - 1) + 1;
        this.location = newLocationID;
        this.currAction = actions.Travelling;
    };

    startSeaching() {
        this.currAction = actions.Searching;
    };

    startBattling() {
        //Make new enemy
        this.setupEnemy();
        //reset players stats
        this.resetStats();
        this.currAction = actions.Battling;
    };

    startLooting() {
        this.currAction = actions.Looting;
    };

    getLoot() {
        this.currAction = actions.FoundLoot;
    };

    dontGetLoot() {
        this.currAction = actions.DidntFindLoot;
    };

    startReturning() {
        this.currAction = actions.Returning;
    };

    startIdling() {
        this.location = 0;
        this.currAction = actions.Idling;
    };

    //Battle functions
    setupEnemy() {
        console.log("Setting up enemy..")
        //Random name
        this.currEnemy.name = Math.floor(Math.random() * Object.keys(enemyNames).length);

        //How higher the enemy will be than you.
        let levelInc = Math.floor(Math.random() * 3);
        //Set enemy level
        this.currEnemy.level = this.level + levelInc;

        //Set enemy hp based on level
        this.currEnemy.maxHP = this.currEnemy.level * 5;
        this.currEnemy.currHP = this.currEnemy.maxHP;

        this.maxDmg = this.currEnemy.level * 0.5 * this.currEnemy.maxHP;
        this.currEnemy.minDmg = this.currEnemy.level;

        //Will be random, or based on hp later
        this.currEnemy.dropRate = 100;

    };

    resetStats() {
        console.log("Resetting player stats..")
        //Reset hp
        this.currHP = this.maxHP;
        this.playersTurn = true;
        //Reset dmg (buffed?)
    };

    attackEnemy() {
        console.log("Attacking enemy..")
        let damageDealt = (Math.floor(Math.random() * (this.weapon_mainhand.maxDmg - this.weapon_mainhand.minDmg + 1))) + this.weapon_mainhand.minDmg;
        console.log("Dealt " + damageDealt + " to enemy");

        this.currEnemy.currHP -= damageDealt;
        console.log(this.currEnemy.currHP);

        if (this.currEnemy.currHP <= 0) {
            this.currEnemy.currHP = 0;
        }
    }

    attackPlayer() {
        console.log("Attacking player..")
        let damageDealt = (Math.floor(Math.random() * (this.currEnemy.maxDmg - this.currEnemy.minDmg + 1))) + this.currEnemy.minDmg;
        console.log("Enemy dealt " + damageDealt + " to player");
        this.currHP -= damageDealt;

        if (this.currHP <= 0) {
            this.currHP = 0;
        }


    }
}



module.exports = player;
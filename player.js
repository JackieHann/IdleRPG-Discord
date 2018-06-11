const Discord = require("discord.js");
//var bot;

function enemy() 
{
    this.name = enemyNames.Chicken;
    this.level = 1;
    this.maxHP = 10;
    this.currHP = this.maxHP;
    this.maxDmg = 2;
    this.minDmg = 1;
    this.dropRate = 100;
}

var actions = 
            {   
                "Idling":       1,
                "Travelling":   2,
                "Searching":    3,
                "Battling":     4,
                "Looting":      5,
                "Returning":    6
            };

var locations = 
            {
                "Town":             0,
                "Lumbridge":        1,
                "Gnome Stronghold": 2,
                "Varrock":          3,
                "Taverly":          4,
                "Camelot":          5,
                "Wilderness":       6       
            };

var enemyNames = 
            {
                "Chicken":  0,
                "Goblin":   1,
                "Cow" :     2,
                "Farmer":   3,
                "Wizard":   4,
                "Knight":   5,
                "Bodyguard":6,
                "Squire":   7,
                "Prince":   8,
                "King":     9,
            };

class player
{
    constructor(nickname, ID)
    {
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

        this.currEnemy = new enemy();

        this.playersTurn = true;
    };

    progress()
    {
        let msg = "";
        switch(this.currAction)
        {
            //Change to travelling
            case actions.Idling:
                this.startTravelling();
                msg = "**" + this.name + "** is travelling to " + this.getLocationName(this.location);
                break;
            case actions.Travelling:
                this.startSeaching();
                msg += "**" +this.name + "** is searching around for Enemies";
                break; 
            case actions.Searching:
                this.startBattling();
                msg = "<@" + this.id + "> Started a battle with **" + this.getEnemyName(this.currEnemy.name) + " [ Lv " + this.currEnemy.level + " ]**";
//
                break;  
            case actions.Battling:
                if (this.currEnemy.currHP === 0)
                {
                    //YOu killed the enemy yahoo
                    let expGained = this.currEnemy.maxHP * this.currEnemy.maxDmg * 0.5;
                    this.currExp += expGained;
                    let goldGained = Math.floor(Math.random() * (this.currEnemy.maxDmg * this.currEnemy.maxHP)) + 1;
                    this.gold += goldGained;

                    this.startLooting();
                    msg = "<@" + this.id + "> ***Won*** his battle against **" + this.getEnemyName(this.currEnemy.name) + " [lvl" +this.currEnemy.level + "]** "  + "and gained **[ " + expGained + "exp ][ " + goldGained + "gold ]** \n And then started looting the corpse..";
                    
                }
                else if (this.currHP === 0)
                {
                    msg = "<@" + this.id +"> ***Failed*** to kill his enemy...";
                    this.startReturning();
                }
                else if (this.playersTurn)
                {
                    
                    //attack enemy
                    this.attackEnemy();
                    this.playersTurn = false;
                }
                else
                {
                    //attack player
                    this.attackPlayer();
                    this.playersTurn = true;
                }
                break;  
            case actions.Looting:
                this.startReturning();
                msg = "**" + this.name + "** is returning back to Town";
                break;  
            case actions.Returning:
                this.startIdling();
                msg = "**" + this.name + "** is idling in the Town";
                break;  
        }
        return msg;
    };

    checkLevelUp()
    {
        if (this.currExp >= this.nextLevelExp)
        {
            this.level++;
            this.nextLevelExp = Math.floor((this.level * 10) * (this.level * 10) * 0.4)
            return true;
        }
        return false; 
    };
    
    changeName(newName)
    {
         this.name = newName;
    };

    getLocationName(index)
    {
        for (var state in locations) {
            if (locations[state] == index) {
                return state;
            }
        }
    };

    getActionName(index)
    {
        for (var state in actions) {
            if (actions[state] == index) {
                return state;
            }
        }
    };

    getEnemyName(index)
    {
        for (var state in enemyNames) {
            if (enemyNames[state] == index) {
                return state;
            }
        }
    };

    //events
    startTravelling()
    {
        let newLocationID = Math.floor(Math.random() * Object.keys(locations).length - 1) + 1;
        this.location = newLocationID;
        this.currAction = actions.Travelling;
    };

    startSeaching()
    {
        this.currAction = actions.Searching;
    };

    startBattling()
    {
        //Make new enemy
        this.setupEnemy();
        //reset players stats
        this.resetStats();
        this.currAction = actions.Battling;
    };

    startLooting()
    {
        this.currAction = actions.Looting;
    };

    startReturning()
    {
        this.currAction = actions.Returning;
    };

    startIdling()
    {
        this.location = 0;
        this.currAction = actions.Idling;
    };

    //Battle functions
    setupEnemy()
    {
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
    resetStats()
    {
        console.log("Resetting player stats..")
        //Reset hp
        this.currHP = this.maxHP;
        this.playersTurn = true;
        //Reset dmg (buffed?)
    };

    attackEnemy()
    {
        console.log("Attacking enemy..")
        let damageDealt = (Math.floor(Math.random() * (this.maxDmg - this.minDmg + 1)))+ this.minDmg;
        console.log("Dealt " + damageDealt + " to enemy");
        
        this.currEnemy.currHP -= damageDealt;
        console.log(this.currEnemy.currHP);

        if(this.currEnemy.currHP <= 0)
        {
            this.currEnemy.currHP = 0;
        }
    }

    attackPlayer()
    {
        console.log("Attacking player..")
        let damageDealt = (Math.floor(Math.random() * (this.currEnemy.maxDmg - this.currEnemy.minDmg + 1)))+ this.currEnemy.minDmg;
        console.log("Enemy dealt " + damageDealt + " to player");
        this.currHP -= damageDealt;

        if(this.currHP <= 0)
        {
            this.currHP = 0;
        }

        
    }
}



module.exports = player;
const Discord = require("discord.js");
//var bot;


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
        this.currAction = actions.Idling;
        this.location = locations.Town;
        this.currEnemy = enemyNames.Chicken;
    };

    progress()
    {
        let msg = "";
        switch(this.currAction)
        {
            //Change to travelling
            case actions.Idling:
                this.startTravelling();
                msg += "Travelling to " + this.getLocationName(this.location);
                break;
            case actions.Travelling:
                this.startSeaching();
                msg += "Searching around";
                break; 
            case actions.Searching:
                this.startBattling();
                msg += "Battling a " + this.getEnemyName(this.currEnemy);
                break;  
            case actions.Battling:
                this.startLooting();
                msg = "Looting";
                break;  
            case actions.Looting:
                this.startReturning();
                msg = "Returning to Town";
                break;  
            case actions.Returning:
                this.startIdling();
                msg = "Idling in Town";
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
        let newEnemyID = Math.floor(Math.random() * Object.keys(enemyNames).length)
        this.currEnemy = newEnemyID;
        this.currAction = actions.Battling;
    };

    startLooting()
    {
        this.currExp += 25;
        this.gold += 50;
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
}



module.exports = player;
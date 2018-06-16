//Weapon Stuff
const rarity = require("./../_StoredValues/rarity.json");
const type = require("./../_StoredValues/type_arm.json");
const prefixes = require("./../_StoredValues/prefix_weap.json");
const suffixes = require("./../_StoredValues/suffix_weap.json");

class Armour {
    constructor(level, type) {
        if (level != undefined && type != undefined) {
            this.typeOfItem = "armour";

            this.rarity = rarity.Common;
            this.type = type;

            this.prefix = prefixes.Bad;
            this.suffix = suffixes.Bad;

            this.level = 1;
        }
        else {

            this.typeOfItem = "armour";

            let prefixLength = 0;
            for (var state in prefixes) {
                prefixLength++;
            }

            let typeLength = 4;
            //for (var state in type) {
            //    typeLength++;
            //}
            //console.log(typeLength);

            let suffixLength = 0;
            for (var state in suffixes) {
                suffixLength++;
            }

            this.level = level;
            //Rarity
            //Roll dice
            let itemRarity = Math.floor(Math.random() * 100) + 1;
            if (itemRarity >= 99)
                this.rarity = rarity.Unique;
            else if (itemRarity >= 94)
                this.rarity = rarity.Legendary;
            else if (itemRarity >= 80)
                this.rarity = rarity.Epic;
            else if (itemRarity >= 55)
                this.rarity = rarity.Rare;
            else if (itemRarity >= 30)
                this.rarity = rarity.Uncommon;
            else
                this.rarity = rarity.Common;

            //console.log("Rarity Rolled: " + getRarityName(this.rarity));
            //Prefix
            let itemPrefix = Math.floor(Math.random() * prefixLength);
            this.prefix = itemPrefix;

            //Type
            let itemType = Math.floor(Math.random() * typeLength);
            console.log("Type of item: " + this.getTypeName(itemType));
            this.type = itemType;

            //Suffix
            let itemSuffix = Math.floor(Math.random() * suffixLength);
            this.suffix = itemSuffix;

        }

    }

    getName() {
        let prfx = this.getPrefixName(this.prefix);
        let typ = this.getTypeName(this.type);
        let sffx = this.getSuffixName(this.suffix);
        return (prfx + " " + typ + " of " + sffx);
    };

    getRarityName(index) {
        for (var state in rarity) {
            if (rarity[state] == index) {
                return state;
            }
        }
    };

    getPrefixName(index) {
        for (var state in prefixes) {
            if (prefixes[state] == index) {
                return state;
            }
        }
    };

    getTypeName(index) {
        for (var state in type) {
            if (type[state] == index) {
                return state;
            }
        }
    };

    getSuffixName(index) {
        for (var state in suffixes) {
            if (suffixes[state] == index) {
                return state;
            }
        }
    };

    getDamageText(){
        return "[ " + this.minDmg + " ~ " + this.maxDmg + " ]";
    };

    getSellPrice()
    {
        return Math.floor(this.level * (Math.sqrt(this.rarity + 1)) * 50);
    };
};

module.exports = Armour;
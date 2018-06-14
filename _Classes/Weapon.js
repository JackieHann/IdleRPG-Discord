//Weapon Stuff
const rarity = require("./../_StoredValues/rarity.json");
const type = require("./../_StoredValues/type_weap.json");
const prefixes = require("./../_StoredValues/prefix_weap.json");
const suffixes = require("./../_StoredValues/suffix_weap.json");

class Weapon {
    constructor(level) {
        if (level === undefined) {
            this.rarity = rarity.Common;
            this.type = type.Sword;

            this.prefix = prefixes.Bad;
            this.suffix = suffixes.Bad;

            this.attackSpeed = 1;

            this.minDmg = 1;
            this.maxDmg = 3;

            this.level = 1;
        }
        else {

            let prefixLength = 0;
            for (var state in prefixes) {
                prefixLength++;
            }
            console.log(prefixLength);

            let typeLength = 0;
            for (var state in type) {
                typeLength++;
            }
            console.log(typeLength);

            let suffixLength = 0;
            for (var state in suffixes) {
                suffixLength++;
            }
            console.log(suffixLength);

            this.level = level;
            //Rarity
            //Roll dice
            let itemRarity = Math.floor(Math.random() * 100) + 1;
            console.log("Player Rolled a " + itemRarity);
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
            console.log("Prefix length: " + prefixLength);
            let itemPrefix = Math.floor(Math.random() * prefixLength);
            this.prefix = itemPrefix;
            console.log("Items Prefix: " + this.getPrefixName(itemPrefix));

            //Type
            console.log("Type length: " + typeLength);
            let itemType = Math.floor(Math.random() * typeLength);
            this.type = itemType;
            console.log("Items Type: " + this.getTypeName(itemType));

            //Suffix
            console.log("Suffix length: " + suffixLength);
            let itemSuffix = Math.floor(Math.random() * suffixLength);
            this.suffix = itemSuffix;
            console.log("Items Suffix: " + this.getSuffixName(itemSuffix));

            let defaultMin = itemPrefix;
            let defaultMax = defaultMin + 1;
            console.log("Added " + itemPrefix + " to items min damage");
            console.log("CurrentModifier: " + defaultMin + " ~ " + defaultMax);

            defaultMax += itemSuffix;
            console.log("Added " + itemSuffix + " to items max damage");
            console.log("CurrentModifier: " + defaultMin + " ~ " + defaultMax);

            //Something to do with attackspeed here at some point
            this.attackSpeed = 0.8;
            defaultMin *= this.attackSpeed;
            defaultMax *= this.attackSpeed;
            console.log("Applied attackSpeed of: " + this.attackSpeed);
            console.log("CurrentModifier: " + defaultMin + " ~ " + defaultMax);

            //Apply rarity
            let rarityMultiplier = Math.sqrt(itemRarity) / 2;
            console.log("Rarity rolled " + itemRarity + " so multiplying by " + rarityMultiplier);
            defaultMin *= rarityMultiplier;
            defaultMax *= rarityMultiplier;
            console.log("CurrentModifier: " + defaultMin + " ~ " + defaultMax);

            //Scale down to level
            let levelScale = Math.sqrt(level) / 5;
            console.log("Item is level " + level + " so scaling by " + levelScale);
            defaultMin *= levelScale;
            defaultMax *= levelScale;
            console.log("Final Modifier for weap: " + defaultMin + " ~ " + defaultMax);

            this.minDmg = Math.floor(defaultMin);
            this.maxDmg = Math.ceil(defaultMax);
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
};

module.exports = Weapon;
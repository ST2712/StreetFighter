import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;

        const attackInterval = 1000;

        const fightInterval = setInterval(() => {
            const damageToSecond = getDamage(firstFighter, secondFighter);
            secondFighterHealth -= damageToSecond;

            const damageToFirst = getDamage(secondFighter, firstFighter);
            firstFighterHealth -= damageToFirst;

            if (firstFighterHealth <= 0) {
                clearInterval(fightInterval);
                resolve(secondFighter);
            } else if (secondFighterHealth <= 0) {
                clearInterval(fightInterval);
                resolve(firstFighter);
            }
        }, attackInterval);
    });
}

export function getDamage(attacker, defender) {
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    return hitPower > blockPower ? hitPower - blockPower : 0;
}

export function getHitPower(fighter) {
    const criticalHitChance = 1 + Math.random();
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const dodgeChance = 1 + Math.random();
    return fighter.defense * dodgeChance;
}

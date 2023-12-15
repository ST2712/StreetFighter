import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;
        let lastCriticalHitTime = Date.now();
        let firstFighterBlocking = false; // Estado de bloqueo para el primer luchador
        let secondFighterBlocking = false; // Estado de bloqueo para el segundo luchador

        const updateHealthBarRight = (fighter, health) => {
            const healthBar = document.getElementById('right-fighter-indicator');
            if (healthBar) {
                const newWidth = (health / fighter.health) * 100;
                healthBar.style.width = `${newWidth}%`;
            } else {
                console.log(`No se encontró la barra de salud para: ${fighter._id}`);
            }
        };

        const updateHealthBarLeft = (fighter, health) => {
            const healthBar = document.getElementById('left-fighter-indicator');
            if (healthBar) {
                const newWidth = (health / fighter.health) * 100;
                healthBar.style.width = `${newWidth}%`;
            } else {
                console.log(`No se encontró la barra de salud para: ${fighter._id}`);
            }
        };

        const isCriticalHit = () => {
            const now = Date.now();
            if (now - lastCriticalHitTime > 10000) {
                lastCriticalHitTime = now;
                return true;
            }
            return false;
        };
        
        
        const handleAttack = (attacker, defender, defenderHealth, defenderBlocking) => {
            const criticalHit = isCriticalHit();
            if (defenderBlocking && !criticalHit) {
                return defenderHealth;
            }
            const damage = criticalHit ? 2 * attacker.attack : getDamage(attacker, defender);
            return Math.max(defenderHealth - damage, 0);
        };

        const onKeyPress = (event) => {
            if (event.key === controls.PlayerOneAttack && !firstFighterBlocking) {
                secondFighterHealth = handleAttack(firstFighter, secondFighter, secondFighterHealth, secondFighterBlocking);
                updateHealthBarRight(secondFighter, secondFighterHealth);
            } else if (event.key === controls.PlayerTwoAttack && !secondFighterBlocking) {
                firstFighterHealth = handleAttack(secondFighter, firstFighter, firstFighterHealth, firstFighterBlocking);
                updateHealthBarLeft(firstFighter, firstFighterHealth);
            } else if (event.key === controls.PlayerOneBlock) {
                firstFighterBlocking = !firstFighterBlocking;
            } else if (event.key === controls.PlayerTwoBlock) {
                secondFighterBlocking = !secondFighterBlocking;
            }

            if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
                document.removeEventListener('keydown', onKeyPress);
                resolve(firstFighterHealth <= 0 ? secondFighter : firstFighter);
            }
        };

        document.addEventListener('keydown', onKeyPress);
        
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

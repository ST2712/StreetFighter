import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;
        let lastCriticalHitTime = Date.now();

        const updateHealthBar = (fighter, health) => {
            // Actualiza la barra de salud del luchador en la interfaz de usuario
        };

        const handleAttack = (attacker, defender, defenderHealth) => {
            const isCriticalHit = Date.now() - lastCriticalHitTime > 10000; // 10 segundos de enfriamiento
            const damage = isCriticalHit ? 2 * attacker.attack : getDamage(attacker, defender);
            if (isCriticalHit) lastCriticalHitTime = Date.now();

            return Math.max(defenderHealth - damage, 0);
        };

        document.addEventListener('keydown', (event) => {
            if (event.key === controls.PlayerOneAttack) {
                secondFighterHealth = handleAttack(firstFighter, secondFighter, secondFighterHealth);
                updateHealthBar(secondFighter, secondFighterHealth);
            } else if (event.key === controls.PlayerTwoAttack) {
                firstFighterHealth = handleAttack(secondFighter, firstFighter, firstFighterHealth);
                updateHealthBar(firstFighter, firstFighterHealth);
            }
            // Implementar lógica para bloqueos aquí

            if (firstFighterHealth <= 0) {
                document.removeEventListener('keydown', this);
                resolve(secondFighter);
            } else if (secondFighterHealth <= 0) {
                document.removeEventListener('keydown', this);
                resolve(firstFighter);
            }
        });
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

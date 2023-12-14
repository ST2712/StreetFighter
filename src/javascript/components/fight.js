import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;
        let lastCriticalHitTime = Date.now();

        const updateHealthBar = (fighter, health) => {
            console.log('Objeto fighter:', fighter);
            console.log(`Buscando barra de salud para ID: ${fighter._id}-health`);
            const healthBar = document.getElementById(`${fighter._id}-health`);
            if (healthBar) {
                const newWidth = (health / fighter.health) * 100;
                console.log(`Nueva anchura de la barra de salud: ${newWidth}%`);
                healthBar.style.width = `${newWidth}%`;
            } else {
                console.log(`No se encontró la barra de salud para: ${fighter._id}`);
            }
        };
        
        
        const handleAttack = (attacker, defender, defenderHealth) => {
            const isCriticalHit = Date.now() - lastCriticalHitTime > 10000;
            const damage = isCriticalHit ? 2 * attacker.attack : getDamage(attacker, defender);
            if (isCriticalHit) lastCriticalHitTime = Date.now();

            return Math.max(defenderHealth - damage, 0);
        };

        const onKeyPress = (event) => {
            if (event.key === controls.PlayerOneAttack) {
                secondFighterHealth = handleAttack(firstFighter, secondFighter, secondFighterHealth);
                updateHealthBar(secondFighter, secondFighterHealth);
                console.log("Hola")
            } else if (event.key === controls.PlayerTwoAttack) {
                firstFighterHealth = handleAttack(secondFighter, firstFighter, firstFighterHealth);
                updateHealthBar(firstFighter, firstFighterHealth);
            }

            if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
                document.removeEventListener('keydown', onKeyPress);
                resolve(firstFighterHealth <= 0 ? secondFighter : firstFighter);
            }
        };

        document.addEventListener('keydown', onKeyPress);
        document.addEventListener('keydown', (event) => {
            console.log(`Tecla presionada: ${event.key}`);
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

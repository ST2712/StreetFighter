import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    if (!fighter) {
        return;
    }

    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    const imgElement = createFighterImage(fighter);
    fighterElement.appendChild(imgElement);

    const nameElement = createElement({
        tagName: 'span',
        className: 'fighter-preview___name'
    });
    nameElement.innerText = fighter.name;
    fighterElement.appendChild(nameElement);

    const healthElement = createElement({
        tagName: 'span',
        className: 'fighter-preview___health'
    });
    healthElement.innerText = `Health: ${fighter.health}`;
    fighterElement.appendChild(healthElement);

    const attackElement = createElement({
        tagName: 'span',
        className: 'fighter-preview___attack'
    });
    attackElement.innerText = `Attack: ${fighter.attack}`;
    fighterElement.appendChild(attackElement);

    const defenseElement = createElement({
        tagName: 'span',
        className: 'fighter-preview___defense'
    });
    defenseElement.innerText = `Defense: ${fighter.defense}`;
    fighterElement.appendChild(defenseElement);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

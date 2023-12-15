import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    // Crear el cuerpo del modal
    const bodyElement = createElement({ tagName: 'div', className: 'modal-body' });

    // Título con el nombre del ganador
    const fighterName = createElement({ tagName: 'h1' });
    fighterName.innerText = `¡Ganador: ${fighter.name}!`;

    // Crear y añadir la imagen del ganador
    const fighterImage = createElement({
        tagName: 'img',
        attributes: { src: '../../../../resources/trophy.jpg' } // Asegúrate de que 'fighter.image' contiene la URL de la imagen
    });
    fighterImage.style.maxWidth = '100%'; // Opcional: Establecer un ancho máximo para la imagen

    // Añadir el nombre y la imagen al cuerpo del modal
    bodyElement.append(fighterName, fighterImage);

    // Mostrar el modal
    showModal({
        title: 'Fin del Combate',
        bodyElement: bodyElement,
        onClose: () => {
            console.log('Modal cerrado');
        }
    });
}

const sectionBtn = document.querySelector('.offers__show-more')
const offersCards = document.querySelector('.offers__cards')
const cards = document.querySelectorAll('.offers__card')
const computedStyle = window.getComputedStyle(offersCards)
const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns')
const columnsCount = gridTemplateColumns.split(' ').length

const isSingleColumn = columnsCount === 1

//load card height
const handleCardsHeight = () => {
	const cards = document.querySelectorAll('.offers__card')
	let maxHeight = 0

	cards.forEach(card => {
		const cardHeight = card.offsetHeight
		if (cardHeight > maxHeight) {
			maxHeight = cardHeight
		}
	})

	if (offersCards) {
		offersCards.style.maxHeight = `${maxHeight}px` 
	}
}

// Show/close all section's cards
const handleSection = () => {
	const cards = document.querySelectorAll('.offers__card')
	let maxHeight = 0

	offersCards.classList.toggle('offers__cards--show-all')

	if (offersCards.classList.contains('offers__cards--show-all')) {
		sectionBtn.innerHTML = 'Zwiń <i class="fa fa-angle-double-up"></i>'
	} else {
		sectionBtn.innerHTML = 'Zobacz więcej <i class="fa fa-angle-double-down"></i>'
	}

	cards.forEach(card => {
		const cardHeight = card.offsetHeight
		if (cardHeight > maxHeight) {
			maxHeight = cardHeight
		}
	})

	if (offersCards) {
		if (isSingleColumn == true && offersCards.classList.contains('offers__cards--show-all')) {
			offersCards.style.maxHeight = `${(maxHeight + gap) * cards.length}px`
		} else if (offersCards.classList.contains('offers__cards--show-all')) {
			offersCards.style.maxHeight = `${maxHeight * cards.length}px` 
		} else {
			offersCards.style.maxHeight = `${maxHeight}px` 
		}
	}
}


// Offers BTN rewerse Click
const handleCardClick = (card) => {
    const btn = card.querySelector('.offers__card-rewers-btn');

    // Block click to start
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';

    // After 600ms (animation time) unlock click
    setTimeout(() => {
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
    }, 600);
};

const initCardHover = () => {
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => handleCardClick(card));
        card.addEventListener('mouseleave', () => {
            const btn = card.querySelector('.offers__card-rewers-btn');
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.5';
        });
    });
};


sectionBtn.addEventListener('click', handleSection)
document.addEventListener('DOMContentLoaded', handleCardsHeight)
document.addEventListener('DOMContentLoaded', initCardHover);

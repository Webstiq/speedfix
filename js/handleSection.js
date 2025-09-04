const sectionBtn = document.querySelector('.offers__show-more')
const offersCards = document.querySelector('.offers__cards')
const cards = document.querySelectorAll('.offers__card')
const computedStyle = window.getComputedStyle(offersCards)
const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns')
const columnsCount = gridTemplateColumns.split(' ').length

const cardButtons = document.querySelectorAll('.offers__card-awers-btn')
const awersButtons = document.querySelectorAll('.offers__card-awers-btn');

const isSingleColumn = columnsCount === 1


//-----------------------------------
// Section resizing 
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

//-------------------------------------
// Rewers btn blocking for click on card before animation
const handleCardClick = card => {
	const btn = card.querySelector('.offers__card-rewers-btn')

	// Block click to start
	btn.style.pointerEvents = 'none'
	btn.style.opacity = '0.5'

	// After 600ms (animation time) unlock click
	setTimeout(() => {
		btn.style.pointerEvents = 'auto'
		btn.style.opacity = '1'
	}, 600)
}

// Card hover events 
const initCardHover = () => {
	cards.forEach(card => {
		card.addEventListener('mouseenter', () => handleCardClick(card))
		card.addEventListener('mouseleave', () => {
			const btn = card.querySelector('.offers__card-rewers-btn')
			btn.style.pointerEvents = 'none'
			btn.style.opacity = '0.5'
		})
	})
}

//-------
// Manage rewers return handlers for tab and ESC
const setupRewersReturnHandlers = (card, rewersBtn) => {
	// Kliknięcie przycisku
	const handleClick = () => {
		card.classList.remove('is-flipped');
		card.classList.add('is-unflipped');

		card.querySelector('.offers__card-awers').style.opacity = '';
		card.querySelector('.offers__card-rewers').style.opacity = '';
	};

	rewersBtn.addEventListener('click', handleClick);

	const handleEsc = e => {
		if (e.key === 'Escape') {
			card.classList.remove('is-flipped');
			card.classList.add('is-unflipped');
			document.removeEventListener('keydown', handleEsc);
		}
	};

	document.addEventListener('keydown', handleEsc);

	rewersBtn.addEventListener('blur', () => {
		card.classList.remove('is-flipped');
		card.classList.add('is-unflipped');
	});
};

// Offers BTN rewerse Click and ESC
const handleCardFlip = button => {
	const card = button.closest('.offers__card');
	if (!card) return;

	card.classList.remove('is-unflipped');
	card.classList.add('is-flipped');
	handleCardClick(card);

	const rewersBtn = card.querySelector('.offers__card-rewers-btn');
	if (!rewersBtn) return;

	setTimeout(() => {
		rewersBtn.focus();
	}, 600);

	setupRewersReturnHandlers(card, rewersBtn);
};

//--------------------
// Offers BTN rewerse Focus on the top of the card
const handleAwersBtnFocus = button => {
    const card = button.closest('.offers__card');
    if (!card || offersCards.classList.contains('offers__cards--show-all')) return;

    card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
    });
};

// Event listeners for card buttons 
cardButtons.forEach(button => {
	button.addEventListener('click', e => {
		e.preventDefault();
		handleCardFlip(button);
	});
});

awersButtons.forEach(button => {
    button.addEventListener('focus', () => handleAwersBtnFocus(button));
});


sectionBtn.addEventListener('click', handleSection)
document.addEventListener('DOMContentLoaded', handleCardsHeight)
document.addEventListener('DOMContentLoaded', initCardHover)

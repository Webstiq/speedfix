const popup = document.querySelector('.tips__popup')
const popupBtn = document.querySelector('.tips__popup-box-btn')
const tipsBtn = document.querySelector('.tips_btn')
const popupBox = document.querySelector('.tips__popup-box')

const trapFocusPopup = e => {
	const focusable = Array.from(
		popupBox.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
	)
	const first = focusable[0]
	const last = focusable[focusable.length - 1]

	if (e.key === 'Tab') {
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault()
			last.focus()
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault()
			first.focus()
		}
	}
}

const handleEscapePopup = e => {
	if (e.key === 'Escape') {
		togglePopup(false)
	}
}

const togglePopup = open => {
	if (open) {
		popup.style.display = 'block'
		popup.setAttribute('aria-hidden', 'false')
		tipsBtn.setAttribute('aria-expanded', 'true')
		popup.classList.add('popup-animation')
		document.addEventListener('keydown', trapFocusPopup)
		document.addEventListener('keydown', handleEscapePopup)
		popupBtn.focus()
	} else {
		popup.style.display = 'none'
		popup.setAttribute('aria-hidden', 'true')
		tipsBtn.setAttribute('aria-expanded', 'false')
		popup.classList.remove('popup-animation')
		document.removeEventListener('keydown', trapFocusPopup)
		document.removeEventListener('keydown', handleEscapePopup)
		tipsBtn.focus()
	}
}

tipsBtn.addEventListener('click', () => togglePopup(true))
popupBtn.addEventListener('click', () => togglePopup(false))
window.addEventListener('click', e => {
	if (e.target === popup) togglePopup(false)
})

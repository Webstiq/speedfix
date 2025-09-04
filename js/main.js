const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.hamburger')
const allNavItem = document.querySelectorAll('.nav__link')
const cookieBox = document.querySelector('.cookie-box')
const cookieBtn = document.querySelector('.cookie-box__btn')
const footerYear = document.querySelector('.footer__year')

// Navigation

// Function for focus trap
const trapFocus = e => {
	const focusable = [
		navBtn,
		...Array.from(nav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')),
	]
	const first = focusable[0]
	const last = focusable[focusable.length - 1]

	if (e.key === 'Tab') {
		if (e.shiftKey) {
			if (document.activeElement === first) {
				e.preventDefault()
				last.focus()
			}
		} else {
			if (document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}
	}
}

// Function for escape to close menu
const handleEscape = e => {
	if (e.key === 'Escape') {
		closeMenu()
	}
}

const animateNavLinksIn = () => {
	allNavItem.forEach(item => {
		item.classList.remove('nav-links-animation')
		item.style.animationDelay = '0s'
	})

	let delayTime = 0
	setTimeout(() => {
		allNavItem.forEach(item => {
			void item.offsetWidth
			item.classList.add('nav-links-animation')
			item.style.animationDelay = '.' + delayTime + 's'
			delayTime++
		})
	}, 200)
}

const animateNavLinksOut = () => {
	allNavItem.forEach(item => {
		item.classList.remove('nav-links-animation')
		item.style.animationDelay = '0s'
	})
}

const openMenu = () => {
	nav.style.display = 'flex'
	nav.setAttribute('aria-hidden', 'false')
	
	navBtn.classList.add('is-active')
	navBtn.setAttribute('aria-expanded', 'true')

	document.addEventListener('keydown', trapFocus)
	document.addEventListener('keydown', handleEscape)

	animateNavLinksIn()

	setTimeout(() => {
		nav.classList.add('nav--active')
	}, 200)
}

const closeMenu = () => {
	nav.classList.remove('nav--active')
	nav.setAttribute('aria-hidden', 'true')
	navBtn.classList.remove('is-active')
	navBtn.setAttribute('aria-expanded', 'false')
	
	document.removeEventListener('keydown', trapFocus)
	document.removeEventListener('keydown', handleEscape)

	animateNavLinksOut()

	setTimeout(() => {
		nav.style.display = 'none'
		navBtn.focus() // Dobry UX
	}, 800)
}


// Cookie
const showCookie = () => {
	const cookieEaten = sessionStorage.getItem('cookie')
	if (cookieEaten) {
		cookieBox.classList.add('cookies-box--hide')
	}
}

const handleCookie = () => {
	sessionStorage.setItem('cookie', 'true')
	cookieBox.classList.add('cookies-box--hide')
}

// Current Year
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

showCookie()
handleCurrentYear()


// Open and close menu
navBtn.addEventListener('click', () => {
	const isExpanded = navBtn.getAttribute('aria-expanded') === 'true'
	isExpanded ? closeMenu() : openMenu()
})

// Close menu on link click
allNavItem.forEach(link => {
	link.addEventListener('click', closeMenu)
})
cookieBtn.addEventListener('click', handleCookie)

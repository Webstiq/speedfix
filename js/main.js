const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.hamburger')
const allNavItem = document.querySelectorAll('.nav__link')
const cookieBox = document.querySelector('.cookie-box')
const cookieBtn = document.querySelector('.cookie-box__btn')
const footerYear = document.querySelector('.footer__year')



// Navigation
const handleNavItemsAnimation = () => {
	let delayTime = 0

	allNavItem.forEach(item => {
		item.classList.toggle('nav-links-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const handleNav = () => {
	navBtn.classList.toggle('is-active')
	nav.classList.toggle('nav--active')

	allNavItem.forEach(item => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active')
			navBtn.classList.remove('is-active')
			allNavItem.forEach(item => {
				item.classList.remove('nav-links-animation')
			})
		})
	})

	handleNavItemsAnimation()
}

// Cookie
const showCookie = () => {
	const cookieEaten = sessionStorage.getItem('cookie')
	if(cookieEaten){
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

navBtn.addEventListener('click', handleNav)
cookieBtn.addEventListener('click', handleCookie)

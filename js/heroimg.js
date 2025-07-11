const heroSection = document.querySelector('.hero-img') 
const title = heroSection.querySelector('.hero-img__title') 
const text = heroSection.querySelector('.hero-img__text') 

const observer2 = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				title.classList.add('visible') 
				text.classList.add('visible') 
				observer.unobserve(entry.target) // stop watching the section after adding the class
			}
		})
	},
	{ threshold: 0.5 }
) // Section must be 50% visible

observer2.observe(heroSection) // start to monitor the hero-img section
const teamBoxes = document.querySelectorAll('.team__box') 

const toggleNonActiveClass = () => {
	teamBoxes.forEach(teamBox => {
		// If the screen is smaller than 768px, we add the team__box--nonactive class
		if (window.innerWidth < 768) {
			teamBox.classList.add('team__box--nonactive')
		} else {
			teamBox.classList.remove('team__box--nonactive')
		}
	})
}


// A function that supports opening and closing team__box
const handleTeamBox = openBox => {
	// We check if any of the team__boxes are open. If so, we close it
	teamBoxes.forEach(teamBox => {
		if (teamBox !== openBox && teamBox.classList.contains('team__box--open')) {
			// If a box is open, we close it
			teamBox.classList.remove('team__box--open')
			teamBox.classList.add('team__box--closing')
		}
	})

	if (openBox.classList.contains('team__box--open')) {
		openBox.classList.remove('team__box--open')
		openBox.classList.add('team__box--closing')
	} else {
		openBox.classList.remove('team__box--closing')
		openBox.classList.add('team__box--open')
	}
}

// Add an event listener to each team__box
teamBoxes.forEach(teamBox => {
	const teamBoxBtn = teamBox.querySelector('.team__box-btn')
	const teamBoxBtnI = teamBox.querySelector('.team__box-btn i')

	const handleClick = event => {
		// support click a button in team__box
		handleTeamBox(teamBox)

		teamBoxBtnI.classList.toggle('fa-angle-double-right')
		teamBoxBtnI.classList.toggle('fa-angle-double-left')

		// Stopping event propagation to occur inside the __box assembly did not close
		event.stopPropagation()
	}
	teamBoxBtn.addEventListener('click', handleClick)
})

// Function to close an open team__box after clicking outside of it
const closeTeamBoxOnClickOutside = event => {
	teamBoxes.forEach(teamBox => {
		if (!teamBox.contains(event.target) && teamBox.classList.contains('team__box--open')) {
			teamBox.classList.remove('team__box--open')
			teamBox.classList.add('team__box--closing')
		}
	})
}


document.addEventListener('click', closeTeamBoxOnClickOutside)
// We change the class after loading the page and when changing the resolution
window.addEventListener('load', toggleNonActiveClass)
window.addEventListener('resize', toggleNonActiveClass)



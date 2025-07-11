const popup = document.querySelector('.tips__popup')
const popupBtn = document.querySelector('.tips__popup-box-btn')
const tipsBtn = document.querySelector('.tips_btn')


// Tips POPUP
const showPopup = () => {
	if(!(popup.style.display === 'block')){
		popup.style.display = 'block'
	} else{
		popup.style.display = 'none'
	}

	popup.classList.toggle('popup-animation')
}

tipsBtn.addEventListener('click', showPopup)
popupBtn.addEventListener('click', showPopup)
window.addEventListener('click', e=> e.target === popup ? showPopup() : false)
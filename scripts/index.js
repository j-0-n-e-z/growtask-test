// Image Picker
const radioButtons = document.querySelectorAll(
	'input[type="radio"][name="pick"]'
)
const pickedImage = document.querySelector('.picked-image')

radioButtons.forEach(radioButton =>
	radioButton.addEventListener('change', e => {
		pickedImage.src = `../assets/img/image-picker/${e.currentTarget.value}.png`
	})
)

// Slidedown
const faqButtons = document.querySelectorAll(
	'input[type="checkbox"][name="faq"]'
)

faqButtons.forEach(faqButton =>
	faqButton.addEventListener('change', e => {
		const faqItemAnswer =
			e.currentTarget.parentElement.parentElement.nextElementSibling
		const faqItemButton = e.currentTarget.parentElement

		if (faqItemAnswer.classList.contains('faq-item__answer_opened')) {
			faqItemAnswer.classList.remove('faq-item__answer_opened')
			faqItemButton.classList.remove('faq-item__button_opened')
		} else {
			faqItemAnswer.classList.add('faq-item__answer_opened')
			faqItemButton.classList.add('faq-item__button_opened')
		}
	})
)

// Slider
const arrowLeft = document.querySelector('.arrow-button_left')
const arrowRight = document.querySelector('.arrow-button_right')
const container = document.querySelector('.slides')
const slides = document.querySelectorAll('li:has(.slide)')

const containerStyles = window.getComputedStyle(container)
const containerGap = parseInt(containerStyles.getPropertyValue('gap'))

let offset = 0
let slideIncrement = 0
let slideDecrement = slides.length - 1
let touchStartX = 0
let touchEndX = 0
let isTouchDisabled = false

function moveRight() {
	arrowRight.disabled = true
	arrowLeft.disabled = true

	offset = slides[0].offsetWidth
	container.style.transition = 'left ease-in-out 500ms'
	container.style.left = -offset - containerGap + 'px'

	setTimeout(() => {
		container.style.transition = 'none'
		container.style.left = 0
		slides[slideIncrement].style.order = slides.length - 1
		slideIncrement++
		slideDecrement = slideIncrement - 1
		if (slideIncrement === slides.length) {
			slideIncrement = 0
			slides.forEach(slide => {
				slide.style.order = 'initial'
			})
		}
		arrowRight.disabled = false
		arrowLeft.disabled = false
		isTouchDisabled = false
	}, 500)
}

function moveLeft() {
	arrowLeft.disabled = true
	arrowRight.disabled = true
	offset = slides[0].offsetWidth
	container.style.transition = 'none'

	if (slideDecrement < 0) {
		slides.forEach(slide => {
			slide.style.order = 'initial'
		})
		slideDecrement = slides.length - 1
	}

	slides[slideDecrement].style.order = '-1'
	container.style.left = -offset - containerGap + 'px'

	setTimeout(() => {
		container.style.transition = 'left ease-in-out 500ms'
		container.style.left = 0
	}, 1)

	setTimeout(() => {
		slideDecrement--
		slideIncrement = slideDecrement + 1
		arrowLeft.disabled = false
		arrowRight.disabled = false
		isTouchDisabled = false
	}, 500)
}

arrowRight.addEventListener('click', moveRight)
arrowLeft.addEventListener('click', moveLeft)

container.addEventListener('touchstart', e => {
	if (!isTouchDisabled) {
		touchStartX = e.changedTouches[0].screenX
		isTouchDisabled = true
	}
})

container.addEventListener('touchend', e => {
	touchEndX = e.changedTouches[0].screenX
	if (touchEndX < touchStartX) moveRight()
	if (touchEndX > touchStartX) moveLeft()
})

// Form Validation
let isFormSubmitted = false
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const telRegex = /^\+?[78]\s?([(]\d{3}[)]|\d{3})\s?\d{3}\s?\d{2}\s?\d{2}$/
const firstNameRegex = /^[А-Яа-я]{1,10}$/
const submitButton = document.querySelector('input[type="submit"]')

const question = document.querySelector('#form-question')
const telOrEmail = document.querySelector('#form-tel-or-email')
const firstName = document.querySelector('#form-name')
const social = document.querySelector('#form-social')
const requiredInputs = document.querySelectorAll('form input[required]')
const politics = document.querySelector('form input[name="agree-politics"]')

submitButton.addEventListener('click', e => {
	e.preventDefault()
	requiredInputs.forEach(input => {
		if (input.value.trim() === '') {
			input.classList.add('input_error')
		}
	})
	isFormSubmitted = true
	validateTelOrEmail()
	validateWithRegex(firstName, firstNameRegex)
})

question.addEventListener('input', () => validateRequired(question))
firstName.addEventListener('input', () => {
	validateRequired(firstName)
	if (isFormSubmitted) {
		validateWithRegex(firstName, firstNameRegex)
	}
})
telOrEmail.addEventListener('input', validateTelOrEmail)
politics.addEventListener('change', function () {
	submitButton.disabled = !this.checked
})

function validateWithRegex(input, regex) {
	if (!regex.test(input.value)) {
		input.classList.add('input_error')
	} else {
		input.classList.remove('input_error')
	}
}

function validateRequired(input) {
	if (input.value.trim() === '') {
		input.classList.add('input_error')
	} else {
		input.classList.remove('input_error')
	}
}

function validateTelOrEmail() {
	if (isFormSubmitted) {
		if (/[^\d\s\+\(\)]/.test(telOrEmail.value)) {
			validateWithRegex(telOrEmail, emailRegex)
		} else {
			validateWithRegex(telOrEmail, telRegex)
		}
	}
}

// Tablet Menu
const menuLinks = document.querySelectorAll('.menu__list .link')
const menuButton = document.querySelector('.menu-toggle input')
const toFormButton = document.querySelector('.menu .button')

function hideMenu() {
	menuButton.checked = false
}

menuLinks.forEach(link => {
	link.addEventListener('click', hideMenu)
})
toFormButton.addEventListener('click', hideMenu)

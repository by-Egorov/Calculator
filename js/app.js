const ac = document.querySelector('.ac')
const btn = document.querySelector('.buttons')
const out = document.querySelector('.calc__screen')

let a = ''
let b = ''
let sign = ''
let finish = false
let percent = ''
let num = '100'

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const action = ['-', '+', '*', '/']

ac.addEventListener('click', clearAll)
btn.addEventListener('click', Calculations)

function Calculations(event) {
	// Нажата не кнопка
	if (!event.target.classList.contains('btn')) return
	// Нажата кнопка /ac/
	if (event.target.classList.contains('ac')) return

	out.textContent = ''
	// Получаю нажатую кнопку
	const key = event.target.textContent

	// Если нажата кнопка 0-9 или /./
	if (digit.includes(key)) {
		if (b === '' && sign === '') {
			a += key
			out.textContent = a
		} else if (a !== '' && b !== '' && finish) {
			b = key
			finish = false
			out.textContent = b
		} else {
			b += key
			out.textContent = b
		}
		return
	}

	// Если нажата кнопка + - * /
	if (action.includes(key)) {
		sign = key
		out.textContent = sign
		return
	}

	if (key === '%') {
		percent = (a / num) * b
		out.textContent = percent
	}
	// Нажата =
	if (key === '=') {
		if (b === '') b = a
		switch (sign) {
			case '+':
				if (percent !== '') {
					a = (+a) + percent 
					b = ''
					percent = ''
					numPercent = ''
					sign = ''
					out.textContent = a
					return
				}
				a = (+a) + (+b)
				break
			case '-':
				if (percent !== '') {
					a = a - percent
					b = ''
					percent = ''
					sign = ''
					out.textContent = a
					return
				}
				a = a - b
				break
			case '*':
				if (percent !== '') {
					a = (a / num) * b
					b = ''
					percent = ''
					sign = ''
					out.textContent = a
					return
				}
				a = a * b
				break
			case '/':
				if (b === '0') {
					out.textContent = 'Ошибка'
					a = ''
					b = ''
					sign = ''
					return;
				}
				if (percent !== '') {
					a = a / (b / num)
					b = ''
					percent = ''
					sign = ''
					out.textContent = a
					return
				}
				a = a / b
				break
		}
		
		finish = true
		out.textContent = a
	}
}

function clearAll() {
	a = ''
	b = ''
	sign = ''
	percent = ''
	finish = false
	out.textContent = '0'
}
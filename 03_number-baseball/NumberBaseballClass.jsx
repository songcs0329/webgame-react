import React, { Component, createRef } from 'react';
import Try from './Try';

const getNumbers = () => {
	// 숫자 4개 중복없이 생성
	const candidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	const array = []
	for(let i = 0; i < 4; i += 1) array.push(candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0])
	return array
}
const checkCount = (value, answer) => {
	const answerArray = value.split('').map(v => parseInt(v))
	let strike = 0
	let ball = 0
	for(let i = 0; i < 4; i += 1) {
		if(answerArray[i] === answer[i]) strike += 1
		else if(answer.includes(answerArray[i])) ball += 1
	}
	return `${strike} 스트라이크, ${ball} 볼입니다.`
}

class NumberBaseballClass extends Component {
	state = {
		result: '',
		value: '',
		answer: getNumbers(),
		tries: [],
	}

	onSubmitForm = e => {
		e.preventDefault()
		const { value, answer, tries } = this.state
		if(value === answer.join('')) {
			this.setState(prevState => {
				return {
					result: `홈런!`,
					tries: [...prevState.tries, { try: value, result: '홈런!' }],
				}
			})
			this.restartGame()
		} else {
			if(tries.length >= 9) {
				this.setState({
					result: `10번 넘게 틀려서 실패 답은 ${answer.join(',')}`,
				})
				this.restartGame()
			} else {
				this.setState(prevState => {
					return {
						value: '',
						tries: [...prevState.tries, { try: value, result: checkCount(prevState.value, prevState.answer) }],
					}
				})
			}
		}
		this.inputRef.current.focus()
	}
	onChangeInput = e => {
		this.setState({
			value: e.target.value
		})
	}
	restartGame() {
		alert('게임을 다시 시작합니다!')
		this.setState({
			value: '',
			answer: getNumbers(),
			tries: [],
		})
	}

	inputRef = createRef()

	// input
	// onInputRef = cur => { this.input = cur }

	render() {
		const { result, value, tries } = this.state
		return (
			<>
				<h1>{result}</h1>
				<form onSubmit={this.onSubmitForm}>
					<input type="text" ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
					<button>입력</button>
				</form>
				<div>시도: {tries.length}</div>
				<ul>
					{
						tries.map((val, idx) => (<Try key={`${idx + 1}차 시도`} tryInfo={val} />))
					}
				</ul>
			</>
		);
	}
}

export default NumberBaseballClass;
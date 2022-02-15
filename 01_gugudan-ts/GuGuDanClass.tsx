import * as React from 'react'
import { Component } from 'react'

interface State {
	first: number,
	second: number,
	value: string,
	result: string,
}

class GuGuDanClass extends Component<{}, State> {
	state = {
		first: Math.ceil(Math.random() * 9),
		second: Math.ceil(Math.random() * 9),
		value: '',
		result: '',
	}
	handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { value} } = e
		this.setState({
			value
		})
	}
	onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { first, second, value } = this.state
			if(first * second !== parseInt(value)) {
				this.setState({
					result: '땡',
					value: '',
				})
			} else {
				this.setState(prev => {
					return {
						result: `${prev.first} * ${prev.second} = ${prev.value} 정답!`,
						first: Math.ceil(Math.random() * 9),
						second: Math.ceil(Math.random() * 9),
						value: '',
					}
				})
			}
			if(this.input) {
				this.input.focus()
			}
	}
	input: HTMLInputElement | null = null
	onRefInput = (current: HTMLInputElement) => {
		this.input = current
	}

	render() {
		const { first, second, value, result } = this.state
		return (
			<>
				<div>{first}곱하기{second}는?</div>
				<form onSubmit={this.onSubmitForm}>
					<input type="number" ref={this.onRefInput} value={value} onChange={this.handleValue} />
					<button type="submit">입력</button>
				</form>
				<div>{result}</div>
			</>
		)
	}
}

export default GuGuDanClass
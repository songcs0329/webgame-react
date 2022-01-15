const React = require('react')
const { Component } = React

class WordRelayClass extends Component {
	state = {
		word: '송창석',
		value: '',
		result: ''
	}

	onChange = e => {
		this.setState({ value: e.target.value })
	}
	onSubmit = e => {
		e.preventDefault()
		const { word, value } = this.state
		if(word[word.length - 1] === value[0]) {
			this.setState({
				result: `${value} 딩동댕`,
				word: value,
				value: '',
			})
		} else {
			this.setState({
				result: `땡`,
				value: '',
			})
		}
		this.input.focus()
	}

	input
	onRefInput = c => {
		this.input = c
	}

	render() {
		return (
			<>
				<div>{this.state.word}</div>
				<form onSubmit={this.onSubmit}>
					<input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChange} />
					<button onClick={this.onSubmit}>입력</button>
				</form>
				<div>{this.state.result}</div>
			</>
		);
	}
}

module.exports = WordRelayClass;
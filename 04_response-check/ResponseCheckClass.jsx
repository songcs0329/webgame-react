import React, { Component } from 'react';

class ResponseCheckClass extends Component {
	state = {
		state: 'waiting',
		msg: '클릭해서 시작하세요.',
		result: [],
	}

	timeout
	startTime
	endTime

	onClickScreen = () => {
		const { state } = this.state
		if(state === 'waiting') {
			this.setState({
				state: 'ready',
				msg: '초록색이 되면 클릭하세요.',
			})

			this.timeout = setTimeout(() => {
				this.setState({
					state: 'now',
					msg: '지금 클릭.',
				})
				this.startTime = new Date()
			}, Math.floor(Math.random() * 1000) + 2000) // 2~3초 랜덤
		} else if(state === 'ready') {
			clearTimeout(this.timeout)
			this.setState({
				state: 'waiting',
				msg: '너무 성급하시군요! 초록색이 된 후 클릭하세요.',
			})
		} else if(state === 'now') {
			this.endTime = new Date()
			this.setState(prevState => {
				return {
					state: 'waiting',
					msg: '클릭해서 시작하세요.',
					result: [...prevState.result, this.endTime - this.startTime],
				}
			})
		}
	}

	reset = () => {
		this.setState({
			result: []
		})
	}

	renderAverage = () => {
		const { result } = this.state
		return result.length !== 0 && 
		<>
			<div>평균시간: {result.reduce((acc, cur) => acc + cur) / result.length}ms</div>
			<button onClick={this.reset}>reset</button>
		</>
	}

	render() {
		const { state, msg } = this.state
		return (
			<>
				<div id='screen' className={state} onClick={this.onClickScreen}>{msg}</div>
				{ this.renderAverage() }
			</>
		);
	}
}

export default ResponseCheckClass;
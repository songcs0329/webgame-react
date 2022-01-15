import React, { Component } from 'react';

const rspCoord = {
	rock: '0',
	scissors: '-142px',
	paper: '-284px',
}
const scores = {
	scissors: 1,
	rock: 0,
	paper: -1,
}
const computerChoice = imgCoord => {
	return Object.entries(rspCoord).find(v => {
		return v[1] === imgCoord
	})[0]
}

class RSPClass extends Component {
	state = {
		imgCoord: rspCoord.rock,
		result: '',
		score: 0,
	}
	interval

	componentDidMount() {
		this.interval = setInterval(this.changeHand, 100)
	}
	componentWillUnmount() {
		clearInterval(this.interval)
	}

	changeHand = () => {
		const { imgCoord } = this.state
		let hand = null
		if(imgCoord === rspCoord.rock) hand = 'scissors'
		else if(imgCoord === rspCoord.scissors) hand = 'paper'
		else if(imgCoord === rspCoord.paper) hand = 'rock'
		this.setState({
			imgCoord: rspCoord[hand]
		})
	}
	onClickBtn = choice => () => {
		const { imgCoord } = this.state
		clearInterval(this.interval)
		const myScore = scores[choice]
		const cpuScore = scores[computerChoice(imgCoord)]
		const diff = myScore - cpuScore
		if(diff === 0) {
			this.setState({
				result: '비겼습니다.'
			})
		} else if([-1, 2].includes(diff)) {
			this.setState(prevState => {
				return {
					result: '이겼습니다.',
					score: prevState.score + 1,
				}
			})
		} else {
			this.setState(prevState => {
				return {
					result: '졌습니다.',
					score: prevState.score - 1,
				}
			})
		}
		setTimeout(() => {
			this.interval = setInterval(this.changeHand, 100)
		}, 1000)
	}

	render() {
		const { result, score, imgCoord } = this.state
		return (
			<>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('scissors')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
		);
	}
}

export default RSPClass;
import * as React from 'react'
import { Component } from 'react'

const rspCoords = {
	rock: '0',
	scissors: '-142px',
	paper: '-284px',
} as const
const scores = {
	scissors: 1,
	rock: 0,
	paper: -1,
} as const
type RspKeyCoords = keyof typeof rspCoords
type RspImgCoords = typeof rspCoords[keyof typeof rspCoords]
const computerChoice = (RspImgCoords: RspImgCoords) => {
	return (Object.keys(rspCoords) as [RspKeyCoords]).find((k) => {
		return rspCoords[k] === RspImgCoords;
	})!
}

type State = {
	imgCoord: RspImgCoords,
	result: string,
	score: number,
}

class RSPClass extends Component<{}, State> {
	state: State = {
		imgCoord: rspCoords.rock,
		result: '',
		score: 0
	}
	interval: number | null = null

	componentDidMount() {
		this.interval = window.setInterval(this.changeHand, 100)
	}
	componentWillUnmount() {
		if(this.interval) {
			clearInterval(this.interval)
		}
	}

	changeHand = () => {
		const { imgCoord } = this.state
		let hand: RspKeyCoords | null = null
		if(imgCoord === rspCoords.rock) hand = 'scissors'
		else if(imgCoord === rspCoords.scissors) hand = 'paper'
		else if(imgCoord === rspCoords.paper) hand = 'rock'
		if(hand) {
			this.setState({
				imgCoord: rspCoords[hand]
			})
		}
	}
	onClickBtn = (choice: RspKeyCoords) => () => {
		const { imgCoord } = this.state
		if(this.interval) {
			clearInterval(this.interval)
		}
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
			if(this.interval) {
				this.interval = window.setInterval(this.changeHand, 100)
			}
		}, 1000)
	}

	render() {
		const { imgCoord, result, score } = this.state
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
		)
	}
}

export default RSPClass
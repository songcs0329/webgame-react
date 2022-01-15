import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
	const [state, setState] = useState('waiting')
	const [msg, setMsg] = useState('클릭해서 시작하세요.')
	const [result, setResult] = useState([])
	const timeout = useRef(null)
	const startTime = useRef()
	const endTime = useRef()

	const chgScreenState = (stateName, message) => {
		setState(stateName)
		setMsg(message)
	}
	const resultReset = () => setResult([])
	const renderAverage = () => {
		return result.length !== 0 &&
		<>
			<div>평균시간: {result.reduce((acc, cur) => acc + cur) / result.length}ms</div>
			<button onClick={resultReset}>reset</button>
		</>
	}
	const onClickScreen = () => {
		if(state === 'waiting') {
			chgScreenState('ready', '초록색이 되면 클릭하세요.')
			timeout.current = setTimeout(() => {
				chgScreenState('now', '지금 클릭.')
				startTime.current = new Date()
			}, Math.floor(Math.random() * 1000) + 2000)
		} else if(state === 'ready') {
			clearTimeout(timeout.current)
			chgScreenState('waiting', '너무 성급하시군요! 초록색이 된 후 클릭하세요.')
		} else if(state === 'now') {
			endTime.current = new Date()
			chgScreenState('waiting', '클릭해서 시작하세요.')
			setResult(prevResult => {
				return [...prevResult, endTime.current - startTime.current]
			})
		}
	}



	return (
		<>
			<div id='screen' className={state} onClick={onClickScreen}>{msg}</div>
			{ renderAverage() }
		</>
	);
};

export default ResponseCheck;
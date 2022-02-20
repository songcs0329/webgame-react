import * as React from 'react'
import { useCallback, useRef, useState } from 'react'

const ResponseCheck = () => {
	const [state, setState] = useState('waiting')
	const [msg, setMsg] = useState('클릭해서 시작하세요.')
	const [result, setResult] = useState<number[]>([])
	const timeout = useRef<number | null>(null) // 타입스크립트 오버로딩
	const startTime = useRef(0)
	const endTime = useRef(0)

	const chgScreenState = useCallback((stateName: string, message: string) => {
		setState(stateName)
		setMsg(message)
	}, [])
	const resultReset = useCallback(() => {
		setResult([])
	}, [])
	const renderAverage = () => {
		return result.length !== 0 &&
		<>
			<div>평균시간: {result.reduce((acc, cur) => acc + cur) / result.length}ms</div>
			<button onClick={resultReset}>reset</button>
		</>
	}
	const onClickScreen = useCallback(() => {
		if(state === 'waiting') {
			chgScreenState('ready', '초록색이 되면 클릭하세요.')
			// setTimeout 리턴값이 window(브라우저)인지 Node인지 모른다. window.setTimeout...
			timeout.current = window.setTimeout(() => {
				chgScreenState('now', '지금 클릭.')
				startTime.current = new Date().getTime()
			}, Math.floor(Math.random() * 1000) + 2000)
		} else if(state === 'ready') {
			// number | null
			timeout.current && clearTimeout(timeout.current)
			chgScreenState('waiting', '너무 성급하시군요! 초록색이 된 후 클릭하세요.')
		} else if(state === 'now') {
			endTime.current = new Date().getTime()
			chgScreenState('waiting', '클릭해서 시작하세요.')
			setResult(prevResult => {
				return [...prevResult, endTime.current - startTime.current]
			})
		}
	}, [state])

	return (
		<>
			<div id='screen' className={state} onClick={onClickScreen}>{msg}</div>
			{ renderAverage() }
		</>
	)
}

export default ResponseCheck
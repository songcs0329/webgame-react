import * as React from 'react'
import { useEffect, useMemo, useReducer } from 'react'
import { incrementTimer, initialState, reducer, TableContext } from './store'
import Form from './components/Form'
import Table from './components/Table'

const MineSearch = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { tableData, halted, timer, result } = state
	const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted])

	useEffect(() => {
		let timer: number
		if(!halted) {
			timer = window.setInterval(() => {
				dispatch(incrementTimer())
			}, 1000);
		}
		return () => {
			clearInterval(timer)
		}
	}, [halted])

	return (
		<TableContext.Provider value={value}>
			<Form />
			<div>{timer}초</div>
			<Table />
			{ result && <div>{result}</div> }
		</TableContext.Provider>
	)
}

export default MineSearch
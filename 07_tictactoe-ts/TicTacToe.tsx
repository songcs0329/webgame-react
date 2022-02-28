import * as React from 'react';
import { useEffect, useReducer } from 'react';
import { initialState, reducer, setWinner } from './reducer';
import { CHANGE_TURN, RESET_GAME } from './types';
import { checkWin } from './utils';
import Table from './Table';



const TicTacToe = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { tableData, turn, winner, recentCell } = state

	useEffect(() => {
		const [row, cell] = recentCell
		if(row < 0) return
		const winResult = checkWin(tableData, turn, row, cell)
		if(winResult) {
			dispatch(setWinner(turn))
			dispatch({ type: RESET_GAME })
		} else {
			let all = true // true면 무승부
			tableData.forEach(row => { // 무승부검사
				row.forEach(cell => {
					if(!cell) all = false
				})
			})
			if(all) dispatch({ type: RESET_GAME })
			else dispatch({ type: CHANGE_TURN })
		}
	}, [recentCell])


	return (
		<>
			<Table
				tableData={tableData}
				dispatch={dispatch}
			/>
			{winner && <div>{winner}님의 승리</div>}
		</>
	);
}

export default TicTacToe
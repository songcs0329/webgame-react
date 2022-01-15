import React, { useCallback, useEffect, useReducer } from 'react';
import Table from './Table';

const checkWin = (table, turn, row, cell) => {
	console.log(table, turn, row, cell)
	let win = false
	if (table[row][0] === turn && table[row][1] === turn && table[row][2] === turn) {
		// 가로선
		win = true
	}
	if (table[0][cell] === turn && table[1][cell] === turn && table[2][cell] === turn) {
		// 세로선
		win = true
	}
	if (table[0][0] === turn && table[1][1] === turn && table[2][2] === turn) {
		// 왼쪽위 오른쪽아래 대각선
		win = true
	}
	if (table[0][2] === turn && table[1][1] === turn && table[2][0] === turn) {
		// 왼쪽아래 오른쪽위 대각선
		win = true
	}
	return win
}

const initialState = {
	winner: '',
	turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
}

export const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'CHANGE_TURN'
export const RESET_GAME = 'RESET_GAME'

const reducer = (state, action) => {
	switch(action.type) {
		case SET_WINNER:
			return {
				...state,
				winner: action.winner
			}
		case CLICK_CELL: {
			const tableData = [...state.tableData]
			tableData[action.row] = [...tableData[action.row]] //immer로 가독성 해결
			tableData[action.row][action.cell] = state.turn

			return {
				...state,
				tableData,
				recentCell: [action.row, action.cell],
			}
		}
		case CHANGE_TURN:
			return {
				...state,
				turn: state.turn === 'O' ? 'X' : 'O',
			}
		case RESET_GAME:
			return {
				...state,
				turn: 'O',
				tableData: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				recentCell: [-1, -1],
			}
		default:
			return state
	}
}

const TicTacToe = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { tableData, turn, winner, recentCell } = state

	useEffect(() => {
		const [row, cell] = recentCell
		if(row < 0) return
		const winResult = checkWin(tableData, turn, row, cell)
		if(winResult) {
			dispatch({ type: SET_WINNER, winner: turn })
			dispatch({ type: RESET_GAME })
		} else {
			let all = true // true면 무승부
			tableData.forEach(row => { // 무승부검사
				row.forEach(cell => {
					if(!cell) all = false
				})
			})
			if(all) dispatch({ type: RESET_GAME, winner: false })
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
};

export default TicTacToe;
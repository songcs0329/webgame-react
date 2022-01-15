import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Form from './Components/Form';
import Table from './Components/Table';
import { plantMine, arroundExcept } from './modules/utils';
import { CODE, START_GAME, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, INCREMENT_TIMER } from './modules/constants';

export const TableContext = createContext({
	tableData: [],
	halted: true,
	dispatch: () => {},
})

const initialState = {
	tableData: [],
	halted: true,
	data: {
		row: 0,
		col: 0,
		mine: 0,
	},
	opendCount: 0,
	timer: 0,
	result: "",
}

const reducer = (state, action) => {
	switch (action.type) {
		case START_GAME: {
			const { row, col, mine } = action
			return {
				...state,
				data: {
					row,
					col,
					mine
				},
				opendCount: 0,
				tableData: plantMine(row, col, mine),
				halted: false,
				timer: 0,
			}
		}
		case OPEN_CELL: {
			const tableData = [...state.tableData]
			tableData.forEach((row , i) => {
				tableData[i] = [...row]
			})
			const checked = []
			let clickedCount = 0
			const checkArround = (row, col) => {
				console.log('checkArround', row, col);
				if(arroundExcept(tableData, checked, row, col)) return
				else checked.push(row + '/' + col)
				let arround = [
					tableData[row][col - 1],
					tableData[row][col + 1],
				]
				if(tableData[row - 1]) {
					arround = arround.concat(
						tableData[row - 1][col - 1],
						tableData[row - 1][col],
						tableData[row - 1][col + 1],
					)
				}
				if(tableData[row + 1]) {
					arround = arround.concat(
						tableData[row + 1][col - 1],
						tableData[row + 1][col],
						tableData[row + 1][col + 1],
					)
				}
				const mineCount = arround.filter(v => {
					return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
				}).length
				console.log('clickArround', arround, mineCount);
				// 주변칸 열기
				if(mineCount === 0) {
					if(row > -1) {
						let near = [
							[row, col - 1],
							[row, col + 1],
						]
						if(row - 1 > -1) {
							near = near.concat([
								[row - 1, col - 1],
								[row - 1, col],
								[row - 1, col + 1],
							])
						}
						if(row + 1 < tableData.length) {
							near = near.concat([
								[row + 1, col - 1],
								[row + 1, col],
								[row + 1, col + 1],
							])
						}
						console.log('arroundNear', near);
						near.forEach(n => {
							if(tableData[n[0][n[1]]] !== CODE.OPENED) {
								checkArround(n[0], n[1])
							}
						})
					}
				}
				if(tableData[row][col] === CODE.NORMAL) {
					clickedCount += 1
				}
				tableData[row][col] = mineCount
			}
			checkArround(action.row, action.col)
			// win
			let halted = false
			let result = ""
			if(state.data.row * state.data.col - state.data.mine === state.opendCount + clickedCount) {
				halted = true
				result = `${state.timer}초만에 승리하셨습니다.`
			}
			return {
				...state,
				tableData,
				opendCount: state.opendCount + clickedCount,
				halted,
				result,
			}
		}
		case CLICK_MINE: {
			const { row, col } = action
			const tableData = [...state.tableData]
			tableData[row] = [...state.tableData[row]]
			tableData[row][col] = CODE.CLICK_MINE
			return {
				...state,
				tableData,
				halted: true,
			}
		}
		case FLAG_CELL: {
			const { row, col } = action
			const tableData = [...state.tableData]
			tableData[row] = [...state.tableData[row]]
			if(tableData[row][col] === CODE.MINE) tableData[row][col] = CODE.FLAG_MINE
			else tableData[row][col] = CODE.FLAG
			return {
				...state,
				tableData,
			}
		}
		case QUESTION_CELL: {
			const { row, col } = action
			const tableData = [...state.tableData]
			tableData[row] = [...state.tableData[row]]
			if(tableData[row][col] === CODE.FLAG_MINE) tableData[row][col] = CODE.QUESTION_MINE
			else tableData[row][col] = CODE.QUESTION
			return {
				...state,
				tableData,
			}
		}
		case NORMALIZE_CELL: {
			const { row, col } = action
			const tableData = [...state.tableData]
			tableData[row] = [...state.tableData[row]]
			if(tableData[row][col] === CODE.QUESTION_MINE) tableData[row][col] = CODE.MINE
			else tableData[row][col] = CODE.NORMAL
			return {
				...state,
				tableData,
			}
		}
		case INCREMENT_TIMER: {
			return {
				...state,
				timer: state.timer + 1,
			}
		}
		default:
			return state
	}
}

const MineSearch = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { tableData, halted, timer, result } = state
	const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted])

	useEffect(() => {
		let timer
		if(!halted) {
			timer = setInterval(() => {
				dispatch({ type: INCREMENT_TIMER })
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
	);
};

export default MineSearch;
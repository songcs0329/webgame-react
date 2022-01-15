import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext } from '../MineSearch';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from '../modules/constants';

const getTdStyle = code => {
	switch (code) {
		case CODE.NORMAL:
		case CODE.MINE:
			return {
				background: '#444',
			}
		case CODE.OPENED:
			return {
				background: '#fff',
			}
		case CODE.QUESTION:
		case CODE.QUESTION_MINE:
			return {
				background: '#ffdd00'
			}
		case CODE.FLAG:
		case CODE.FLAG_MINE:
			return {
				background: '#ff3300'
			}
		default:
			return {
				background: '#fff',
			}
	}
}
const getTdText = code => {
	// console.log('getTdText');
	switch (code) {
		case CODE.NORMAL:
			return ''
		case CODE.MINE:
			return 'X'
		case CODE.CLICK_MINE:
			return '💣'
		case CODE.FLAG:
		case CODE.FLAG_MINE:
			return '🚩'
		case CODE.QUESTION:
		case CODE.QUESTION_MINE:
			return '?'
		default:
			return code || ''
	}
}

const Td = memo(({ rowIndex, colIndex }) => {
	const { tableData, halted, dispatch } = useContext(TableContext)

	const onClickTd = useCallback(() => {
		if(halted) return
		switch (tableData[rowIndex][colIndex]) {
			case CODE.OPENED:
			case CODE.FLAG_MINE:
			case CODE.FLAG:
			case CODE.QUESTION_MINE:
			case CODE.QUESTION:
				return
			case CODE.NORMAL:
				dispatch({ type: OPEN_CELL, row: rowIndex, col: colIndex })
				return
			case CODE.MINE:
				dispatch({ type: CLICK_MINE, row: rowIndex, col: colIndex })
				return
			default:
				return
		}	
	}, [tableData[rowIndex][colIndex], halted])
	const onRightClickTd = useCallback((e) => {
		e.preventDefault()
		if(halted) return
		switch (tableData[rowIndex][colIndex]) {
			case CODE.NORMAL:
			case CODE.MINE:
				dispatch({ type: FLAG_CELL, row: rowIndex, col: colIndex })
				return
			case CODE.FLAG:
			case CODE.FLAG_MINE:
				dispatch({ type: QUESTION_CELL, row: rowIndex, col: colIndex })
				return
			case CODE.QUESTION:
			case CODE.QUESTION_MINE:
				dispatch({ type: NORMALIZE_CELL, row: rowIndex, col: colIndex })
				return
			default:
				return
		}
	}, [tableData[rowIndex][colIndex], halted])

	console.log('Td rendered');
	// return useMemo(() =>(
	// 	<td
	// 		style={getTdStyle(tableData[rowIndex][colIndex])}
	// 		onClick={onClickTd}
	// 		onContextMenu={onRightClickTd}
	// 	>
	// 		{getTdText(tableData[rowIndex][colIndex])}
	// 	</td>
	// ), [tableData[rowIndex][colIndex]]);
	return (
		<MemoTd
			onClickTd={onClickTd}
			onRightClickTd={onRightClickTd}
			data={tableData[rowIndex][colIndex]}
		/>
	)
});

const MemoTd = memo(({onClickTd, onRightClickTd, data}) => {
	console.log('MemoTd rendered');
	return (
		<td
			style={getTdStyle(data)}
			onClick={onClickTd}
			onContextMenu={onRightClickTd}
		>
			{getTdText(data)}
		</td>
	)
})

export default Td;
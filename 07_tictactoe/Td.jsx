import React, { memo, useCallback, useEffect, useRef } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ dispatch, rowIndex, cellIndex, cellData }) => {
	console.log('td render')
	const ref = useRef([])
	useEffect(() => {
		console.log(dispatch === ref.current[0], rowIndex === ref.current[1], cellIndex === ref.current[2], cellData === ref.current[3])
		ref.current = [dispatch, rowIndex, cellIndex, cellData]
	}, [dispatch, rowIndex, cellIndex, cellData])


	const onClickTd = useCallback(() => {
		// console.log(rowIndex, cellIndex)
		if(cellData) return
		dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex })
	}, [cellData])

	return (
		<td onClick={onClickTd}>{cellData}</td>
	)
})

export default Td;
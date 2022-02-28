import * as React from 'react'
import { FC, Dispatch, useCallback, memo } from 'react'
import { clickCell } from './reducer'

interface Props {
	dispatch: Dispatch<any>,
	rowIndex: number,
	cellIndex: number,
	cellData: string,
}


const Td: FC<Props> = memo(({ dispatch, rowIndex, cellIndex, cellData }) => {
	const onClickTd = useCallback(() => {
		// console.log(rowIndex, cellIndex)
		if(cellData) return
		dispatch(clickCell(rowIndex, cellIndex))
	}, [cellData])
	return (
		<td onClick={onClickTd}>{cellData}</td>
	)
})

export default Td
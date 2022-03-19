import React, { memo, useContext, useCallback, FC } from "react"
import { CODE } from "../constants"
import { clickMine, flagCell, normalizeCell, openCell, questionCell, TableContext } from "../store"
import { TCode } from "../types"
import { getTdStyle, getTdText } from "../utils"

interface TProps {
	rowIndex: number,
	colIndex: number,
}

const Td: FC<TProps> = ({ rowIndex, colIndex }) => {
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
				dispatch(openCell(rowIndex, colIndex))
				return
			case CODE.MINE:
				dispatch(clickMine(rowIndex, colIndex))
				return
			default:
				return
		}	
	}, [tableData[rowIndex][colIndex], halted])
	const onRightClickTd = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		if(halted) return
		switch (tableData[rowIndex][colIndex]) {
			case CODE.NORMAL:
			case CODE.MINE:
				dispatch(flagCell(rowIndex, colIndex))
				return
			case CODE.FLAG:
			case CODE.FLAG_MINE:
				dispatch(questionCell(rowIndex, colIndex))
				return
			case CODE.QUESTION:
			case CODE.QUESTION_MINE:
				dispatch(normalizeCell(rowIndex, colIndex))
				return
			default:
				return
		}
	}, [tableData[rowIndex][colIndex], halted])

	return (
		<RealTd
			onClickTd={onClickTd}
			onRightClickTd={onRightClickTd}
			data={tableData[rowIndex][colIndex]}
		/>
	)
}

interface RealTdProps {
	onClickTd: () => void,
	onRightClickTd: (e: React.MouseEvent) => void,
	data: TCode
}

const RealTd: FC<RealTdProps> = memo(({ data, onClickTd, onRightClickTd }) => {
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
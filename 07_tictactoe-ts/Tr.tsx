import * as React from 'react'
import { Dispatch, FC, memo } from 'react'
import Td from './Td'

interface Props {
	dispatch: Dispatch<any>,
	rowIndex: number,
	rowData: string[]
}

const Tr: FC<Props> = memo(({ dispatch, rowIndex, rowData }) => {
	return (
		<tr>
			{
				Array(rowData.length).fill(null).map((td, index) => {
					return (
						<Td
							key={index}
							dispatch={dispatch}
							rowIndex={rowIndex}
							cellIndex={index}
							cellData={rowData[index]}
						/>
					)
				})
			}
		</tr>
	)
})

export default Tr
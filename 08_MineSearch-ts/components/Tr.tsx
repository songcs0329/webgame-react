import * as React from 'react'
import { FC, memo, useContext } from 'react'
import { TableContext } from '../store'
import Td from './Td'

interface TProps {
	rowIndex: number
}

const Tr: FC<TProps> = memo(({ rowIndex }) => {
	const { tableData } = useContext(TableContext)

	return (
		<tr>
      {
				tableData[0] && Array(tableData[0].length).fill(null).map((td, i) =>
        	<Td key={i} rowIndex={rowIndex} colIndex={i} />
      	)
			}
    </tr>
	)
})

export default Tr

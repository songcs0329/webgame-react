import * as React from 'react'
import { memo, useContext } from 'react'
import { TableContext } from '../store'
import Tr from './Tr'

const table = memo(() => {
	const { tableData } = useContext(TableContext)

	return (
		<table>
			<tbody>
				{
					Array(tableData.length).fill(null).map((tr, i) => 
						<Tr key={i} rowIndex={i} />
					)
				}
			</tbody>
		</table>
	)
})

export default table
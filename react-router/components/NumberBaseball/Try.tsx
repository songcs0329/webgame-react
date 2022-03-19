import * as React from 'react'
import { memo } from 'react'
import { TryInfo, TryInfoProps } from './types'

// 위 방식으로 해도 무방하지만 리액트에선 아래 방법을 더 선호
// const Try = memo(({ tryInfo }: { tryInfo : TryInfo }) => {
// const Try: React.FC<{ tryInfo: TryInfo }> = memo(({ tryInfo }) => {
const Try: React.FC<TryInfoProps> = memo(({ tryInfo }) => {
	return (
		<li>
			<div>{tryInfo.try}</div>
			<div>{tryInfo.result}</div>
		</li>
	)
})

export default Try
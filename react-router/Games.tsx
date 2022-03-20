import * as React from 'react'
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import GameMatcher from './GameMatcher'

const Games = () => {
	return (
		<BrowserRouter>
			<div>
				<Link to={'/games/number-baseball'}>숫자야구</Link>&nbsp;|&nbsp;
				<Link to={'/games/rsp'}>가위바위보</Link>&nbsp;|&nbsp;
				<Link to={'/games/lotto'}>로또</Link>&nbsp;|&nbsp;
				<Link to={'/games/index'}>게임매쳐</Link>
			</div>
			<div>
				<Routes>
					<Route path='*' element={<GameMatcher />} />
					<Route path='/games/*' element={<GameMatcher />} />
					{/* <Route path='/' element={<GameMatcher />} />
					<Route path='/games/:name' element={<GameMatcher />} /> */}
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default Games
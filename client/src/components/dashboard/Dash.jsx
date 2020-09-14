import React from 'react'
import PropTypes from 'prop-types'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
} from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'
import './styles.scss'
import { Featured } from '../features/Featured'
import { useSelector } from 'react-redux'
import { Logo } from '../logo'

const Dash = () => {
	const productsList = useSelector(state => state.products.data)
	const popularList = useSelector(state => state.populars.products)

	return (
		<div id='dashboard'>
			<header>
				<Logo size={60} />
				<h1>CupoSearch</h1>
			</header>
			<SearchBar />
			<ul className='menu'>
				<li>
					<NavLink exact to='/'>
						<span className='material-icons'>verified</span>
						más vendidos
					</NavLink>
				</li>
				<li>
					<NavLink to='/popular'>
						<span className='material-icons'>sentiment_satisfied_alt</span>más
						buscados
					</NavLink>
				</li>
			</ul>

			{
				<Switch>
					<Route exact path='/'>
						<Featured title='lo más vendido' data={productsList} />
					</Route>
					<Route path='/popular'>
						<Featured
							type='popular'
							title='lo más buscado'
							data={popularList}
						/>
					</Route>
				</Switch>
			}
		</div>
	)
}

Dash.propTypes = {
	productsList: PropTypes.array,
}

export default Dash

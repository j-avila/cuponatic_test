import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { searchProducts, getCount } from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import * as type from '../../store/reducers/types'
import './styles.scss'

const Product = ({ data }) => {
	return (
		<li>
			<span>
				<img src={data.imagen} alt={data.titulo} />
			</span>
			<h5>{data.titulo}</h5>
			<p>
				<span class='material-icons'>thumb_up</span>
				{data.vendidos}
			</p>
		</li>
	)
}

const SearchBar = () => {
	const [product, setproduct] = useState('')
	const results = useSelector(state => state.productSearch.data)
	const dispatch = useDispatch()

	const searchHandler = async () => {
		if (product.length >= 3) {
			dispatch(searchProducts(product))
		} else if (product.length === 0) {
			dispatch({ type: type.FETCH_SEARCH, payload: [] })
		}
		return
	}

	useEffect(() => {
		searchHandler()
	}, [product])

	return (
		<>
			<div id='searchbar'>
				<div className='input-search'>
					<span className='material-icons'>search</span>
					<input
						type='text'
						placeholder='Buscar un producto'
						onChange={e => setproduct(e.target.value)}
					/>
				</div>
				{results && results.length >= 1 && (
					<div className='results'>
						<ul>
							{results.map(res => (
								<Product key={res.id} data={res} />
							))}
						</ul>
					</div>
				)}
			</div>
			<button onClick={getCount(1)}>click</button>
		</>
	)
}

SearchBar.propTypes = {}

export default SearchBar

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../productCard/ProductCard'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { fetchProducts, getPopular } from '../../store/actions'

export const Featured = ({ data, title, type }) => {
	const dispatch = useDispatch()
	const fetchAll = () => {
		type === 'popular' ? dispatch(getPopular()) : dispatch(fetchProducts())
	}

	useEffect(() => {
		fetchAll()
	}, [type])

	return (
		<div id='feat-holder'>
			<h2>
				{title} {data && <span> - {data.length} productos</span>}
			</h2>
			<div id='feats'>
				{data && data.length >= 1 ? (
					data.map(item => <ProductCard key={item.id} data={item} />)
				) : (
					<h4 className='toast'> no hay productos para mostrar</h4>
				)}
			</div>
		</div>
	)
}

Featured.propTypes = {
	data: PropTypes.array,
}

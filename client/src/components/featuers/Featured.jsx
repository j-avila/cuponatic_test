import React from 'react'
import { ProductCard } from '../productCard/ProductCard'
import './styles.scss'

export const Featured = () => {
	return (
		<div id='feats'>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</div>
	)
}

import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const Product = () => {
	return (
		<li>
			<span>
				<img
					src='https://cuponassets.cuponatic-latam.com/backendMx/uploads/imagenes_descuentos/33373/44fd1511afff763a5e16eb7a40ff1f069c385621.full.jpg'
					alt=''
				/>
			</span>
			<h5>producto de muestra</h5>
		</li>
	)
}

const SearchBar = props => {
	return (
		<>
			<div id='searchbar'>
				<div className='input-search'>
					<span class='material-icons'>search</span>
					<input type='text' placeholder='Buscar un producto' />
				</div>

				<div className='results'>
					<ul>
						<Product />
						<Product />
						<Product />
					</ul>
				</div>
			</div>
		</>
	)
}

SearchBar.propTypes = {}

export default SearchBar

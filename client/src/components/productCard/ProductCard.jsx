import React from 'react'
import './styles.scss'

export const ProductCard = () => {
	return (
		<div id='product-card'>
			<div className='picture'>
				<img
					src='https://cuponassets.cuponatic-latam.com/backendMx/uploads/imagenes_descuentos/33373/44fd1511afff763a5e16eb7a40ff1f069c385621.full.jpg'
					alt=''
				/>
			</div>
			<div className='desc'>
				<h3>titulo</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem ab
					molestias quibusdam voluptatibus? Voluptatibus, incidunt ad delectus
					velit necessitatibus, quis voluptate voluptas impedit laboriosam
					adipisci minus enim quos eligendi molestias?
				</p>
				<div className='chips'>
					<span className='chip'>
						<i>99999</i>zapato
					</span>
					<span className='chip'>
						<i>99999</i>zapato
					</span>
					<span className='chip'>
						<i>99999</i>zapato
					</span>
					<span className='chip'>
						<i>99999</i>zapato
					</span>
				</div>
			</div>
		</div>
	)
}

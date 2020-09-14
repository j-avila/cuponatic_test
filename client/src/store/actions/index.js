import Axios from 'axios'
import * as type from '../reducers/types'

const options = {
	mode: 'cors',
	cache: 'default',
	'Content-Type': 'application/json',
}

const apiURL = 'http://localhost:3030'

const loadingStatus = status => ({
	type: type.LOADING,
	load: status,
})

export const fetchProducts = () => {
	const url = `${apiURL}/products?amount=50`

	return async dispatch => {
		dispatch(loadingStatus(true))
		await Axios.get(url, options)
			.then(({ data }) => {
				dispatch({
					type: type.FETCH_DATA,
					payload: data.products,
				})
				dispatch(loadingStatus(false))
			})
			.catch(error => {
				console.log(error)
				dispatch(loadingStatus(false))
			})
	}
}

export const searchProducts = product => {
	const countUrl = (tagName, productId) =>
		`${apiURL}/count?key=${tagName}&id=${productId}`
	const url = `${apiURL}/products/search/${product}`

	return async dispatch => {
		dispatch(loadingStatus(true))
		await Axios.get(url, options)
			.then(({ data }) => {
				dispatch({
					type: type.FETCH_SEARCH,
					payload: data,
				})
				dispatch(loadingStatus(false))
			})
			.catch(error => {
				console.log(error)
				dispatch(loadingStatus(false))
			})
	}
}

export const getPopular = () => {
	const url = `${apiURL}/popular?amount=20`

	return async dispatch => {
		dispatch(loadingStatus(true))
		await Axios.get(url, options)
			.then(({ data }) => {
				dispatch({
					type: type.POPULAR_PRODUCTS,
					payload: data.bestSellers,
				})
				dispatch(loadingStatus(false))
			})
			.catch(error => {
				console.log(error)
				// dispatch(loadingStatus(false));
			})
	}
}

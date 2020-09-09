import * as types from './types'
export const products = (state = [], action) => {
	switch (action.type) {
		case types.FETCH_DATA:
			return {
				data: action.payload,
			}
		default:
			return state
	}
}
export const productSearch = (state = [], action) => {
	switch (action.type) {
		case types.FETCH_SEARCH:
			return {
				data: action.payload.product,
			}
		default:
			return state
	}
}

import { combineReducers } from 'redux'
import * as types from './types'

const loading = (state = false, action) => {
	switch (action.type) {
		case types.LOADING:
			return {
				loading: action.load,
			}
		default:
			return state
	}
}

export default combineReducers({
	loading,
})

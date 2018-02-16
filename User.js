import {FETCHING_USER, FETCHING_USER_SUCCESS, FETCHING_USER_FAILURE, FETCHING_CURRENT_USER_FAILURE, REGISTERING_USER_FAILURE} from '../constants'
const initialState = {
  user: {},
  isFetching: false,
  error: false,
  message: '',
  role: '',
  loggedIn: false
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        user: {},
        isFetching: true,
        message: 'Fetching user details',
        loggedIn: false,
        error: false
      }
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        message: 'Logged in successfully',
        loggedIn: true,
        user: action.user,
        role: action.role,
        error: false
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.message,
        loggedIn: false
      }
      case REGISTERING_USER_FAILURE:
      case FETCHING_CURRENT_USER_FAILURE:
          return {
              ...state,
              isFetching: false,
              message: action.message,
              loggedIn: false
          }
    default:
      return state
  }
}
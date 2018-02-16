// import { FETCH_PAGE_DATA, ERROR_RESPONSE } from '../actions/types';
import { FETCH_CATEGORIES } from '../actions/types';
import { FETCH_PARTIES } from '../actions/types';
import { FETCH_FAQS } from '../actions/types';
import { FETCH_CONTENT } from '../actions/types';
import { FETCH_STAGES } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_CATEGORIES:
    return { ...state, all: action.payload.data.items };
  case FETCH_PARTIES:
    return { ...state, all: action.payload.data.items };
  case FETCH_FAQS:
    return { ...state, all: action.payload.data.items };
  case FETCH_CONTENT:
    return { ...state, all: action.payload.data.items };
  case FETCH_STAGES:
    return { ...state, all: action.payload.data.items };
  default:
    return state;
  }
}

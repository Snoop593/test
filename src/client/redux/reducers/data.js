import {
  GET_FORM,
  POST_RESULT,
  SUCCESS_RESULT,
  BREAK_RESULT
} from '../actions';

const initialState = {
  image:"",
  title:"",
  fields: [],
  loadState:"",
  resultState:""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FORM:
      return {...state,
        loadState:"ready",
        image:action.image,
        title:action.title,
        fields:action.fields
      };  
    case POST_RESULT:
      return {...state,
        ...action.payload,
        resultState:"ready"
      };
    case SUCCESS_RESULT:
      return {...state,
        ...action.payload,
        resultState:"success"
      };
    case BREAK_RESULT:
      return {...state,
        ...action.payload,
        resultState:""
      };
    default:
      return state;
  }

};
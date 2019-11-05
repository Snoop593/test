export const GET_FORM = 'GET_FORM';
export const POST_RESULT = 'POST_RESULT';
export const BREAK_RESULT = 'BREAK_RESULT';
export const SUCCESS_RESULT = 'SUCCESS_RESULT';

export function getForm(payload) {
  return {
    type: GET_FORM,
    title: payload.title,
    image:payload.image,
    fields:payload.fields
  }
}

export function postResult(payload) {
  return {
    type: POST_RESULT,
    payload
  }
}

export function successResult(payload) {
  return {
    type: SUCCESS_RESULT,
    payload
  }
}
export function breakResult(payload) {
  return {
    type: BREAK_RESULT,
    payload
  }

}

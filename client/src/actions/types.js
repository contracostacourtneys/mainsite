//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'auth_user',
  UNAUTH_USER = 'unauth_user',
  AUTH_ERROR = 'auth_error',
  FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
  RESET_PASSWORD_REQUEST = 'reset_password_request',
  PROTECTED_TEST = 'protected_test';

//= =====================
// User Profile Actions
//= =====================
export const FETCH_USER = 'fetch_user',
  ERROR_RESPONSE = 'error_response'; // do I need to add this reducer ERROR_RESPONSE='error_response'; ?

export const GET_DATA = 'get_data',
  PUT_DATA = 'put_data',
  POST_DATA = 'post_data';

//case types
export const SMALL_CLAIMS = 'Small Claims',
  GUARDIANSHIP = 'Guardianship';

//= =====================
// Page Actions
//= =====================
export const SEND_CONTACT_FORM = 'send_contact_form',
  STATIC_ERROR = 'static_error';

//case data
export const UPDATE_CASE = 'update_case',
  // UPDATE_CHECKLIST = 'update_checklist',
  LOAD_TODOS = 'load_todos';

// page data
export const FETCH_PAGE_DATA = 'FETCH_PAGE_DATA';

// checklist 
export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const POST_TASK = "POST_TASK";
export const CHANGE_STATUS = "CHANGE_STATUS";

export const LOAD_CHECKLIST = 'LOAD_CHECKLIST';

//redux example
export const SELECT_CHECKLIST = 'SELECT_CHECKLIST'
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const INVALIDATE_CHECKLIST = 'INVALIDATE_CHECKLIST'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'

//= =====================
// Contentful test
//= =====================
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_ASSET = "FETCH_ASSET";
export const FETCH_PARTIES = "FETCH_PARTIES";
export const FETCH_FAQS = "FETCH_FAQS";
export const FETCH_CONTENT = "FETCH_CONTENT";
export const FETCH_STAGES = "FETCH_STAGES";

/* Not using these =====>

//= =====================
// Messaging Actions
//= =====================
export const FETCH_CONVERSATIONS = 'fetch_conversations',
  FETCH_RECIPIENTS = 'fetch_recipients',
  START_CONVERSATION = 'start_conversation',
  FETCH_SINGLE_CONVERSATION = 'fetch_single_conversation',
  CHAT_ERROR = 'chat_error',
  SEND_REPLY = 'send_reply';


//= =====================
// Customer Actions
//= =====================
export const CREATE_CUSTOMER = 'create_customer',
  FETCH_CUSTOMER = 'fetch_customer',
  CANCEL_SUBSCRIPTION = 'cancel_subscription',
  UPDATE_BILLING = 'update_billing',
  BILLING_ERROR = 'billing_error',
  CHANGE_SUBSCRIPTION = 'change_subscription';

*/
import axios from 'axios';
import { FETCH_CATEGORIES } from './types'
import { FETCH_PARTIES } from './types'
import { FETCH_FAQS } from './types'
import { FETCH_CONTENT } from './types'
import { FETCH_STAGES } from './types'
import { FETCH_ASSET } from './types'

// export const FETCH_SITE_CONTENT = 'FETCH_SITE_CONTENT';
// export const FETCH_POST = 'FETCH_POST';
// export const FETCH_ASSET = 'FETCH_ASSET';


const API_BASE_URL = 'https://cdn.contentful.com';
const API_SPACE_ID = 'x8bmio1z72gj';
const API_TOKEN = '43bd55625a6f64960d215a703e1def27bcbbdf9a912732b32d153356b1fce40c';

export function fetchCategories() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=category`);
  console.log('fetch categories action')
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchParties() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=party`);
  console.log('fetch parties action')
  return {
    type: FETCH_PARTIES,
    payload: request
  };
}

export function fetchFaqs() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=faq`);
  console.log('fetch faqs action')
  return {
    type: FETCH_FAQS,
    payload: request
  };
}

export function fetchStages() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=stage`);
  console.log('fetch stages action')
  return {
    type: FETCH_STAGES,
    payload: request
  };
}

export function fetchContent() {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=stageContent`);
  console.log('fetch stageContent action')
  return {
    type: FETCH_CONTENT,
    payload: request
  };
}

export function fetchAsset(id) {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/assets/${id}?access_token=${API_TOKEN}`);
  console.log('fetch assets action');
  return {
    type: FETCH_ASSET,
    payload: request
  };
}

// {space_id}/{asset_id}/{token}/{name}

//  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/assets/${id}?access_token=${API_TOKEN}`);


// example image id 59Km2bLlde0SaGoK68GQWC

//when I come back grom luch: figre out how to pass props to other components from test-home OR how to 
// look up content using sys...? ??? or content_Type call/...
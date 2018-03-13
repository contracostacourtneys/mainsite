import axios from 'axios';
import { FETCH_CATEGORIES } from './types'
import { FETCH_PARTIES } from './types'
import { FETCH_FAQS } from './types'
import { FETCH_CONTENT } from './types'
import { FETCH_RESOURCE_LINKS } from './types'
import { FETCH_STAGES } from './types'
import { FETCH_ASSET } from './types'
import { STORE_STAGE_ID } from './types'

// export const FETCH_SITE_CONTENT = 'FETCH_SITE_CONTENT';
// export const FETCH_POST = 'FETCH_POST';
// export const FETCH_ASSET = 'FETCH_ASSET';

const API_BASE_URL = process.env.API_BASE_URL;
const API_SPACE_ID = process.env.API_SPACE_ID;
const API_TOKEN = process.env.API_TOKEN;
const SMALL_CLAIMS_ID = process.env.SMALL_CLAIMS_ID;
// console.log("client side process env", process.env);

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

export function fetchContentByParty(label, party) {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=stageContent&fields.label=${label}&fields.parties.sys.id=${party}&order=sys.createdAt`);
  console.log('fetch stageContent action')
  return {
    type: FETCH_CONTENT,
    payload: request
  };
}

export function fetchResourceLinks(label) {
  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=resource&fields.categoryLabel=${label}`);
  console.log('fetch resource links action')
  return {
    type: FETCH_RESOURCE_LINKS,
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

export const storeStageId = (title, id) => {
  console.log("storeStageId action", id)
  const newObject = {
    title: title,
    id: id
  }
  return {
    type: STORE_STAGE_ID,
    payload: newObject
  }
}


// export function storePartyId(id) {
//   return {
//     type: STORE_PARTY_ID,
//     payload: id
//   }
// }

// {space_id}/{asset_id}/{token}/{name}

//  const request = axios.get(`${API_BASE_URL}/spaces/${API_SPACE_ID}/assets/${id}?access_token=${API_TOKEN}`);


// example image id 59Km2bLlde0SaGoK68GQWC

//when I come back grom luch: figre out how to pass props to other components from test-home OR how to 
// look up content using sys...? ??? or content_Type call/...
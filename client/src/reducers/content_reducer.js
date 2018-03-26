// import { FETCH_PAGE_DATA, ERROR_RESPONSE } from '../actions/types';
import { FETCH_CATEGORIES } from '../actions/types';
import { FETCH_PARTIES } from '../actions/types';
import { FETCH_FAQS } from '../actions/types';
import { FETCH_CONTENT } from '../actions/types';
import { FETCH_RESOURCE_LINKS } from '../actions/types';
import { FETCH_STAGES } from '../actions/types';
import { FETCH_VIDEOS } from '../actions/types';
import { FETCH_VIDEO_LINKS } from '../actions/types';

import { STORE_STAGE_ID } from '../actions/types';

const INITIAL_STATE = { 
  categories: [],
  parties: [],
  stages: [],
  resources: [],
  faqs: [],
  tabs: [], 
  videos: [],
  videoURLs: {},
  videoLinks: {},
  stageId: [],
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_CATEGORIES:
    return { ...state, categories: action.payload.data.items };
  case FETCH_PARTIES:
    return { ...state, parties: action.payload.data.items };
  case FETCH_FAQS:
    return { ...state, faqs: action.payload.data.items };
  case FETCH_CONTENT:
    return { ...state, tabs: action.payload.data.items };
  case FETCH_STAGES:
    return { ...state, stages: action.payload.data.items };
  case FETCH_VIDEOS: {
    const videos = {};
    const videoURLs = {};

    const assets = action.payload.data.includes.Asset;
    const items = action.payload.data.items;

    const alphasort = (a, b) => {
      if (a.fields.title > b.fields.title) {
        return 1;
      }
      else if (a.fields.title < b.fields.title) {
        return -1;
      }

      return 0;
    };

    assets.sort(alphasort);
    items.sort(alphasort);

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const url = asset.fields.file.url;
      const title = asset.fields.title;

      const item = items[i];
      const category = item.fields.categoryId;
      const subcategory = item.fields.subcategoryId;
      
      videoURLs[asset.fields.title.toUpperCase()] = url;

      if (!videos.hasOwnProperty(category)) {
        videos[category] = {
          id: item.fields.categoryId,
          title: item.fields.categoryTitle,

          subcategories: {
            [subcategory]: {
              id: item.fields.subcategoryId,
              title: item.fields.subcategoryTitle,
              videos: {},
            }
          }
        };
      }

      const categoryObj = videos[category];

      if (!categoryObj.subcategories.hasOwnProperty(subcategory)) {
        categoryObj.subcategories[subcategory] = {
          id: item.fields.subcategoryId,
          title: item.fields.subcategoryTitle,
          videos: {}
        };
      }

      const subcategoryObj = categoryObj.subcategories[subcategory];
      subcategoryObj.videos[asset.sys.id] = { id: asset.sys.id, linkTo: title, url, title };
    }

    return { ...state, videos, videoURLs };
  }

  case FETCH_VIDEO_LINKS: {
    const videoLinks = {};
    const items = action.payload.data.items;

    items.sort((a, b) => {
      if (a.fields.videoId > b.fields.videoId) {
        return 1;
      }
      else if (a.fields.videoId < b.fields.videoId) {
        return -1;
      }

      return 0;
    })

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const categoryId = item.fields.categoryId;

      if (!videoLinks.hasOwnProperty(categoryId)) {
        videoLinks[categoryId] = {
          id: categoryId,
          title: item.fields.categoryTitle,
          links: {},
        };
      }

      const category = videoLinks[categoryId];

      category.links[item.fields.title] = { 
        id: item.fields.videoId, 
        title: item.fields.title, 
        link: item.fields.link
      };
    }

    return { ...state, videoLinks };
  }

  case FETCH_RESOURCE_LINKS:
    return { ...state, resources: action.payload.data.items };
  case STORE_STAGE_ID:
    return { ...state, stageId: action.payload };
  default:
    return state;
  }
}


import config from '../../config';
import { storableError } from '../../util/errors';
import { convertUnitToSubUnit, unitDivisor } from '../../util/currency';
import { isOriginInUse, isStockInUse } from '../../util/search';
import { parse } from '../../util/urlHelpers';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { createImageVariantConfig } from '../../util/sdkLoader';

import { dispatch } from 'redux';

// ================ Action types ================ //
export const SET_INITIAL_STATE = 'app/LandingPage/SET_INITIAL_STATE';


export const LISTINGS_REQUEST = 'app/LandingPage/LISTINGS_REQUEST';
export const LISTINGS_SUCCESS = 'app/LandingPage/LISTINGS_SUCCESS';
export const LISTINGS_ERROR = 'app/LandingPage/LISTINGS_ERROR';


// ================ Reducer ================ //

const initialState = {
  currentPageResultIds: [],
  listingsInProgress: false,
  listingsError: null,

};

const resultIds = data => data.data.map(l => l.id);

const listingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case LISTINGS_REQUEST:
      return {
        ...state,
        listingsInProgress: true,
        listingsError: null,
      };
      case SET_INITIAL_STATE: 
      return {
        ...initialState
      };
    case LISTINGS_SUCCESS:
      return {
        ...state,
        currentPageResultIds: resultIds(payload.data),
        listingsInProgress: false,
      };
    case LISTINGS_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, listingsInProgress: false, listingsError: payload };
    default:
      return state;
  }
};

export default listingPageReducer;

// ================ Action creators ================ //

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const listingsRequest = () => ({
  type: LISTINGS_REQUEST,
});

export const listingsSuccess = response => ({
  type: LISTINGS_SUCCESS,
  payload: { data: response.data },
});

export const listingsError = e => ({
  type: LISTINGS_ERROR,
  error: true,
  payload: e,
});


export const queryUserListings = () => (dispatch, getState, sdk) => {
  dispatch(listingsRequest());
  const { aspectWidth = 1, aspectHeight = 1, variantPrefix = 'listing-card' } = config.listing;
  const aspectRatio = aspectHeight / aspectWidth;
  return sdk.listings
    .query({
      include: ['author', 'images'],
      'fields.image': [`variants.${variantPrefix}`, `variants.${variantPrefix}-2x`],
      ...createImageVariantConfig(`${variantPrefix}`, 400, aspectRatio),
      ...createImageVariantConfig(`${variantPrefix}-2x`, 800, aspectRatio),
      'limit.images': 1,
      
    })
    .then(response => {

      dispatch(addMarketplaceEntities(response));
      dispatch(listingsSuccess(response));
      return response;
    })
    .catch(e => dispatch(listingsError(storableError(e))));
};

 export const loadData = () => (dispatch, getState, sdk) => {
      dispatch(setInitialState());
  
      return Promise.all([
        dispatch(queryUserListings()),
      ]);
   };
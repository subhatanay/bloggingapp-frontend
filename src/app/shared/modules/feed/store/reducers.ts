import { routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';
import { IFeedState } from '../types/feedState.interface';
import {
  getFeedAction,
  getFeedActionFailure,
  getFeedActionSuccess,
} from './actions/getFeed.actions';

const initalState: IFeedState = {
  isLoading: false,
  data: null,
  error: null,
};

const feedReducer = createReducer(
  initalState,
  on(
    getFeedAction,
    (state): IFeedState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getFeedActionSuccess,
    (state, action): IFeedState => ({
      ...state,
      isLoading: false,
      data: action.feed,
      error: null,
    })
  ),
  on(
    getFeedActionFailure,
    (state): IFeedState => ({
      ...state,
      isLoading: false,
      data: null,
      error: null,
    })
  ),
  on(
    routerNavigationAction,
    ():IFeedState => initalState
  )
);


export function reducers(state: IFeedState, actions: Action) {
  return feedReducer(state, actions);
}

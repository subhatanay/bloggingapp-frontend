import { routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';
import { IArticleState } from '../types/articleState.interface';
import {
  getArticleAction,
  getArticleActionFailure,
  getArticleActionSuccess,
} from './actions/article.actions';

const initalState: IArticleState = {
  isLoading: false,
  data: null,
  error: null,
};

const articleReducer = createReducer(
  initalState,
  on(
    getArticleAction,
    (state): IArticleState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleActionSuccess,
    (state, action): IArticleState => ({
      ...state,
      isLoading: false,
      data: action.article,
      error: null,
    })
  ),
  on(
    getArticleActionFailure,
    (state): IArticleState => ({
      ...state,
      isLoading: false,
      data: null,
      error: null,
    })
  ),
  on(
    routerNavigationAction,
    ():IArticleState => initalState
  )
);


export function reducers(state: IArticleState, actions: Action) {
  return articleReducer(state, actions);
}

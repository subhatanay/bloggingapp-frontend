import { createAction, props } from "@ngrx/store";
import { AddToFavouriteActionTypes } from "../actionTypes";

export const favouriteAction = createAction(
  AddToFavouriteActionTypes.FAVORITE_ACTION,
  props<{slug: string}>()
)
export const favouriteActionSuccess = createAction(
  AddToFavouriteActionTypes.FAVORITE_ACTION_SUCCESS
)
export const favouriteActionFailure = createAction(
  AddToFavouriteActionTypes.FAVORITE_ACTION_FAILURE
)

export const unFavouriteAction = createAction(
  AddToFavouriteActionTypes.UN_FAVORITE_ACTION,
  props<{slug: string}>()
)
export const unFavouriteActionSuccess = createAction(
  AddToFavouriteActionTypes.UN_FAVORITE_ACTION_SUCCESS
)
export const unFavouriteActionFailure = createAction(
  AddToFavouriteActionTypes.UN_FAVORITE_ACTION_FAILURE
)

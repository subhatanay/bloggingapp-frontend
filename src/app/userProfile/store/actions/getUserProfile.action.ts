import { createAction, props } from "@ngrx/store"
import { IUserProfile } from "../../types/userProfile.interface"
import { ActionTypes } from "../actionTypes"

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{slug: string}>()
)

export const getUserProfileActionSuccess = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{userProfile: IUserProfile}>()
)

export const getUserProfileActionFailre = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE,
)


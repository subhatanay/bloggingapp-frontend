import { IAuthState } from "../../auth/types/authState.interface";
import { IFeedState } from "../modules/feed/types/feedState.interface";
import { IPopularTagsState } from "../modules/popular-tags-list/types/popular-tags-state.interface";

export interface IAppState {
  auth: IAuthState,
  feedData: IFeedState,
  popularTags : IPopularTagsState
}

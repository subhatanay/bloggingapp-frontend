import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { IUserProfile } from "src/app/userProfile/types/userProfile.interface";
import { FollowAuthorService } from "../../services/follow-author.service";
import { followAuthorAction, followAuthorActionFailure, followAuthorActionSuccess, unfollowAuthorAction, unfollowAuthorActionFailure, unfollowAuthorActionSuccess } from "../actions/follow-author.actions";

@Injectable()
export class FollowAuthorEffect {

  constructor(private actions$ : Actions, private followAuthorService : FollowAuthorService) {}

  followAuthorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followAuthorAction),
      switchMap(({author}) => {
        return this.followAuthorService.followAuthor(author).pipe(
          map((profile:IUserProfile) => {
            return followAuthorActionSuccess({profile})
          }),
          catchError(()=> {
            return of(followAuthorActionFailure())
          })
        )
      })
    )
  )


  unFollowAuthorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfollowAuthorAction),
      switchMap(({author}) => {
        return this.followAuthorService.unFollowAuthor(author).pipe(
          map((profile:IUserProfile) => {
            return unfollowAuthorActionSuccess({profile})
          }),
          catchError(()=> {
            return of(unfollowAuthorActionFailure())
          })
        )
      })
    )
  )


}


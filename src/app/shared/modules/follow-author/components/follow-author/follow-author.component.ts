import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { followAuthorAction, unfollowAuthorAction } from "../../store/actions/follow-author.actions";

@Component({
  selector: "mc-follow-author",
  templateUrl: "./follow-author.component.html"
})
export class FollowAuthorComponent implements OnInit {
  @Input("authorName") authorNameProps: string
  @Input("following") followingProps: boolean

  isFollow: boolean

  constructor(private store: Store) {}


  ngOnInit(): void {
    this.isFollow = this.followingProps
  }


  handleFollowUnfollow(): void {
    if (this.isFollow) {
      this.store.dispatch(unfollowAuthorAction({author: this.authorNameProps}))
    } else {
      this.store.dispatch(followAuthorAction({author: this.authorNameProps}))
    }

    this.isFollow = !this.isFollow

  }

}

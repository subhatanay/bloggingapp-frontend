import { Component, Input, NgModule, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLoggedInSelector } from "src/app/auth/store/selectors";
import { favouriteAction, unFavouriteAction } from "../store/actions/add-to-favorite.actions";

@Component({
  selector: 'mc-add-to-faviourites',
  templateUrl: './add-to-favourite.component.html'
})
export class AddToFavouriteComponent implements OnInit {

  @Input("isFavioured") isFaviouredProps : boolean
  @Input("articleSlug") articleSlugProps: string
  @Input("favouriteCount") favouriteCountProps: number

  favouriteCount: number = 5
  isFavorited: boolean

  constructor(private store : Store) {}


  ngOnInit(): void {
    console.log(this.favouriteCountProps)
    this.favouriteCount = this.favouriteCountProps
    this.isFavorited = this.isFaviouredProps
  }

  onFavouiteClick() : void {
    if (this.isFavorited) {
      this.favouriteCount--
      this.store.dispatch(unFavouriteAction({slug: this.articleSlugProps}))
    } else {
      this.favouriteCount++
      this.store.dispatch(favouriteAction({slug: this.articleSlugProps}))
    }

    this.isFavorited = !this.isFavorited

  }


}

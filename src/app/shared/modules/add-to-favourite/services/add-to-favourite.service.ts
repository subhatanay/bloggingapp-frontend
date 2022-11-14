import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IArticle } from "src/app/shared/types/article.interface";
import { IArticleResponse } from "src/app/shared/types/articleResponse.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class AddToFavouriteService {

  constructor(private http : HttpClient) {}

  favouriteArticle(slug: string) : Observable<IArticle> {
    const fullUrl = environment.apiUrl + "/articles/" + slug + "/favorite"
    return this.http.post<IArticleResponse>(fullUrl,{}).pipe(
      map((articleResponse: IArticleResponse) => articleResponse.article)
    )

  }

  unFavouriteArticle(slug: string) :  Observable<IArticle> {
    const fullUrl = environment.apiUrl + "/articles/" + slug + "/favorite"
    return this.http.delete<IArticleResponse>(fullUrl).pipe(
      map((articleResponse: IArticleResponse) => articleResponse.article))
  }

}

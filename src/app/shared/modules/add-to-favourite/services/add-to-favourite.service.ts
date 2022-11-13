import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AddToFavouriteService {

  constructor(private http : HttpClient) {}

  favouriteArticle(slug: string) : Observable<{}> {
    const fullUrl = environment.apiUrl + "/articles/" + slug + "/favorite"
    return this.http.post<{}>(fullUrl, {})

  }

  unFavouriteArticle(slug: string) : Observable<{}> {
    const fullUrl = environment.apiUrl + "/articles/" + slug + "/favorite"
    return this.http.delete<{}>(fullUrl)
  }

}

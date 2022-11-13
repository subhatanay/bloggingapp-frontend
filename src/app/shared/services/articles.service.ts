import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IArticle } from "../types/article.interface";
import { IArticleResponse } from "../types/articleResponse.interface";

@Injectable()
export class ArticleService {
  constructor(private http : HttpClient) {}

  getArticle(slug: string) : Observable<IArticle> {
    const fullUrl = environment.apiUrl + "/articles/" + slug;
    return this.http.get<IArticleResponse>(fullUrl).pipe(
      map((response: IArticleResponse) => {
        return response.article
      })
    )
  }

}


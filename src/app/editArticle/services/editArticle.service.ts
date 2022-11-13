import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IArticle } from "src/app/shared/types/article.interface";
import { ISaveArticleResponse } from "src/app/shared/types/articleResponse.interface";
import { environment } from "src/environments/environment";
import { IArticleInput, ICreateArticleRequest } from "../../shared/modules/articleForm/types/articleInput.interface";

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  editArticle(slug: string,articleInput: ICreateArticleRequest) : Observable<ISaveArticleResponse> {
    const fullUrl = environment.apiUrl + "/articles/" + slug
    return this.http.put<ISaveArticleResponse>(fullUrl, articleInput)

  }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IGetUserProfileResponse } from "src/app/userProfile/types/getUserProfileResponse.interface";
import { IUserProfile } from "src/app/userProfile/types/userProfile.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class FollowAuthorService {

  constructor(private http: HttpClient) {}


  followAuthor(author: string) : Observable<IUserProfile> {
    const fullUrl = environment.apiUrl + "/profiles/" + author + "/follow"
    return this.http.post<IGetUserProfileResponse>(fullUrl,{})
    .pipe(map((userProfileResponse: IGetUserProfileResponse) => userProfileResponse.profile))
  }

  unFollowAuthor(author: string) : Observable<IUserProfile> {
    const fullUrl = environment.apiUrl + "/profiles" + author + "/follow"
    return this.http.delete<IGetUserProfileResponse>(fullUrl)
    .pipe(map((userProfileResponse: IGetUserProfileResponse) => userProfileResponse.profile))
  }


}

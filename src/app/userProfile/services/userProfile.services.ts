import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IGetUserProfileResponse } from "../types/getUserProfileResponse.interface";
import { IUserProfile } from "../types/userProfile.interface";

@Injectable()
export class UserProfileService {

  constructor(private http: HttpClient) {}

  getUserProfile(slug : string) : Observable<IUserProfile> {
    const url = environment.apiUrl + "/profiles/" + slug
    return this.http.get<IGetUserProfileResponse>(url).pipe(map((userReponse : IGetUserProfileResponse) => userReponse.profile))
  }
}

import { IProfile } from "./profile.interface"

export interface IArticle {
  title: string
  slug: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  description: string
  favorited: boolean
  favoritesCount: number
  author: IProfile

}

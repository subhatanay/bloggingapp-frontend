export interface IArticleInput {
  title: string,
  description : string,
  body: string,
  tagList: string[]
}

export interface ICreateArticleRequest {
  article: IArticleInput
}

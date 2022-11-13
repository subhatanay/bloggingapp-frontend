import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, map, Observable } from "rxjs";
import { IArticleInput, ICreateArticleRequest } from "src/app/shared/modules/articleForm/types/articleInput.interface";
import { IArticle } from "src/app/shared/types/article.interface";
import { IBackendError } from "src/app/shared/types/backendErrors.interface";
import { editArticleAction, getArticleAction } from "../../store/actions/article.actions";
import { articleEditArticleSelector, isLoadingEditArticleSelector, isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";

@Component({
  selector: 'mc-edit-article-form',
  templateUrl: './editArticle.component.html'
})
export class EditArticleComponent implements OnInit {
  intialValues$ : Observable<IArticleInput>
  isSubmitting$ : Observable<boolean>
  isLoading$ : Observable<boolean>
  backendError$: Observable<IBackendError| null>
  slug: string

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initalizeValues()
    this.fetchArticleData()
  }


  initalizeValues() {
    this.slug = this.route.snapshot.paramMap.get("slug" )
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingEditArticleSelector))
    this.backendError$ = this.store.pipe(select(validationErrorsSelector))
    this.intialValues$ = this.store.pipe(
      select(articleEditArticleSelector),
      filter(Boolean),
      map((article: IArticle) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      })
    )
  }

  fetchArticleData() {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }


  onSubmit(articleInput: ICreateArticleRequest) {
    console.log(articleInput)
    this.store.dispatch(editArticleAction({slug: this.slug,article : articleInput}))
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CreateArticleService } from 'src/app/createArticle/services/createArticle.service';
import { ArticleService } from 'src/app/shared/services/articles.service';
import { IArticle } from 'src/app/shared/types/article.interface';
import { ISaveArticleResponse } from 'src/app/shared/types/articleResponse.interface';
import { EditArticleService } from '../../services/editArticle.service';
import { editArticleAction, editArticleActionFailure, editArticleActionSuccess, getArticleAction, getArticleActionFailure, getArticleActionSuccess } from '../actions/article.actions';


@Injectable()
export class EditArticleEffect {
  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private sharedAricleService: ArticleService,
    private router: Router
  ) {}

  getArticleAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.sharedAricleService.getArticle(slug).pipe(
          map((article: IArticle) => {

            return getArticleActionSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getArticleActionFailure()
            );
          })
        );
      })
    )
  );

  editArticleAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleAction),
      switchMap(({ slug, article }) => {
        return this.editArticleService.editArticle(slug,article).pipe(
          map((articleRes: ISaveArticleResponse) => {

            return editArticleActionSuccess({ article:  articleRes.article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editArticleActionFailure({error: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editArticleActionSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}

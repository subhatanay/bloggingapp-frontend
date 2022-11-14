import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { IArticle } from 'src/app/shared/types/article.interface';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { environment } from 'src/environments/environment';
import { getArticleAction } from '../../store/actions/article.actions';
import { deleteArticleAction } from '../../store/actions/delete-article.actions';
import {
  dataArticleSelector,
  errorArticleSelector,
  favoriteAritcleCountSelector,
  isFavouriteArticleSelector,
  isLoadingArticleSelector,
} from '../../store/selectors';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$: Subscription;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  articleSlugId: string;
  article: IArticle;
  isAuthor$: Observable<boolean | null>

  isArticleFavourited$: Observable<boolean | null>
  favoriteCount$: Observable<number>


  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeListeners() {
    this.article$ = this.store
      .pipe(select(dataArticleSelector))
      .subscribe((article: IArticle | null) => {
        this.article = article;
        if (this.article) {

          console.log("value chanegs " + this.article.favorited )
        }

      });
    this.fetchArticleData();
  }


  initializeValues(): void {
    this.articleSlugId = this.route.snapshot.paramMap.get('slug');

    this.error$ = this.store.pipe(select(errorArticleSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingArticleSelector));
    this.isArticleFavourited$ = this.store.pipe(select(isFavouriteArticleSelector))
    this.favoriteCount$ = this.store.pipe(select(favoriteAritcleCountSelector))

    this.isAuthor$ = combineLatest(
      this.store.pipe(select(currentUserSelector)),
      this.store.pipe(select(dataArticleSelector)),

    ).pipe(
      (map(([currentUser, article]: [ICurrentUser| null, IArticle| null]) => {
        if (!article || !currentUser) {
          return false
        }
        return (currentUser.username === article.author.username)
      })
    ));
  }

  fetchArticleData(): void {
    this.store.dispatch(getArticleAction({ slug: this.articleSlugId }));
  }

  deleteArticle(slug: string) :void {
    this.store.dispatch(deleteArticleAction({slug}));
  }

  ngOnDestroy(): void {
    this.article$.unsubscribe();
  }
}

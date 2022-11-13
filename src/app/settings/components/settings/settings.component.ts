import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { logoutAction } from 'src/app/auth/store/sync.actions';
import { updateCurrentUserAction } from 'src/app/auth/store/updateCurrentUser.action';
import { IUpdateUserRequest } from 'src/app/auth/types/updateUserRequest.interface';
import { IBackendError } from 'src/app/shared/types/backendErrors.interface';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { ICurrentUserInput } from 'src/app/shared/types/ICurrentUserInput.interface';
import {
  isSubmittingSelector,
  validationErrorSelector,
} from '../../store/selectors';

@Component({
  selector: 'mc-settings-page',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentUserSubscription: Subscription;
  currentUser: ICurrentUser;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<IBackendError>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initailizeListeners();
    this.initalizeValues();
  }

  initailizeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: ICurrentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initalizeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }
  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  onSubmit(): void {
    const currentUserInput: ICurrentUserInput = {
      ...this.currentUser,
      ...this.form.value,
    };
    const updateRequest: IUpdateUserRequest = {
      user: currentUserInput,
    };
    this.store.dispatch(updateCurrentUserAction({ data: updateRequest }));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}

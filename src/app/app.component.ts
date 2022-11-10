import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './auth/store/getCurrentUser.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'blogging-frontend-app';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction())
  }
}

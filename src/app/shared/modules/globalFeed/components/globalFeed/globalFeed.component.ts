import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: 'mc-global-feed',
  templateUrl : './globalFeed.component.html',
  styleUrls: ['./globalFeed.component.scss']
})
export class GlobalFeedComponent implements OnInit {
  apiUrl = "/articles"


  constructor(private store : Store) {}

  ngOnInit(): void {

  }



}

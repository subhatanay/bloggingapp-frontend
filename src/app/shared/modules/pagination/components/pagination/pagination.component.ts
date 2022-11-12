import { Component, Input, OnInit } from "@angular/core";
import { UtilsService } from "src/app/shared/services/utilis.service";

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input("total") totalProps: number
  @Input('limit') limitPros: number
  @Input('currentPage') currentPageProps: number
  @Input('url') urlProps: string;

  pagesCount: number
  pages: number[]

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitPros)
    this.pages = this.utilsService.range(1,this.pagesCount)
    console.log(this.currentPageProps)

  }





}

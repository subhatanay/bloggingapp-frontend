import { Component, Input, OnInit } from "@angular/core";
import { IBackendError } from "src/app/shared/types/backendErrors.interface";

@Component({
  selector: "mc-backend-error-messages",
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {


  @Input("backendErrors")  backendErrorsProps: IBackendError

  errorMessages: string[]

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
      let message = this.backendErrorsProps[name].join('')
      return `${name} ${message}`
    } )
  }

}

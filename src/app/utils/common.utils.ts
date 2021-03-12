import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { httpMessages } from "./app-constants.utils";

export class Utils {
    /**
   * Hnadle errors on http calls to the auth API
   * This handler is valid for both the POST and GET APIs
   * 
   * @param error 
   */
handleError(error: HttpErrorResponse) {
    console.log(error.message);

    if (error.status === httpMessages.CLIENT_ERRORS.BAD_REQUEST.httpCode
      || error.status === httpMessages.CLIENT_ERRORS.UNAUTHORIZED.httpCode) {
      
        return throwError(httpMessages.CLIENT_ERRORS.UNAUTHORIZED.responseMessageInvalidCreds);
    } else if (error.status === httpMessages.CLIENT_ERRORS.NOT_FOUND.httpCode) {

        return throwError(httpMessages.CLIENT_ERRORS.NOT_FOUND.responseMessage)
    }
    else {
      return throwError(httpMessages.genericErrorMessage);
    }
  }
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { TokenRequest } from '../models/TokenRequest';
import type { TokenResponse } from '../models/TokenResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class TokenControllerService {

    constructor(public readonly http: HttpClient) {}

    /**
     * @param formData 
     * @returns TokenResponse OK
     * @throws ApiError
     */
    public getToken(
formData?: TokenRequest,
): Observable<TokenResponse> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/auth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

}

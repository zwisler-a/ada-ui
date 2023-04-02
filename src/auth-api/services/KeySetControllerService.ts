/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class KeySetControllerService {

    constructor(public readonly http: HttpClient) {}

    /**
     * @returns any OK
     * @throws ApiError
     */
    public getKeySet(): Observable<Record<string, any>> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/.well-known/jwks.json',
        });
    }

}

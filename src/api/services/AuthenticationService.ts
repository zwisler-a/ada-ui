/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class AuthenticationService {

    constructor(public readonly http: HttpClient) {}

    /**
     * @returns any
     * @throws ApiError
     */
    public oAuth2ControllerAuthorize(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/oauth/auth',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public oAuth2ControllerTokenExchange(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/oauth/token',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public authControllerLogin(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/login',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public authControllerDoLogin(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/auth/login',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public authControllerLogout(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/logout',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public authControllerGetProfile(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/profile',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public googleControllerGoogleAuth(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/google',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public googleControllerGoogleAuthRedirect(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/google/redirect',
        });
    }

}

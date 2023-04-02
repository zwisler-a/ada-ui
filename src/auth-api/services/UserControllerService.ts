/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { UserDto } from '../models/UserDto';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class UserControllerService {

    constructor(public readonly http: HttpClient) {}

    /**
     * @returns UserDto OK
     * @throws ApiError
     */
    public getUser(): Observable<Array<UserDto>> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/user',
        });
    }

    /**
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public createUser(
requestBody: UserDto,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns any OK
     * @throws ApiError
     */
    public deleteUser(
id: string,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/user/{id}',
            path: {
                'id': id,
            },
        });
    }

}

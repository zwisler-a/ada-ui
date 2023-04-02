/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { NetworkDto } from '../models/NetworkDto';
import type { NodeDefinitionDto } from '../models/NodeDefinitionDto';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class CoreService {

    constructor(public readonly http: HttpClient) {}

    /**
     * @returns NodeDefinitionDto 
     * @throws ApiError
     */
    public getAvailableNodes(): Observable<Array<NodeDefinitionDto>> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/core/node/available',
        });
    }

    /**
     * @returns NetworkDto 
     * @throws ApiError
     */
    public getAllNetworks(): Observable<Array<NetworkDto>> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/core/network',
        });
    }

    /**
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public saveNetwork(
requestBody: NetworkDto,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/core/network',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns NetworkDto 
     * @throws ApiError
     */
    public getNetwork(
id: string,
): Observable<NetworkDto> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/core/network/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param identifier 
     * @returns any 
     * @throws ApiError
     */
    public deleteNetwork(
identifier: string,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/core/network/{identifier}',
            path: {
                'identifier': identifier,
            },
        });
    }

    /**
     * @param networkId 
     * @returns any 
     * @throws ApiError
     */
    public startNetwork(
networkId: string,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/core/network/start/{networkId}',
            path: {
                'networkId': networkId,
            },
        });
    }

    /**
     * @param networkId 
     * @returns any 
     * @throws ApiError
     */
    public stopNetwork(
networkId: string,
): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/core/network/stop/{networkId}',
            path: {
                'networkId': networkId,
            },
        });
    }

}

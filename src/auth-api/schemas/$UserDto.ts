/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserDto = {
    properties: {
        id: {
    type: 'string',
},
        username: {
    type: 'string',
},
        password: {
    type: 'string',
},
        permissions: {
    type: 'array',
    contains: {
    type: 'string',
},
},
    },
} as const;

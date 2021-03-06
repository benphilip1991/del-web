/**
 * A simple utility class for app constants and utility
 * functions.
 */

export const httpMessages = {
    SUCCESS: {
        OK: {
            httpCode: 200,
            responseMessage: 'Success',
        },
        CREATED: {
            httpCode: 201,
            responseMessage: 'Created!',
        }
    },
    CLIENT_ERRORS: {
        BAD_REQUEST: {
            httpCode: 400,
            responseMessage: 'Bad Request',
        },
        UNAUTHORIZED: {
            httpCode: 401,
            responseMessageInvalidCreds: 'Invalid Email or Password!',
            responseMessageUnauthorized: 'Unauthorized!',
        },
        FORBIDDEN: {
            httpCode: 403,
            responseMessage: 'Forbidden!'
        },
        NOT_FOUND: {
            httpCode: 404,
            responseMessage: 'Not Found!'
        },
        CONFLICT: {
            httpCode: 409,
            responseMessage: 'Conflict!'
        }
    },
    SERVER_ERRORS: {
        INTERNAL_SERVER_ERROR: {
            httpCode: 500,
            responseMessage: 'Internal Server Error!'
        },
        GATEWAY_TIMEOUT: {
            httpCode: 504,
            responseMessage: 'Gateway Timeout!'
        },
    },

    genericErrorMessage: 'Request failed. Please try again later!'
}

/**
 * Credential elements
 */
export const credentials = {
    TOKEN: "token",
    ROLE: "userRole",
    USERID: "userId"
}

/**
 * User roles set in the del-api service.
 */
export const userRoles = {
    ADMIN: 'admin',
    CAREGIVER: 'caregiver',
    DEVELOPER: 'developer',
    PATIENT: 'patient'
}

/**
 * User sex in add user component.
 */
export const sex = {
  MALE: "male",
  FEMALE: "female",
  NOTTOMENTION: "Prefer not to mention",
  OTHER: "other",
};
/**
 * Page and Page size defined for pagination.
 */
export const pageDetails ={
     page : 1,
     pageSize : 5
}
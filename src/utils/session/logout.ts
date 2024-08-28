import requestHandler from '@requestHandler';

import { ApiResponseType, ApiResponseScheme } from '@models/apiResponse';

export async function logout(): Promise<ApiResponseType> {
    try {
        const response = await requestHandler.get('session/logout.php');
        const validatedResponse: ApiResponseType = ApiResponseScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        const errorResponse: ApiResponseType = {
            success: false,
            message: 'Error:' + error,
        };
        return errorResponse;
    }
};

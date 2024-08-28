import requestHandler from '@requestHandler';

import { ApiResponseScheme } from '@models/apiResponse';
import { signInType } from '@models/signIn';
import { z } from 'zod';

const LoginResponseScheme = ApiResponseScheme.extend({
    label: z.string().max(250),
});
type LoginResponseType = z.infer<typeof LoginResponseScheme>;


export async function login(credentials: signInType): Promise<LoginResponseType> {
    try {
        const response = await requestHandler.post('session/login.php',credentials);
        const validatedResponse = LoginResponseScheme.parse(response.data);
        return validatedResponse;
    } catch (error) {
        return {
            success: false,
            message: 'No se pudo iniciar sesion',
            label: '',
        };
    }
}

import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { getStorageToken } from './session';
import * as jose from 'jose';

type GuardType = 'authenticated' | 'canManageTeam' | 'canManageFarmer' | 'isMobile';

type GuardT = {
    guards: GuardType[];
    target: React.ReactElement;
};

function Guard({ target, guards }: GuardT): React.ReactElement {
    let redirectUrl = null;
    const { user } = useAuth();
    let userId;

    // Hacky solution, I have to admit..
    if (!user) {
        const token = getStorageToken();
        if (token)
            userId = parseInt(jose.decodeJwt(token).id as string)
    }

    for (let i = 0; i < guards.length; i++) {
        switch (guards[i]) {
            case 'authenticated':
                if (!user?.id && !userId) {
                    redirectUrl = '/login';
                    break;
                }
                break;
            default:
                break;
        }
    }

    return redirectUrl ? <Navigate to={redirectUrl} /> : target;
}

export default Guard;

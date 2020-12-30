export const AP = (window as any).AP;

export async function getToken(): Promise<string> {
    return AP.context.getToken();
}

export async function authorizationHeaderValue(): Promise<string> {
    return `JWT ${await getToken()}`
}
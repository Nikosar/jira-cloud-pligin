export const AP = (() => {
    if (process.env.NODE_ENV === 'production') {
        return (window as any).AP
    } else {
        return require("./APMock/APMock").MockAP;
    }
})();

export async function getToken(): Promise<string> {
    return AP.context.getToken();
}

export async function authorizationHeaderValue(): Promise<string> {
    return `JWT ${await getToken()}`
}
export const MockAP = {
    context: {
        getToken: () => {
            return ""
        }
    },
    request: ({url}: RequestInfo): Promise<any> => {
        console.log(url)
        if (url.startsWith("/rest/api/3/project/search")) {
            return resolveBody(require("./projects-search.json"))
        } else if (url.startsWith("/rest/api/3/user/viewissue/search")) {
            return resolveBody(require("./user-viewissue.json"))
        }
        return Promise.reject("method not found");
    }
}

const resolveBody = (object: object): Promise<any> => {
    return Promise.resolve({
        body: JSON.stringify(object)
    })
}

type RequestInfo = {
    url: string
}
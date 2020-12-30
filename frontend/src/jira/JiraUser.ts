export default class JiraUser {
    displayName: string;
    accountId: string;

    constructor(displayName: string, accountId: string) {
        this.displayName = displayName;
        this.accountId = accountId;
    }
}
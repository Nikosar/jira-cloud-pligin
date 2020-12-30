export default class JiraProject {
    name: string;
    id: number | string;
    key: string;

    constructor(name = "", id: number | string = -1, key = "") {
        this.name = name;
        this.id = id;
        this.key = key;
    }
}
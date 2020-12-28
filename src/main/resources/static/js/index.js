$(document).ready(async function () {
    const projectSelect = AJS.$("#project-select").auiSelect2();
    let projects = getProjects(projectSelect);
    const userSelect = AJS.$("#user-select").auiSelect2();
    let users = getUsers(userSelect);
    await projects;
    await users;

    getSettings();

    AJS.$("#save-settings").on("click", function () {
        const button = this;
        button.busy();

        postSettings()
            .then(button.idle())
            .catch(button.idle())
    })
})


async function getProjects(select2) {
    return AP.request({
        url: "/rest/api/3/project/search",
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    }).then(resp => {
        let data = JSON.parse(resp.body);
        Object.values(data.values).forEach((project) => {
            createOptionIfNotExist(project.name, project.id, select2);
        })
    }).catch(e => console.log(e))
}

function createOptionIfNotExist(name, id, select2) {
    let hasOption = select2.find("option[value='" + id + "']").length;
    if (!hasOption) {
        const option = new Option(name, id, false, false);
        select2.append(option).trigger("change");
    }
}

async function getUsers(select2) {
    return AP.request({
        url: "/rest/api/3/user/picker?query=dbn",
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    }).then(resp => {
        let data = JSON.parse(resp.body);
        Object.values(data.users).forEach((user) => {
            createOptionIfNotExist(user.displayName, user.accountId, select2);
        })
    }).catch(e => console.log(e))
}

async function getSettings() {
    return fetch("/settings", {
        "headers": {
            "Authorization": await token()
        }
    }).then(resp => resp.json())
        .then(json => setSettings(json));
}

function setSettings(settings) {
    $("#name").val(settings.name)
    $("#flag").prop("checked", settings.flag)
    $("#project-select").val(settings.projects).trigger("change")
    $("#user-select").val(settings.users).trigger("change")
}

async function postSettings() {
    const request = {
        name: $("#name").val(),
        flag: $("#flag").is(":checked"),
        projects: $("#project-select").val(),
        users: $("#user-select").val(),
    }

    return fetch("/settings", {
        method: "PUT",
        headers: {
            "Authorization": await token(),
            'Content-Type': "application/json"
        },
        body: JSON.stringify(request)
    })
}

async function token() {
    const token = await AP.context.getToken();
    return `JWT ${token}`
}
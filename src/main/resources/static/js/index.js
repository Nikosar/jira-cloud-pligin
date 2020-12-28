const MAX_RESULTS = 50;

$(document).ready(async function () {
    const projectSelect = AJS.$("#project-select").auiSelect2({
        dataType: "json",
        ajax: {
            data: function (params, page) {
                return {
                    search: params,
                    page: page || 1
                }
            },
            transport: function (params) {
                return getProjects(params.data.search, params.data.page, MAX_RESULTS)
                    .then((resp) => params.success(JSON.parse(resp.body))
                        .catch((e) => params.failure(e)));

            },
            results: function (resp) {
                console.log(resp)
                let mappedResult = []
                Object.values(resp.values).forEach((project) => {
                    mappedResult.push({id: project.id, text: project.name});
                })
                console.log(mappedResult)
                return {
                    results: mappedResult,
                    pagination: {
                        more: false
                    }//(resp.startAt + resp.maxResults) <= resp.total
                }
            }
        }
    });
    // let projects = getProjects(projectSelect);
    const userSelect = AJS.$("#user-select").auiSelect2();
    let users = getUsers(userSelect, "db");
    // await projects;
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


async function getProjects(search, page, maxResults) {
    const offset = maxResults * (page - 1)
    return AP.request({
        url: `/rest/api/3/project/search?query=${search}&startAt=${offset}`,
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    })
}

function createOptionIfNotExist(name, id, select2) {
    let hasOption = select2.find("option[value='" + id + "']").length;
    if (!hasOption) {
        const option = new Option(name, id, false, false);
        select2.append(option).trigger("change");
    }
}

async function getUsers(select2, search) {
    return AP.request({
        url: `/rest/api/3/user/picker?query=${search}`,
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
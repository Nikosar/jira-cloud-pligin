const MAX_RESULTS = 10;

function paginatedQuery(url, query, page) {
    return AP.request({
        url: `${url}?query=${query}&maxResults=${MAX_RESULTS}&startAt=${(MAX_RESULTS * (page - 1))}`,
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    });
}

function projectsById(url, id) {
    return AP.request({
        url: `${url}/${id}`,
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    });
}

$(document).ready(async function () {
    const projectSelect = AJS.$("#project-select").auiSelect2({
        multiple: true,
        ajax: {
            url: "/rest/api/3/project/search",
            data: function (params, page) {
                console.log(params);
                return {
                    query: params,
                    page: page || 1
                }
            },
            transport: function (params) {
                paginatedQuery(params.url, params.data.query, params.data.page)
                    .then((data) => params.success(JSON.parse(data.body)))
                    .catch(e => params.error(e))
            },
            results: function (resp) {
                let mappedResult = []
                Object.values(resp.values).forEach((project) => {
                    mappedResult.push({id: project.id, text: project.name});
                })
                return {
                    results: mappedResult,
                    pagination: {
                        more: (resp.startAt + resp.maxResults) <= resp.total
                    }
                }
            }
        }
    });
    const userSelect = AJS.$("#user-select").auiSelect2();
    let users = getUsers(userSelect, "db");
    await users;

    projectSelect.on("select2-selecting", function () {
        console.log("selectsadasdasdasd");
    })
    fetchAndSetSettings(projectSelect);

    AJS.$("#save-settings").on("click", function () {
        const button = this;
        button.busy();

        postSettings()
            .then(button.idle())
            .catch(button.idle())
    })
})

//
// async function getProjects(search, page, maxResults, url) {
//     return
// }

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

async function fetchAndSetSettings(projectSelect) {
    return fetch("/settings", {
        "headers": {
            "Authorization": await token()
        }
    }).then(resp => resp.json())
        .then(json => setSettings(json, projectSelect));
}

function setSettings(settings, projectSelect) {
    $("#name").val(settings.name)
    $("#flag").prop("checked", settings.flag)
    settings.projects.forEach(project => {
        projectsById("/rest/api/3/project", project)
            .then(data => JSON.parse(data.body))
            .then(project => ({text: project.name, id: project.id}))
            .then(project => {
                const option = new Option(project.name, project.id, true, true);
                projectSelect.append(option).trigger("change");

                console.log("init trigger")
                projectSelect.trigger({
                    type: "select2-selecting",
                    params: {
                        data: project
                    }
                })
            })

            // .then((json) => console.log(json))

//         // Set up the Select2 control
//         $('#mySelect2').select2({
//             ajax: {
//                 url: '/api/students'
//             }
//         });
//
// // Fetch the preselected item, and add to the control
//         var studentSelect = $('#mySelect2');
//         $.ajax({
//             type: 'GET',
//             url: '/api/students/s/' + studentId
//         }).then(function (data) {
//             // create the option and append to Select2
//             var option = new Option(data.full_name, data.id, true, true);
//             studentSelect.append(option).trigger('change');
//
//             // manually trigger the `select2:select` event
//             studentSelect.trigger({
//                 type: 'select2:select',
//                 params: {
//                     data: data
//                 }
//             });
//         });

        //TODO check that project exists?
        createOptionIfNotExist(project.name, project.id, projectSelect)
    })

    // $("#project-select").val(settings.projects).trigger("change")
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
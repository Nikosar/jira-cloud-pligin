const getSettings = () => AP.context.getToken(
    (token) => fetch("/settings", {
        headers: new Headers({
            'Authorization': `JWT ${token}`
        })
    }).then(resp => resp.json())
        .then(json => setSettings(json))
)

function setSettings(settings) {
    console.log(settings)

    $("#name").val(settings.name)
    $("#flag").prop("checked", settings.flag)
    $("#project-select").val(settings.projects)
    $("#project-select").trigger("change")
    $("#user-select").val(settings.users)
    $("#user-select").trigger("change")
}

$(document).ready(function (){
    let userSelect = AJS.$("#user-select").auiSelect2();
    let projectSelect = AJS.$("#project-select").auiSelect2();

    getSettings();

    $("#save-settings").on("click", () => {
        let request = {
            name: $("#name").val(),
            flag: $("#flag").is(":checked"),
            projects: $("#project-select").val(),
            users: $("#user-select").val(),
        }


        console.log(request);

        AP.context.getToken(
            (token) => fetch("/settings", {
                method: "PUT",
                headers: new Headers({
                    'Authorization': `JWT ${token}`,
                    'Content-Type': "application/json"
                }),
                body: JSON.stringify(request)
            }).then(resp => resp.json())
                .then(json => console.log(json)));
    })
})


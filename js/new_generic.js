var data = null, YourFamilyDetails = null;
w3IncludeHTML();
$(function(){
    $("form").submit(function(e){
        e.preventDefault()
    });
    data = JSON.parse(window.atob(GetURLParameter("data")));
    YourFamilyDetails = $("#YourFamilyDetails").DataTable({
        "columns":[{
            "title": "Family Member",
            "render": function(data, type, row, meta){
                return row.name + " (" + moment(row.dob).format("DD/MM/YYYY") + ")";
            }
        },{
            "title": "Eye Colour",
            "width": "20%",
            "render": function(data, type, row, meta){
                var button = null;
                if(row.hasOwnProperty("eyes") && row.eyes){
                    button = $("<button></button>", {
                        "class": "btn btn-default eye-colour",
                        "text": row["eye-colour"] + " | Edit  Eye Colour",
                        "data-toggle": "modal",
                        "data-target": "#eyeModal",
                        "data-backdrop": "static"
                    }).prop("outerHTML");
                }else{
                    button = $("<button></button>", {
                        "class": "btn btn-primary eye-colour",
                        "text": "Add Eye Colour",
                        "data-toggle": "modal",
                        "data-target": "#eyeModal",
                        "data-backdrop": "static"
                    }).prop("outerHTML");
                }
                return button;
            },
            "orderable": false
        },{
            "title": "Hair Colour",
            "width": "20%",
            "render": function(data, type, row, meta){
                var button = null;
                if(row.hasOwnProperty("hair") && row.hair){
                    button = $("<button></button>", {
                        "class": "btn btn-default hair-colour",
                        "text": row["hair-colour"] + " | Edit Hair Colour",
                        "data-toggle": "modal",
                        "data-target": "#hairModal",
                        "data-backdrop": "static"
                    }).prop("outerHTML");
                }else{
                    button = $("<button></button>", {
                        "class": "btn btn-primary hair-colour",
                        "text": "Add Hair Colour",
                        "data-toggle": "modal",
                        "data-target": "#hairModal",
                        "data-backdrop": "static"
                    }).prop("outerHTML");
                }
                return button;                        
            },
            "orderable": false
        },{
            "title": "Hand Dominance",
            "width": "25%",
            "render": function(data, type, row, meta){  
                var button = null;
                if(row.hasOwnProperty("hand")){
                    button = $("<button></button>", {
                        "class": "btn btn-default handedness",
                        "text": row.hand + " | Edit Handedness",
                        "data-toggle": "modal",
                        "data-target": "#handModal",
                        "data-backdrop": "static"
                    }).prop("outerHTML");
                }else{
                    button = $("<button></button>", {
                        "class": "btn btn-primary handedness",
                        "text": "Add Handedness",
                        "data-toggle": "modal",
                        "data-target": "#handModal",
                        "data-backdrop": "static"
                    }).prop("outerHTML");
                }
                return button;
            },
            "orderable": false
        }],
        "data": data,
    });                
});
function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){

            return sParameterName[1];
        }
    }
}
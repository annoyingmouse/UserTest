/*
8888888888                           
888                                  
888                                  
8888888   888  888  .d88b.  .d8888b  
888       888  888 d8P  Y8b 88K      
888       888  888 88888888 "Y8888b. 
888       Y88b 888 Y8b.          X88 
8888888888 "Y88888  "Y8888   88888P' 
               888                   
          Y8b d88P                   
           "Y88P"                    
 */
$(function(){
    $("#eyeColourName").on("change", function(){
        if($(this).val().length){
            $("#eyeColour").removeAttr("disabled");
        }else{
            $("#eyeColour").attr("disabled", "disabled");
        }
    });
    var eyeForm = $("#eyeForm").validate({
        "rules":{
            "eyeColourName": {
                "required": true
            },
            "eyeColour": {
                "required": true
            }
        },
        "submitHandler": function(form) {
            var familyMember = $("#eyeColourName").find(":selected").data();
            $("#eyeColourName").find(":selected").attr("disabled", "disabled");
            $.each(data, function(k, v){
                if(
                    v.title + "" === familyMember.title + ""
                    &&
                    v.forename + "" === familyMember.forename + ""
                    &&
                    v.surname + "" === familyMember.surname + ""
                    &&
                    v.dob + "" === familyMember.dob + ""
                ){
                    v.eyes = true;
                    v["eye-colour"] = $("#eyeColour").val();
                    eyeTable.row.add(v).draw();
                }
            });
            $("#eyeModal").modal("hide");
            $("#eyeModalPrimary").val("Add Eye Details");
        }
    });
    $("#eyeModal").on("hidden.bs.modal", function(){
        eyeForm.resetForm(); 
        document.getElementById("eyeForm").reset();
        $("#eyeModal").data("original", "");
        $("#eyeColourName").val("");
        $("#eyeColour").val("").attr("disabled", "disabled");
    });                
    $("#eyeTable").on("click", ".btn-danger", function(){
        var familyMember = eyeTable.row($(this).parents('tr')).data();
        $("#eyeColourName option").each(function(k, v){
            var optionData = $(v).data();
            if(                                
                optionData.title + "" === familyMember.title + ""
                &&
                optionData.forename + "" === familyMember.forename + ""
                &&
                optionData.surname + "" === familyMember.surname + ""
                &&
                optionData.dob + "" === familyMember.dob + ""
            ){
                $(v).removeAttr("disabled");
            }
        });
        eyeTable.row($(this).parents('tr')).remove().draw(); 
    });
    $("#eyeTable").on("click", ".btn-primary", function(){
        var familyMember = eyeTable.row($(this).parents('tr')).data();
        $("#eyeColourName option").each(function(k, v){
            var optionData = $(v).data();
            if(                                
                optionData.title + "" === familyMember.title + ""
                &&
                optionData.forename + "" === familyMember.forename + ""
                &&
                optionData.surname + "" === familyMember.surname + ""
                &&
                optionData.dob + "" === familyMember.dob + ""
            ){
                $(v).removeAttr("disabled");
                console.log(familyMember);
                $("#eyeModal").modal("show").data("original", familyMember);
                $("#eyeColourName").val(familyMember.name);
                $("#eyeColour").removeAttr("disabled").val(familyMember["eye-colour"]);
                $("#eyeModalPrimary").val("Update Eye Details");
            }
        });
        eyeTable.row($(this).parents('tr')).remove().draw();
    });
    var eyeTable = $("#eyeTable").DataTable({
        "columns": [
            {
                "data": "name",
                "title": "Name"
            },{
                "data": "eye-colour",
                "title": "Eye Colour"
            },{
                "title": "Action",
                "render": function(){
                    var buttons = $("<div></div>", {
                        "class":"pull-right btn-group btn-group-sm",
                        "role":"group"
                    });
                    buttons.append($("<button></button>",{
                        "type":"button",
                        "class":"btn btn-danger",
                        "text":" Remove"
                    }).prepend($("<i></i>", {
                        "class": "glyphicon glyphicon-remove",
                        "title": "Remove"
                    })));
                    buttons.append($("<button></button>",{
                        "type":"button",
                        "class":"btn btn-primary",
                        "text":" Edit"
                    }).prepend($("<i></i>", {
                        "class": "glyphicon glyphicon-edit",
                        "title": "Edit"
                    })));
                    return buttons.prop("outerHTML");
                },
                "width": "15%",
                "sortable": false
            }
        ],
    });
    $("#eyeModalDismiss").on("click", function(){
        if($("#eyeModalPrimary").val() === "Update Eye Details"){
            eyeTable.row.add($("#eyeModal").data("original")).draw();
        }    
    });
});
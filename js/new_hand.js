/*
888    888                        888 
888    888                        888 
888    888                        888 
8888888888  8888b.  88888b.   .d88888 
888    888     "88b 888 "88b d88" 888 
888    888 .d888888 888  888 888  888 
888    888 888  888 888  888 Y88b 888 
888    888 "Y888888 888  888  "Y88888 
 */
$(function(){
    $("#YourFamilyDetails").on("click", ".handedness", function(){
        var original = YourFamilyDetails.row($(this).parents('tr')).data();
        $(".memberName").text(original.name);
        $("#handModal").data("original", original);
        if(original.hasOwnProperty("hand")){
            $("#handedness").val(original.hand);
            $("#handModalPrimary").val("Update Handedness");
        }else{
            $("#handModalPrimary").val("Add Handedness")
        }
    });
    $("#handModalPrimary").on("click", function(e){
        e.preventDefault(); 
        var familyMember = $("#handModal").data("original");
        $.each(data, function(k, v){
            if(
                v.title === familyMember.title
                &&
                v.forename === familyMember.forename
                &&
                v.surname === familyMember.surname
                &&
                v.dob === familyMember.dob
            ){
                if(~~$("#handedness").val().length){
                    v.hand = $("#handedness").val();
                }else{
                    delete v.hand;
                }
            }
        });
        YourFamilyDetails.clear().rows.add(data).draw();
        $("#handModal").modal("hide");
        $("#handedness").val("");
    });
    $("#handModal").on("hidden.bs.modal", function(){
        $("#handModal").data("original", "");
        $(".memberName").text("");
    });
});
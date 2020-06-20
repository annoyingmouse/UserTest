class OldAttribute{
  /*

  #const eyeColourName = $("#eyeColourName")
  #const eyeColour = $("#eyeColour")
  #const eyeColours = ["Brown", "Hazel", "Blue", "Green", "Silver", "Amber"]
  eyeColours.forEach(val => {
    eyeColour.append(`<option value="${val}">${val}</option>`)
  })
  const eyeModal = $("#eyeModal")
  const eyeModalPrimary = $("#eyeModalPrimary")



  */


  constructor(attribute, shortAttribute, values) {
    this.long = attribute
    this.short = shortAttribute
    this.values = values
    this.attributeName = $(`#${attribute}Name`)
    this.attribute = $(`#${attribute}`)
    const modal = $(`#${shortAttribute}Modal`)
    const modalPrimary = $(`#${shortAttribute}ModalPrimary`)
  }

  init() {
    this.values.forEach(val => {
      this.attribute.append(`<option value="${val}">${val}</option>`)
    })
  }

  resetAttributeNameSelect = () => {
    eyeColourName
        .find('option')
        .remove()
        .end()
        .append(`<option value="" disabled selected>Please choose</option>`)
    $.each(Family, (k, v) => {
      const option = $(`<option value="${v.id}">${v.name}</option>`)
      if(v.old.eye){
        option.prop("disabled", true)
      }
      eyeColourName.append(option)
    })
    eyeColour.val(null)
    eyeColour.prop("disabled", true)
  }
  resetEyeNameSelect()

}

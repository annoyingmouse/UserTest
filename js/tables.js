$(function () {
  $('form').submit(e => {
    e.preventDefault()
  })

  const eye = new TablesClass(
      'eye',
      'Eye Colour',
      ['Brown', 'Hazel', 'Blue', 'Green', 'Silver', 'Amber'],
      $('#eyeColourName'),
      $('#eyeColour'),
      $('#eyeModal'),
      $('#eyeForm'),
      $('#eyeModalPrimary'),
      $('#eyeTable')
  ).init()

  const hair = new TablesClass(
      'hair',
      'Hair Colour',
      ['Black', 'Brown', 'Blond', 'Auburn', 'Chestnut', 'Red', 'Grey', 'White'],
      $('#hairColourName'),
      $('#hairColour'),
      $('#hairModal'),
      $('#hairForm'),
      $('#hairModalPrimary'),
      $('#hairTable')
  ).init()

  const hand = new TablesClass(
      'hand',
      'Handedness',
      ['Right-handed', 'Left-handed', 'Mixed-handed', 'Ambidextrous', 'Ambilevous'],
      $('#handednessName'),
      $('#handedness'),
      $('#handModal'),
      $('#handForm'),
      $('#handModalPrimary'),
      $('#handTable')
  ).init()

})
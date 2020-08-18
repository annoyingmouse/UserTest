$(() => {

  const eye = new TablesClass(
      'eye',
      'Eye Colour',
      [
        'Brown',
        'Hazel',
        'Blue',
        'Green',
        'Silver',
        'Amber'
      ]
  ).init()

  const hair = new TablesClass(
      'hair',
      'Hair Colour',
      [
        'Black',
        'Brown',
        'Blond',
        'Auburn',
        'Chestnut',
        'Red',
        'Grey',
        'White'
      ]
  ).init()

  const hand = new TablesClass(
      'hand',
      'Handedness',
      [
        'Right-handed',
        'Left-handed',
        'Mixed-handed',
        'Ambidextrous',
        'Ambilevous'
      ]
  ).init()

})
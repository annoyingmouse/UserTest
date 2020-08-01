$(function () {
  $('form').submit(function (e) {
    e.preventDefault()
  })

  const Table = $('#YourFamilyDetails').DataTable({
    columns: [{
      title: 'Family Member',
      render: (data, type, row) =>
        `${row.name} (${moment(row.dob).format('DD/MM/YYYY')})`
    }, {
      title: 'Eye Colour',
      width: '20%',
      className: 'text-center',
      render: (data, type, row) => row.new.eye
          ? `
            <button class="btn btn-default edit eye" 
                    data-toggle="modal" 
                    data-target="#eyeModal" 
                    data-backdrop="static">
              ${row.new.eye} | Edit
            </button>
          ` : `
            <button class="btn btn-primary pl-3 pr-3 edit eye" 
                    data-toggle="modal" 
                    data-target="#eyeModal" 
                    data-backdrop="static">
              Add Eye Colour
            </button>
          `
      ,
      orderable: false
    }, {
      title: 'Hair Colour',
      width: '20%',
      className: 'text-center',
      render: (data, type, row) => row.new.hair
          ? `
            <button class="btn btn-default edit hair" 
                    data-toggle="modal" 
                    data-target="#hairModal" 
                    data-backdrop="static">
              ${row.new.hair} | Edit
            </button>
          ` : `
            <button class="btn btn-primary pl-3 pr-3 edit hair" 
                    data-toggle="modal" 
                    data-target="#hairModal" 
                    data-backdrop="static">
              Add Hair Colour
            </button>
          `
      ,
      orderable: false
    }, {
      title: 'Hand Dominance',
      width: '25%',
      className: 'text-center',
      render: (data, type, row) => row.new.hand
          ? `
            <button class="btn btn-default edit hand" 
                    data-toggle="modal" 
                    data-target="#handModal" 
                    data-backdrop="static">
              ${row.new.hand} | Edit
            </button>
          ` : `
            <button class="btn btn-primary pl-3 pr-3 edit hand" 
                    data-toggle="modal" 
                    data-target="#handModal" 
                    data-backdrop="static">
              Add Handedness
            </button>
          `
      ,
      orderable: false
    }],
    data: [
        ...JSON.parse(localStorage.getItem('FamilyMembers')),
        JSON.parse(localStorage.getItem('Member'))
    ],
    drawCallback: function(){
      const family = this.api().rows().data().toArray()
      localStorage.setItem('Member',
          JSON.stringify(...family.filter(m => m.type === 'Member')))
      localStorage.setItem('FamilyMembers',
          JSON.stringify(family.filter(m => m.type === 'FamilyMember')))
    }
  })

  const eye = new TableClass(
      Table,
      'eye',
      $('#eyeModal'),
      $('#eyeForm'),
      $('#eyeModalPrimary'),
      $('#eyeColour'),
      ['Brown', 'Hazel', 'Blue', 'Green', 'Silver', 'Amber']
  ).init()

  const hair = new TableClass(
      Table,
      'hair',
      $('#hairModal'),
      $('#hairForm'),
      $('#hairModalPrimary'),
      $('#hairColour'),
      ['Black', 'Brown', 'Blond', 'Auburn', 'Chestnut', 'Red', 'Grey', 'White']
  ).init()

  const hand = new TableClass(
      Table,
      'hand',
      $('#handModal'),
      $('#handForm'),
      $('#handModalPrimary'),
      $('#handedness'),
      ['Right-handed', 'Left-handed', 'Mixed-handed', 'Ambidextrous', 'Ambilevous']
  ).init()
})

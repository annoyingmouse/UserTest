$(() => {

  const memberInputs = {
    yourTitle : {
      selector: $('#yourTitle'),
      attribute: 'title'
    },
    yourForename : {
      selector: $('#yourForename'),
      attribute: 'forename'
    },
    yourSurname : {
      selector: $('#yourSurname'),
      attribute: 'surname'
    },
    yourDOB : {
      selector: $('#yourDOB'),
      attribute: 'dob'
    },
  }

  const familyTitle = $('#familyTitle')
  const familyForename = $('#familyForename')
  const familySurname = $('#familySurname')
  const familyDOB = $('#familyDOB')

  const familyModal = $('#familyModal')
  const familyModalPrimary = $('#familyModalPrimary')

  const Member = localStorage.Member
    ? JSON.parse(localStorage.Member) 
    : {
        type: 'Member',
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        old: {eye: null, hair: null, hand: null},
        new: {eye: null, hair: null, hand: null}
      }

  const FamilyMembers = localStorage.getItem('FamilyMembers')
    ? JSON.parse(localStorage.getItem('FamilyMembers'))
    : []

  const updateMember = () => {
    Member.name = `${Member.title} ${Member.forename} ${Member.surname}`
    localStorage.setItem('Member', JSON.stringify(Member))
    formatJson()
  }

  ['Dr.', 'Mr.', 'Mrs.', 'Miss.', 'Ms.'].forEach(val => {
    memberInputs.yourTitle.selector.append(`<option value="${val}">${val}</option>`)
    familyTitle.append(`<option value="${val}">${val}</option>`)
  })

  const resetTable = (id) => {
    id && FamilyMembers.splice(FamilyMembers.findIndex(m => m.id === id), 1)
    localStorage.setItem('FamilyMembers', JSON.stringify(FamilyMembers))
    YourFamilyTable.clear()
    YourFamilyTable.rows.add(FamilyMembers)
    YourFamilyTable.draw()
  }


  for (const property in memberInputs) {
    memberInputs[property].selector.val(Member[memberInputs[property].attribute] || null)
    memberInputs[property].selector.on('change', e => {
      Member[memberInputs[property].attribute] = e.target.value
      updateMember()
    })
  }

  $('#familyForm').submit(function (e) {
    e.preventDefault()
  }).validate({
    submitHandler: function () {
      if(FamilyMembers.length >= 3){
        document.location.href = $(this.submitButton).val() === 'Add Details - TABLES'
          ? 'tables.html'
          : 'table.html'
      }else{
        alert('Please enter all members of the family')
      }
    }
  })

  const YourFamilyTable = $('#YourFamily').on('click', '.btn-danger', function() {
    const rowData = YourFamilyTable.row($(this).parents('tr')).data()
    resetTable(rowData.id)
  }).on('click', '.btn-primary', function() {
    const rowData = YourFamilyTable.row($(this).parents('tr')).data()
    familyModal.data('original', rowData)
    familyTitle.val(rowData.title)
    familyForename.val(rowData.forename)
    familySurname.val(rowData.surname)
    familyDOB.val(rowData.dob)
    familyModalPrimary.val('Update Family Member')
    familyModal.modal('show')
    resetTable(rowData.id)
  }).DataTable({
    columns: [
      {
        data: 'name',
        title: 'Name'
      }, {
        data: 'dob',
        title: 'Date of Birth',
        render: data => moment(data).format('DD/MM/YYYY'),
        sortable: false
      }, {
        title: 'Action',
        width: '20%',
        className: 'text-center',
        render: () => `
          <div class="pull-right btn-group btn-group-sm"
               role="group">
              <button type="button"
                      class="btn btn-danger">
                  <i class="fa fa-times"
                     title="Remove"></i>
                  Remove
              </button>
              <button type="button"
                      class="btn btn-primary">
                  <i class="fa fa-edit"
                     title="Edit"></i>
                  Edit
              </button>
          </div>
        `,
        sortable: false
      }
    ],
    data: FamilyMembers
  })
  $('#familyMemberForm').validate({
    submitHandler: function () {
      const FamilyMember = familyModal.data('original')
        ? familyModal.data('original')
        : {
          type: 'FamilyMember',
          id: Math.random().toString(36).substring(2) + Date.now().toString(36),
          old: {eye: null, hair: null, hand: null},
          new: {eye: null, hair: null, hand: null}
        }
      FamilyMember.title = familyTitle.val()
      FamilyMember.forename = familyForename.val()
      FamilyMember.surname = familySurname.val()
      FamilyMember.name = `${familyTitle.val()} ${familyForename.val()} ${familySurname.val()}`
      FamilyMember.dob = familyDOB.val()
      FamilyMembers.push(FamilyMember)
      resetTable()
      familyModalPrimary.val('Add Family Member')
      familyModal.modal('hide')
    }
  })
  $('#familyModalDismiss').on('click', () => {
    if(familyModal.data('original')){
      FamilyMembers.push(familyModal.data('original'))
      resetTable()
    }
  })
  familyModal.on('hidden.bs.modal', function () {
    document.getElementById('familyMemberForm').reset()
    familyModal.removeData('original')
    formatJson()
  })
  const formatJson = () => {
    const element = $('#jsonCfgParams')
    const Family = JSON.parse(localStorage.getItem('FamilyMembers')) || []
    const Member = JSON.parse(localStorage.getItem('Member'))
    Member && Family.push(JSON.parse(localStorage.getItem('Member')))
    const json = JSON.stringify(Family, undefined, 2)
    element.html(syntaxHighlight(json))
  }
  const syntaxHighlight = function(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  formatJson()
})
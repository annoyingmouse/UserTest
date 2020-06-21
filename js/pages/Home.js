const Home = {
  render: async () => {
    return `
      <div class="container">
        <div class="jumbotron pt-4 pb-4 mb-3">
          <h1>
            Thank you again
            <small>
              for taking part in this test, you're very nearly done.
            </small>
          </h1>
          <p>
            If you can see a table below with 4 people in it (Doctors 08
            08 (08/08/0808), 09 09 (09/09/0909), 10 10 (10/10/1010) and
            11 11 (11/11/1111)) then you're ready to go. We'd like you to
            add some details for the family. You (as Dr 08 08) have brown
            hair, brown eyes and you're left-handed. The rest of your
            family has these details:
          </p>
          <ul>
            <li>
              Dr. 09 09 is really rather odd with silver eyes, white hair
              and is ambidextrous (I'm not sure I'd trust them
              <abbr title="To Be Honest">
                TBH
              </abbr>
              ).
            </li>
            <li>
              Dr. 10 10, perhaps due to being ambilevous, had a rather
              tragic accident and has no eyes or hair as a result.
            </li>
            <li>
              Dr. 11 11 is right-handed and has brown hair and eyes.
            </li>
          </ul>
          <p>
            If you could provide the details and be mindful about how the
            process feels to you, perhaps in relation to how the other
            version felt if you've already entered the data there, then
            get back to us we'd be really grateful. I'll be sharing this
            on Facebook so a comment there will suffice but please try
            entering the data in both ways before commenting.
          </p>
          <p>
            We appreciate that the scenario is contrived but it's just a
            made up use case, no data you enter is saved to a server,
            it's all in the browser - though the initial page does make
            use of local storage so that the details of the family are
            maintained between sessions.
          </p>
        </div>
        <div class="card mb-3">
          <div class="card-header">
            About you
          </div>
          <div class="card-body">
            <div class="form-group row">
              <label for="yourTitle"
                     class="col-sm-3 col-form-label">
                Your Title
              </label>
              <div class="col-sm-9">
                <select id="yourTitle"
                        name="yourTitle"
                        class="browser-default custom-select"
                        required>
                  <option value=""
                          disabled
                          selected>
                    Please choose
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="yourForename"
                     class="col-sm-3 col-form-label">
                Your Forename
              </label>
              <div class="col-sm-9">
                <input type="text"
                       class="form-control"
                       id="yourForename"
                       name="yourForename"
                       placeholder="John"
                       required>
              </div>
            </div>
            <div class="form-group row">
              <label for="yourSurname"
                     class="col-sm-3 col-form-label">
                Your Surname
              </label>
              <div class="col-sm-9">
                <input type="text"
                       class="form-control"
                       id="yourSurname"
                       name="yourSurname"
                       placeholder="Smith"
                       required>
              </div>
            </div>
            <div class="form-group row">
              <label for="yourDOB"
                     class="col-sm-3 col-form-label">
                Your Date of Birth
              </label>
              <div class="col-sm-9">
                <input placeholder="Selected date"
                       type="date"
                       id="yourDOB"
                       name="yourDOB"
                       class="form-control"
                       required>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-header">
            About your family
          </div>
          <div class="card-body">
            <table id="YourFamily"
                   class="table table-bordered table-striped table-condensed">
            </table>
            <button class="mt-2 mb-3 btn btn-primary btn-lg btn-block"
                    type="button"
                    data-toggle="modal"
                    data-target="#familyModal"
                    data-backdrop="static">
              Add Family Member
            </button>
            <div class="card">
              <div class="card-header">
                <a class="btn btn-primary"
                   data-toggle="collapse"
                   href="#collapseExample"
                   role="button"
                   aria-expanded="false"
                   aria-controls="collapseExample">
                  Show data
                </a>
              </div>
              <div class="collapse"
                   id="collapseExample">
                <div class="card-body">
                  <pre id="jsonCfgParams"
                       class="preJsonTxt"></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-header">
            There are two buttons below, they both allow you to enter
            further, detailed, information about your family. It'd be
            really great if you could try both ways and get back to us
            about which you prefer, and perhaps why you prefer one over
            the other. Please be aware that we don't have a preference,
            we're simply trying to find the best way for people to
            enter data.
          </div>
          <div class="card-body">
            <div class="float-left">
              <a class="btn btn-primary" 
                 href="#/tables">
                 Add Details - TABLES
               </a>
            </div>
            <div class="float-right">
              <a class="btn btn-primary" 
                 href="#/table">
                 Add Details - TABLE
               </a>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade"
         id="familyModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="familyModalLabel">
        <div class="modal-dialog"
             role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title"
                  id="familyModalLabel">
                Please tell us about the family member
              </h4>
              <button type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <form id="familyMemberForm">
              <div class="modal-body">
                <div class="form-group">
                  <label for="familyTitle">
                    Their Title
                  </label>
                  <select id="familyTitle"
                          name="familyTitle"
                          class="browser-default custom-select"
                          required>
                    <option value=""
                            disabled
                            selected>
                      Please choose
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="familyForename">
                    Their Forename
                  </label>
                  <input type="text"
                         id="familyForename"
                         name="familyForename"
                         class="form-control"
                         required>
                </div>
                <div class="form-group">
                  <label for="familySurname">
                    Their Surname
                  </label>
                  <input type="text"
                         id="familySurname"
                         name="familySurname"
                         class="form-control"
                         required>
                </div>
                <div class="form-group">
                  <label for="familyDOB">
                    Their Date of Birth
                  </label>
                  <input type="date"
                         id="familyDOB"
                         name="familyDOB"
                         class="form-control"
                         required>
                </div>
              </div>
              <div class="modal-footer">
                <button id="familyModalDismiss"
                        type="button"
                        class="btn btn-default"
                        data-dismiss="modal">
                  Close
                </button>
                <input id="familyModalPrimary"
                       type="submit"
                       class="btn btn-primary"
                       value="Add Family Member"/>
              </div>
            </form>
          </div>
        </div>
      </div>

    `
  },
  after_render: async () => {

    const yourTitle = $('#yourTitle')
    const yourForename = $('#yourForename')
    const yourSurname = $('#yourSurname')
    const yourDOB = $('#yourDOB')

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
      yourTitle.append(`<option value="${val}">${val}</option>`)
      familyTitle.append(`<option value="${val}">${val}</option>`)
    })


    const resetTable = (id) => {
      id && FamilyMembers.splice(FamilyMembers.findIndex(m => m.id === id), 1)
      localStorage.setItem('FamilyMembers', JSON.stringify(FamilyMembers))
      YourFamilyTable.clear()
      YourFamilyTable.rows.add(FamilyMembers)
      YourFamilyTable.draw()
    }

    yourTitle.val(Member.title || null).change(e => {
      Member.title = e.target.value
      updateMember()
    })

    yourForename.val(Member.forename || null).change(e => {
      Member.forename = e.target.value
      updateMember()
    })

    yourSurname.val(Member.surname || null).change(e => {
      Member.surname = e.target.value
      updateMember()
    })

    yourDOB.val(Member.dob || null).change(e => {
      Member.dob = e.target.value
      updateMember()
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
      const element = $('#jsonCfgParams');
      const Family = JSON.parse(localStorage.getItem('FamilyMembers'))
      Family.push(JSON.parse(localStorage.getItem('Member')))
      element.html(JSON.stringify(Family, undefined, 2));
    }

    formatJson()

  }
}

export default Home;
import TableClass from '../classes/TableClass.js'

const Table = {
  render: async () => {
    const modals = [
      {
        modal: 'eyeModal',
        modalLabel: 'eyeModalLabel',
        label: 'eyes',
        form: 'eyeForm',
        question: 'What colour are <span class="memberName"></span> eyes?',
        select: 'eyeColour',
        dismiss: 'eyeModalDismiss',
        primary: 'eyeModalPrimary',
        primaryLabel: 'Add Eye Details'
      },
      {
        modal: 'hairModal',
        modalLabel: 'hairModalLabel',
        label: 'hair',
        form: 'hairForm',
        question: 'What colour is <span class="memberName"></span> eyes?',
        select: 'hairColour',
        dismiss: 'hairModalDismiss',
        primary: 'hairModalPrimary',
        primaryLabel: 'Add Hair Details'
      },
      {
        modal: 'handModal',
        modalLabel: 'handModalLabel',
        label: 'hand',
        form: 'handForm',
        question: 'What is <span class="memberName"></span> handedness?',
        select: 'handedness',
        dismiss: 'handModalDismiss',
        primary: 'handModalPrimary',
        primaryLabel: 'Add Handedness'
      }
    ]

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
            Your family details
          </div>
          <div class="card-body">
            <table id="YourFamilyDetails"
                   class="table table-bordered table-striped table-condensed">
            </table>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-header">
            Once you're done, please go back and try the other way of
            entering the same information.
          </div>
          <div class="card-body">
            <a class="btn btn-primary btn-lg btn-block"
               id="back-link"
               href="#/">
              Go Back
            </a>
          </div>
        </div>
      </div>
      ${
        modals.map(modal =>
          /*html*/`
            <div class="modal fade"
                 id="${modal.modal}"
                 tabindex="-1"
                 role="dialog"
                 aria-labelledby="${modal.modalLabel}">
              <div class="modal-dialog"
                   role="document">
                <div class="modal-content">
                  <div class="modal-header text-center">
                    <h4 class="modal-title"
                        id="${modal.modalLabel}">
                      Please tell us about
                      <span class="memberName"></span>
                      ${modal.label}
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
                  <form id="${modal.form}">
                    <div class="modal-body">
                      <div class="form-group">
                        <label for="${modal.select}">
                          ${modal.question}
                        </label>
                        <select class="browser-default custom-select"
                                name="${modal.select}"
                                id="${modal.select}">
                          <option value="">
                            No value
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button id="${modal.dismiss}"
                              type="button"
                              class="btn btn-default"
                              data-dismiss="modal">
                        Close
                      </button>
                      <input id="${modal.primary}"
                              type="submit"
                              class="btn btn-primary"
                              value="${modal.primaryLabel}"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          `
        )
    }
    `
  },
  after_render: async () => {
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
            <button class="btn btn-default edit" 
                    data-toggle="modal" 
                    data-target="#eyeModal" 
                    data-backdrop="static">
              ${row.new.eye} | Edit
            </button>
          ` : `
            <button class="btn btn-primary edit pl-3 pr-3" 
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
            <button class="btn btn-default edit" 
                    data-toggle="modal" 
                    data-target="#hairModal" 
                    data-backdrop="static">
              ${row.new.hair} | Edit
            </button>
          ` : `
            <button class="btn btn-primary edit pl-3 pr-3" 
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
            <button class="btn btn-default edit" 
                    data-toggle="modal" 
                    data-target="#handModal" 
                    data-backdrop="static">
              ${row.new.hand} | Edit
            </button>
          ` : `
            <button class="btn btn-primary edit pl-3 pr-3" 
                    data-toggle="modal" 
                    data-target="#handModal" 
                    data-backdrop="static">
              Add Handedness
            </button>
          `
        ,
        orderable: false
      }],
      data: [...JSON.parse(localStorage.getItem('FamilyMembers')), JSON.parse(localStorage.getItem('Member'))]
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

  }
}

export default Table;
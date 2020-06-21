import TablesClass from '../classes/TablesClass.js'

const Tables = {
  render: async () => {
    const cards = [
      {
        header: 'About the eyes in your family',
        table: 'eyeTable',
        modal: 'eyeModal',
        button: 'Add Eye Details'
      },
      {
        header: 'About the hair in your family',
        table: 'hairTable',
        modal: 'hairModal',
        button: 'Add Hair Details'
      },
      {
        header: 'About the handedness in your family',
        table: 'handTable',
        modal: 'handModal',
        button: 'Add Handedness Details'
      }
    ]

    const modals = [
      {
        modal: 'eyeModal',
        modalLabel: 'eyeModalLabel',
        label: 'eyes',
        form: 'eyeForm',
        name: 'eyeColourName',
        question: 'What colour are their eyes?',
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
        name: 'hairColourName',
        question: 'What colour is their hair?',
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
        name: 'handednessName',
        question: 'What is their handedness?',
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
            Thank you
            <small>
              for taking part in this test, you're very nearly done.
            </small>
          </h1>
          <p>
            If you can see a table below with 4 people in it (Doctors 08
            08 (08/08/0808), 09 09 (09/09/0909), 10 10 (10/10/1010) and 11
            11 (11/11/1111)) then you're ready to go. We'd like you to add
            some details for the family. You (as Dr 08 08) have brown
            hair, brown eyes and you're left-handed. The rest of your
            family has these details:
          </p>
          <ul>
            <li>Dr. 09 09 is really rather odd with silver eyes, white
              hair and is ambidextrous (I'm not sure I'd trust them
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
          <p class="mb-0">
            If you could provide the details and be mindful about how the
            process feels to you, perhaps in relation to how the other
            version felt if you've already entered the data there, then
            get back to us we'd be really grateful. I'll be sharing this
            on Facebook so a comment there will suffice but please try
            entering the data in both ways before commenting.
          </p>
          <p>
            We appreciate that the scenario is contrived but it's just a
            made up use case, no data you enter is saved to a server, it's
            all in the browser - though the initial page does make use of
            local storage so that the details of the family are maintained
            between sessions.
          </p>
        </div>
        ${
        cards.map(card =>
            /*html*/`
              <div class="card mb-3">
                <div class="card-header">
                  ${card.header}
                </div>
                <div class="card-body">
                  <table id="${card.table}"
                         class="table table-bordered table-striped table-condensed">
                  </table>
                  <button class="mt-2 btn btn-primary btn-lg btn-block"
                          type="button"
                          data-toggle="modal"
                          data-target="#${card.modal}"
                          data-backdrop="static">
                    ${card.button}
                  </button>
                </div>
              </div>        
            `
        )
    }
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
                  aria-labelledby="${modal.modalLabel}"
                  data-backdrop="static">
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
                  </div>
                  <form id="${modal.form}">
                    <div class="modal-body">
                      <div class="form-group">
                        <label for="${modal.name}">
                          Please choose a family member
                        </label>
                        <select id="${modal.name}"
                                name="${modal.name}"
                                class="browser-default custom-select"
                                required>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="${modal.select}">
                          ${modal.question}
                        </label>
                        <select class="browser-default custom-select"
                                name="${modal.select}"
                                id="${modal.select}"
                                disabled="disabled"
                                required>
                          <option value="">
                            Please Choose
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

  }
}

export default Tables;
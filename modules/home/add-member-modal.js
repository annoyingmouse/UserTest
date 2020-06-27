export const AddMember = Vue.component('add-member', {
  template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <form class="modal-content"
                  v-on:submit.prevent="onSubmit">
              <input type="hidden"
                     v-model="user.index"/>
              <div class="modal-header">       
                <h5 class="modal-title">
                  Please tell us about the family member
                </h5>
                <button type="button" 
                        class="close"
                        aria-label="Close" 
                        v-on:click="closeModal">
                  <span aria-hidden="true">&times;</span>
                </button>                  
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="title" 
                         class="control-label">
                    Their Title
                  </label>
                  <select class="form-control" 
                          name="title" 
                          v-model="user.title"
                          required>
                    <option value="">Please Choose</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss.">Miss.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="forename" 
                         class="control-label">
                    Their Forename
                  </label>
                  <input type="text" 
                         class="form-control" 
                         name="forename" 
                         placeholder="Jane" 
                         required 
                         v-model="user.forename">
                </div>
                <div class="form-group">
                  <label for="surname" 
                         class="control-label">
                    Their Surname
                  </label>
                  <input type="text" 
                         class="form-control" 
                         name="surname" 
                         placeholder="Smith" 
                         required 
                         v-model="user.surname">
                </div>
                <div class="form-group">
                  <label for="dob" 
                         class="control-label">
                    Their Date of Birth
                  </label>
                  <input type="date" 
                         class="form-control" 
                         name="dob" 
                         placeholder="dd/mm/yyyy" 
                         required 
                         v-model="user.dob">
                </div>
              </div>
              <div class="modal-footer">
                <button v-on:click="closeModal" 
                        type="button" 
                        class="btn btn-secondary">
                  Close
                </button>
                <button type="submit"
                        class="btn btn-primary">
                  {{buttonText}}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  `,
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  computed: {
    buttonText() {
      return this.member.index === null ?
        'Add Family Member' :
        'Update Family Member'
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    onSubmit() {
      const member = {
        title: this.user.title,
        forename: this.user.forename,
        surname: this.user.surname,
        dob: this.user.dob,
        multiple: {
          eye: null,
          hair: null,
          hand: null
        },
        single: {
          eye: null,
          hair: null,
          hand: null
        }
      }
      if (this.member.index === null) {
        this.$store.commit('addMember', member);
      } else {
        const index = this.user.index;
        this.$store.commit('updateMember', {
          index,
          member
        });
      }
      this.closeModal()
    }
  },
  data() {
    return {
      user: { ...this.member }
    }
  }
});
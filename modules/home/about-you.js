export const AboutYou = Vue.component('about-you', {
  template: `
    <div class="card mb-3">
      <div class="card-header">About you</div>
      <div class="card-body">
        <div class="form-group row">
          <label for="ownTitle" 
                 class="col-sm-2 control-label">
            Your Title
          </label>
          <div class="col-sm-10">
            <select class="form-control" 
                    name="ownTitle" 
                    v-model="ownTitle" 
                    required>
              <option value="null">Please Choose</option>
              <option value="Dr.">Dr.</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss.">Miss.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="ownForename" 
                 class="col-sm-2 control-label">
            Your Forename
          </label>
          <div class="col-sm-10">
            <input type="text" 
                   class="form-control" 
                   name="ownForename" 
                   v-model="ownForename" 
                   placeholder="John" 
                   required>
          </div>
        </div>
        <div class="form-group row">
          <label for="ownSurname" 
                 class="col-sm-2 control-label">
            Your Surname
          </label>
          <div class="col-sm-10">
            <input type="text" 
                   class="form-control" 
                   v-model="ownSurname" 
                   name="ownSurname" 
                   placeholder="Smith" 
                   required>
          </div>
        </div>
        <div class="form-group row">
          <label for="ownDob" 
                 class="col-sm-2 control-label">
            Your Date of Birth
          </label>
          <div class="col-sm-10">
            <input type="date" 
                   class="form-control" 
                   v-model="ownDob" 
                   name="ownDob" 
                   placeholder="dd/mm/yyyy" 
                   required>
          </div>
        </div>
      </div>
    </div>
  `,
  computed: {
    ownTitle: {
      get() {
        return this.$store.state.family[0].title
      },
      set(value) {
        this.$store.commit('update', {
          attribute: 'title',
          value
        })
      }
    },
    ownForename: {
      get() {
        return this.$store.state.family[0].forename
      },
      set(value) {
        this.$store.commit('update', {
          attribute: 'forename',
          value
        })
      }
    },
    ownSurname: {
      get() {
        return this.$store.state.family[0].surname
      },
      set(value) {
        this.$store.commit('update', {
          attribute: 'surname',
          value
        })
      }
    },
    ownDob: {
      get() {
        return this.$store.state.family[0].dob
      },
      set(value) {
        this.$store.commit('update', {
          attribute: 'dob',
          value
        })
      }
    }
  }
});
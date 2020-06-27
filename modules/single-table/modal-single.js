export const ModalSingle = Vue.component('modal-single', {
  template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <form class="modal-content"
                  v-on:submit.prevent="onSubmit">
              <div class="modal-header">
                <h5 class="modal-title">
                  {{title}}
                </h5>
              </div>
              <div class="modal-body" v-if="type === 'eye'">
                <div class="checkbox">
                  <label>
                    <input type="checkbox"
                           v-model="eyeDisabled">
                    <span>{{memberForDisplay}} has eyes</span>
                  </label>
                </div>
                <div class="form-group">
                  <label for="eye" 
                         class="control-label">
                    What colour are their eyes?
                  </label>
                  <select class="form-control" 
                          name="eye"
                          required
                          v-model="eye"
                          v-bind:disabled="!eyeDisabled">
                    <option value="null">Please Choose</option>
                    <option value="brown">Brown</option>
                    <option value="hazel">Hazel</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="silver">Silver</option>
                    <option value="amber">Amber</option>
                  </select>
                </div>
              </div>
              <div class="modal-body" v-if="type === 'hair'">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" 
                           v-model="hairDisabled">
                    <span>{{memberForDisplay}} has hair</span>
                  </label>
                </div>
                <div class="form-group">
                  <label for="hair" 
                         class="control-label">
                    What colour are is their hair?
                  </label>
                  <select class="form-control" 
                          name="hair"
                          required
                          v-model="hair"
                          v-bind:disabled="!hairDisabled">
                    <option value="null">Please Choose</option>
                    <option value="black">Black</option>
                    <option value="brown">Brown</option>
                    <option value="blond">Blond</option>
                    <option value="auburn">Auburn</option>
                    <option value="chestnut">Chestnut</option>
                    <option value="red">Red</option>
                    <option value="grey">Grey</option>
                    <option value="white">White</option>
                  </select>
                </div>
              </div>
              <div class="modal-body" v-if="type === 'hand'">
                <div class="form-group">
                  <label for="hand" 
                         class="control-label">
                    What is their handedness?
                  </label>
                  <select class="form-control" 
                          name="handedness"
                          required
                          v-model="hand">
                    <option value="null">Please Choose</option>
                    <option value="right-handed">Right-handed</option>
                    <option value="left-handed">Left-handed</option>
                    <option value="mixed-handed">Mixed-handed</option>
                    <option value="ambidextrous">Ambidextrous</option>
                    <option value="ambilevous">Ambilevous</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" 
                        class="btn btn-primary">{{button}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  `,
  props: {
    type: {
      type: String,
      required: true
    },
    mem: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data() {
    return {
      eyeDisabled: true,
      hairDisabled: true
    }
  },
  computed: {
    eye: {
      get () {
        return this.$store.state.family[this.mem].single.eye
      },
      set (value) {
        this.$store.commit('updateValue', {
          index: this.mem,
          type: 'single',
          attribute:'eye', 
          value
        })
      }
    },
    hair: {
      get () {
        return this.$store.state.family[this.mem].single.hair
      },
      set (value) {
        this.$store.commit('updateValue', {
          index: this.mem,
          type: 'single',
          attribute:'hair', 
          value
        })
      }
    },
    hand: {
      get () {
        return this.$store.state.family[this.mem].single.hand
      },
      set (value) {
        this.$store.commit('updateValue', {
          index: this.mem,
          type: 'single',
          attribute:'hand', 
          value
        })
      }
    },
    title() {
      const str = `Please tell us about ${this.memberForDisplay}'s `
      return str + (this.type === "eye"
        ? "eyes"
        : this.type === "hair"
          ? "hair"
          : "handedess")
    },
    button() {
      const str = this.mem === -1 ? "Add " : "Update "
      return str + (this.type === "eye"
        ? "Eye Colour"
        : this.type === "hair"
          ? "Hair Colour"
          : "Handedness")
    },
    memberForDisplay() {
      const m = this.$store.getters.getMemberByIndex(this.mem);
      return `${m.title} ${m.forename} ${m.surname}`
    }
  },
  watch: {
    eyeDisabled(val){
      if(!val){
        this.nullAttribute(this.mem, 'eye')
      }
    },
    hairDisabled(val){
      if(!val){
        this.nullAttribute(this.mem, 'hair')
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    onSubmit() {
      this.closeModal();
    },
    nullAttribute(index, attribute) {
      this.$store.commit('updateValue', {
        index,
        type: 'single',
        attribute,
        value: null
      });
    }
  },
  mounted: function () {
    this.eyeDisabled = this.eye !== null
    this.hairDisabled = this.hair !== null
  }
});
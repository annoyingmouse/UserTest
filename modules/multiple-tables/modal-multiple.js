export const ModalMultiple = Vue.component('modal-multiple', {
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
                <button type="button" 
                        class="close" 
                        v-on:click="closeModal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="name" 
                         class="control-label">
                    Please choose a family member
                  </label>
                  <select class="form-control" 
                          name="name"
                          required="true"
                          v-model="member"
                          v-bind:disabled="mem !== -1">
                    <option value="-1" disabled>Please Choose</option>
                    <option v-for="(member, index) in family" 
                            v-bind:key="index"
                            v-bind:value="index"
                            v-bind:disabled="member.disabled">
                      {{member.title}} 
                      {{member.forename}} 
                      {{member.surname}}
                    </option>
                  </select>
                </div>
                <div class="form-group" v-if="type === 'eye'">
                  <label for="eyeColour" 
                         class="control-label">
                    What colour are their eyes?
                  </label>
                  <select class="form-control" 
                          name="eyeColour"
                          required
                          v-bind:disabled="member < 0"
                          v-model="eyeColour">
                    <option value="-1" selected disabled>Please Choose</option>
                    <option value="brown">Brown</option>
                    <option value="hazel">Hazel</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="silver">Silver</option>
                    <option value="amber">Amber</option>
                  </select>
                </div>
                <div class="form-group" v-if="type === 'hair'">
                  <label for="hairColour" 
                         class="control-label">
                    What colour are is their hair?
                  </label>
                  <select class="form-control" 
                          name="hairColour"
                          required
                          v-bind:disabled="member < 0"
                          v-model="hairColour">
                    <option value="-1" selected disabled>Please Choose</option>
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
                <div class="form-group" v-if="type === 'hand'">
                  <label for="handedness" 
                         class="control-label">
                    What is their handedness?
                  </label>
                  <select class="form-control" 
                          name="handedness"
                          required
                          v-bind:disabled="member < 0"
                          v-model="handedness">
                    <option value="-1" selected disabled>Please Choose</option>
                    <option value="right-handed">Right-handed</option>
                    <option value="left-handed">Left-handed</option>
                    <option value="mixed-handed">Mixed-handed</option>
                    <option value="ambidextrous">Ambidextrous</option>
                    <option value="ambilevous">Ambilevous</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" 
                        class="btn btn-secondary" 
                        v-on:click="closeModal">
                  Close
                </button>
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
    family: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    mem: {
      type: Number,
      required: false,
      default: -1
    },
    eye: {
      required: false,
      default: -1
    },
    hair: {
      required: false,
      default: -1
    },
    hand: {
      required: false,
      default: -1
    }
  },
  data() {
    return {
      member: this.mem,
      eyeColour: this.eye,
      hairColour: this.eye,
      handedness: this.hand
    }
  },
  computed: {
    title() {
      return this.type === "eye"
        ? "Please tell us about eyes"
        : this.type === "hair"
          ? "Please tell us about hair"
          : "Please tell us about handedess"
    },
    button() {
      const str = this.mem === -1 ? "Add " : "Update "
      return str + (this.type === "eye"
        ? "Eye Colour"
        : this.type === "hair"
          ? "Hair Colour"
          : "Handedness")

    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    onSubmit() {
      this.$store.commit('updateValue', {
        index: this.member,
        type: 'multiple',
        attribute: this.type,
        value: this.type === 'eye'
          ? this.eyeColour
          : this.type === 'hair'
            ? this.hairColour
            : this.handedness,

      });
      this.member = -1;
      this.eyeColour = -1;
      this.hairColour = -1;
      this.handedness = -1;
      this.closeModal();
    }
  }
});
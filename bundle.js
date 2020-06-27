"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  'use strict';

  Vue.use(Vuex);
  var store = new Vuex.Store({
    state: {
      family: [{
        title: null,
        forename: null,
        surname: null,
        dob: null,
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
      }]
    },
    mutations: {
      initialiseStore: function initialiseStore(state) {
        if (localStorage.getItem('store')) {
          this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
        }
      },
      update: function update(state, _ref) {
        var attribute = _ref.attribute,
            value = _ref.value;
        state.family[0][attribute] = value;
      },
      addMember: function addMember(state, member) {
        state.family.push(member);
      },
      removeMember: function removeMember(state, index) {
        state.family.splice(index, 1);
      },
      updateMember: function updateMember(state, _ref2) {
        var index = _ref2.index,
            member = _ref2.member;
        state.family.splice(index, 1, member);
      },
      updateValue: function updateValue(state, _ref3) {
        var index = _ref3.index,
            type = _ref3.type,
            attribute = _ref3.attribute,
            value = _ref3.value;
        state.family[index][type][attribute] = value;
      }
    },
    getters: {
      currentView: function currentView(state) {
        return state.currentView;
      },
      getMemberByIndex: function getMemberByIndex(state) {
        return function (i) {
          return state.family[i];
        };
      }
    }
  });
  store.subscribe(function (mutation, state) {
    localStorage.setItem('store', JSON.stringify(state));
  });
  var PageHeader = {
    template: "\n    <div class=\"page-header\">\n      <h1>Thank you \n        <small>for taking part in this test.</small>\n      </h1>\n      <p>We're doing some testing on how easy it is for our users to input the members of a family and their details so we'd be grateful if you could imagine you are Dr. 08 08 with a <abbr title=\"Date of Birth\">DOB</abbr> of 08/08/0808 (you're looking perfect for your age). Further, your family is like this:</p>\n      <ul>\n        <li>Your partner is Dr. 09 09, who was born on 09/09/0909.</li>\n        <li>One child is Dr. 10 10 who was born on 10/10/1010 (they are not in the least bit lucky - more will be revealed).</li>\n        <li>The other child is Dr. 11 11 who was born on (you've guessed it, haven't you?) 11/11/1111.</li>\n      </ul>\n      <p>Please use the two boxes below to enter details about you and your family then, when you're happy with the details you've provided, use the buttons at the bottom with the titles of <strong>Add Details</strong> to tell us more about you and your family. One uses one table to enter the data (<strong>Add Details - TABLE</strong>); the other uses multiple tables (<strong>Add Details - TABLES</strong>). We don't have a preference for either as they both involve pretty much the same work, but we're interested in which is the easiest and most pleasant to use.</p>\n    </div>\n  "
  };
  var AboutYou = Vue.component('about-you', {
    template: "\n    <div class=\"card mb-3\">\n      <div class=\"card-header\">About you</div>\n      <div class=\"card-body\">\n        <div class=\"form-group row\">\n          <label for=\"ownTitle\" \n                 class=\"col-sm-2 control-label\">\n            Your Title\n          </label>\n          <div class=\"col-sm-10\">\n            <select class=\"form-control\" \n                    name=\"ownTitle\" \n                    v-model=\"ownTitle\" \n                    required>\n              <option value=\"null\">Please Choose</option>\n              <option value=\"Dr.\">Dr.</option>\n              <option value=\"Mr.\">Mr.</option>\n              <option value=\"Mrs.\">Mrs.</option>\n              <option value=\"Miss.\">Miss.</option>\n              <option value=\"Ms.\">Ms.</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-group row\">\n          <label for=\"ownForename\" \n                 class=\"col-sm-2 control-label\">\n            Your Forename\n          </label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" \n                   class=\"form-control\" \n                   name=\"ownForename\" \n                   v-model=\"ownForename\" \n                   placeholder=\"John\" \n                   required>\n          </div>\n        </div>\n        <div class=\"form-group row\">\n          <label for=\"ownSurname\" \n                 class=\"col-sm-2 control-label\">\n            Your Surname\n          </label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" \n                   class=\"form-control\" \n                   v-model=\"ownSurname\" \n                   name=\"ownSurname\" \n                   placeholder=\"Smith\" \n                   required>\n          </div>\n        </div>\n        <div class=\"form-group row\">\n          <label for=\"ownDob\" \n                 class=\"col-sm-2 control-label\">\n            Your Date of Birth\n          </label>\n          <div class=\"col-sm-10\">\n            <input type=\"date\" \n                   class=\"form-control\" \n                   v-model=\"ownDob\" \n                   name=\"ownDob\" \n                   placeholder=\"dd/mm/yyyy\" \n                   required>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
    computed: {
      ownTitle: {
        get: function get() {
          return this.$store.state.family[0].title;
        },
        set: function set(value) {
          this.$store.commit('update', {
            attribute: 'title',
            value: value
          });
        }
      },
      ownForename: {
        get: function get() {
          return this.$store.state.family[0].forename;
        },
        set: function set(value) {
          this.$store.commit('update', {
            attribute: 'forename',
            value: value
          });
        }
      },
      ownSurname: {
        get: function get() {
          return this.$store.state.family[0].surname;
        },
        set: function set(value) {
          this.$store.commit('update', {
            attribute: 'surname',
            value: value
          });
        }
      },
      ownDob: {
        get: function get() {
          return this.$store.state.family[0].dob;
        },
        set: function set(value) {
          this.$store.commit('update', {
            attribute: 'dob',
            value: value
          });
        }
      }
    }
  });
  var AddMember = Vue.component('add-member', {
    template: "\n    <transition name=\"modal\">\n      <div class=\"modal-mask\">\n        <div class=\"modal-wrapper\">\n          <div class=\"modal-dialog\">\n            <form class=\"modal-content\"\n                  v-on:submit.prevent=\"onSubmit\">\n              <input type=\"hidden\"\n                     v-model=\"user.index\"/>\n              <div class=\"modal-header\">       \n                <h5 class=\"modal-title\">\n                  Please tell us about the family member\n                </h5>\n                <button type=\"button\" \n                        class=\"close\"\n                        aria-label=\"Close\" \n                        v-on:click=\"closeModal\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>                  \n              </div>\n              <div class=\"modal-body\">\n                <div class=\"form-group\">\n                  <label for=\"title\" \n                         class=\"control-label\">\n                    Their Title\n                  </label>\n                  <select class=\"form-control\" \n                          name=\"title\" \n                          v-model=\"user.title\"\n                          required>\n                    <option value=\"\">Please Choose</option>\n                    <option value=\"Dr.\">Dr.</option>\n                    <option value=\"Mr.\">Mr.</option>\n                    <option value=\"Mrs.\">Mrs.</option>\n                    <option value=\"Miss.\">Miss.</option>\n                    <option value=\"Ms.\">Ms.</option>\n                  </select>\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"forename\" \n                         class=\"control-label\">\n                    Their Forename\n                  </label>\n                  <input type=\"text\" \n                         class=\"form-control\" \n                         name=\"forename\" \n                         placeholder=\"Jane\" \n                         required \n                         v-model=\"user.forename\">\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"surname\" \n                         class=\"control-label\">\n                    Their Surname\n                  </label>\n                  <input type=\"text\" \n                         class=\"form-control\" \n                         name=\"surname\" \n                         placeholder=\"Smith\" \n                         required \n                         v-model=\"user.surname\">\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"dob\" \n                         class=\"control-label\">\n                    Their Date of Birth\n                  </label>\n                  <input type=\"date\" \n                         class=\"form-control\" \n                         name=\"dob\" \n                         placeholder=\"dd/mm/yyyy\" \n                         required \n                         v-model=\"user.dob\">\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <button v-on:click=\"closeModal\" \n                        type=\"button\" \n                        class=\"btn btn-secondary\">\n                  Close\n                </button>\n                <button type=\"submit\"\n                        class=\"btn btn-primary\">\n                  {{buttonText}}\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </transition>\n  ",
    props: {
      member: {
        type: Object,
        required: true
      }
    },
    computed: {
      buttonText: function buttonText() {
        return this.member.index === null ? 'Add Family Member' : 'Update Family Member';
      }
    },
    methods: {
      closeModal: function closeModal() {
        this.$emit('close-modal');
      },
      onSubmit: function onSubmit() {
        var member = {
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
        };

        if (this.member.index === null) {
          this.$store.commit('addMember', member);
        } else {
          var index = this.user.index;
          this.$store.commit('updateMember', {
            index: index,
            member: member
          });
        }

        this.closeModal();
      }
    },
    data: function data() {
      return {
        user: _objectSpread({}, this.member)
      };
    }
  });
  var Home = Vue.component('home', {
    template: "\n    <div>\n      <page-header></page-header>\n      <form class=\"form-horizontal\" \n            id=\"familyForm\"\n            v-on:submit.prevent=\"onPageChange\">\n        <about-you></about-you>\n        <div class=\"card mb-3\">\n          <div class=\"card-header\">\n            About your family\n          </div>\n          <div class=\"card-body\">\n            <table class=\"table table-bordered table-striped table-condensed\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Name</th>\n                  <th scope=\"col\">Date of Birth</th>\n                  <th scope=\"col\" class=\"fifth\">Action</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr v-for=\"(member, index) in family\" \n                    v-bind:key=\"index\"\n                    v-if=\"index\">\n                  <td>{{member.title}} {{member.forename}} {{member.surname}}</td>\n                  <td>{{new Date(member.dob).toLocaleDateString('en-GB')}}</td>\n                  <td class=\"fifth\">\n                    <div class=\"pull-right btn-group btn-group-sm\" \n                         role=\"group\">\n                      <button type=\"button\" \n                              class=\"btn btn-danger\"\n                              v-on:click=\"removeMember(index)\">\n                        <i class=\"fa fa-trash\" title=\"Remove\"></i> \n                        Remove\n                      </button>\n                      <button type=\"button\" \n                              class=\"btn btn-primary\"\n                              v-on:click=\"updateMember(index)\">\n                        <i class=\"fa fa-edit\" title=\"Edit\"></i>\n                        Edit\n                      </button>\n                    </div>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <button class=\"btn btn-primary btn-lg btn-block\" \n                    type=\"button\"\n                    v-on:click=\"showModal = true\">\n                Add Family Member\n            </button>\n          </div>\n        </div>\n        <div class=\"card bg-light mb-3\">\n          <div class=\"card-body\">\n            <p>There are two buttons below, they both allow you to enter further, detailed, information about your family. It'd be great if you could try both ways and get back to us about which you prefer, and perhaps why you prefer one over the other. Please be aware that we don't have a preference; we're merely trying to find the best way for people to enter data.</p>\n          </div>\n        </div>\n        <div class=\"d-flex justify-content-between mb-4\">\n          <button type=\"submit\" \n                  class=\"btn btn-primary float-left\" \n                  v-on:click=\"submitForm('tables')\">\n            Add Details - TABLES\n          </button>\n          <button type=\"submit\" \n                  class=\"btn btn-primary float-right\" \n                  v-on:click=\"submitForm('table')\">\n            Add Details - TABLE\n          </button>\n        </div>\n      </form> \n      <add-member v-if=\"showModal\"\n                  v-bind:member=\"member\"\n                  v-on:close-modal=\"closeModal\"></add-member>\n    </div>\n  ",
    methods: {
      submitForm: function submitForm(page) {
        if (this.validateForm()) {
          this.$router.push({
            name: page
          });
        }
      },
      validateForm: function validateForm() {
        var formId = 'familyForm';
        var nodes = document.querySelectorAll("#".concat(formId, " :invalid"));

        if (nodes.length > 0) {
          return false;
        } else {
          return true;
        }
      },
      closeModal: function closeModal() {
        this.showModal = false;
        this.member = {
          index: null,
          title: '',
          forename: '',
          surname: '',
          dob: ''
        };
      },
      removeMember: function removeMember(index) {
        this.$store.commit('removeMember', index);
      },
      updateMember: function updateMember(index) {
        this.member = _objectSpread({}, this.family[index]);
        this.member.index = index;
        this.showModal = true;
      },
      onPageChange: function onPageChange() {
        this.$store.commit('changeView', this.target);
      }
    },
    computed: Vuex.mapState(['family']),
    components: {
      PageHeader: PageHeader
    },
    data: function data() {
      return {
        member: {
          index: null,
          title: '',
          forename: '',
          surname: '',
          dob: ''
        },
        showModal: false
      };
    }
  });
  var ModalSingle = Vue.component('modal-single', {
    template: "\n    <transition name=\"modal\">\n      <div class=\"modal-mask\">\n        <div class=\"modal-wrapper\">\n          <div class=\"modal-dialog\" role=\"document\">\n            <form class=\"modal-content\"\n                  v-on:submit.prevent=\"onSubmit\">\n              <div class=\"modal-header\">\n                <h5 class=\"modal-title\">\n                  {{title}}\n                </h5>\n              </div>\n              <div class=\"modal-body\" v-if=\"type === 'eye'\">\n                <div class=\"checkbox\">\n                  <label>\n                    <input type=\"checkbox\"\n                           v-model=\"eyeDisabled\">\n                    <span>{{memberForDisplay}} has eyes</span>\n                  </label>\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"eye\" \n                         class=\"control-label\">\n                    What colour are their eyes?\n                  </label>\n                  <select class=\"form-control\" \n                          name=\"eye\"\n                          required\n                          v-model=\"eye\"\n                          v-bind:disabled=\"!eyeDisabled\">\n                    <option value=\"null\">Please Choose</option>\n                    <option value=\"brown\">Brown</option>\n                    <option value=\"hazel\">Hazel</option>\n                    <option value=\"blue\">Blue</option>\n                    <option value=\"green\">Green</option>\n                    <option value=\"silver\">Silver</option>\n                    <option value=\"amber\">Amber</option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"modal-body\" v-if=\"type === 'hair'\">\n                <div class=\"checkbox\">\n                  <label>\n                    <input type=\"checkbox\" \n                           v-model=\"hairDisabled\">\n                    <span>{{memberForDisplay}} has hair</span>\n                  </label>\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"hair\" \n                         class=\"control-label\">\n                    What colour are is their hair?\n                  </label>\n                  <select class=\"form-control\" \n                          name=\"hair\"\n                          required\n                          v-model=\"hair\"\n                          v-bind:disabled=\"!hairDisabled\">\n                    <option value=\"null\">Please Choose</option>\n                    <option value=\"black\">Black</option>\n                    <option value=\"brown\">Brown</option>\n                    <option value=\"blond\">Blond</option>\n                    <option value=\"auburn\">Auburn</option>\n                    <option value=\"chestnut\">Chestnut</option>\n                    <option value=\"red\">Red</option>\n                    <option value=\"grey\">Grey</option>\n                    <option value=\"white\">White</option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"modal-body\" v-if=\"type === 'hand'\">\n                <div class=\"form-group\">\n                  <label for=\"hand\" \n                         class=\"control-label\">\n                    What is their handedness?\n                  </label>\n                  <select class=\"form-control\" \n                          name=\"handedness\"\n                          required\n                          v-model=\"hand\">\n                    <option value=\"null\">Please Choose</option>\n                    <option value=\"right-handed\">Right-handed</option>\n                    <option value=\"left-handed\">Left-handed</option>\n                    <option value=\"mixed-handed\">Mixed-handed</option>\n                    <option value=\"ambidextrous\">Ambidextrous</option>\n                    <option value=\"ambilevous\">Ambilevous</option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"submit\" \n                        class=\"btn btn-primary\">{{button}}</button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </transition>\n  ",
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
    data: function data() {
      return {
        eyeDisabled: true,
        hairDisabled: true
      };
    },
    computed: {
      eye: {
        get: function get() {
          return this.$store.state.family[this.mem].single.eye;
        },
        set: function set(value) {
          this.$store.commit('updateValue', {
            index: this.mem,
            type: 'single',
            attribute: 'eye',
            value: value
          });
        }
      },
      hair: {
        get: function get() {
          return this.$store.state.family[this.mem].single.hair;
        },
        set: function set(value) {
          this.$store.commit('updateValue', {
            index: this.mem,
            type: 'single',
            attribute: 'hair',
            value: value
          });
        }
      },
      hand: {
        get: function get() {
          return this.$store.state.family[this.mem].single.hand;
        },
        set: function set(value) {
          this.$store.commit('updateValue', {
            index: this.mem,
            type: 'single',
            attribute: 'hand',
            value: value
          });
        }
      },
      title: function title() {
        var str = "Please tell us about ".concat(this.memberForDisplay, "'s ");
        return str + (this.type === "eye" ? "eyes" : this.type === "hair" ? "hair" : "handedess");
      },
      button: function button() {
        var str = this.mem === -1 ? "Add " : "Update ";
        return str + (this.type === "eye" ? "Eye Colour" : this.type === "hair" ? "Hair Colour" : "Handedness");
      },
      memberForDisplay: function memberForDisplay() {
        var m = this.$store.getters.getMemberByIndex(this.mem);
        return "".concat(m.title, " ").concat(m.forename, " ").concat(m.surname);
      }
    },
    watch: {
      eyeDisabled: function eyeDisabled(val) {
        if (!val) {
          this.nullAttribute(this.mem, 'eye');
        }
      },
      hairDisabled: function hairDisabled(val) {
        if (!val) {
          this.nullAttribute(this.mem, 'hair');
        }
      }
    },
    methods: {
      closeModal: function closeModal() {
        this.$emit('close-modal');
      },
      onSubmit: function onSubmit() {
        this.closeModal();
      },
      nullAttribute: function nullAttribute(index, attribute) {
        this.$store.commit('updateValue', {
          index: index,
          type: 'single',
          attribute: attribute,
          value: null
        });
      }
    },
    mounted: function mounted() {
      this.eyeDisabled = this.eye !== null;
      this.hairDisabled = this.hair !== null;
    }
  });
  var SingleTable = Vue.component('single-table', {
    template: "\n    <div>\n      <div class=\"page-header\">\n        <h1>Thank you again <small>for taking part in this test, you're very nearly done.</small></h1>\n        <p>If you can see a table below with four people in it (Doctors 08 08 (08/08/0808), 09 09 (09/09/0909), 10 10 (10/10/1010) and 11 11 (11/11/1111)), then you're ready to go. We'd like you to add some details to the family. You (as Dr 08 08) have brown hair, brown eyes and you're left-handed. The rest of your family has these details:</p>\n        <ul>\n          <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I'm not sure I'd trust them <abbr title=\"To Be Honest\">TBH</abbr>).</li>\n          <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>\n          <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>\n        </ul>\n        <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you've already entered the data there, then get back to us, we'd be grateful. I'll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>\n        <p>We appreciate that the scenario is contrived, but it's just a made-up use case, and no data you enter is saved to a server, it's all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>\n      </div>\n      <table class=\"table table-bordered table-striped table-condensed\">\n        <thead>\n          <tr>\n            <th scope=\"col\">Name</th>\n            <th scope=\"col\" class=\"quarter\">Eye Colour</th>\n            <th scope=\"col\" class=\"quarter\">Hair Colour</th>\n            <th scope=\"col\" class=\"quarter\">Handedness</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for=\"(member, index) in family\" \n              v-bind:key=\"index\">\n            <td>{{member.title}} {{member.forename}} {{member.surname}}</td>\n            <td class=\"quarter\">\n              <button class=\"btn btn-primary\"\n                      v-if=\"member.single.eye === null\"\n                      v-on:click=\"openModal('eye', index)\">\n                Add Eye Colour\n              </button>\n              <template v-if=\"member.single.eye !== null\">\n                <strong class=\"pr-2\">\n                  {{capitalise(member.single.eye)}}\n                </strong>\n                <button class=\"btn btn-info\"\n                        v-on:click=\"openModal('eye', index)\">\n                  <i class=\"fa fa-edit\" title=\"Edit\"></i>\n                  Edit Eye Colour\n                </button>\n              </template>\n            </td>\n            <td class=\"quarter\">\n              <button class=\"btn btn-primary\"\n                      v-if=\"member.single.hair === null\"\n                      v-on:click=\"openModal('hair', index)\">\n                Add Hair Colour\n              </button>\n              <template v-if=\"member.single.hair !== null\">\n                <strong class=\"pr-2\">\n                  {{capitalise(member.single.hair)}}\n                </strong>\n                <button class=\"btn btn-info\"\n                        v-on:click=\"openModal('hair', index)\">\n                  <i class=\"fa fa-edit\" title=\"Edit\"></i>\n                  Edit Hair Colour\n                </button>\n              </template>\n            </td>\n            <td class=\"quarter\">\n              <button class=\"btn btn-primary\"\n                      v-if=\"member.single.hand === null\"\n                      v-on:click=\"openModal('hand', index)\">\n                Add Handedness\n              </button>\n              <template v-if=\"member.single.hand !== null\">\n                <strong class=\"pr-2\">\n                  {{capitalise(member.single.hand)}}\n                </strong>\n                <button class=\"btn btn-info\"\n                        v-on:click=\"openModal('hand', index)\">\n                  <i class=\"fa fa-edit\" title=\"Edit\"></i>\n                  Edit Handedness\n                </button>\n              </template>\n            </td>\n          </tr> \n        </tbody>\n      </table>\n\t\t  <hr/>\n\t\t\t<button class=\"btn btn-primary btn-lg btn-block\"\n              v-on:click=\"$router.push({name: 'home'})\">\n        Go Back\n      </button>\n      <modal-single v-if=\"showModal\"\n                    v-on:close-modal=\"closeModal\"\n                    v-bind:type=\"modalType\"\n                    v-bind:mem=\"selectedMember\"></modal-single>\n    </div>\n  ",
    data: function data() {
      return {
        showModal: false,
        modalType: null
      };
    },
    computed: Vuex.mapState(['family']),
    methods: {
      capitalise: function capitalise(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      closeModal: function closeModal() {
        this.showModal = false;
      },
      openModal: function openModal(attribute, index) {
        this.modalType = attribute;
        this[attribute] = this.family[index].single[attribute];
        this.selectedMember = index;
        this.showModal = true;
      }
    }
  });
  var ModalMultiple = Vue.component('modal-multiple', {
    template: "\n    <transition name=\"modal\">\n      <div class=\"modal-mask\">\n        <div class=\"modal-wrapper\">\n          <div class=\"modal-dialog\" role=\"document\">\n            <form class=\"modal-content\"\n                  v-on:submit.prevent=\"onSubmit\">\n              <div class=\"modal-header\">\n                <h5 class=\"modal-title\">\n                  {{title}}\n                </h5>\n                <button type=\"button\" \n                        class=\"close\" \n                        v-on:click=\"closeModal\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>\n              <div class=\"modal-body\">\n                <div class=\"form-group\">\n                  <label for=\"name\" \n                         class=\"control-label\">\n                    Please choose a family member\n                  </label>\n                  <select class=\"form-control\" \n                          name=\"name\"\n                          required=\"true\"\n                          v-model=\"member\"\n                          v-bind:disabled=\"mem !== -1\">\n                    <option value=\"-1\" disabled>Please Choose</option>\n                    <option v-for=\"(member, index) in family\" \n                            v-bind:key=\"index\"\n                            v-bind:value=\"index\"\n                            v-bind:disabled=\"member.disabled\">\n                      {{member.title}} \n                      {{member.forename}} \n                      {{member.surname}}\n                    </option>\n                  </select>\n                </div>\n                <div class=\"form-group\" v-if=\"type === 'eye'\">\n                  <label for=\"eyeColour\" \n                         class=\"control-label\">\n                    What colour are their eyes?\n                  </label>\n                  <select class=\"form-control\" \n                          name=\"eyeColour\"\n                          required\n                          v-bind:disabled=\"member < 0\"\n                          v-model=\"eyeColour\">\n                    <option value=\"-1\" selected disabled>Please Choose</option>\n                    <option value=\"brown\">Brown</option>\n                    <option value=\"hazel\">Hazel</option>\n                    <option value=\"blue\">Blue</option>\n                    <option value=\"green\">Green</option>\n                    <option value=\"silver\">Silver</option>\n                    <option value=\"amber\">Amber</option>\n                  </select>\n                </div>\n                <div class=\"form-group\" v-if=\"type === 'hair'\">\n                  <label for=\"hairColour\" \n                         class=\"control-label\">\n                    What colour are is their hair?\n                  </label>\n                  <select class=\"form-control\" \n                          name=\"hairColour\"\n                          required\n                          v-bind:disabled=\"member < 0\"\n                          v-model=\"hairColour\">\n                    <option value=\"-1\" selected disabled>Please Choose</option>\n                    <option value=\"black\">Black</option>\n                    <option value=\"brown\">Brown</option>\n                    <option value=\"blond\">Blond</option>\n                    <option value=\"auburn\">Auburn</option>\n                    <option value=\"chestnut\">Chestnut</option>\n                    <option value=\"red\">Red</option>\n                    <option value=\"grey\">Grey</option>\n                    <option value=\"white\">White</option>\n                  </select>\n                </div>\n                <div class=\"form-group\" v-if=\"type === 'hand'\">\n                  <label for=\"handedness\" \n                         class=\"control-label\">\n                    What is their handedness?\n                  </label>\n                  <select class=\"form-control\" \n                          name=\"handedness\"\n                          required\n                          v-bind:disabled=\"member < 0\"\n                          v-model=\"handedness\">\n                    <option value=\"-1\" selected disabled>Please Choose</option>\n                    <option value=\"right-handed\">Right-handed</option>\n                    <option value=\"left-handed\">Left-handed</option>\n                    <option value=\"mixed-handed\">Mixed-handed</option>\n                    <option value=\"ambidextrous\">Ambidextrous</option>\n                    <option value=\"ambilevous\">Ambilevous</option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" \n                        class=\"btn btn-secondary\" \n                        v-on:click=\"closeModal\">\n                  Close\n                </button>\n                <button type=\"submit\" \n                        class=\"btn btn-primary\">{{button}}</button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </transition>\n  ",
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
    data: function data() {
      return {
        member: this.mem,
        eyeColour: this.eye,
        hairColour: this.eye,
        handedness: this.hand
      };
    },
    computed: {
      title: function title() {
        return this.type === "eye" ? "Please tell us about eyes" : this.type === "hair" ? "Please tell us about hair" : "Please tell us about handedess";
      },
      button: function button() {
        var str = this.mem === -1 ? "Add " : "Update ";
        return str + (this.type === "eye" ? "Eye Colour" : this.type === "hair" ? "Hair Colour" : "Handedness");
      }
    },
    methods: {
      closeModal: function closeModal() {
        this.$emit('close-modal');
      },
      onSubmit: function onSubmit() {
        this.$store.commit('updateValue', {
          index: this.member,
          type: 'multiple',
          attribute: this.type,
          value: this.type === 'eye' ? this.eyeColour : this.type === 'hair' ? this.hairColour : this.handedness
        });
        this.member = -1;
        this.eyeColour = -1;
        this.hairColour = -1;
        this.handedness = -1;
        this.closeModal();
      }
    }
  });
  var MultipleTable = Vue.component('multiple-table', {
    template: "\n    <div>\n      <div class=\"page-header\">\n        <h1>Thank you again <small>for taking part in this test, you're very nearly done.</small></h1>\n        <p>If you can see three tables below, then you're ready to go. We'd like you to add some details to the family by clicking the buttons under each table. You (as Dr 08 08) have brown hair, brown eyes and you're left-handed. The rest of your family has these details:</p>\n        <ul>\n          <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I'm not sure I'd trust them <abbr title=\"To Be Honest\">TBH</abbr>).</li>\n          <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>\n          <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>\n        </ul>\n        <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you've already entered the data there, then get back to us, we'd be grateful. I'll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>\n        <p>We appreciate that the scenario is contrived, but it's just a made-up use case, and no data you enter is saved to a server, it's all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>\n      </div>\n      <div class=\"card mb-3\">\n        <div class=\"card-header\">About the eyes in your family</div>\n        <div class=\"card-body\">\n          <table class=\"table table-bordered table-striped table-condensed\">\n            <thead>\n              <tr>\n                <th scope=\"col\">Name</th>\n                <th scope=\"col\">Eye Colour</th>\n                <th scope=\"col\" class=\"fifth\">Action</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr v-for=\"(member, index) in family\" \n                  v-bind:key=\"index\"\n                  v-if=\"member.multiple.eye !== null\">\n                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>\n                <td>{{capitalise(member.multiple.eye)}}</td>\n                <td class=\"fifth\">\n                  <div class=\"pull-right btn-group btn-group-sm\" \n                       role=\"group\">\n                    <button type=\"button\" \n                            class=\"btn btn-danger\"\n                            v-on:click=\"nullAttribute(index, 'eye')\">\n                      <i class=\"fa fa-trash\" title=\"Remove\"></i> \n                      Remove\n                    </button>\n                    <button type=\"button\" \n                            class=\"btn btn-primary\"\n                            v-on:click=\"openModal('update', 'eye', index)\">\n                      <i class=\"fa fa-edit\" title=\"Edit\"></i>\n                      Edit\n                    </button>\n                  </div>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <button class=\"btn btn-primary btn-lg btn-block\" \n                  type=\"button\"\n                  v-on:click=\"openModal('add', 'eye')\">\n            Add Eye Details\n          </button>\n        </div>\n      </div>\n      <div class=\"card mb-3\">\n        <div class=\"card-header\">About the hair in your family</div>\n        <div class=\"card-body\">\n          <table class=\"table table-bordered table-striped table-condensed\">\n            <thead>\n              <tr>\n                <th scope=\"col\">Name</th>\n                <th scope=\"col\">Hair Colour</th>\n                <th scope=\"col\" class=\"fifth\">Action</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr v-for=\"(member, index) in family\" \n                  v-bind:key=\"index\"\n                  v-if=\"member.multiple.hair !== null\">\n                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>\n                <td> {{ capitalise(member.multiple.hair) }} </td>\n                <td class=\"fifth\">\n                  <div class=\"pull-right btn-group btn-group-sm\" \n                       role=\"group\">\n                    <button type=\"button\" \n                            class=\"btn btn-danger\"\n                            v-on:click=\"nullAttribute(index, 'hair')\">\n                      <i class=\"fa fa-trash\" title=\"Remove\"></i> \n                      Remove\n                    </button>\n                    <button type=\"button\" \n                            class=\"btn btn-primary\"\n                            v-on:click=\"openModal('update', 'hair', index)\">\n                      <i class=\"fa fa-edit\" title=\"Edit\"></i>\n                      Edit\n                    </button>\n                  </div>\n                </td>\n              </tr>            \n            </tbody>\n          </table>\n          <button class=\"btn btn-primary btn-lg btn-block\" \n                  type=\"button\"\n                  v-on:click=\"openModal('add', 'hair')\">\n            Add Hair Details\n          </button>\n        </div>\n      </div>\n      <div class=\"card mb-3\">\n        <div class=\"card-header\">About the handedness in your family</div>\n        <div class=\"card-body\">\n          <table class=\"table table-bordered table-striped table-condensed\">\n            <thead>\n              <tr>\n                <th scope=\"col\">Name</th>\n                <th scope=\"col\">Handedness</th>\n                <th scope=\"col\" class=\"fifth\">Action</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr v-for=\"(member, index) in family\" \n                  v-bind:key=\"index\"\n                  v-if=\"member.multiple.hand !== null\">\n                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>\n                <td>{{capitalise(member.multiple.hand)}}</td>\n                <td class=\"fifth\">\n                  <div class=\"pull-right btn-group btn-group-sm\" \n                       role=\"group\">\n                    <button type=\"button\" \n                            class=\"btn btn-danger\"\n                            v-on:click=\"nullAttribute(index, 'hand')\">\n                      <i class=\"fa fa-trash\" title=\"Remove\"></i> \n                      Remove\n                    </button>\n                    <button type=\"button\" \n                            class=\"btn btn-primary\"\n                            v-on:click=\"openModal('update', 'hand', index)\">\n                      <i class=\"fa fa-edit\" title=\"Edit\"></i>\n                      Edit\n                    </button>\n                  </div>\n                </td>\n              </tr> \n            </tbody>          \n          </table>\n          <button class=\"btn btn-primary btn-lg btn-block\" \n                  type=\"button\"\n                  v-on:click=\"openModal('add', 'hand')\">\n            Add Handedness Details\n          </button>\n        </div>\n      </div>\n      <button class=\"btn btn-primary btn-lg btn-block\"\n              v-on:click=\"$router.push({name: 'home'})\">\n        Go Back\n      </button>\n      <modal-multiple v-if=\"showModal\"\n                      v-on:close-modal=\"closeModal\"\n                      v-bind:family=\"localFamily\"\n                      v-bind:type=\"modalType\"\n                      v-bind:eye=\"eye\"\n                      v-bind:hair=\"hair\"\n                      v-bind:hand=\"hand\"\n                      v-bind:mem=\"selectedMember\"></modal-multiple>                  \n    </div>\n  ",
    computed: Vuex.mapState(['family']),
    data: function data() {
      return {
        localFamily: null,
        selectedMember: -1,
        eye: -1,
        hair: -1,
        hand: -1,
        showModal: false,
        modalType: null
      };
    },
    methods: {
      capitalise: function capitalise(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      closeModal: function closeModal() {
        this.showModal = false;
        this.selectedMember = -1;
        this.eye = -1;
        this.hair = -1;
        this.hand = -1;
        this.localFamily = null;
      },
      openModal: function openModal(type, attribute, index) {
        this.modalType = attribute;

        if (type === 'add') {
          this.localFamily = _toConsumableArray(this.family);
          this.localFamily.forEach(function (element) {
            if (element.multiple[attribute] !== null) {
              element.disabled = true;
            } else {
              delete element.disabled;
            }
          });
          this.showModal = true;
        }

        if (type === 'update') {
          this.localFamily = _toConsumableArray(this.family);
          this.localFamily.forEach(function (element, i) {
            if (i !== index) {
              element.disabled = true;
            }
          });
          this[attribute] = this.family[index].multiple[attribute];
          this.selectedMember = index;
          this.showModal = true;
        }
      },
      nullAttribute: function nullAttribute(index, attribute) {
        this.$store.commit('updateValue', {
          index: index,
          type: 'multiple',
          attribute: attribute,
          value: null
        });
      }
    }
  });
  var router = new VueRouter({
    routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/single',
      name: 'table',
      component: SingleTable
    }, {
      path: '/multiple',
      name: 'tables',
      component: MultipleTable
    }]
  });
  /*
   * To configure for IE11
   * npm install -g rollup
   * rollup app.js --file bundle.js --format iife
   * paste bundle.js into the left-hand panel
   * babeljs.io/repl#?browsers=defaults
   * Copy over existing bundle.js with contents
   * of the right-hand panel.
   * Job done.
   */

  Vue.config.devtools = true;
  Vue.use(VueRouter);
  new Vue({
    el: '#app',
    store: store,
    router: router,
    beforeCreate: function beforeCreate() {
      this.$store.commit('initialiseStore');
    }
  });
})();
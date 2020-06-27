import PageHeader from './page-header.js';
import { AboutYou } from './about-you.js';
import { AddMember } from './add-member-modal.js';

export const Home = Vue.component('home', {
  template: `
    <div>
      <page-header></page-header>
      <form class="form-horizontal" 
            id="familyForm"
            v-on:submit.prevent="onPageChange">
        <about-you></about-you>
        <div class="card mb-3">
          <div class="card-header">
            About your family
          </div>
          <div class="card-body">
            <table class="table table-bordered table-striped table-condensed">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col" class="fifth">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in family" 
                    v-bind:key="index"
                    v-if="index">
                  <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                  <td>{{new Date(member.dob).toLocaleDateString('en-GB')}}</td>
                  <td class="fifth">
                    <div class="pull-right btn-group btn-group-sm" 
                         role="group">
                      <button type="button" 
                              class="btn btn-danger"
                              v-on:click="removeMember(index)">
                        <i class="fa fa-trash" title="Remove"></i> 
                        Remove
                      </button>
                      <button type="button" 
                              class="btn btn-primary"
                              v-on:click="updateMember(index)">
                        <i class="fa fa-edit" title="Edit"></i>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-primary btn-lg btn-block" 
                    type="button"
                    v-on:click="showModal = true">
                Add Family Member
            </button>
          </div>
        </div>
        <div class="card bg-light mb-3">
          <div class="card-body">
            <p>There are two buttons below, they both allow you to enter further, detailed, information about your family. It'd be great if you could try both ways and get back to us about which you prefer, and perhaps why you prefer one over the other. Please be aware that we don't have a preference; we're merely trying to find the best way for people to enter data.</p>
          </div>
        </div>
        <div class="d-flex justify-content-between mb-4">
          <button type="submit" 
                  class="btn btn-primary float-left" 
                  v-on:click="submitForm('tables')">
            Add Details - TABLES
          </button>
          <button type="submit" 
                  class="btn btn-primary float-right" 
                  v-on:click="submitForm('table')">
            Add Details - TABLE
          </button>
        </div>
      </form> 
      <add-member v-if="showModal"
                  v-bind:member="member"
                  v-on:close-modal="closeModal"></add-member>
    </div>
  `,
  methods: {
    submitForm(page) {
      if (this.validateForm()) {
        this.$router.push({name: page});
      }
    },
    validateForm () {
      var formId = 'familyForm';
      var nodes = document.querySelectorAll(`#${formId} :invalid`);
      if (nodes.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    closeModal() {
      this.showModal = false;
      this.member = {
        index: null,
        title: '',
        forename: '',
        surname: '',
        dob: ''
      }
    },
    removeMember(index) {
      this.$store.commit('removeMember', index)
    },
    updateMember(index) {
      this.member = { ...this.family[index] }
      this.member.index = index;
      this.showModal = true;
    },
    onPageChange() {
      this.$store.commit('changeView', this.target);
    }
  },
  computed: Vuex.mapState(['family']),
  components: {
    PageHeader
  },
  data() {
    return {
      member: {
        index: null,
        title: '',
        forename: '',
        surname: '',
        dob: ''
      },
      showModal: false
    }
  }
});
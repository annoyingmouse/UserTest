Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    family: [
      {
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
      }
    ]
  },
  mutations: {
    initialiseStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		},
    update(state, { attribute, value }) {
      state.family[0][attribute] = value;
    },
    addMember(state, member) {
      state.family.push(member);
    },
    removeMember(state, index) {
      state.family.splice(index, 1);
    },
    updateMember(state, { index, member }) {
      state.family.splice(index, 1, member);
    },
    updateValue(state, { index, type, attribute, value }) {
      state.family[index][type][attribute] = value
    }
  },
  getters: {
    currentView: state => state.currentView,
    getMemberByIndex: (state) => (i) => state.family[i]
  }
});

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
})
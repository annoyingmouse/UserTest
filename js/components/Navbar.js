let Navbar = {
  render: async () => {
    let view = /*html*/`
      <nav class="navbar sticky-top navbar-expand-lg navbar-dark primary-color mb-3">
        <a class="navbar-brand"
           href="#/">
          User Test
        </a>
        <button class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#basicExampleNav"
                aria-controls="basicExampleNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
        </div>
      </nav>
    `
    return view
  },
  after_render: async () => { }
}

export default Navbar;
<script>
  import Vue from 'vue';
  const Router = Vue.component('Router', {
    data() {
      let path = window.location.pathname;
      const last = path.length - 1;
      path = path !== '/' && path[last] === '/' ? path.slice(0,last) : path
      return {
        currentRoute: path + window.location.hash,
        params: [],
      }
    },
    props: {
      routes: Object
    },
    created: function() {
      window.addEventListener('popstate', () => {
        let path = window.location.pathname;
        const last = path.length - 1;
        path = path !== '/' && path[last] === '/' ? path.slice(0,last) : path
        // debugger;
        this.currentRoute =  path + window.location.hash
      })
    },
    computed: {
      routeParams() {
        return Object.keys(this.params).reduce( (function(acc,k) {
          acc.props[k] = this.params[k];
          return acc
        }).bind(this), {props:{}});
      },
      viewComponent() {
        let route;
        Object.keys(this.routes).forEach( (k) => {
          // break early if we already have a match
          if (route !== undefined) { return }
          const routeParts = k.split("/");
          const pathParts = this.currentRoute.split("/");
          // find a match
          if (routeParts.length === pathParts.length) {
            this.params = {};
            const match = routeParts.every( (part, i) => {
              if (part[0] === ":") {
                this.params[part.substring(1)] = pathParts[i];
                return true
              } else if (part === pathParts[i]) {
                return true
              } else {
                return false
              }
            });
            // if match found, set the route to the matching route
            if (match) {
              route = this.routes[k];
            }
          }
        });
        route = route || this.routes['NotFound']
        return route;
      },
    },
    methods: {},
    render(createElement) {
      return createElement(this.viewComponent, this.routeParams)
    },
  });
  export default Router;
</script>

<template>
  <div class="main-container">
    <sidebar-menu :menu="menu" />
    <div class="main-body">
      <img alt="Vue logo" src="./assets/logo.png" />
      <Home msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import { SidebarMenu } from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {
  name: "App",
  components: {
    Home,
    SidebarMenu
  },
  data(){
    return {
        menu: [
          {
            header: 'Main Navigation',
            hiddenOnCollapse: true
          },
          {
            href: '/',
            title: 'Dashboard',
            icon: 'fa fa-user'
          },
          {
            href: '/charts',
            title: 'Charts',
            icon: 'fa fa-chart-area',
            child: [
              {
                href: '/charts/sublink',
                title: 'Sub Link'
              }
            ]
          }
        ]
    }
  }
};
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.main-container{
  background-color: red;
  width: 100vw;
}
.main-body{
  width: 100%;
}
</style>

<template>
    <div class="container-fluid">
      <div id="theTabPanel">
        <div>
          <a>Africa</a>
          <div>
            <ul>
              <li>Algeria</li>
              <li>Angola</li>
              <li>Benin</li>
              <li>Botswana</li>
            </ul>
          </div>
        </div>
        <div>
          <a class="wj-state-active">America</a>
          <div>
            <ul>
              <li>Canada</li>
              <li>Chile</li>
              <li>Mexico</li>
              <li>United States</li>
            </ul>
          </div>
        </div>
        <div>
          <a>Asia</a>
          <div>
            <ul>
              <li>China</li>
              <li>Korea</li>
              <li>India</li>
              <li>Japan</li>
            </ul>
          </div>
        </div>
        <div>
          <a>Europe</a>
          <div>
            <ul>
              <li>Austria</li>
              <li>England</li>
              <li>France</li>
              <li>Germany</li>
              <li>Netherlands</li>
              <li>Switzerland</li>
            </ul>
          </div>
        </div>
        <div>
          <a>Oceania</a>
          <div>
            <ul>
              <li>Australia</li>
              <li>Fiji</li>
              <li>New Zealand</li>
              <li>Samoa</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from "vue";
    import { TabPanel } from '@grapecity/wijmo.nav';

    let App = Vue.extend({
        name: "app",
        mounted: function() {
            new TabPanel('#theTabPanel')
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>
<style>
    #theTabPanel .wj-tabpanes {
        padding: 12px 0;
    }
</style>
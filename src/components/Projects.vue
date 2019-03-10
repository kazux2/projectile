<template>
  <div>
    <div id="projects" class="container-fluid">
      <ul>
      <div v-for="(value, key, index) in projectsTable" :key="index">
        <li>
          <div class="row">
              <b-card :img-src="value.imageURL" img-alt="Card image" img-left class="mb-3">
                    <b-card-text>
                      <router-link tag="h2" v-bind:to="{name:'Project', params : {id: key}}">
                        <h2><a>{{ value.name }}</a></h2>
                      </router-link>
                      Some quick example text to build on the card and make up the bulk of the card's content.
                    </b-card-text>
              </b-card>
            
          </div>
        </li>
      </div>
        
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase" 
let projectIDtoName_json = require("../assets/projects.json").projectIDtoName;
let emptyProject = require("../assets/emptyProject.json");

import { mapState } from 'vuex';

import store from '../store.js';
export default {
  props: ['projectsTable'],
};
</script>
<template>
  <div class="home">
    <h1>Hirsute</h1>
    <button 
      class="button-classic" 
      @click="gameOptions = true"
      v-if="!gameOptions"
    >Start a Game</button>
    <div v-if="gameOptions">
      <h3>Number of Rounds:</h3>
      <input 
        class="input-classic" 
        type="number" 
        name="number-of-rounds" 
        id="number-of-rounds" 
        v-model="gamePreferences.numberOfRounds" 
        min="1" 
        max="10"
      />
      <h3>Categories Enabled:</h3>
        <div 
          id="category-selection-grid"
        >
          <button 
            v-for="category in gameCategoryOptions" 
            :key="category" 
            class="button-classic" 
            @click="selectCategory(category)" 
            :style="{backgroundColor: getBackgroundColor(category)}"
            :disabled="gamePreferences.categoriesEnabled.includes('All')&& category !== 'All'"
          >{{ category }}</button>
        </div>
        <button class="button-classic button-action" @click="hostGame">Host</button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { isArray } from 'util';

export default {
  name: 'home',
  data() {
    return {
      gameOptions: false,
      gamePreferences: {
        numberOfRounds: 1,
        categoriesEnabled: [],
        questionPendTime: '10s',
        teams: [],
        currentRound: 0,
        questions: null,
      },
      // in the api, for some god-forsaken reason, general knowledge is category nine and then its incremental from there. So books is 10, film 11, etc. basically to get the proper index with the exception of all, you must add 8 to the index of the category;
      gameCategoryOptions: [
        'All',
        'General Knowledge',
        'Books',
        'Film',
        'Music',
        'Musicals and Theater',
        'Television',
        'Video Games',
        'Board Games',
        'Science and Nature',
        'Computers',
        'Mathematics',
        'Mythology',
        'Sports',
        'Geography',
        'History',
        'Politics',
        'Art',
        'Celebrities',
        'Animals',
        'Vehicles',
        'Cartoons',
        'Gadgets'
      ]
    }
  },
  methods: {
    // some array methods for selecting various categories since v-model doesn't work with buttons. 
    selectCategory(category) {
      if (category === "All") {

        const eliminateOthers = this.gamePreferences.categoriesEnabled.filter(selectedCategory => selectedCategory === category);
        this.gamePreferences.categoriesEnabled = eliminateOthers;

      } 

      const categoriesEnabled = this.gamePreferences.categoriesEnabled;

      if (!categoriesEnabled.includes(category)) {
        this.gamePreferences.categoriesEnabled.push(category);
      } else {
        for (let i = 0; i < categoriesEnabled.length; i++) {
          if (categoriesEnabled[i] === category) {
            categoriesEnabled.splice(i, 1);
            this.gamePreferences.categoriesEnabled = categoriesEnabled;
          }
        }
      } 
    },
    // changes button colors based on selection.
    getBackgroundColor(category) {
      if (this.gamePreferences.categoriesEnabled.includes(category)) return '#42b983';
      else return '#ffffff';
    },
    // constructs a query string for the API call with the proper parameters.
    constructQuery() {
      const query = [];

      const questionNumber = this.gamePreferences.numberOfRounds * 5;
      if (this.gamePreferences.categoriesEnabled.length === 1) {
        query.push(`https://opentdb.com/api.php?amount=${questionNumber}`);
      } else {
        
        // figure out the number of questions you want to ask per category...
        const numberPerQuery = Math.ceil(questionNumber / this.gamePreferences.categoriesEnabled.length);

        this.gamePreferences.categoriesEnabled.map((category) => {
          const indexOfCategory = this.gameCategoryOptions.indexOf(category);

          query.push(`https://opentdb.com/api.php?amount=${numberPerQuery}&category=${indexOfCategory + 8}`);
        });
      }
      return query;
    },
    // hosts the game (only in Vuex for the moment.)
    hostGame() {
      // constructing an API query based off user's selections.
      const query = this.constructQuery();

      // iterating through the query to hit the API (This has to happen if multiple categories are selected) and pushes the nearest appropriate number of questions to the questions array.
      const questionsArray = [];
      query.map(queryString => {
        Axios.get(queryString)
          .then(HTTPresponse => {
            const questionsReturned = HTTPresponse.data.results;
            questionsReturned.map(question => {
              questionsArray.push(question);
            });
          })
          .catch(error => console.log(error));
      });

      // which is then set to the game preferences object immediately prior to...
      this.gamePreferences.questions = questionsArray;

      // the game preferences object being sent to the store. These will not appear in the Vuex state mutation yet, but they do exist in the Vuex. For the life of me I don't know why. My theory is that writing a getter will amend this problem.

      // update: my theory was wrong
      this.$store.commit('addGame', this.gamePreferences);

      // then there's the redirect problem...
      this.$router.push('/game');
    }
  }
}
</script>

<style scoped lang="scss">
  .button-classic {
    font-size: 1em;
    border: 1px #0e1111 solid;
    padding: 1em;
    outline: none;
    cursor: pointer;
    border-radius: 5%;
  }

  #category-selection-grid {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    button {
      flex: 1 0 15%;
      flex-grow: 1;
      margin: 5px;
      display: inline-block;
    }
  }

  .input-classic {
    font-size: 2em;
    border: none;
    margin: none;
    outline: none;
    color: #42b983;
    padding: 1em;
    text-align: center;
  }

  .button-action {
    margin: 2em;
    padding: .5em;
    font-size: 2em;
    color: white;
    background-color: #42b983;
  }
</style>


<template>
  <div class="home">
    <h1>Welcome to Hirsute!</h1>
    <button class="button-classic" @click="gameOptions = true">Start a Game</button>
    <div v-if="gameOptions">
      <h3>Number of Rounds:</h3>
      <input class="input-classic" type="number" name="number-of-rounds" id="number-of-rounds" v-model="gamePreferences.numberOfRounds" min="1" max="20"/>
      <h3>Categories Enabled:</h3>
        <div v-for="category in gameCategoryOptions" :key="category" id="category-selection-grid">
          <button class="button-classic" @click="selectCategory(category)" :style="{backgroundColor: getBackgroundColor(category)}" :disabled="gamePreferences.categoriesEnabled.includes('All')&& category !== 'All'">{{ category }}</button>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      gameOptions: false,
      gamePreferences: {
        numberOfRounds: null,
        categoriesEnabled: [],
        questionPendTime: '10s',
      },
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
    selectCategory(category) {
      if (category === "All") {

        const eliminateOthers = this.gamePreferences.categoriesEnabled.filter(selectedCategory => selectedCategory === category);
        this.gamePreferences.categoriesEnabled = eliminateOthers;

      } 

        // const deselectAll = this.gamePreferences.categoriesEnabled.filter(selectedCategory => selectedCategory !== "All");
        // this.gamePreferences.categoriesEnabled = deselectAll;

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
    getBackgroundColor(category) {
      if (this.gamePreferences.categoriesEnabled.includes(category)) return '#42b983';
      else return '#ffffff';
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
    display: flex;
    flex-wrap: wrap;
    button {
      flex: 1 0 25%;
      flex-grow: 1;
      margin: 5px;
      display: inline-block;
    }
  }
</style>


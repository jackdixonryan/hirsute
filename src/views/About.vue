<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-if="trivia">
      <div v-for="question in trivia">
        <h3>{{question.question}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  data() {
    return {
      trivia: null
    }
  },
  computed: {
 
  },
  beforeMount() {
    Axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard')
      .then(HTTPresponse => {
        const questionsArray = HTTPresponse.data.results;
        for (let i = 0; i < questionsArray.length; i++) {
          const withApostrophes = questionsArray[i].question.split("&#039;").join("'");
          const withQuotations = withApostrophes.split('&quot;').join('"');
          console.log(withQuotations);
          questionsArray[i].question = withQuotations;
        }
        this.trivia = questionsArray;
      })
      .catch(err => console.log());
  }
}
</script>


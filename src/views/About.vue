<template>
  <div class="about">
    <h1>Trivia Time!</h1>
    <div v-if="trivia">
      <div v-for="(question, questionIndex) in trivia" :key="question.question">
        <h3>{{question.question}}</h3>
        <div v-for="answer in randomizedAnswers(question)" :key="answer">
          <input type="radio" :name="answer" :id="answer" v-model="answers[questionIndex]" :value="answer">
          <label :for="answer">{{answer}}</label>
        </div>
      </div>
    </div>
    <button @click="submitAnswers">Check Answers</button>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  data() {
    return {
      trivia: null,
      answers: [],
    }
  },
  computed: {
 
  },
  beforeMount() {
    // get the API
    Axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard')
      .then(HTTPresponse => {
        const questionsArray = HTTPresponse.data.results;
        // iterate through the questions
        for (let i = 0; i < questionsArray.length; i++) {
          // take out all html codes and sub them with actual characters
          const withApostrophes = questionsArray[i].question.split("&#039;").join("'");
          const withQuotations = withApostrophes.split('&quot;').join('"');

          // then set the question equal to the newly legible form.
          questionsArray[i].question = withQuotations;
        }
        // and set the data.
        this.trivia = questionsArray;
        this.answers.length = questionsArray.length;
      })
      .catch(err => console.log());
  },
  methods: {
    randomizedAnswers(question) {
      const returnArray = [];
      returnArray.push(question.correct_answer)
      question.incorrect_answers.map(answer => returnArray.push(answer));
      return returnArray;
    },
    submitAnswers() {
      const correct = [];
      const incorrect = [];
      for (let i = 0; i < this.trivia.length; i++) {
        if (this.trivia[i].correct_answer === this.answers[i]) {
          correct.push(this.trivia[i]);
        } else {
          incorrect.push({
            question: this.trivia[i],
            userAnswer: this.answers[i],
            correctAnswer: this.trivia[i].correct_answer
          });
        }
      }
      console.log(correct.length);
      console.log(incorrect);
    }
  }
}
</script>


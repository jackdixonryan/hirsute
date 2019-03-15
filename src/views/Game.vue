<template>
  <div v-if="gameData">
    <!-- Here shall live the meat of the actual game. One question at a time, with a timer, multiple options. Ultimately, multiple people will be playing at any one time, so this page will have to exist with a unique id to the room. -->

    <!-- Reigning theory: Build another VUE.js app. Take Game data and push to FB, then allow for two clients, a main and a mobile. The main hosts the game, the mobile hosts the users. The mobile app renders data depending on whether the user has joined a game and what phase of gameplay we're on.  -->

    <!-- Actually this might work pretty well. The only issue is the timer, but as long as the timer runs from here, the web client, we could actually do this. -->
    <div v-if="gameStarted">
      <p>The game has begun.</p>
    </div>
    <div v-else>
      <h1>Join the Game!</h1>
      <h2>{{gameData.passcode}}</h2>
      <h3>Go to the Hirsute App and enter the unique passcode generated for this game.</h3>
    </div>
    <h1>Lobby</h1>
    <!-- This will eventually populate with player data. -->
    <div id="lobby">
      <p v-for="player in gameData.players" :key="player.id">{{player.nickname}}</p>
    </div>
  </div>
  <div v-else>
    <p v-if="pendingTimer < 5">Loading...</p>
    <p v-else>It looks like something is going wrong. Try reloading the page or starting a game if you haven't already.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pendingTimer: 0,
      gameStarted: false,
    }
  },
  computed: {
    gameData() {
      return this.$store.getters.gameData;
    }
  },
  mounted() {
    console.log(this.$store.state.gameData);

    setInterval(() => {
      this.pendingTimer++;
    }, 1000)
  }
}
</script>

<style>

</style>

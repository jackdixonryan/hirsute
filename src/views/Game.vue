<template>
  <div>
    <!-- Here shall live the meat of the actual game. One question at a time, with a timer, multiple options. Ultimately, multiple people will be playing at any one time, so this page will have to exist with a unique id to the room. -->
    <p>Am I real?</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.gameData);
  }
}
</script>

<style>

</style>

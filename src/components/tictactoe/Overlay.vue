<template>
  <div>
    <transition name="fade">
      <div class="overlay-container" v-show="won !== '' && showBanner">
        <div class="overlay-background"></div>
        <div class="overlay">
          <h1 :class="'overlay-message' + (won === 'computer' ? ' animated' : '')">
            <span class="part-message">
              <span :class="'letter' + (won !== '' && showBanner ? ' show' : '')" :key="key" v-for="(l, key) in getFirstMessagePart" :id="'l' + key">
              {{ l }}
            </span>
            </span>
            <span class="part-message">
              <span :class="'letter' + (won !== '' && showBanner ? ' show' : '')" :key="key+10" v-for="(l, key) in getSecondMessagePart" :id="'l' + (key+10)">
              {{ l }}
            </span>
            </span>
          </h1>
          <a v-show="showButton" :class="'play-button btn' + (won !== '' ? '' : ' disabled')"
             @click.prevent="buttonClick">
            play again
          </a>
        </div>
        <div class="effects">
          <div :class="'particle' + (won === 'user' && showBanner ? ' show' : '')" :key="n" v-for="n in 300" :id="'p' + n"
               :style="{
               'top': Math.floor((Math.random() * getHeight) * 2 + (-1 * (Math.random() * getHeight))) + 'px',
               'left': Math.floor(Math.random() * getWidth) + 'px'
               }"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Won',
  props: {
    showBanner: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: false
    },
    playMessage: {
      type: Array,
      default: []
    },
    won: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      width: 0,
      height: 0
    }
  },
  created () {
    this.width = window.innerWidth - 10;
    this.height = window.innerHeight - 30;
    window.addEventListener('resize', () => {
      this.width = window.innerWidth - 10;
      this.height = window.innerHeight - 30;
    })
  },
  computed: {
    getWidth () { return this.width },
    getHeight () { return this.height },
    getFirstMessagePart() {
      if (this.playMessage.length) {
        return this.playMessage[0];
      }

      return '';
    },
    getSecondMessagePart() {
      if (this.playMessage.length > 1) {
        return this.playMessage[1];
      }

      return '';
    }
  },
  methods: {
    buttonClick() {
      this.$emit('button-click');
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes shiver {
    0% {transform: rotate(-20deg)}
    50% {transform: rotate(20deg)}
    100% {transform: rotate(-20deg)}
  }
  @keyframes fall {
    from {margin-top: 0}
    to {margin-top: 200px}
  }
  @for $i from 0 through 300 {
    #p#{$i} {
      background-color: rgb(255,255,random(255));
    }
  }
  @for $i from 0 through 20 {
    @keyframes turn#{$i} {
      from {transform: rotate(0deg)}
      to {transform: rotate(random(40)-20+deg)}
    }
    @keyframes fall#{$i} {
      from {top: 0}
      to {top: random(200)+px}
    }
    .overlay-message.animated .letter#l#{$i} {
      animation: turn#{$i} 4s linear, fall#{$i} 4s linear;
      animation-fill-mode: forwards;
    }
  }
  .overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    width: 100%;
  }
  .overlay-background {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.8;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .effects {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    .particle {
      display: none;
      width: 10px;
      height: 30px;
      position: absolute;
      animation: shiver .1s infinite, fall 3s ease-out;
      animation-fill-mode: forwards;
      &.show {
        display: block;
      }
    }
  }
  .overlay-message {
    position: absolute;
    top: 30%;
    box-sizing: border-box;
    font-size: 80px;
    height: 130px;
    width: 100%;
    text-align: center;
    .letter {
      position: relative;
      display: none;
      color: black;
      min-width: 3%;
      height: 100px;
      &.show {
        display: inline-block;
      }
    }
    &.animated {
      .letter {
        animation: turn 3s linear, fall 3s linear;
      }
    }
    .part-message {
      display: block;
    }
  }
  .play-button {
    transition: opacity .3s ease-out;
    z-index: 200;
    width: 450px;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin: 0 0 100px -225px;
    background-color: #32CD32;
    color: white;
    cursor: pointer;
    user-select: none;
    border-bottom: 2px solid #227f22;
    text-align: center;
    font-size: 24px;
    padding: 20px 10px;
    display: block;
    box-sizing: border-box;
    &.disabled {
      background-color: lightgray;
      border-bottom: 2px solid gray;
      cursor: default;
    }
    &:not(.disabled):hover {
      background-color: #31ae31;
    }
  }
  @media screen and (max-width: 700px) {
    .overlay-message {
      font-size: 65px;
    }
  }
  @media screen and (max-width: 500px) {
    .play-button {
      margin: 0 0 50px -150px;
      width: 300px;
    }
  }
</style>

<template>
  <f7-page>
    <f7-navbar :title="currCollectionName" class="arabicfont" back-link="Back" sliding></f7-navbar>
    <div class="page" @click="decrease">
      <v-touch id="zekrp" class="page-content" v-on:swipeleft="previous" v-on:swiperight="next">
        <f7-block inner :style="[this.$store.state.arabicfont]" >
          <p v-html="currZekr.body" class=""></p>
        </f7-block>
      </v-touch>
    </div>
    <f7-toolbar bottom-md>
      <f7-link @click="previous"><f7-icon f7="right"/><span>السابق</span></f7-link>
      <f7-link @click="decrease"><f7-icon f7="reload"/> <span>{{ displayCount }}</span></f7-link>
      <span>{{ progress }}</span>
      <f7-link @click="next"><span>التالى</span><f7-icon f7="left"/></f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import azkarJson from "../../json/azkar.json"
export default {
  data() {
    return {
      arabicfont: {
        fontSize: '28px',
        fontWeight: 'bold',
        fontFamily: '"Naskh","Hafs","Adobe Arabic","Simplified Arabic","Traditional Arabic","Arabic Typesetting","Times New Roman","Tahoma","Arial","serif"'
      },
      azkar: azkarJson,
      currCollectionIndex: this.$f7route.params['zi'],
      currZekrIndex: 0,
      currCountDown: 0
    }
  },
  computed: {
    currCollectionName() {
      return this.azkar[this.currCollectionIndex].name;
    },
    currZekr() {
      return this.azkar[this.currCollectionIndex].content[this.currZekrIndex];
    },
    progress() {
      return (this.currZekrIndex + 1) + "/" + this.azkar[this.currCollectionIndex].content.length;
    },
    remainingCount() {
      return this.currZekr.count - this.currCountDown;
    },
    displayCount() {
      if (this.$store.state.isDownCounting)
        return this.remainingCount
      else
        return this.currCountDown;
    }
  },
  methods: {
    next() {
      if (this.currZekrIndex + 1 < this.azkar[this.currCollectionIndex].content.length)
      {
        this.currZekrIndex += 1;
        this.resetCount();
        this.$el.querySelector("#zekrp").scrollTop = 0;
      }
    },
    previous() {
      if (this.currZekrIndex - 1 >= 0)
      {
        this.currZekrIndex -= 1;
        this.resetCount();
        this.$el.querySelector("#zekrp").scrollTop = 0;
      }
    },
    decrease() {
      if (this.remainingCount > 0)
      {
        this.currCountDown += 1;
      }
      if (this.remainingCount == 0)
      {
        if (this.$store.state.vibrateWhenZekrCounterFinishes)
        {
					navigator.vibrate(150);
        }
        if (this.$store.state.MoveToNextZekrWhenZekrCounterFinishes)
        {
          this.next();
        }
      }
    },
    resetCount() {
      this.currCountDown = 0
    },
    incFont() {
      this.$store.commit('fontSizeChanged', this.$store.getters.fontSize + 1)
    },
    decFont() {
      this.$store.commit('fontSizeChanged', this.$store.getters.fontSize - 1)
    }
  }
}
</script>
<style>
</style>

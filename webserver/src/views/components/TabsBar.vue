<template>
  <div   class="    "  style="min-height:60px" v-if="tabArray">
     
    <div v-for="tab in tabArray" 
    class="select-none bg-gray-300 hover:bg-blue-400 cursor-pointer p-4 mx-2 my-4 border-black border-2 rounded-lg inline " 
     :class="{ 'bg-blue-400': (tab.id == selectedTab.id) }"
     @click="onClickTab(tab)" >
        {{ tab.label }}
    </div>


</div>
</template>


<script>
 
 
export default {
  name: 'TabsBar',
  props: [ 'tabArray' , 'onTabSelect' ],
  components:{ },
  data() {
    return {
      selectedTab: null
       
    }
  }, 
  created(){
     
        this.selectedTab= this.tabArray[0] 
 
  },
  methods: {
      onClickTab(tabdata){
        this.selectedTab = tabdata 
        this.onTabSelect( tabdata.id )
      }
         
  }
}
</script>
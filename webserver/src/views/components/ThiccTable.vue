<template>
  <div class=" ">
     <table class="table-auto w-full">
          <thead>
            <tr>
              <th style="text-align:left" v-for="(label, index) in labelsArray">{{label}}</th>
               
            </tr>
          </thead>
          <tbody v-cloak>
            <tr v-for="row of rowsArray" class="hover:bg-gray-800 cursor-pointer py-4 rainbow-hover" @click="clickedRow(row)">
               
              <td v-for="(label, index) in labelsArray"  class="py-2 px-2 my-2">{{Object.values(row)[index]}}</td>
              
            </tr>
             
          </tbody>
        </table>

        <div v-if="!rowsArray || rowsArray.length == 0" v-cloak>
          No records found.
        </div>
  </div>
</template>


<script>


export default {
  name: 'ThiccTable',
  props: ['labelsArray','rowsArray','clickedRowCallback'],
  data() {
    return {

    }
  },
  created(){

  },
  methods: {
      clickedRow(row){
        this.clickedRowCallback(row)
      }
  }
}
</script>

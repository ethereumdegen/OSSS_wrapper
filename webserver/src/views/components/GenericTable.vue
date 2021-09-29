<template>
  <div class=" ">
     <table class="table-auto w-full">
          <thead>
            <tr>
              <th style="text-align:left" v-for="(label, index) in labelsArray">{{label}}</th>
               
            </tr>
          </thead>
          <tbody v-cloak>
            <tr v-for="row of rowsArray" class="hover:bg-gray-700 cursor-pointer" @click="clickedRow(row)">
               
              <td v-for="(label, index) in labelsArray" >{{Object.values(row)[index]}}</td>
              
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
  name: 'GenericTable',
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

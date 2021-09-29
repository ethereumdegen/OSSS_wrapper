<template> 
<div class="   pt-8   pb-2 mb-12 text-white" style="min-height:300px">
            
            <div class="text-lg"> Guild Sponsors </div>    
 


            <div class="my-4 inline-block " >
                
                <a class="border-2 border-gray-500 p-2 hover:bg-gray-600" href="https://deploy.art" target="_blank" > 
                    <img src="@/assets/images/squiggle.png" class="inline-block" width="24px" />
                    <div class="inline-block ml-2 text-white ">Deploy.Art</div>
                    
                    
              </a> 
                
           </div> 


 </div>
 </template>



<script>
    export default {
    name: 'FrontPageMedia',
    props: [ ],
    data() {
        return {
            startTime: 0
        }
    },
    created(){
        this.startTime= Date.now()

        setInterval(this.update,500)
    },
    methods: {
         update(){
             this.$forceUpdate()
         },
         getTimeElapsed(){
             return Date.now() - this.startTime
         }
    }
    }
</script>

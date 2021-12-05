<template>
   <div :class="`item-number-and-name-container ${custom_class_container}`">
        <span :class="`item-number ${custom_class_item_number}`">{{itemNumber}} </span>
        <span :class="`item-name ${custom_class_item_name}`"> {{itemName}}</span>
   </div>
</template>

<script>
export default {
  props:{
      itemName:{
          type:String,
          required:true
      },
      itemNumber:{
          type:Number,
          required:true
      },
      custom_class_container:{
          type:String,
          default:''
      },
      custom_class_item_number:{
          type:String,
          default:''
      },
      custom_class_item_name:{
          type:String,
          default:''
      }

  }
}
</script>

<style>

</style>
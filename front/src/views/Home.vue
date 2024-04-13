<template>
  <meta charset="charset=utf-8"/>
    <div class="bgimg">
    </div>
</template>
  
<script  setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()
let itemKey = Math.random()
let tableData1 = ref([])
let tableData2 = ref([])
const isProteinSequence = async(sequence) =>{
  const proteinCharacters = 'ACDEFGHIKLMNPQRSTVWY';
  const upperInput = sequence.toUpperCase();
  for (let i = 0; i < upperInput.length; i++) {
      if (proteinCharacters.indexOf(upperInput[i]) === -1) {
        return false;
      }
    }
  return true;
}
const Switch = async () =>{
  let element1 = document.getElementById('table1')
  let element2 = document.getElementById('table2')
  if(element1.style.display === 'none')
  {
    element1.style.cssText = 'display: block;position:fixed;border-radius: 10px;margin-top: 1%;margin-left:51%;margin-right:2%;width: 47%;height:35rem;z-index: 1'
    // element2.style.cssText = 'display: none;border-radius: 10px;margin-top: 2%;margin-left:1%;margin-right:2%;width: 47%;height:35rem;'
    tableData1.value = []
    document.getElementById('download').setAttribute('style', 'display: none')

  }
  else {
    element1.style.cssText = 'display:none;position:fixed;border-radius: 10px;margin-top: 1%;margin-left:51%;margin-right:2%;width: 47%;height:35rem;z-index: 1'
    tableData2.value = []
    // element2.style.cssText = 'display: block;border-radius: 10px;margin-top: 2%;margin-left:1%;margin-right:2%;width: 47%;height:35rem;'
  }
}
const call1 = async () =>{
  let user_input = document.getElementById('myInput1').value
  user_input = user_input.trim()
  if(!await isProteinSequence(user_input)){
    alert("Please enter the correct protein sequence！")
    return;
  }
  alert("Checking, please wait a moment.")
  let body = {'user_input': user_input}
  let response = await fetch('http://8.134.148.198:5000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  });
  if (response.ok) {
    tableData1.value = await response.json()
  } else {
    alert("HTTP-Error: " + response.status)
  }
}

const call2 = async () =>{
  let user_input = document.getElementById('myInput2').files[0];
  if(!user_input.name.endsWith('.faa')){
    alert("Please upload a file with the suffix.faa!");
    return;
  }
  alert("It may take a long time. Please wait patiently...");
  let formData = new FormData();
  formData.append('user_input', user_input);
  let response = await fetch('http://8.134.148.198:5000/dig', {
    method: 'POST',
    body: formData
  });
  if (response.ok) {
    tableData2.value = await response.json()
  } else {
    alert("HTTP-Error: " + response.status)
  }
  let but = document.getElementById('download')
  but.setAttribute('style', 'display: block')
  // document.getElementById('table2').style.cssText = 'display: block;border-radius: 10px;margin-top: 2%;margin-left:1%;margin-right:2%;width: 47%;height:35rem;'
  // if (response.ok) {
  //   let data = await response.json();
  // } else {
  //   alert("HTTP-Error: " + response.status);
  // }
}


</script>

<style scoped>
.headimg{
  height: 10%;
  width: 100%;
}
.bgimg{
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url('../assets/body.jpg');
  background-size:100% 100%;
}
.but {
  color: #0086b3;
  background-color: #e9ebef;
  position: absolute;
  margin-left: 32.5rem;
  border-radius: 0.5rem;
  height: 2.8rem;
  font-size: 0.8rem;
  font-weight: bold;
}
.but:hover {
  color: rgba(88,54,174,0.58);
  transform: scale(1.05);
}
.download {
  color: white;
  background-color: indianred;
  opacity: 0.9;
  z-index: 1;
  position: absolute;
  top: 6.4%;
  left:90%;
  border-radius: 0.8rem;
  height: 2.2rem;
  font-size: 0.8rem;
  display: none;
}
.info{
  background-color: rgba(195,179,235,0.58);
  /*color: rgba(195,179,235,0.58);*/
  z-index: 1;
  position: absolute;
  margin-top:1.6%;
  margin-left: 85%;
  border-radius: 2rem;
  height: 3rem;
  width: 6.5rem;
  font-size: 1rem;
  border: none;
}
.info:hover{
  transform: scale(1.05);
}
.github{
  background: url('../assets/gitlab.jpg') center no-repeat;
  background-size: cover;
  z-index: 1;
  position: absolute;
  margin-top:1.6%;
  margin-left: 85%;
  border-radius: 2rem;
  height: 3rem;
  width: 6.5rem;
  font-size: 1rem;
  border: none;
}
.github:hover{
  transform: scale(1.05);
}
.attention{
  font-size: 1.1rem;
  margin-left: 2rem;
  margin-top: 0.5rem;
  color: #c45656
}

</style>
  

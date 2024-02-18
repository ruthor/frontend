<template>
    <div class="row">
      <div class="col-md-4">
          <div class="card-header">
              Add Record
          </div>
          <div class="card-body">
              <form @submit.prevent="save">
               
              <div class="form-group">
                  <label>Code</label>
                  <input type="text" v-model="data.code" class="form-control"  placeholder="Enter Code">
               
              </div>
              <div class="form-group">
                  <label>Document Name</label>
                  <input type="text" v-model="data.name" class="form-control"  placeholder="Enter Document Name">
               
              </div>
               
              <button type="submit" class="btn btn-primary">Save</button>
              </form>
          </div>
      </div>
    </div>
    <div>
        <h1>Document List</h1>
        <button @click="remove">Delete selected rows</button>
        <DataTable
            class="table table-hover table-striped"
            id="datatable"
            :columns="columns"
            :time="7000"
            ajax="http://localhost:8000/api/documents"
            ref="table"
  
        >
        </DataTable>
    </div>
  </template>
  <script>
  import { ref, onMounted } from 'vue';
  import DataTable from 'datatables.net-vue3';
  import DataTablesLib from 'datatables.net';
  import axios from 'axios';
  import 'datatables.net-select';
  
  DataTable.use(DataTablesLib);
  let counter = 0;
  let dt;
  const data = ref([]);
  const table = ref();
  
  onMounted(function () {
    dt = table.value.dt;
  });
  
  
  export default {
    name: "DataTableComponent",
    components: {DataTable},
    data(){
        return {
          columns: [
                {"data": "code","title" : "Code"},
                {"data": "name","title" : "Document Name"},
                {"data": "id","title" : "Actions", "defaultContent": '<button type="button" class="btn btn-danger"  @click="remove(3)">Delete</button>'}  
                
        ],
            dt: null,
  
            data:{
                     id: '',
                     code: '',
                     name: ''
    
    
          }
        }
    },  mounted() {
      // dt = table.value.dt;
      },
    methods: {
             DocumentLoad()
             {
               
          
             },
              
             save()
             {
              if(this.data.id == '')
                {
                  this.saveData();
                }
                else
                {
                  this.updateData();
                }       
    
             }, 
             saveData()
             {
              axios.post("http://localhost:8000/api/documents", this.data)
              .then(
                ({data})=>{
                  alert("saved");
                  this.data.code = '';
                  this.data.name = '',
                  this.id = ''
                  $('#datatable').DataTable().draw;
                }
              )
    
             },
             edit(id)
             {
              this.data = data;
             },
             updateData()
             {
                var editrecords = 'http://localhost:8000/api/documents/'+ this.data.id+'/edit';
                axios.put(editrecords, this.data)
                .then(
                  ({data})=>{
                    this.data.name = '';
                    this.data.address = '',
                    this.data.phone = ''
                    this.id = ''
                    alert("Updated!!!");
                    this.DocumentLoad();
                  }
                );
    
             },
    
             remove(){
             
              dt.rows({ selected: true }).every(function () {
      let idx = data.value.indexOf(this.data());
      data.value.splice(idx, 1);
      var url = `http://localhost:8000/api/documents/${data.id}/delete`;
                axios.delete(url);
    });
  
                
                alert("Deleted");
                // // this.DocumentLoad();
              }
        }
  }
  
  </script>
  
  <style>
  @import 'datatables.net-dt';
  </style>
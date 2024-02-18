
<template>
  <div>
      <div class="card">

          <DataTable  :value="products" v-model:selection="selectedProducts"  dataKey="id"
              :paginator="true" :rows="10" :filters="filters" 
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} crews">
              <template #header>
                  <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                      <h4 class="m-0">Crew List</h4>
                           <IconField iconPosition="left">
                          <InputIcon>
                              <i class="pi pi-search" />
                          </InputIcon>
                          <InputText v-model="filters['global'].value" class="p-column-filter" placeholder="Search..." />
                      </IconField>
        </div>
              </template>
              <template #empty> No crew found. </template>
              <Column field="first_name" header="First Name" sortable style="min-width:12rem"></Column>
              <Column field="middle_name" header="Middle Name" sortable style="min-width:16rem"></Column>
              <Column field="last_name" header="Last Name" sortable style="min-width:12rem"></Column>
              <Column field="email" header="Email" sortable style="min-width:16rem"></Column>
              <Column field="address" header="Address" sortable style="min-width:12rem"></Column>
              <Column field="birthdate" header="Birth Date" sortable style="min-width:16rem"></Column>
              <Column field="age" header="Age" sortable style="min-width:12rem"></Column>
              <Column field="rank" header="Rank" filterField="rank" filterMatchMode="contains" sortable filter>
              
                <template #filter="{ filterModel, filterCallback }">
                  <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text" @keydown.enter="filterCallback()" class="p-column-filter" />
              </template>
            </Column>
              <Column field="height" header="Height" sortable style="min-width:12rem"></Column>
              <Column field="weight" header="Weight" sortable style="min-width:16rem"></Column>
              <Column header="BMI" sortable style="min-width:16rem">
                <template #body="slotProps">
                  {{BMI(slotProps.data)}}
              </template>
              </Column>
              <Column :exportable="false" header="Actions" style="min-width:8rem">
                  <template #body="slotProps">
                      <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                  </template>
              </Column>
          </DataTable>
      </div>


      <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete <b>{{product.first_name}}</b>?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
          </template>
      </Dialog>

</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/services/Crewlist';
import axios from 'axios';

onMounted(() => {
  ProductService.getProducts().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    rank: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});
const submitted = ref(false);



const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};
const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};
const saveProduct = () => {
  submitted.value = true;

};

const confirmDeleteProduct = (prod) => {
  product.value = prod;
  axios.delete('http://127.0.0.1:8000/api/crewlist/'+  product.value.id + '/delete');
  deleteProductDialog.value = true;
};
const deleteProduct = () => {
  products.value = products.value.filter(val => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = {};
 
  toast.add({severity:'success', summary: 'Successful', detail: 'Crew Deleted', life: 3000});
};

const BMI = (prod) => {
  product.value = prod;
  return product.value.weight / Math.pow(product.value.height, 2)

};



const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true;
};

</script>

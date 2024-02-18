
<template>
  <div>
      <div class="card">
          <Toolbar class="mb-4">
              <template #start>
                  <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
              </template>
          </Toolbar>

          <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
              :paginator="true" :rows="10" :filters="filters"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} ranks">
              <template #header>
                  <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                      <h4 class="m-0">Rank List</h4>
          <IconField iconPosition="left">
                          <InputIcon>
                              <i class="pi pi-search" />
                          </InputIcon>
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                      </IconField>
        </div>
              </template>
              <Column field="code" header="Code" sortable style="min-width:12rem"></Column>
              <Column field="rank_name" header="Rank Name" sortable style="min-width:16rem"></Column>
              <Column field="alias" header="Alias" sortable style="min-width:16rem"></Column>
              <Column :exportable="false" header="Actions" style="min-width:8rem">
                  <template #body="slotProps">
                      <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                      <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                  </template>
              </Column>
          </DataTable>
      </div>

      <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Rank Details" :modal="true" class="p-fluid">
          <div class="field">
              <label for="name">Code</label>
              <InputText id="name" v-model.trim="product.code" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
              <small class="p-error" v-if="submitted && !product.code">Code is required.</small>
          </div>
          <div class="field">
              <label for="name">Rank Name</label>
              <InputText id="name" v-model.trim="product.rank_name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
              <small class="p-error" v-if="submitted && !product.rank_name">Rank Name is required.</small>
          </div>
          <div class="field">
            <label for="name">Alias</label>
            <InputText id="name" v-model.trim="product.alias" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
            <small class="p-error" v-if="submitted && !product.alias">Alias is required.</small>
        </div>
         
          <template #footer>
              <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
              <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
          </template>
      </Dialog>

      <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
          </template>
      </Dialog>

      <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete the selected ranks?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
          </template>
      </Dialog>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/services/Ranks';
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
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
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

  if (product.value.rank_name.trim()) {
      if (product.value.id) {
         // product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
          products.value[findIndexById(product.value.id)] = product.value;
          axios.put('http://localhost:8000/api/ranks/'+ product.value.id+'/edit', product.value)
         
          toast.add({severity:'success', summary: 'Successful', detail: 'Rank Updated', life: 3000});
      }
      else {
          products.value.push(product.value);
          axios.post('http://localhost:8000/api/ranks', product.value)
          toast.add({severity:'success', summary: 'Successful', detail: 'Rank Created', life: 3000});
      }

      productDialog.value = false;
      product.value = {};
  }
};
const editProduct = (prod) => {
  product.value = {...prod};

  productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  product.value = prod;
  axios.delete('http://127.0.0.1:8000/api/ranks/'+  product.value.id + '/delete');
  deleteProductDialog.value = true;
};
const deleteProduct = () => {
  products.value = products.value.filter(val => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = {};
 
  toast.add({severity:'success', summary: 'Successful', detail: 'Rank Deleted', life: 3000});
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products.value.length; i++) {
      if (products.value[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
};

const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true;
};

</script>

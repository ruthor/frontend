import axios from 'axios';

export default (await import('vue')).defineComponent({
name: "DataTableComponent",
components: { DataTable },
data() {
return {
columnDefs: [
{ "data": "code", "title": "Code" },
{ "data": "name", "title": "Document Name" },
{
"targets": 0, "data": "id", "title": "Actions",
"render": function (data, type, row, meta) {
return '<a href="' + data + '">Edit</a>' + ' <a href="' + data + '">Delete</a>';
}
}
],
dt: null,

data: {
id: '',
code: '',
name: ''
}
};
},
mounted() {
console.log("mounted() called.......");
},
methods: {
DocumentLoad() {
var page = "http://localhost:8000/api/documents";

$('#datatable').DataTable().ajax.url(page).load();

},

save() {
if (this.data.id == '') {
this.saveData();
}

else {
this.updateData();
}

},
saveData() {
axios.post("http://localhost:8000/api/documents", this.data)
.then(
({ data }) => {
alert("saved");
this.DocumentLoad();
this.data.code = '';
this.data.name = '',
this.id = '';
}
);

},
edit(id) {
this.data = data;
},
updateData() {
var editrecords = 'http://localhost:8000/api/documents/' + this.data.id + '/edit';
axios.put(editrecords, this.data)
.then(
({ data }) => {
this.data.name = '';
this.data.address = '',
this.data.phone = '';
this.id = '';
alert("Updated!!!");
this.DocumentLoad();
}
);

},

remove(data) {
var url = `http://localhost:8000/api/documents/${data.id}/delete`;
// var url = 'http://127.0.0.1:8000/api/student/'+ student.id;
axios.delete(url);
alert("Deleted");
this.DocumentLoad();
}
}
});

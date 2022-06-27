<template>
  <q-page padding>
    <div class="row q-ma-md">
      <div class="col-md-12 ">

        <q-btn
          to="/user/add"
          label="Add User"
          class="float-right q-mr-2"
          color="green"
          icon="add"
        />
      </div>
    </div>
    <DataTable
      v-if="blogs && blogs.length > 0"
      :title="tableTitle"
      :data="blogs"
      :columns="columns"
      separator="vertical"
      :actions="actions"
      @editBlog="editBlog"
      @deleteBlog="deleteBlog"


    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from 'components/Datatable.vue';
import {useBlogStore} from "stores/blog/BlogStore";
import {Loading,Screen} from "quasar";
import {mapActions,mapState} from "pinia";

export default defineComponent({
  // name: 'PageName'
  components:{DataTable},
  data() {
    var columns = [
      {
        name: 'id',
        required: true,
        label: 'Id',
        align: 'left',
        field: (row :any) => row.id ? row.id : '',
        sortable: true
      },
      {
        name: 'title',
        required: true,
        label: 'Title',
        align: 'left',
        field: (row :any) => row.title ? row.title : '',
        sortable: true
      },
      { name: 'excerpt',
        align: 'center',
        label: 'excerpt',
        field: (row:any )   =>  row.excerpt ? row.excerpt : '',
        sortable: true
      },
      { name: 'paragraph',
        align: 'center',
        label: 'Body',
        field: (row:any )   =>  row.paragraph ? row.paragraph : '',
        sortable: true
      },
    ]
    if (Screen.gt.sm) {
      //@ts-ignore
      columns.push(  { name: 'actions', label: 'Actions', field: 'hello', align: 'center' } )
    }
    return{
      tableTitle: 'Blogs',
      columns,
      actions: [
        {
          label: 'Edit Blog',
          event: 'editBlog',
          color: 'primary',
          icon: 'edit'
        },
        {
          label: 'Delete User',
          event: 'deleteBlog',
          color: 'red',
          icon: 'delete'
        }
      ]
    }
  },
  methods:{
    ...mapActions(useBlogStore,['getBlog','DeleteBlog']),
    editBlog(row :any){
      this.$router.push('/edit/blog/'+row.row.id)
    },
    deleteBlog(row:any){
      this.DeleteBlog(row.row.id)

    }
  },
  computed:{
    ...mapState(useBlogStore,['blogs']),
  },
  async created() {
    if (this.blogs && this.blogs.id  ===''){
      Loading.show()
      await this.getBlog()
      Loading.hide()
    }

  },

})
</script>

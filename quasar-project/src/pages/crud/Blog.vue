<template>
  <q-page padding>
    <div class="row q-ma-md">
      <div class="col-md-12 ">

        <q-btn
          to="/blog/add"
          label="Add Blog"
          class="float-right q-mr-2"
          color="green"
          icon="add"
        />
      </div>
    </div>
<!--    v-if="blogs && blogs.data.length > 0"-->

    <DataTable
      v-if="getAllBlogs"
      :title="tableTitle"
      :data="getAllBlogs.data"
      :columns="columns"
      separator="vertical"
      :actions="actions"
      @editBlog="editBlog"
      @deleteBlog="deleteBlog"
      :paginate_data="getAllBlogs"
      store_name="blogs"
       url="blog"
    ></DataTable>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from 'components/Datatable.vue';
import {useBlogStore} from "stores/blog/BlogStore";
import {Loading, Screen} from "quasar";
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
    ...mapActions(useBlogStore,['DeleteBlog','fetchApiBlog']),
    editBlog(row :any){
      this.$router.push('/edit/blog/'+row.row.id)
    },
    deleteBlog(row:any){
      if (this.$q.screen.gt.md){
        this.$q.dialog({
          title: 'Confirm',
          message: 'Are you sure to delete a record with an id of ' + row.row.id,
          ok: {
            push: true,
            color:'green'
          },
          cancel: {
            push: true,
            color: 'red'
          },
          persistent: true
        }).onOk(() => {
          this.DeleteBlog(row.row.id)
        })
      }else {
        this.DeleteBlog(row.row.id)
      }
    }
  },
  computed:{
    ...mapState(useBlogStore,['blogs', 'getAllBlogs']),
  },
  async created() {
    if (this.blogs && this.blogs.id  ===''){
      Loading.show()
      // await this.getBlog()
      await this.fetchApiBlog()
      Loading.hide()
    }
    // console.log(this.blogs)
  },

})
</script>

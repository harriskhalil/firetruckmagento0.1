<!--<template  >-->
<!--  <q-page padding class="bg-color  ">-->
<!--    <div class="row q-ma-md ">-->
<!--      <div class="col-md-12 ">-->
<!--        <q-btn-->
<!--          to="/user/add"-->
<!--          label="Add User"-->
<!--          class="float-right q-mr-2"-->
<!--          color="green"-->
<!--          icon="add"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
<!--    <DataTable-->
<!--      v-if="users && users.length > 0"-->
<!--      :title="tableTitle"-->
<!--      :data="users"-->
<!--      :columns="columns"-->
<!--      separator="vertical"-->
<!--      :actions="actions"-->
<!--      @editUser="editUser"-->
<!--      @deleteUser="deleteUser"-->
<!--    />-->
<!--  </q-page>-->
<!--</template>-->



<!--<script lang="ts">-->

<!--import { Loading, Screen } from 'quasar'-->
<!--import {useUserStore} from "stores/user/UserStore";-->
<!--import {mapActions, mapState, mapWritableState} from "pinia";-->
<!--import DataTable from 'components/Datatable.vue';-->
<!--import { defineComponent } from 'vue'-->

<!--export default defineComponent({-->
<!--  name: 'PageName',-->
<!--  components: { DataTable },-->
<!--  data() {-->
<!--    var columns = [-->
<!--      {-->
<!--        name: 'id',-->
<!--        required: true,-->
<!--        label: 'Id',-->
<!--        align: 'left',-->
<!--        field: (row :any) => row.id ? row.id : '',-->
<!--        sortable: true-->
<!--      },-->
<!--      {-->
<!--        name: 'fname',-->
<!--        required: true,-->
<!--        label: 'FirstName',-->
<!--        align: 'left',-->
<!--        field: (row :any) => row.fname ? row.fname : '',-->
<!--        sortable: true-->
<!--      },-->
<!--      { name: 'lname',-->
<!--        align: 'center',-->
<!--        label: 'LastName',-->
<!--        field: (row:any )   =>  row.lname ? row.lname : '',-->
<!--        sortable: true-->
<!--      },-->
<!--      { name: 'username',-->
<!--        align: 'center',-->
<!--        label: 'Email',-->
<!--        field: (row:any )   =>  row.username ? row.username : '',-->
<!--        sortable: true-->
<!--      },-->


<!--    ]-->
<!--    if (Screen.gt.sm) {-->
<!--      //@ts-ignore-->
<!--      columns.push(  { name: 'actions', label: 'Actions', field: 'hello', align: 'center' } )-->
<!--    }-->
<!--    return{-->
<!--      tableTitle: 'Users',-->
<!--      columns,-->
<!--      user:[],-->
<!--      actions: [-->
<!--        {-->
<!--          label: 'Edit User',-->
<!--          event: 'editUser',-->
<!--          color: 'primary',-->
<!--          icon: 'edit',-->

<!--        },-->
<!--        {-->
<!--          label: 'Delete User',-->
<!--          event: 'deleteUser',-->
<!--          color: 'red',-->
<!--          icon: 'delete'-->
<!--        }-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    ...mapActions(useUserStore,['getUser','DeleteUser']),-->

<!--    editUser(row:any){-->
<!--      this.$router.push('/edit/user/'+ row.row.id)-->
<!--    },-->
<!--    deleteUser(row:any){-->
<!--       this.DeleteUser(row.row.id)-->
<!--    }-->


<!--  },-->
<!--  computed:{-->
<!--    ...mapState(useUserStore,['users']),-->
<!--  },-->
<!--   async created() {-->
<!--     Loading.show()-->
<!--     await this.getUser()-->
<!--     Loading.hide()-->
<!--  },-->



<!--})-->
<!--</script>-->

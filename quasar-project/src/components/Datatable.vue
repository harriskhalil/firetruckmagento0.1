<template>
  <div>
    <div class="col-12">
      <q-table
        :grid="this.$q.screen.lt.md ? true : false"
        :card-class="this.$q.screen.lt.md ? 'bg-grey-10 text-white': ''"
        :title="title"
        :filter="filter"
        :rows="data"
        :columns="columns"
        row-key="name"
        :separator="this.$q.platform.is.desktop ? separator : 'none'"
        binary-state-sort
        @row-click="rowClicked"
        color="white"
        bordered
        class="bg-datatable text-white"
        no-data-label="I didn't find anything for you"
        :isFrontFilter="false"

      >
        <template v-slot:top-right>
          <q-input
            class="bordered-light-grey "
            dense
            debounce="300"
            bg-color="grey"
            v-model="form.searchText"
            placeholder=" Search"
            rounded
            outlined
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              v-for="action in actions"
              :key="action.event"
              dense
              class="q-m-5"
              :color="action.color"
              @click="$emit(action.event, props)"
              :icon="action.icon"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <!--    Pagination starts here-->
    <div class="col-12">
            <p class="float-right q-ma-md">{{ paginate_data.from ? paginate_data.from : 0 }} to {{ paginate_data.to ? paginate_data.to : 0 }} of {{ paginate_data.total}}</p>
      <div class="q-pa-lg flex flex-center">
         <q-pagination
          v-if="paginate_data.total > 5"
          v-model="form.page"
          :min="paginate_data.last_page.current_page"
          :max="paginate_data.last_page"
          :max-pages="5"
          color="primary"
          :boundary-numbers="false"
          boundary-links
          :to-fn="changePaginationPage"
         />
      </div>
    </div>
    <!--    Pagination ends here-->
    <PopupMenu
      :actions="actions"
      :visible="actionsDialog"
      @actionClicked="actionClicked"
      @isModalVisible="isModalVisible"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopupMenu from "components/PopupMenu.vue";
import {mapActions} from "pinia";
import {useBlogStore} from "stores/blog/BlogStore";

export default defineComponent({
  name: 'DataTable',
  components: { PopupMenu },
  props: {
    title: {
      type: String,
      default: 'Customers'
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: null,
      required: true
    },
    paginate_data: {
      type: Object,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    store_name: {
      type: String,
      default: null
    },
    separator: {
      type: String,
      default: 'verticle'
    },
    actions: {
      type: Array,
      default: function () { return [] }
    }
  },
  data () {
    return {
      actionsDialog: false,
      selectedId: 0,
      filter: '',
      form: {
        page: null,
        per_page: 10,
        searchText: ''
      }
    }
  },
  created() {
    if(this.$route.query.page) {
      //@ts-ignore
      this.form.page = Number(this.$route.query.page)
    } else {
      //@ts-ignore
      this.form.page = 1
    }
  },
  methods: {
    ...mapActions(useBlogStore,['WatchapiRequest']),
    rowClicked (event : any, row :any) {
      if (this.$q.screen.lt.lg) {
        this.actionsDialog = true
        this.selectedId = row.id
      }
    },
    isModalVisible (val :any) {
      this.actionsDialog = val
    },
    actionClicked (event :any) {
      this.actionsDialog = false
      const action = event.target.offsetParent.getAttribute('data-event')
      this.$emit(action, { row: { id: this.selectedId } })
    },
    async search() {
      let data = {
        method: 'get',
        //@ts-ignore
        data: {store_name: this.store_name},
        //@ts-ignore
        url: this.url + '?page=' + this.form.page + '&searchText=' + this.form.searchText,

      }

      await this.WatchapiRequest(data)
    },
    changePaginationPage(page_number:any) {
      return this.$route.path + '?page=' + page_number;
    },
  },
  watch: {
    '$route.params': {
      async handler() {
        if(this.$route.query.page) {
          //@ts-ignore
          this.form.page = Number(this.$route.query.page)
          await this.search()
        }
      }
    },
    'form.searchText': function () {
      if(this.$route.query.page && this.$route.query.page == '1' ) {
        this.search()
      } else {
        this.$router.push({ path: this.$route.path, query: { page: 1 }})
      }
    }
  }
})
</script>
<style lang="scss" scoped>
.q-btn {
  margin-right: 5px;
}
.bg-datatable{
  background-image: linear-gradient(to left, #827a70 0%, #304352 100%)
}
</style>

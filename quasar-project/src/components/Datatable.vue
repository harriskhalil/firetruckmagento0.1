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

      >
        <template v-slot:top-right>
          <q-input
            class="bordered-light-grey "
            dense
            debounce="300"
            bg-color="grey"
            v-model="filter"
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
      // pagination: {
      //   rowsPerPage: 10
      // }
    }
  },
  methods: {
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

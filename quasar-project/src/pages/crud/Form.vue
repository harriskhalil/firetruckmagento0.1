<template>
  <q-page padding class="bg-color ">
    <div class="row q-col-gutter-sm page-title">
      <div class="col-12">
        <div class="page-title text-h5 q-ma-md text-center text-white">
          {{ this.$route.params.id ? 'Edit Blog' : 'Add Blog' }}
        </div>
      </div>
    </div>


    <form @submit.prevent="AddUpdateUser" class="full-width q-gutter-md">
      <div class="row q-ml-none q-col-gutter-sm ">
        <q-card  class="col-xs-12 col-sm-6 col-md-6 offset-sm-3 offset-md-3 " >
          <q-card-section>
            <!-- Add users-->
            <div v-if="this.$route.path === '/blog/add'">
              <q-input

                ref="title"
                type="text"
                filled
                v-model="blog_data.title"
                label="Title *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
              <q-input
                ref="excerpt"
                type="text"
                filled
                v-model="blog_data.excerpt"
                label="Excerpt *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
              <q-input
                ref="paragraph"
                type="textarea"
                filled
                v-model="blog_data.paragraph"
                label="Paragraph *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />

            </div>


            <!-- Update users-->
            <div v-if="blog_data && blog_data.length>0"  v-for="items in blog_data" >
              <q-input
                ref="title"
                type="text"
                filled
                v-model="items.title"
                label="Title *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />

              <q-input
                ref="excerpt"
                type="text"
                filled
                v-model="items.excerpt"
                label="Excerpt *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
              <q-input
                ref="body"
                type="text"
                filled
                v-model="items.paragraph"
                label="Paragraph *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
            </div>
            <div class="row q-col-gutter-sm q-ml-none">
              <div class="col-xs-12 col-md-4 offset-md-1">
                <q-btn label=" " icon="people" type="submit" color="green" class="q-py-md full-width">
                  {{ this.$route.params.id ? 'Update Blog' : 'Add Blog' }}
                </q-btn>
              </div>
              <div class="col-xs-12 col-md-4 offset-md-2">
                <q-btn @click="customerCancelLink" label="Cancel"  icon="cancel" color="red" class="q-py-md full-width" />
              </div>

            </div>
          </q-card-section>
        </q-card>

      </div>
    </form>


  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {mapActions, mapState} from "pinia";
import {useBlogStore} from "stores/blog/BlogStore";
import {Loading, Notify} from "quasar";
import {store} from "quasar/wrappers";
export default defineComponent({
  name: 'Form',
  data(){
    return{
      blog_data:[]
    }
  },

  methods:{
    ...mapActions(useBlogStore,['getBlog','UpdateBlog','AddBlog']),
    customerCancelLink(){
        this.$router.push('/blog')

    },
    async AddUpdateUser(blogs :any){
      if (this.$route.params.id){
        Loading.show()
        var object = this.blog_data.reduce(
          (obj:any, item:any) => Object.assign(obj, { [item.key]: item.value }), {});
        await this.UpdateBlog(this.blog_data[0])
        this.$router.push('/blog')
        Loading.hide()
      }else{
        try{
          Loading.show()
          await this.AddBlog(this.blog_data)
          this.$router.push('/blog')
          Loading.hide()
        }catch (e){
          //@ts-ignore
          console.log(e)
        }
      }
    },

  },
  computed:{
    ...mapState(useBlogStore,['blogs']),
  },
  async created(){
     if (this.blogs && this.blogs.id  ===''){
       Loading.show()
       await this.getBlog()
       Loading.hide()
     }

    if (this.$route.params.id){
      Loading.show()
      //@ts-ignore
      this.blog_data= this.blogs
      this.blog_data =this.blog_data.filter((data :any)=>{if (data.id === Number(this.$route.params.id)){return data}});

      Loading.hide()
    }
  }
})
</script>

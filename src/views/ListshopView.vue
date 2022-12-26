<template>
<div class="page-wrap">
    <h1 class="app-name">To Shop List</h1>
    <router-link to="/form_shop" class="to-form" v-if="itemCheck">You can add item here</router-link>
    <div class="list-wrap">
        <div class="list" v-for="item in items" :key="item.item">
            <h2 class="list-title">{{ item.title }}</h2>
            <!-- <div class="list-time">
                <fa class="fa-clock" :icon="['far','clock']" />
                <p class="list-time__text">{{ item.date }}</p>
            </div> -->
            <router-link :to="{ name: 'form_shop' ,params: {'item_id': item.id}}">
                <fa class="fa-pen" :icon="['fas','pen']" />
            </router-link>
            <fa @click="deleteCheck(item.id)" class="fa-trash" :icon="['fas','trash-can']" />
        </div>
    </div>
</div>

</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'ListshopView',
    created(){
        // store内のindex.js/stateからデータitem[]をとってくる
        this.items = this.$store.state.items
    },
    data(){
        return{
            items: []
        }
    },
    methods: {
        deleteCheck(id) {
            if(confirm('Do you really want to delete this item?')) {
                this.deleteItem(id)
            }
        },

        ...mapActions(['deleteItem'])
    },
    computed: {
        itemCheck(){
            return this.items.length === 0
        }
    }
}

</script>

<style lang="scss" scoped>
.page-wrap {
    padding-top: 96px;
    padding-bottom: 72px;
}

.app-name {
    color: #FFFFFF;
    font-size: 24px;
    text-align: center;
    margin-bottom: 36px;
}

.to-form {
    color: #FFFFFF;
    display: block;
    font-size: 18px;
    text-align: center;
}

.list-wrap {
    display: flex;
    flex-flow: column;
    row-gap: 24px;
}

.list {
    background-color: #FFFFFF;
    border-radius: 2px;
    height: 40px;
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: relative;

    &-title {
        color: #221233;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        // margin-bottom: 24px;
    }

    &-time {
        display: flex;
        align-items: center;
        justify-content: center;

        &__text {
            font-size: 14px;
            font-weight: bold;
        }
    }
}

// .fa-clock {
//     margin-right: 4px;
// }

.fa-pen {
    position: absolute;
    top: 14px;
    left: 14px;
}

.fa-trash {
    position: absolute;
    top: 14px;
    right: 14px;
}

a {
    color: inherit;
}

</style>

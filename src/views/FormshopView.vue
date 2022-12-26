<template>
<div class="page-wrap">
    <h1 class="app-name">Add To Shop</h1>
    <div class="form">
        <div class="form-to-do">
            <label for="" class="form__label">To-shop</label>
            <input v-model="item.title" type="text" name="title" class="form-to-shop__input">
        </div>

        <!-- <div class="form-time-wrap">
            <div class="form-time">
                <label for="" class="form__label">Date</label>
                <input v-model="item.date" type="date" name="date" class="form-date__input">
            </div> -->
            <!-- <div class="form-time">
                <label for="" class="form__label">End-time</label>
                <input  v-model="task.end" type="time" name="end" class="form-time__input">
            </div> -->
        <!-- </div> -->
        <button @click="submit" class="submit" :class="{disabled: nullCheck}" type="submit" :disabled="nullCheck">OK</button>
    </div>
</div>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'FormshopView',
    data(){
        return{
            item: {
                title: '',
                // date: '',
                // end: '',
            }
        }
    },
    created(){
        // URLにパラメーターがない場合/formを返す
        if(!this.$route.params.item_id){
            return
        }
        // getAddressByIdにURLのパラメーターを渡して一致するタスクオブジェクトを取得
        const item = this.$store.getters.getitemAddressById(this.$route.params.item_id)
        if(item){
        // パラメーターが一致するときはitemを復元
            this.item = item
        } else {
        // 一致するidがなければlistに戻る
            this.$router.push({name: 'list_shop'})
        }
    },
    methods: {
        // itemの中身をsubmitが押されたときに送る
        submit(){
            if(this.$route.params.item_id) {
                this.updateItem({id: this.$route.params.item_id, item: this.item})
            } else {
                this.addItem(this.item)
                console.log("item_test")
            }
            // routerにアクセスしてlist_shopというnameがついたページに遷移
            this.$router.push({name: 'list_shop'})
            this.item = {}
        },
        ...mapActions(['addItem','updateItem'])
    },
    computed: {
        nullCheck(){
            return this.item.title === ''
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
    margin-bottom: 48px;
}

.form {
    background-color: #FFFFFF;
    border-radius: 2px;
    box-shadow: 0px 3px 6px rgba($color: #000000, $alpha: 0.16);
    height: 120px;
    width: 300px;
    margin: 0 auto;
    padding: 10px 30px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
}

.form__label {
    color: #404040;
    display: block;
    font-size: 14px;
    margin-bottom: 4px;
}

.form-to-shop__input {
    border: none;
    border-bottom: 0.5px solid rgba($color: #404040, $alpha: 0.16);
    width: 100%;
    font-size: 20px;
}

input[type="text"]:focus {
    outline: 0
}

// .form-time {
//     display: flex;
//     justify-content: space-between;
//     margin: 5px auto;
// }

// .form-date__input {
//     height: 32px;
//     width: 150px;
//     border-color: rgba($color: #404040, $alpha: 0.5);
//     border-radius: 2px;
//     font-size: 14px;
// }

.submit {
    background-color: #cc4799;
    border-radius: 50px;
    border: none;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    display: block;
    height: 32px;
    width: 240px;

    &.disabled {
        opacity: 0.5;
    }
}

</style>

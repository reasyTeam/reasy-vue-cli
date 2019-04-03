<template>
    <transition name="slide-up" mode="out-in">
        <v-elem>
            <keep-alive>
                <component :is="addComponent" @change-place="replacexxxx"></component>
            </keep-alive>
        </v-elem>
    </transition>
</template>

<script>

import status from '@/pages/status/status/status';
import login from '@/pages/login/login';
export default {
    //inject:["translate"],
    created() {
        
    },
    data() {
        return {
            addComponent: login,
        };
    },
    methods: {
        replacexxxx() {
            this.addComponent = status;
        }
    }
};
</script>
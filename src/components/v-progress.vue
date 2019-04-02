<template>
    <div class="progress-content"
        :style="{'text-align': textAlign}">
        <div class="progress-percent"
            :style="{'width': percenter + '%'}">
            {{percenter + '%'}}
        </div>
    </div>
</template>
<script>

let defaults = {
    required: true,
    textAlign: "center",
    intervalTime: 0,
    callback: function() {}
};

export default {
    name: "v-progress",
    props: ["percent", "textAlign", "intervalTime", "callback"],
    created() {
        this.textAlign = this.textAlign || defaults.textAlign;
        if(typeof this.callback != "function") {
            this.callback = function() {};
        }
    },
    data() {
        return {
            progressTimer: null,
            max: 100,
            percenter: this.percent|| 0
        };
    },
    mounted() {

        clearTimeout(this.progressTimer);
        if(this.intervalTime > 0) {
            this.update();
        }
    },
    methods: {
        update() {
            let _this = this;
            clearTimeout(this.progressTimer);
            this.progressTimer = setTimeout(function() {
                _this.update();
               
            }, this.intervalTime);
            _this.setPercent();
        },
        setPercent() {
            if(this.percenter >= this.max) {
                clearTimeout(this.progressTimer);
                this.percenter = this.max;
                this.callback();
                return;
            }
            this.percenter = this.percenter+1;
        }
    },
    destroyed() {
        clearTimeout(this.progressTimer);
    }
};
</script>
<style lang="scss">
    .progress-content {
        background: #e7e7e7;
        border-radius: 6px;
        height: 16px;
        .progress-percent {
            height: 100%;
            line-height: 16px;
            padding-right: 6px;
            background-color: $main-active-color;
            color: #fff;
            border-radius: 6px;
            font-size: $font-size-small;
        }
    }
</style>
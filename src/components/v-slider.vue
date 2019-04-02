<template>
    <div class="form-swicth form-el-content">
        <div class="form-slider">
            <div class="slider-content" :style="{'width': maxWidth + 'px'}">
                <div class="slider-percent" :style="{'width': left + 'px'}"></div>
            </div>
            <div
                class="slider-box"
                @mouseover.stop="bindEvent"
                @mousedown.stop="mouseStart"
                :style="{'left': left + 'px'}"
            ></div>
            <div class="slider-number">{{vText}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "v-slider",
    props: ["min", "max", "value"],
    data() {
        return {
            perNum: 0, //每次最少移动
            maxWidth: 200,
            startX: 0,
            endX: 0,
            percent: 0,
            vText: 0,
            left: 0,
            lastLeft: 0,
            moveStart: false
        };
    },
    created() {
        this.vText = +(this.value || this.min);
    },
    mounted() {
        this.perNum = this.maxWidth / (this.max - this.min);
        
        this.left = this.perNum * (this.value - this.min);
    },


    methods: {
        bindEvent() {
            window.addEventListener("mousemove", this.mouseMove, false);
            window.addEventListener("mouseup", this.mouseUp, false);
        },
        mouseStart(e) {
            this.startX = e.pageX;
            this.lastLeft = this.left;
            this.moveStart = true;
            document.body.addClass("no-select");
        },
        mouseMove(e) {
            if (this.moveStart) {
                
                this.endX = e.pageX;
                this.left = this.lastLeft + this.endX - this.startX;
                if (this.left < 0) {
                    this.left = 0;
                }

                if(this.left > this.maxWidth) {
                    this.left = this.maxWidth;
                }

                this.vText = Math.round(Number(this.min) + this.left / this.perNum);
            }
        },
        mouseUp(e) {
            this.moveStart = false;
            window.removeEventListener("mousemove", this.mouseMove);
            window.removeEventListener("mouseup", this.mouseUp);
            document.body.removeClass("no-select");
        }
    },
    destroyed() {
        window.removeEventListener("mousemove", this.mouseMove);
        window.removeEventListener("mouseup", this.mouseUp);
    }
};
</script>
<style lang="scss">
.form-slider {
   
    position: relative;
    .slider-content {
        height: 10px;
        background: #d7d7d7;
        border-radius: 4px;
        height: 100%;
        .slider-percent {
            border-radius: 4px;
            height: 10px;
            background: $main-active-color;
        }
    }
    .slider-box {
        transform: translate(-50% ,-30%);
        background-color: #fff;
        position: absolute;
        top: 0;
        width: 20px;
        height: 20px;;
        border-radius: 50%;
        border: 1px solid #ccc;
        cursor: move;
    }
    .slider-number {
        margin-top: 10px;

    }
}
</style>
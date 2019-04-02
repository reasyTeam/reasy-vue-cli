<template>
    <div class="slot-content">
        <header >
            <div class="header">
                <slot name="header"></slot>
            </div>
        </header>
        <div>
            <div class="main">
                <slot name="main"></slot>
            </div>
        </div>
        <div class="other">
            <slot></slot>
        </div>
        <footer >
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </footer>
    </div>
</template>

<style lang="scss">
.slot-content {
    width: 80%;
    margin: 20px auto;
    .header {
        background: #ff0;
    }

    .main {
        background: #0ff;
    }

    .footer {
        background: #f0f;
    }
}

</style>

<script>
export default {
    name: "tpl-slot"
}
</script>



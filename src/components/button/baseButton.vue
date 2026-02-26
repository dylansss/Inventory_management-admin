<template>
    <button class="base-button" :class="[
        `base-button-${type}`,
        {
            'base-button-disabled': isDisabled,
            'base-button-loading': loading
        }
    ]" :disabled="isDisabled" @click="handleClick">
        <div class="disabled-mask"></div>
        <i v-show="loading" class="el-icon-loading"></i>
        <span>
            <slot />
        </span>
    </button>
</template>

<script>
export default {
    name: "BaseButton",
    props: {
        disabled: Boolean,
        loading: Boolean,
        type: {
            type: String,
            default: "default",
        },
    },
    computed: {
        isDisabled() {
            return this.disabled || this.loading;
        },
    },
    methods: {
        handleClick(e) {
            e.preventDefault();
        },
    },
};
</script>

<style lang="scss" scoped>
/* 按钮样式 */
.base-button {
    font-size: 16px;
    height: 36px;
    padding: 0 25px;
    line-height: 36px;
    box-sizing: border-box;
    text-align: center;
    background: url(../../assets/imgs/system/btn-default-bg.png) 100% no-repeat;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 6px;
    color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    user-select: none;
    border: none;
    outline: none;

    .slot {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-align: center;
    }

    .disabled-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #ffffff63;
        cursor: not-allowed;
        display: none;
    }

    .el-icon-loading {
        position: absolute;
        display: none;
        font-size: 16px;
        top: 7px;
        right: 35%;
        cursor: not-allowed;
    }
}

/* 填充按钮：无边框白色字体绿色背景 */
.base-button.base-button-inner {
    background: url(../../assets/imgs/system/btn-inner-bg.png) 100% no-repeat;
    background-size: 100%;
    background-repeat: no-repeat;
    color: #036cc7;
    border: 1px solid #b0c8de;
}

.base-button.base-button-red-inner {
    background: url(../../assets/imgs/system/btn-inner-red-bg.png) 100% no-repeat;
    background-size: 100%;
    background-repeat: no-repeat;
    color: #d86c86;
    border: 1px solid #ebaaab;
}



/* 加载中 */
.base-button.base-button-loading {
    .disabled-mask {
        display: block;
    }

    .el-icon-loading {
        display: block;
    }
}

/* 禁用状态 */
.base-button.base-button-disabled {
    .disabled-mask {
        display: block;
    }
}

.base-button+.base-button {
    margin-left: 10px;
}
</style>
<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        New folder name
                    </div>

                    <div class="modal-body">
                        <input type="text" name="foldername" id="foldername" ref="foldername">
                    </div>
                    <span class="container--buttons">
                        <button class="modal-default-button"
                                @click="this.$emit('ok', this.$refs.foldername.value)">
                            OK
                        </button>
                        <button class="modal-default-button" @click="this.$emit('cancel')">
                            Cancel
                        </button>
                    </span>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Modal"
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 20rem;
    margin: 0 auto;
    padding: 2em;
    display: flex;
    flex-flow: column;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

@media screen and (max-width: 900px) {
    .modal-container {
        width: 60%;
    }
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

input[type="text"] {
    width: 100%;
}

.container--buttons {
    width: 50%;
    margin: 0 0 0 auto;
}

.container--buttons > button {
    margin: 0 0.5em;
    padding: 0.2em 0.5em;
}
</style>
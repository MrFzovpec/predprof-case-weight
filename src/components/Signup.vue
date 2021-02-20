<template>
    <div id="signup">
        <form action="">
            <h1 class="title is-1">Регистрация</h1>

            <div class="control">
                <label class="label" for="">Почта</label>
                <input
                    v-model="credentials.email"
                    type="email"
                    class="input"
                    placeholder="Почта"
                />
            </div>
            <div class="control">
                <label class="label" for="">Пароль</label>
                <input
                    v-model="credentials.password"
                    type="password"
                    class="input"
                    placeholder="Пароль"
                />
            </div>

            <span
                @click="$emit('signup')"
                v-if="credentials.email.includes('@')"
                class="btn button is-success"
            >
                Регистрация</span
            ><button v-else disabled class="btn button is-success disabled">
                Регистрация
            </button>
            <br /><br />

            <span class="change" @click="$emit('toLogin')"
                >Уже зарегестрированы? Войти</span
            ><br />
        </form>
    </div>
</template>

<style lang="scss">
    form {
        padding-bottom: 3%;
    }
</style>
<script>
    export default {
        data() {
            return {};
        },
        props: {
            credentials: Object,
        },
        methods: {},
    };
</script>

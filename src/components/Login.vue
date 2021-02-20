<template>
    <div id="login">
        <form action="">
            <h1 class="title is-1">Вход</h1>
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
                @click="$emit('login')"
                v-if="credentials.email.includes('@')"
                class="btn button is-success"
            >
                Войти</span
            ><button v-else disabled class="btn button is-success disabled">
                Войти
            </button>

            <br /><br />
            <span class="change" @click="$emit('toSignUp')"
                >Нет аккаунта? Зарегистрироваться</span
            >
        </form>
    </div>
</template>
<style lang="scss"></style>
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

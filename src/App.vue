<template>
    <div id="app">
        <div id="nav">
            <div v-if="isLogged">
                <span>Пользователь: {{ nickname }} | </span>
                <a @click="logout()">Выйти</a>
            </div>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #2c3e50;
        min-height: 100vh;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

<script>
    import Authentication from "@/views/Authentication";
    export default {
        name: "app",
        async mounted() {
            setInterval(() => {
                this.isLogged = Authentication.user.authenticated;
                this.nickname = Authentication.user.email;
            }, 200);
        },
        data() {
            return {
                isLogged: null,
                nickname: null,
            };
        },
        methods: {
            async logout() {
                Authentication.logout(this, "/auth");
            },
        },
        computed: {},
    };
</script>

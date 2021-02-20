<template>
    <section class="container login-container">
        <div class="">
            <div v-if="actionType == 1" class="login-container__form">
                <Login
                    :credentials="credentials"
                    @toSignUp="changeType()"
                    @login="submitAuthentication()"
                />
            </div>

            <div v-else class="login-container__form">
                <SignUp
                    :credentials="newUser"
                    @toLogin="changeType()"
                    @signup="submitSignUp()"
                />
            </div>
            <span :class="'message is-' + type">{{ message }}</span>
        </div>
    </section>
</template>

<style lang="scss">
    .login-container {
        padding: 10%;
        &__form {
            form {
                input {
                    margin-bottom: 30px;
                }
                span.change {
                    font-weight: bold;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>

<script>
    import Login from "@/components/Login.vue";
    import SignUp from "@/components/Signup.vue";
    import Authentication from "@/views/Authentication";

    export default {
        async mounted() {
            setInterval(() => {
                if (
                    Authentication.user.authenticated &&
                    this.$router.currentRoute.path === "/auth"
                ) {
                    this.$router.push("/");
                }

                //
            }, 500);
        },
        data() {
            return {
                actionType: 1,
                type: "",
                message: "",
                newUser: {
                    email: "",
                    password: "",
                },
                credentials: {
                    email: "",
                    password: "",
                },
            };
        },
        components: {
            Login,
            SignUp,
        },

        methods: {
            changeType: function() {
                this.credentials = {
                    email: "",
                    password: "",
                };
                this.newUser = {
                    email: "",
                    password: "",
                };
                this.actionType = 1 - this.actionType;
                return;
            },
            submitAuthentication() {
                console.log(this.$cookies);
                Authentication.authenticate(
                    this,
                    this.credentials,
                    this.$cookies,
                    "/"
                );
            },

            submitSignUp() {
                Authentication.signup(this, this.newUser, "/");
            },
        },
    };
</script>

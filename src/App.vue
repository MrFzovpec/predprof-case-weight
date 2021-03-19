<template>
    <div id="app">
        <div id="nav">
            <img class="logo" src="@/assets/logo.png" alt="" />
            <div class="profile_block" v-if="isLogged">
                <span
                    ><img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAUzElEQVR4nO2deYxkV3WHv/Oqq/fqZXpWzwzj6cU2Y4LBe2RslgjBLEpEJEBKMCRBJMFWIEoUmQiILCQIRkqIHLaQoCjYKAIhJSSeHhMiFmOMGY9tjBk8dvd0j2fvWXqZru6qrqr3Tv449apeVVdV1/Kqux38k0ZT/bZ73z33nnv2B6/iVbyK8pC17kAt+NZRbe3tZFA9dqhHP0KXQjdCFwDKgkAcZUEcZsTh9MBljt98s6TXuOtVY90S5HvHtTftcZeKdyfIHoFrgN1AS42PygCTKC8i+isV58fi8di+EbkSfq8bx7ohiKrKoxPcoZ53QJG3inATEGlSc64qT4N+X8R5ZO8QT4iINqmtmrDmBBkd0yHFu1tE7gYGi8+LQHcUulqhKwpdUaEzCi0ORASiEfsfwFVIu/Z/xoPFNCyklYUULKQhngYtPezHRfQh13UeOnCNTDTzfVfCmhFkdFz3gt4H3BXshwA9bTDQARs6hA3tEHHCadP1YDoJlxPKdAKuLEERfRT4kSIP7B+WR8NptTasKkHuV3VuHWe/op8Q4dbgue5W2B4TtsegrVmMqghpD87H4cy8MpMsPKfKcyLy9/EhvvEeEXd1erSKBBkd17eBPghc7x9rcWBnD+yICd2tq9WT0phPwel55dQVW0kBPC8qH9k7Ij9cjX40nSAHJ3Wr43qfU+R9fnstDrymBwb7hWhI7CgsZDw4eQUmZpR0kDDKIyAf3jcip5vZftMIoqoyOs49IvppoBds8x3qF3b1GlHWMzIenJgzwrj5jWYOkb/eO8hXmiWVNYUgo2Pag6P/gvJu/9jmTtizSeioVYtYYyQz8NK0cma+4PB/OW3yh+/cKdNhtxc6QQ6+pLeJo98EdgG0t8D1m4TNnWG3tLq4sABHLynJjP2twqSDvHfvkDwVZjuhEmR0XD8E+kUgCrYqXr9ZiK6S1NRspF147oJycTF3KCUq9+wdka+F1UZoBBk9rveh+lkwZW6oD4Y3yNprnk3AiTl48bLi+buI6gP7RiIfC+PZDY/X/arObRPeg6pyL0DUgZu2Cf3tjXfOR8aDuSWYSUI8pSymjbd7arqEIyYkdLSYPtPfLmzqNHbZLMwk4elzQUlMv3B4yPno/SJepftWQkMEMUXPewiR3wMbgFu2haNTuB6cW4DzceVSoqzJoywE2NgJw/1CX4iTI4h4Cp46l99XUP3G4WHn/Y0QpSGCjI67/wDyUTA70y1XNS5FLWVgck45fYVCPSCLzih0thjxW7N7k6eQcmHJtZWUKbpvUyf8xiahrQkrZiljRJlPZQ+ofnnfSOSeep9XN0FGx/WToJ8CYxO3XSW5AaoHrsLkLEzMaoGm3BaBzV2wudNm+kptqMLsEpyLG1F9HaI1AjdsETZ21N/Hcki58OQZZSHndZFP7BuWT9fzrLoIcmhc/1jRfwKbqbdvb2xlzC3Bc1PBFzLj4q5eE5elzmmTcuHFaSMM2F7zxq3NEcETGSNKln2pqHyoHumr5lc9dFxvUdXHgdaoA7dtF2IN7Bkvz8GxgMTS2wbXDggDIc7k8wtGcE+NKLdvF3rbwnu+j3jKiJJltWlRefPeEflpLc+oiSCPvKz9TlqfAa4WMTbViDR17LIyOWu/HYGRDcLuvuaYDy4n4Mg5I0pnFN60U3J+lDAxk4SfnVVUTXlMOXLju3bLbLX3V21RUlVx0vo14GqAazc0RoyjF/PEaMuyvcEmEQOMBV43YE9fTMPzF5STczC1ALNJ8jpFg+hvh2s2WDui7G7z9OuqWvVrVX3hwTG9V0S/AKaB37St/qEbn4GxaRuBWCvcvE2aqjP4UOCJ08qVpeXnImLS2M4eYWMIe8yRc3mNXkU+vH9IvlLNfVWN6qMndJuX0WNAT3sLvGlH/eaQ83F4dsqI0RW1PWi1HFIA5+Lw86nKy6GvHV63qbG9MeXCT07nNvnZtCPX/c6gTK10X1Xz0s14fydID8D1G+snRiIDv7xog9EaMb1lNYkBsK0btnXbPMx4prtcWYJLCeV83I7NJm0l7dko7Oypr53WCOzZKDxzXgH6op73OeADK9234go5+JLeJY7+EJAtXXDj1vpZ1eGzyuWENXrTNjNvrCdkPNODJmfze8p1AyZo1IunzysXFgBQD/mtA8Pyg0rXV9zU71d1xNEvARIReO3G+okxtWCSDsCuPtYdMcDsYddsEG4PsNFjl5Vz8fqfuWcgJ82JqH5+pQ2+IkFumeBdZH3gQ/31K3+e2ouBad4j/evbBtzbZnubbxX45UUlkal8Tzl0RM1VDSDCDaPj/Hal6ysSRFQ/BmbB3dVbX4fANtLFrBZ+7YCse/ctmMBxw+b8XvPCpfrl4qt7ycUOiOjfVFolZYfG4qa4GeDqvsZ84C/P2cu0t8BV3fU/Z7WxsRO2WtQwUwtm4qkHLYUT+sZD47y93LUVhlnvyz+sfhYzk8y/yNW9Urddaq1w7YDgZPt8YraRVSK5gD8RLevMKkmQ0TEdwiIK2dlDQ6E65+Ka7QTsqFOEXEt0Rs3aDLZK3Do9HdEIORFa4S3fPaa7S11XcqgV726yIvH2WGNTespEPjZ2NEbYMFDsJ6kW27psDFyFC4srXFwBO/NjKW4L7yt1zbIhUlURkfeBSRuNaKtzS+S8aVu715ZXLbnw2Enl7PzK1xZjU1c+vvhyon621d1qccsGfX+pzX0ZQR6d4A5gCOCqBlfHbCBeNkxzej04elFZykaNjM/UNqgRgb7sQBbHANeK7fmJOXxonNuKzy9fIZ53AIxfNSoRzSbz0tVaBsidvpJnnQBj0xY1Ugt8TrGQbswyvC0WDPW3sQ5iOVcXeRvY0mrEJQvmSoX87FoLTCcswA1MKe2I2vGJWThdA/uKtdowqlLg2awVbRGIZcdDkLcWny8gyPeOay9wIzTOYjyFRLbjaxXZPp2AI+fznsI3bhVuDxg0j15cnoZQDl2Bd0jWqbX78MdW4dbRMS2QPQsIkvF4M9k0soGOxvaPZCafDNMZXf0N/VzcokFcz0TuG7aYQ629xQykjtikeW5KqxJlg9xiqcFskcDYtjgOdwbPFRDEE+9NYC/QaKBb0PazmvuHq2bm+HnAh37DZslp3GD+jj1ZQ2kiQ1WbfNDdW6/47KO/PR+44XleeYKA7AHL6Ws0jWwpQJDV8AaCSUBPnFZOzNnfUccC97aVEE529sCGLOt4ec4cSpUQNB016u5tccxWBoDIa4PnCoZd4Foo5Jf1IpBTEVqOYDnMp8xl+uQZJZ4NWNvQAXfslNygl4Lv+3Y1b28rh0iIBIEAQbJj7iPXzLeOaivZAIbAxXWjgCBN2EJcD87Mm9PrJ6fy/uuIY/anW6uIouxvJxdmen6h8rVegE2F8T6BMR48ckRzf+W63BllyP+7K4RN2A35BVzPVsLckmnLlxKFbYjAzphF3NfiFt7aJcwmbWUtps12VQqZkFd8d6uQFXuiU/3sBl6CAEEcYaf/u1ynVhMKXFyAC4smmi6klqUwAybXb49ZtEg9/Q6ytPlU+XcP7jFh2OSCqzcCr6GYIOoQ87PmwnAgOYFV4Sq01LBKzsUtjWyxjALW1mLGym3dFrLTyAIMDkwl/SIZspASDBRRJeb/zq8QJebPwDAIEnxGxqvuma7CLy5Y9EfwOf3tZujsabPQnDBXcFC/KBVt7yNsggQnqFKCIAUHQyBIe9HMW+klPIVnztneAFnf+wbhqu7mS2k+VJVy6y2esukakXAIEnynkisEJeb3JYxNuJggK+HY5TwxNnWaZr3W/pMg4ln22dUaTrhr0aTPmU+aprJ1Rq3jSv5lymEmacoZ2CbrmzbWE3z9prvJAk+eTkLO9umGoPgEl7a/3MthMuurjjhm5lhvxMh4+VXe3RpO54rML7naXTmCCHmCNGqr8eFbef3ZVQppDz+yjx2x1TOz1IJg/8OyXBfpULmxzxHEk/AJ0hVw6pRbIzOJ/LmtXetsaWTRDIIEFc3gYsivEK8JKySr8XtKWZ0iaBWOraEjqxLiaRs9R8ITudMBRbP0ClFO+b/LDV6tCAZIlGNbQdl/PUlVQfgZtt0hSVhQOBFdOOn/zg3BYprjWMFIFtLhpBN1V0EQrTUBfQ0QDxAkvGfm3ju9ZYZJ/48cQd5zvaSAE9CYzziIFicgaYVE5NVGgYQVouczMMYTwTK2BUxC4UUwQ15Y8Amy1KAfeq0QnJxh+IlKPPfF4PEirq2/AlPk6g2ZLIZvKyrnkXMCwb5rwb2CbTolAo+TTXBFZ7wAQVRfCJ4r9Biq82O/k9MNBoT58AlSznBXYIRcA4IE2yxlwwsGNLSHlH43k8xPBHGcx4LnCroQdXgMcAGmGwiZLHomUF6UDg5Co+E19SARYEmlcieDnCKsvJZAOGpGPR4Pnito4u1DMmcVn/PpZ43CXxnlXiboLi6VrtxsBNss5bp2C1haOG36YytwuLjkeYlh0u+DdbTR+CPICwjl+G9QlJxJrj7PmlnKpktQ2nAY1I1SIeyrSy7MZyeBlx3rIJYRRMR5BMyc0UiyI9hG7oeTlqst0uLkiRLWqqwFfpuxttJ+l+CEmQ1hXz07HzAjeTbWQSzrwr5h+QlZ/+6Z+cZm7Ll4fvPaVMFO5VdOWEyvHB8VJpKZ/B5SLiu4rz3PbicayKDyERjTsX0jHC4+XzphR/XfwdjWfJ06iadwIpBbWClWOGhU9P0iq4HJwABvK5O/EhGzQoOtkFMNfOQinsqPpyJfL1X7tyRBBOchsivrdJ2rZHI2bxMb7KtcDLO/Pc8aJueqi7VtFOlsBWtYOTEpGFp09KJytk5WfupKbizVifBwqWtKEmTfiBwHfgSULbVXCXNL+XjZnjaqKk+xO5tY6mYrSjcbEzP5Gl2DfZXFp6hjkfOO2Cx9bkr5xQWtyfqQduFUPv3hB3t3y4lS15WVrBV5ALIlt2vgnckMPBNIAXh9lR7A7bG82Dk2Uz4EKAzMp2AyS/SeNthaRWJSf7vFCfu6ypl5+NFJ5fkLVi5kpfDS4MpXRz5b7rqyBMl+P+MI2IytxkeSyMCTZ/NVOq8bqL6ijkg+Il3VaoQ0Qwj21Mq7qpqo+7pN1SsXGzrgzp354G1XLenn6fOVJ1DGg5PZCaDK4f2D8r1y11au5IB8xn/gSmxkJgk/Pa05qWW4v/bqDxs78+wtnlq5jFKtUGzwfF/EYH95cbwc2iL2eQ0/MkewOIBKpvnJ2Xx9X4fKxTErEuRnQ3wHeB6M55ar93Flycra+Ypka6S81LIS9mzMV6o7H7ckzbDw7JRyKRuUvanT4r5qgQInZi0ry/VX2GZhS1f5exbT5CrnAc++c5j/rtRG5WpAIp7jyL2A+okwpdDTBjdvzUebp1x4/JRtfLWWo3CksHrC2Xn46RltKBLG9ayY2FRWOopk6zvWQo4rS1bg8oXLxu6cbFbWjljl+164lOu7ispfrPSZi6r6NDrmPozI7wPctFVylQ2K4XpWlvXkXGFQQ6zVZuRAh9ARNaupiPHglGvK2ULaTCfTydK+k1YH3rC19mqllxLG+tIlFM62FtjQbqXJO6PmL2/NfmRMMQFlOmGif1BL74jCG7esXNl0agG/gBmg/7ZvOPIHK/W3KoIcnNSt4uoxoLeaEn/xlIm95+Plo02qQWvENuGgQNEVhR09NjPLZQmnXNtsT18prAXc4tjMrtca4Ijti8P9K1c0KirxNxNBrnvHsFxYqY2qV+2hMb1HRb8INttvrqIIZjJj4uH5BWV++RfRlqE1Yptsf7tFtfe0mcQ1MbvsSzd0tMAbtiyv6z6TND0huN9FHBjqy5agFZsw0wmYTioziZWNqO0tVhrwNTWkPASLYAryJ3uH5avV3Fc1QVRVRo/rtwV+F2ovfZfxzNC4lLHZoxhr8L9q0BWlYm32tGf7yakrWmDOCWZBzSYLKy3EWi1v5KpY5YiWpYyxzETG+hksTx7LlsOoZb+ZmA0UJhC+vW/IeXflO/KoScz4j0nta/X0GVF2h1FIuV4s+35HERyxCdNI0bV6MZ2Aw1k9BzgeFbnp7UNSte2hoVLjLY4VQG6kQE29SGYsUfNSIu+f7opaIs+u3tWpA1yMolLjSx5yx4FhebqWZ9SlLBwa0w+q6D8DEkYx/v8PKC7GryIf3D8k/1rrc+ryElvVf/kk2Ex96qyuqh9jvSHl2hjkPhim8vF6iAGNftBlzP08In8O4X3Q5ZWG4g+6qOiX9g9F7q33eQ3FURwedv4S1W+A8fFg4v6vA+ZT8MSZAmI8/NSg82eNPLMhgtwv4h0edt4P+o9g7OvJM9VX2HklYzoBPzsTYFPog08NOh9Y04+CBZH9bN7fAvLr8Nm8Y5dzoq2q6qf2j0TuD+PZoY5XVvr6EtAKptG/fnNj36ZaT0i5lrYd+LDkUvZTFHVt4KUQ+gQ+dFxv8dBvirIbsp9e3VjeIPlKwdQC/Crw6VVgwkPeU6uesRKawlFGx7QH8b4K8l7/2OZO83V0rIOyHbVgMW2EuFhYHvY/vaj80YFdMhN2e01l8QeP65+K7St9YLarwX6r8rze679nPPP0Tc4WhJPOCPKxag2F9aDpe+7/vqADqaj3GZAP+e21OBbUMNS/+h90WQlp1+LJXp4riLZRQR9OOc5fVfOVnEawakLQwZf0LkQfFOEG/1jEMR/6jtja2MOCmE+Z/+TU/LLcmGdF5CN7h+TxMreGilWVSlVVDo1zAEc/jhYWEe5utbLm22Os2qpJu1a47Mx8Cd1J+Ll48pl3DvPtldyuYWLN1IRDY/oORO9TeEuwH4IFPg90mMt3Q3t4xWcynvlLLicslqqE00yBH6DywL4R+Z9wWq0Na663ffeY7rbC9Ho3MFJ8XsTsZP6/7lbz2rU4JiREI/liOa7arHc1nza2kDI3rv+vTNrcSyAPS4SHykUUrhbWnCBBHBrT31Tx9oO8DbiF5hXHyQgc9tDvizoH943Ik01qp2asK4IE8Z1jGmuLcpfneXdmS6leB+wGatVk0sCEwDFP9QXHcX7cnuSxt14vDWa/NAfrliClcOSIRqf62e3ATg/6HKXbU7rFoRtAPeKOEPeEuAOzHpzaMsNkMA/8VbyKV/FKxv8BrRpcc0XcH3oAAAAASUVORK5CYII="
                    />
                    {{ nickname }} | <a @click="logout()">Выйти</a>
                </span>
            </div>
        </div>
        <div v-if="this.$store.state.modalOpened" class="fake_bg"></div>
        <router-view />
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    Приложение для контроля веса
                    <strong>Weight Control</strong>, разработанное командой
                    <strong>MPP</strong> в рамках
                    <a target="blank" href="http://predprof.olimpiada.ru/"
                        >Московской предпрофессиональной олимпиады</a
                    >. <br />
                    <br />
                    <a
                        target="blank"
                        href="https://github.com/MrFzovpec/predprof-case-weight"
                        >Github репозиторий</a
                    >.
                </p>
            </div>
        </footer>
    </div>
</template>

<style lang="scss">
    * {
        max-width: 100%;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        background: rgba(54, 162, 235, 0.3);
        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
        img.logo {
            height: 50px;
            width: 50px;
        }
        display: flex;

        align-items: center;
        justify-content: space-between;
    }
    footer.footer {
        background: rgba(54, 162, 235, 0.3);
    }
    .home.container {
        padding: 7% 5%;
    }
    .fake_bg {
        width: 100vw;
        height: 100vh;
        top: 0;
        position: fixed;
        z-index: 9;
        background: rgba(229, 240, 255, 0.7);
    }
    .profile_block {
        span {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            img {
                height: 50px;
                margin-right: 20px;
            }
            a {
                margin-left: 5px;
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

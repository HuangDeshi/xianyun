
export const state = () => {
    return {
        userInfo: {
            token: '',
            user: {

            }
        }
    }
}

export const mutations = {
    //设置数据
    setUserInfo(state, data) {
        state.userInfo = data
    },
    clearUserInfo(state) {
        state.userInfo = {
            token: '',
            user: {

            }
        }
    }

}

export const actions = {
    login({ commit }, data) {
        this.$axios({
            url: "/accounts/login",
            method: "POST",
            data,
        })
            .then(res => {
                commit("setUserInfo", res.data);
            })
    }
}
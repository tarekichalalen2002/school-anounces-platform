import { proxy } from "valtio";

const state = proxy({
    isInputShown:false,
    isSidebarShown:false,
    isResponseInputShown:false,
    messageResponseData:{},
    isNotified: true,
    token:'',
})


export default state;
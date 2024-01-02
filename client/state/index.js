import { proxy } from "valtio";

const state = proxy({
    isInputShown:false,
    isSidebarShown:false,
    isResponseInputShown:false,
    messageResponseData:{},
    isNotified: true
})


export default state;
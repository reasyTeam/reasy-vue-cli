let routerConfig = [{ //系统状态
    item: "sysStatus",
    title: "System Status",
    icon: "icon-sys-status",
    children: [{
        item: "sysInfo",
        title: "System Info"
    }],
    "css": "permission"
}, { //联网设置
    item: "network",
    title: "Internet Settings",
    icon: "icon-internet",
    children: [{
        item: "wanSet",
        title: "Internet Settings",
        "hasToolBar": true
    }],
    "css": "mesh-router"
}, { //系统管理
    item: "sysManage",
    title: "Maintenance",
    icon: "icon-setting",
    children: [{
        item: "sysManage",
        title: "sysManage"
    }]
}];

export default routerConfig;
let routerConfig = [{
    item: "sysStatus",
    title: _("System Status"),
    icon: "icon-sys-status",
    children: [{
        item: "sysInfo",
        title: "System Info",
        path: "@/pages/modules/sysInfo.vue"
    }]
}, {
    item: "network",
    title: "Internet Settings",
    icon: "icon-internet",
    children: [{
        item: "wanSet",
        title: "Internet Settings",
        path: "@/pages/modules/wanSet.vue"
    }]
}, {
    item: "Wireless",
    title: "Wireless",
    icon: "icon-setting",
    children: [{
            "item": "wirelessName",
            "name": "Wireless Settings",
            path: "@/pages/modules/wirelessName.vue"
        },
        {
            "item": "wirelessAccess",
            "name": "MAC Filters",
            path: "@/pages/modules/wirelessAccess.vue",
            "showHelp": true,
            "hasToolBar": true
        }
    ]
}];

export default routerConfig;
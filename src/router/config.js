let routerConfig = [{
    item: "sysStatus",
    title: _("System Status"),
    icon: "icon-sys-status",
    children: [{
        item: "sysInfo",
        title: _("System Info"),
        path: "/sysInfo"
    }]
}, {
    item: "network",
    title: _("Internet Settings"),
    icon: "icon-internet",
    children: [{
        item: "wanSet",
        title: _("Internet Settings"),
        path: "/wanSet"
    }]
}, {
    item: "Wireless",
    title: _("Wireless"),
    icon: "icon-setting",
    children: [{
        item: "wirelessName",
        title: _("Wireless Settings"),
        path: "/wirelessName"
    },
    {
        item: "wirelessAccess",
        title: _("MAC Filters"),
        path: "/wirelessAccess",
        "showHelp": true,
        "hasToolBar": true
    }
    ]
}];

export default routerConfig;
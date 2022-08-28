var that;
class Tab {
    constructor(id) {
        that = this;
        this.tab = document.querySelector(id);
        this.navs = this.tab.querySelector(".tab-nav").querySelectorAll("li");
        this.cons = this.tab.querySelector(".tab-content").querySelectorAll("li");
        this.init();
    }
    // 绑定事件
    init() {
        for (var i = 0; i < this.navs.length; i++) {
            this.navs[i].index = i;
            this.navs[i].onclick = this.toggleTab;
        }
    }
    // 切换
    toggleTab() {
        that.clearTab();
        this.className = 'nav-current';
        that.cons[this.index].className = 'con-current';
    }

    clearTab() {
        for(var i = 0; i < this.navs.length; i++) {
            this.navs[i].className = '';
            this.cons[i].className = '';
        }
    }
    addTab() {

    }
    removeTab() {

    }
    editTab() {

    }
}
new Tab('#tab');
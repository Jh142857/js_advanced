var that;
class Tab {
    constructor(id) {
        that = this;
        this.tab = document.querySelector(id);
        this.navs = this.tab.querySelector(".tab-nav").querySelectorAll("li");
        this.cons = this.tab.querySelector(".tab-content").querySelectorAll("li");
        this.add = this.tab.querySelector(".add");
        this.init();
    }
    // 绑定事件
    init() {
        this.getLis();
        this.add.onclick = that.addTab;
        for (var i = 0; i < this.navs.length; i++) {
            this.navs[i].index = i;
            this.navs[i].onclick = this.toggleTab;
            this.navs[i].querySelector("i").onclick = this.closeTab;
            this.navs[i].querySelector("span").ondblclick = this.editTab;
            this.cons[i].querySelector("span").ondblclick = this.editTab;
        }

    }
    // 获取新的navs和cons
    getLis() {
        this.navs = this.tab.querySelector(".tab-nav").querySelectorAll("li");
        this.cons = this.tab.querySelector(".tab-content").querySelectorAll("li");
    }
    // 切换
    toggleTab() {
        that.clearTab();
        this.className = 'nav-current';
        // 根据序号切换内容
        that.cons[this.index].className = 'con-current';
    }
    // 清楚其余状态栏选中状态
    clearTab() {
        for (var i = 0; i < this.navs.length; i++) {
            this.navs[i].className = '';
            this.cons[i].className = '';
        }
    }
    // 添加状态栏
    addTab() {
        // 清除状态栏
        that.clearTab();
        var navLi = `<li class="nav-current"><span>新选项卡</span><i class="close"><em>×</em></i></li>`;
        var conLi = `<li class="con-current"><span>${Math.random()}</span></li>`;
        // console.log(that.tab);
        that.tab.querySelectorAll("ul")[0].insertAdjacentHTML('beforeend', navLi);
        that.tab.querySelectorAll("ul")[1].insertAdjacentHTML('beforeend', conLi);
        // 重新初始化
        that.init();
    }
    // 移除状态栏
    closeTab(e) {
        // 阻止冒泡，否则父级会触发toggletab !important
        e.stopPropagation();
        // 移除
        that.tab.querySelectorAll("ul")[0].removeChild(that.navs[this.parentNode.index])
        that.tab.querySelectorAll("ul")[1].removeChild(that.cons[this.parentNode.index])
        that.init();

        //  如果移除被选中的，跳转至上一个
        // if (this.parentNode.className == 'nav-current') {
        // if (this.parentNode.index) {

        //     that.navs[this.parentNode.index - 1].className = 'nav-current';
        //     that.cons[this.parentNode.index - 1].className = 'con-current';
        // }}

        // 更简洁的写法
        //  如果移除未选中的（剩下的还有选中的），直接返回
        if (document.querySelector('nav-current')) return;
        // 前面的点击，如果没有不执行
        that.navs[this.parentNode.index - 1] && that.navs[this.parentNode.index - 1].click();
        // 判断是否是第一个
        if (!this.parentNode.index) {
            that.navs[this.parentNode.index].click();
        }
    }
    // 编辑状态栏
    editTab() {
        // // 禁止双击选中文字
        // window.getSelection ? window.getSelection().removeAllRanges : document.selection.empty();
        this.innerHTML = `<input type="text" value=${this.innerHTML}>`
        var input = this.querySelector("input");
        input.select();
        input.onblur = function () {
            this.parentNode.innerHTML = `${this.value}`;
        }
        input.onkeydown = function (e) {
            if(e.key === 'Enter' || e.key == 'NumpadEnter') {
                this.onblur();
            }
        }
    }
}
new Tab('#tab');
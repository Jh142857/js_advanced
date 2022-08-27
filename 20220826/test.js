webpackJsonp([14], {
    "7KKv": function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = {
            data: function() {
                return {
                    detail: null,
                    fileInfo: {},
                    viewUrl: null,
                    viewTime: 0,
                    fileType: "pdf",
                    timeState: !1,
                    clock: null,
                    showDialog: !1,
                    finishStudy: !1
                }
            },
            methods: {
                goBack: function() {
                    this.$router.push({
                        name: "classes"
                    })
                },
                getStuStudyInfo: function(t) {
                    var e = this;
                    this.$http({
                        url: this.$http.adornUrl("/stu/vstudydetail/getCurClassDetail"),
                        method: "get",
                        params: this.$http.adornParams({
                            classId: t
                        })
                    }).then(function(t) {
                        var i = t.data;
                        i && 0 === i.code && i.detail && "1" === i.detail.studyState && (e.finishStudy = !0)
                    })
                },
                getClassDetail: function(t) {
                    var e = this;
                    this.$http({
                        url: this.$http.adornUrl("/config/classes/getClassDetail/" + t),
                        method: "get"
                    }).then(function(t) {
                        var i = t.data;
                        i && 0 === i.code && (e.detail = i.info,
                        null != e.detail.fileId ? e.getStudyFile(e.detail.fileId) : (e.$message.error("未找到学习文件"),
                        e.$router.push({
                            name: "classes"
                        })))
                    })
                },
                getStudyFile: function(t) {
                    var e = this;
                    this.$http({
                        url: this.$http.adornUrl("/sys/fileupload/info/" + t),
                        method: "get",
                        params: this.$http.adornParams()
                    }).then(function(t) {
                        var i = t.data;
                        if (i && 0 === i.code)
                            switch (e.fileInfo = i.fileUpload,
                            e.viewUrl = e.$http.adornUrl("/sys/fileupload/view/" + e.fileInfo.id),
                            e.fileInfo.fileType) {
                            case "application/pdf":
                                e.fileType = "pdf",
                                e.timeState = !0,
                                e.startTime();
                                break;
                            case "video/mp4":
                                e.fileType = "mp4",
                                e.startTime();
                                break;
                            case "image/jpeg":
                            case "image/png":
                                e.fileType = "jpg",
                                e.timeState = !0,
                                e.startTime()
                            }
                        else
                            e.$message.error(i.msg)
                    })
                },
                stopVideo: function() {
                    this.timeState = !1
                },
                runVideo: function() {
                    this.timeState = !0
                },
                startTime: function() {
                    var t = this;
                    this.clock = window.setInterval(function() {
                        var e = window.document.getElementById("my-video");
                        "mp4" === t.fileType && (e.paused ? t.stopVideo() : t.runVideo()),
                        t.timeState && (t.viewTime++,
                        console.log("当前计时 " + t.viewTime))
                    }, 1e3)
                },
                saveStudy: function() {
                    this.$http({
                        url: this.$http.adornUrl("/stu/classinfo/addStudyLog"),
                        method: "post",
                        params: this.$http.adornParams({
                            studyTime: this.viewTime > 0 ? this.viewTime : 0,
                            classId: this.detail.id
                        })
                    })
                },
                closeDialog: function() {
                    this.showDialog = !1;
                    var t = this.viewTime - parseInt(this.detail.timeLimit);
                    this.viewTime = t > 0 ? t : 0,
                    this.timeState = !0
                }
            },
            beforeDestroy: function() {
                this.clock && (console.log("关闭定时任务 " + this.timeState),
                window.clearInterval(this.clock),
                this.saveStudy())
            },
            created: function() {
                var t = this.$route.query.id;
                "" !== this.$cookie.get("pageType") && this.$cookie.set("pageType", ""),
                t ? (this.getStuStudyInfo(t),
                this.getClassDetail(t)) : (this.$message.error("异常访问"),
                this.$router.push({
                    name: "classes"
                }))
            },
            activated: function() {
                var t = this.$route.query.id;
                t ? (this.getStuStudyInfo(t),
                this.getClassDetail(t)) : (this.$message.error("异常访问"),
                this.$router.push({
                    name: "classes"
                }))
            },
            watch: {
                viewTime: function(t) {
                    var e = this;
                    this.finishStudy || t !== parseInt(this.detail.timeLimit) || this.$http({
                        url: this.$http.adornUrl("/stu/classinfo/addStudyLog"),
                        method: "post",
                        params: this.$http.adornParams({
                            studyTime: this.viewTime,
                            classId: this.detail.id
                        })
                    }).then(function(t) {
                        var i = t.data;
                        if (i && 0 === i.code) {
                            e.timeState = !1;
                            var s = window.document.getElementById("my-video");
                            s && s.pause(),
                            e.showDialog = !0,
                            e.finishStudy = !0
                        } else
                            e.$message.error(i.msg)
                    })
                }
            }
        }
          , a = {
            render: function() {
                var t = this
                  , e = t.$createElement
                  , i = t._self._c || e;
                return i("div", {
                    staticClass: "content-box",
                    staticStyle: {
                        "padding-top": "1%",
                        "padding-bottom": "1%"
                    }
                }, [i("div", {
                    staticClass: "page-header"
                }, [i("el-breadcrumb", {
                    staticStyle: {
                        "font-size": "18px",
                        "margin-top": "20px"
                    },
                    attrs: {
                        "separator-class": "el-icon-arrow-right"
                    }
                }, [i("el-breadcrumb-item", {
                    attrs: {
                        to: {
                            path: "../home"
                        }
                    }
                }, [t._v("首页")]), t._v(" "), i("el-breadcrumb-item", {
                    attrs: {
                        to: {
                            path: "../classes"
                        }
                    }
                }, [t._v("适应性课程")]), t._v(" "), i("el-breadcrumb-item", [t._v("课程详情")])], 1), t._v(" "), i("el-button", {
                    staticStyle: {
                        "font-size": "18px",
                        "margin-top": "20px",
                        "font-weight": "bold"
                    },
                    attrs: {
                        type: "text"
                    },
                    on: {
                        click: t.goBack
                    }
                }, [t._v("返回列表")])], 1), t._v(" "), i("el-backtop", {
                    attrs: {
                        "visibility-height": 400
                    }
                }, [i("div", {
                    staticClass: "back-to-top"
                }, [i("i", {
                    staticClass: "el-icon-caret-top"
                })])]), t._v(" "), i("div", {
                    staticStyle: {
                        height: "2px",
                        "background-color": "#CCCCCC",
                        margin: "15px 0"
                    }
                }), t._v(" "), i("div", {
                    staticStyle: {
                        "margin-top": "30px"
                    }
                }, [i("div", [i("div", {
                    staticClass: "class-detail-title"
                }, [t._v(t._s(t.detail.title) + "(" + t._s("1" == t.detail.isRequired ? "必修" : "选修") + ")")]), t._v(" "), i("div", {
                    staticClass: "class-detail-info"
                }, [i("span", [t._v("点击次数："), i("strong", [t._v(t._s(t.detail.hits))]), t._v(" 次")]), t._v(" "), i("span", {
                    staticStyle: {
                        "margin-left": "50px"
                    }
                }, [t._v("日期：" + t._s(t.detail.createTime.split(" ")[0]))])]), t._v(" "), i("div", {
                    staticClass: "study-state"
                }, [i("div", [t._v("当前学习状态：")]), t._v(" "), i("el-tag", {
                    class: t.finishStudy ? "tag-plain-success" : "tag-plain-info",
                    attrs: {
                        type: t.finishStudy ? "success" : "info",
                        effect: "plain"
                    }
                }, [t._v("\n          " + t._s(t.finishStudy ? "已完成" : "未完成") + "\n        ")])], 1), t._v(" "), i("div", {
                    staticStyle: {
                        "font-size": "14px",
                        color: "red"
                    }
                }, [t._v("注：请勿直接关闭浏览器，会导致当前学习记录无法正常保存。")]), t._v(" "), i("div", {
                    staticStyle: {
                        height: "2px",
                        "background-color": "rgba(0,0,0,0)",
                        margin: "20px 0"
                    }
                }), t._v(" "), i("div", {
                    staticClass: "class-file-content",
                    staticStyle: {
                        "text-align": "center",
                        "overflow-y": "hidden"
                    }
                }, ["37735aaafc0be61faf07b892a22685bd" == t.detail.id ? i("div", {
                    staticStyle: {
                        color: "red"
                    }
                }, [t._v("请浏览到底端，手机扫码参观")]) : t._e(), t._v(" "), "mp4" == t.fileType ? i("div", {
                    staticStyle: {
                        "font-size": "14px",
                        color: "red"
                    }
                }, [t._v("视频加载可能需要较长时间，敬请耐心等待！")]) : t._e(), t._v(" "), "image/jpeg" === t.fileInfo.fileType || "image/png" === t.fileInfo.fileType ? i("img", {
                    staticClass: "img-detail",
                    attrs: {
                        src: t.viewUrl
                    }
                }) : t._e(), t._v(" "), "application/pdf" === t.fileInfo.fileType ? i("div", {
                    staticClass: "embedbox",
                    staticStyle: {
                        height: "900px"
                    }
                }, [i("embed", {
                    attrs: {
                        src: t.viewUrl,
                        type: "application/pdf"
                    }
                })]) : t._e(), t._v(" "), "video/mp4" === t.fileInfo.fileType ? i("video", {
                    attrs: {
                        id: "my-video",
                        src: t.viewUrl,
                        controls: "controls",
                        width: "80%"
                    }
                }, [t._v("\n          您的浏览器不支持视频播放\n        ")]) : t._e()])]), t._v(" "), i("el-dialog", {
                    attrs: {
                        title: "提示",
                        width: "40%",
                        "before-close": t.closeDialog,
                        visible: t.showDialog
                    },
                    on: {
                        "update:visible": function(e) {
                            t.showDialog = e
                        }
                    }
                }, [i("span", {
                    staticStyle: {
                        "font-size": "18px"
                    }
                }, [t._v("您已完成课程的学习时长目标。您可以选择继续学习，或点击"), i("strong", [t._v("“返回”")]), t._v("/"), i("strong", [t._v("“适应性课程”")]), t._v("返回至课程列表，进行其他课程的学习。")]), i("br"), t._v(" "), i("span", {
                    staticStyle: {
                        color: "red",
                        "font-size": "14px"
                    }
                }, [t._v("请注意：直接关闭浏览器会导致本次学习记录无法正常保存。")]), i("br"), t._v(" "), i("span", {
                    staticStyle: {
                        color: "darkgray",
                        "font-size": "10px"
                    }
                }, [t._v("点击“确定”或页面其他任意位置关闭弹窗。")]), i("br"), t._v(" "), i("span", {
                    staticClass: "dialog-footer",
                    attrs: {
                        slot: "footer"
                    },
                    slot: "footer"
                }, [i("el-button", {
                    attrs: {
                        type: "primary"
                    },
                    on: {
                        click: t.closeDialog
                    }
                }, [t._v("确 定")])], 1)])], 1)], 1)
            },
            staticRenderFns: []
        };
        var n = i("VU/8")(s, a, !1, function(t) {
            i("dWPY")
        }, null, null);
        e.default = n.exports
    },
    dWPY: function(t, e, i) {
        var s = i("jrBz");
        "string" == typeof s && (s = [[t.i, s, ""]]),
        s.locals && (t.exports = s.locals);
        i("rjj0")("75fca969", s, !0)
    },
    jrBz: function(t, e, i) {
        (t.exports = i("FZ+f")(!1)).push([t.i, "\n.back-to-top {\n  position: fixed;\n  background-color: #fff;\n  width: 40px;\n  height: 40px;\n  right: 100px;\n  bottom: 150px;\n  border-radius: 50%;\n  color: #409eff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 20px;\n  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);\n          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);\n  cursor: pointer;\n  z-index: 5;\n}\n.tag-plain-success {\n  background-color: #f9f9f9;\n  border-color: #c2e7b0;\n  color: #67c23a;\n}\n.tag-plain-info {\n  background-color: #f9f9f9;\n  border-color: #d3d4d6;\n  color: #909399;\n}\n.study-state {\n  position: fixed;\n  z-index: 999;\n  right: 50px;\n  bottom: 200px;\n}\n.page-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.class-detail-title {\n  font-size: 30px;\n  font-weight: bold;\n  text-align: center;\n}\n.class-detail-info {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  margin-right: 50px;\n}\n.img-detail {\n  max-width: 100%;\n}\n.embedbox embed {\n  -webkit-transform: translate(30px, -50px);\n  transform: translate(30px, -50px);\n  width: 900px;\n  height: 100%;\n}\n", ""])
    }
});

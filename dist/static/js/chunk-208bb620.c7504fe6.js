(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-208bb620"],{1401:function(t,a,e){"use strict";e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return s})),e.d(a,"i",(function(){return r})),e.d(a,"e",(function(){return c})),e.d(a,"h",(function(){return u})),e.d(a,"a",(function(){return o})),e.d(a,"j",(function(){return l})),e.d(a,"d",(function(){return d})),e.d(a,"f",(function(){return f})),e.d(a,"g",(function(){return v}));e("99af");var n=e("b775");function i(t){return Object(n["a"])({url:"/social_securitys/historys/".concat(t.month),params:t})}function s(t){return Object(n["a"])({url:"/social_securitys/historys/".concat(t.year,"/list"),data:t})}function r(t){return Object(n["a"])({url:"/social_securitys/historys/".concat(t.yearMonth,"/newReport"),method:"put",data:t})}function c(t){return Object(n["a"])({url:"/social_securitys/historys/archiveDetail/".concat(t.userId,"/").concat(t.yearMonth),data:t})}function u(t){return Object(n["a"])({url:"/social_securitys/list",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/social_securitys/historys/".concat(t.yearMonth,"/archive"),method:"post",data:t})}function l(t){return Object(n["a"])({url:"/social_securitys/".concat(t.userId),method:"put",data:t})}function d(t){return Object(n["a"])({url:"/social_securitys/".concat(t)})}function f(t){return Object(n["a"])({url:"/social_securitys/payment_item/".concat(t)})}function v(){return Object(n["a"])({url:"/social_securitys/settings"})}},"173d":function(t,a,e){"use strict";e.d(a,"d",(function(){return i})),e.d(a,"f",(function(){return s})),e.d(a,"e",(function(){return r})),e.d(a,"b",(function(){return c})),e.d(a,"h",(function(){return u})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return l})),e.d(a,"g",(function(){return d}));var n=e("b775");function i(t){return Object(n["a"])({url:"/salarys/list",data:t,method:"post"})}function s(t){return Object(n["a"])({url:"/salarys/tips/".concat(t)})}function r(){return Object(n["a"])({url:"/salarys/settings"})}function c(){return Object(n["a"])({url:"/salarys/company-settings"})}function u(t){return Object(n["a"])({url:"/salarys/settings",method:"post",data:t})}function o(t){return Object(n["a"])({url:"/salarys/modify/".concat(t)})}function l(t){return Object(n["a"])({url:"/salarys/modify/".concat(t.userId),method:"post",data:t})}function d(t){return Object(n["a"])({url:"/salarys/init/".concat(t.userId),method:"post",data:t})}},"5a6d":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"detailsContainer"},[e("div",{staticClass:"contLeft"},[e("el-row",{attrs:{type:"flex",justify:"end"}},[e("el-button",{staticStyle:{"margin-top":"5px"},attrs:{type:"primary",size:"small",plain:""},on:{click:function(a){return t.$router.push("/salarys")}}},[t._v("返回")])],1),e("el-divider"),e("div",{staticClass:"topTit"},[e("div",{staticClass:"info"},[e("p",{staticClass:"name"},[e("strong",[t._v(" "+t._s(t.user.username)+" ")]),e("span",{class:t.dutyStatus},[t._v(t._s(t.dutyStatusTxt))])]),e("p",{staticClass:"time"},[t._v("入职时间: "+t._s(t._f("formatDate")(t.user.timeOfEntry))+" 最新工资： "+t._s(t.formLabelAlign.currentPostWage+t.formLabelAlign.currentBasicSalary)+" "),t._m(0)]),e("p",[t._v("当月基本工资 / 当月岗位工资: "+t._s(t.formLabelAlign.currentBasicSalary)+" / "+t._s(t.formLabelAlign.currentPostWage))])])]),e("div",[e("div",{staticClass:"social"},[t._m(1),e("div",{staticClass:"table"},[t._m(2),e("div",{staticClass:"tabRow"},[e("div",[t._v("交通补助")]),e("div",[t._v(" "+t._s(t.paymentData.p2)+" ")]),e("div",[t._v("通讯补助")]),e("div",[t._v(" "+t._s(t.paymentData.p3)+" ")])]),e("div",{staticClass:"tabRow"},[e("div",[t._v("午餐补助")]),e("div",[t._v(" "+t._s(t.paymentData.p4)+" ")]),e("div",[t._v("住房补助")]),e("div",[t._v(" "+t._s(t.paymentData.p1)+" ")])])])]),e("div",{staticClass:"fund"},[e("div",{staticClass:"title"},[e("strong",[t._v("社保公积金")]),t._v(" "),e("span",[t._v("企业 "+t._s(t.socialData.socialSecurityEnterprise+t.socialData.providentFundEnterprises))]),t._v(" "),e("span",[t._v("个人 "+t._s(t.socialData.socialSecurityIndividual+t.socialData.providentFundIndividual))])]),e("div",{staticClass:"table"},[t._m(3),e("div",{staticClass:"tabRow"},[e("div",[t._v("社保")]),e("div",[t._v(" "+t._s(t.socialData.socialSecurityBase)+" ")]),e("div",[t._v(t._s(t.socialData.socialSecurityEnterprise))]),e("div",[t._v(" "+t._s(t.socialData.socialSecurityIndividual)+" ")])]),e("div",{staticClass:"tabRow"},[e("div",[t._v("公积金")]),e("div",[t._v(" "+t._s(t.socialData.providentFundBase)+" ")]),e("div",[t._v(t._s(t.socialData.providentFundEnterprises))]),e("div",[t._v(" "+t._s(t.socialData.providentFundIndividual)+" ")])]),e("div",{staticClass:"tabRow"},[e("div",[t._v("缴费合计")]),e("div"),e("div",[t._v(t._s(t.socialData.socialSecurityEnterprise+t.socialData.providentFundEnterprises))]),e("div",[t._v(" "+t._s(t.socialData.socialSecurityIndividual+t.socialData.providentFundIndividual)+" ")])])])]),e("div",{staticClass:"formTable"},[e("el-form",{attrs:{"label-position":"left","label-width":"180px",model:t.formLabelAlign}},[e("el-form-item",{staticStyle:{width:"50%"},attrs:{label:"实际出勤天数（正式）："}},[e("el-input",{attrs:{placeholder:"0",disabled:!0},model:{value:t.atteData.actualAtteOfficialDays,callback:function(a){t.$set(t.atteData,"actualAtteOfficialDays",a)},expression:"atteData.actualAtteOfficialDays"}})],1),e("el-form-item",{staticStyle:{width:"50%"},attrs:{label:"计薪天数（正式）："}},[e("el-input",{attrs:{placeholder:"0",disabled:!0},model:{value:t.atteData.workingDays,callback:function(a){t.$set(t.atteData,"workingDays",a)},expression:"atteData.workingDays"}})],1)],1)],1)])],1)])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("span",{staticClass:"more"},[t._v("?")]),e("li",[t._v("员工所有调薪后的基本工资、岗位工资合计")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"title"},[e("strong",[t._v("津贴")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"tabTit"},[e("div",[t._v("津贴类型")]),e("div",[t._v(" 补贴金额 ")]),e("div",[t._v("津贴类型")]),e("div",[t._v(" 补贴金额 ")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"tabTit"},[e("div",[t._v("缴费项目")]),e("div",[t._v("基数")]),e("div",[t._v(" 企业缴纳 ")]),e("div",[t._v("个人缴纳")])])}],s=e("c7eb"),r=e("1da1"),c=(e("a9e3"),e("173d")),u=e("c24f"),o=e("1401"),l=e("f1e3"),d={name:"UsersTableIndex",data:function(){return{user:{},socialData:{socialSecurityEnterprise:0,providentFundEnterprises:0},atteData:{},paymentData:{p1:0,p2:0,p3:0,p4:0},userId:this.$route.params.id,yearMonth:this.$route.params.yearMonth,formLabelAlign:{}}},computed:{computeCompanyTotal:function(){var t=0,a=0;return null!=this.formLabelAlign.socialSecurityCompanyBase&&(t=Number(this.formLabelAlign.socialSecurityCompanyBase)),null!=this.formLabelAlign.providentFundCompanyBase&&(a=Number(this.formLabelAlign.providentFundCompanyBase)),t+a},computePersonalTotal:function(){var t=0,a=0;return null!=this.formLabelAlign.socialSecurityPersonalBase&&(t=Number(this.formLabelAlign.socialSecurityCompanyBase)),null!=this.formLabelAlign.providentFundCompanyBase&&(a=Number(this.formLabelAlign.providentFundPersonalBase)),t+a},dutyStatusTxt:function(){return 1===this.user.inServiceStatus?"在职":"离职"},dutyStatus:function(){return 1===this.user.inServiceStatus?"job-txt-green":"job-txt-red"}},created:function(){this.init()},methods:{init:function(){var t=this;Object(l["a"])({userId:this.userId,yearMonth:this.yearMonth}).then((function(a){return t.atteData=a||{},Object(c["e"])()})).then((function(a){t.paymentData.p1=t.calMoney(a.housingSubsidyScheme,a.housingSubsidyAmount,t.atteData.actualAtteOfficialDays),t.paymentData.p2=t.calMoney(a.transportationSubsidyScheme,a.transportationSubsidyAmount,t.atteData.actualAtteOfficialDays),t.paymentData.p3=t.calMoney(a.communicationSubsidyScheme,a.communicationSubsidyAmount,t.atteData.actualAtteOfficialDays),t.paymentData.p4=t.calMoney(a.lunchAllowanceScheme,a.lunchAllowanceAmount,t.atteData.actualAtteOfficialDays)})),this.getUserDetailById(),this.getSalaryDetail(),this.getHistorysData()},getSalaryDetail:function(){var t=this;return Object(r["a"])(Object(s["a"])().mark((function a(){return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(c["c"])(t.userId);case 2:t.formLabelAlign=a.sent;case 3:case"end":return a.stop()}}),a)})))()},getHistorysData:function(){var t=this;return Object(r["a"])(Object(s["a"])().mark((function a(){return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(o["e"])({userId:t.userId,yearMonth:t.yearMonth});case 2:t.socialData=a.sent;case 3:case"end":return a.stop()}}),a)})))()},getUserDetailById:function(){var t=this;return Object(r["a"])(Object(s["a"])().mark((function a(){return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(u["b"])(t.userId);case 2:t.user=a.sent;case 3:case"end":return a.stop()}}),a)})))()},calMoney:function(t,a,e){return 3===t?a:1===t?a*e:0}}},f=d,v=(e("dba6"),e("2877")),p=Object(v["a"])(f,n,i,!1,null,"7f86de94",null);a["default"]=p.exports},d959:function(t,a,e){},dba6:function(t,a,e){"use strict";e("d959")},f1e3:function(t,a,e){"use strict";e.d(a,"b",(function(){return i})),e.d(a,"a",(function(){return s})),e.d(a,"c",(function(){return r}));e("99af");var n=e("b775");function i(t){return Object(n["a"])({url:"/attendances",params:t})}function s(t){return Object(n["a"])({url:"/attendances/archive/".concat(t.userId,"/").concat(t.yearMonth)})}function r(t){return Object(n["a"])({url:"/attendances/".concat(t.userId),method:"put",data:t})}}}]);
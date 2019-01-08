// components/caseitem/caseitem.js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    imgSrc: {
      type: String,
      value: '',
    },
    ciTitle: {
      type: String
    },
    caseId: {
      type: String
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    navigateToActDetail: function (e) {
      let caseId = e.currentTarget.dataset.caseId;
      wx.navigateTo({
        url: `/pages/casedetail/casedetail?caseid=${caseId}`
      })
    }
  }
});

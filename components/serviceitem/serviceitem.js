// components/serviceitem.js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    imgSrc: {
      type: String,
      value: '',
    },
    siTitle: {
      type: String
    },
    serviceId: {
      type: String
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    navigateToActDetail: function (e) {
      let serviceId = e.currentTarget.dataset.serviceid;
      wx.navigateTo({
        url: `/pages/servicedetail/servicedetail?serviceid=${serviceId}`
      })
    }
  }
});

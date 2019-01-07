// components/proitem.js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    imgSrc: {
      type: String,
      value: '',
    },
    aiTitle: {
      type: String
    },
    aiIntro: {
      type: String
    },
    actId: {
      type: String
    },
    aiIng: {
      type: Boolean
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    navigateToActDetail: function (e) {
      let actId = e.currentTarget.dataset.actid;
      wx.navigateTo({
        url: `/pages/activitydetail/activitydetail?actid=${actId}`
      })
    }
  }
});
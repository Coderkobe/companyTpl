// components/proitem.js
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    imgSrc: {
      type: String,
      value: '',
    },
    piTitle: {
      type: String
    },
    piIntro: {
      type: String
    },
    actId: {
      type: String
    },
    piYear: {
      type: String
    },
    piPerson: {
      type: String
    },
    piDurationUnit: {
      type: String
    }, 
    piNumberUnit: {
      type: String
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    navigateToProDetail: function (e) {
      let proId = e.currentTarget.dataset.actid;
      wx.navigateTo({
        url: `/pages/projectdetail/projectdetail?proid=${proId}`
      })
    }
  }
});
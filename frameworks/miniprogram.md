# 小程序框架

小程序是运行在特定平台（如微信、支付宝、字节跳动等）内的轻量级应用。小程序框架让开发者能够使用 Web 技术或特定语法开发跨平台小程序应用。

## 📱 主流小程序平台

| 平台 | 开发语言 | 开发工具 | 用户规模 | 特点 |
|------|----------|----------|----------|------|
| 微信小程序 | JavaScript/WXML | 微信开发者工具 | 最大 | 社交生态完善 |
| 支付宝小程序 | JavaScript/AXML | 支付宝小程序 IDE | 大 | 支付场景丰富 |
| 字节跳动小程序 | JavaScript/TTML | 字节跳动开发者工具 | 中等 | 短视频生态 |
| 百度小程序 | JavaScript/SwanML | 百度开发者工具 | 中等 | 搜索流量 |
| QQ小程序 | JavaScript/QML | QQ小程序IDE | 中等 | 年轻用户群体 |

## 🚀 跨平台框架

### 1. Taro

#### 环境搭建
```bash
# 安装 Taro CLI
npm install -g @tarojs/cli

# 创建项目
taro init my-taro-app

# 运行到不同平台
npm run dev:weapp      # 微信小程序
npm run dev:alipay     # 支付宝小程序
npm run dev:swan       # 百度小程序
npm run dev:h5         # H5
```

#### 基础语法
```jsx
// pages/index/index.jsx
import { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  state = {
    motto: 'Hello Taro',
    userInfo: {},
    hasUserInfo: false
  }

  componentWillMount () {}

  componentDidMount () {
    console.log('Component did mount')
  }

  getUserInfo = () => {
    Taro.getUserInfo({
      success: (res) => {
        this.setState({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }

  render () {
    const { motto, userInfo, hasUserInfo } = this.state

    return (
      <View className='container'>
        <View className='userinfo'>
          {hasUserInfo && <Text className='userinfo-nickname'>{userInfo.nickName}</Text>}
          {!hasUserInfo && <Button onClick={this.getUserInfo}>获取用户信息</Button>}
        </View>
        
        <View className='usermotto'>
          <Text className='user-motto'>{motto}</Text>
        </View>
      </View>
    )
  }
}
```

#### 样式处理
```scss
// pages/index/index.scss
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaa;

  &-nickname {
    color: #000;
    font-size: 32rpx;
  }
}

.usermotto {
  margin-top: 200rpx;
}
```

#### API 封装
```javascript
// utils/request.js
import Taro from '@tarojs/taro'

const request = (options) => {
  return Taro.request({
    url: `https://api.example.com${options.url}`,
    method: options.method || 'GET',
    data: options.data,
    header: {
      'content-type': 'application/json',
      ...options.header
    }
  }).then(response => {
    const { data, statusCode } = response
    
    if (statusCode === 200) {
      return data
    } else {
      throw new Error(`Request failed with status ${statusCode}`)
    }
  })
}

export const userApi = {
  getUserList: () => request({
    url: '/users',
    method: 'GET'
  }),
  
  createUser: (userData) => request({
    url: '/users',
    method: 'POST',
    data: userData
  })
}
```

### 2. uni-app

#### 环境搭建
```bash
# 使用 HBuilderX 创建项目
# 或者使用 CLI
npm install -g @vue/cli
vue create -p dcloudio/uni-preset-vue my-project

# 运行到不同平台
npm run dev:mp-weixin   # 微信小程序
npm run dev:mp-alipay    # 支付宝小程序
npm run dev:h5          # H5
```

#### Vue 语法开发
```vue
<!-- pages/index/index.vue -->
<template>
  <view class="container">
    <view class="header">
      <text class="title">{{ title }}</text>
    </view>
    
    <view class="content">
      <view class="form-item">
        <input 
          v-model="formData.name" 
          placeholder="请输入姓名"
          class="input"
        />
      </view>
      
      <view class="form-item">
        <input 
          v-model="formData.phone" 
          placeholder="请输入手机号"
          class="input"
          type="number"
        />
      </view>
      
      <button @click="submitForm" class="submit-btn">
        提交
      </button>
    </view>
    
    <view class="user-list" v-if="userList.length > 0">
      <view 
        v-for="(user, index) in userList" 
        :key="user.id"
        class="user-item"
      >
        <text>{{ user.name }} - {{ user.phone }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '用户管理',
      formData: {
        name: '',
        phone: ''
      },
      userList: []
    }
  },
  
  onLoad() {
    this.loadUserList()
  },
  
  methods: {
    async loadUserList() {
      try {
        const res = await uni.request({
          url: 'https://api.example.com/users',
          method: 'GET'
        })
        
        this.userList = res.data
      } catch (error) {
        uni.showToast({
          title: '加载失败',
          icon: 'error'
        })
      }
    },
    
    async submitForm() {
      if (!this.formData.name || !this.formData.phone) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'error'
        })
        return
      }
      
      try {
        await uni.request({
          url: 'https://api.example.com/users',
          method: 'POST',
          data: this.formData
        })
        
        uni.showToast({
          title: '提交成功',
          icon: 'success'
        })
        
        // 重置表单
        this.formData = { name: '', phone: '' }
        
        // 重新加载列表
        this.loadUserList()
      } catch (error) {
        uni.showToast({
          title: '提交失败',
          icon: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 40rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
  }
}

.content {
  .form-item {
    margin-bottom: 30rpx;
    
    .input {
      width: 100%;
      height: 88rpx;
      border: 2rpx solid #ddd;
      border-radius: 8rpx;
      padding: 0 20rpx;
      font-size: 32rpx;
    }
  }
  
  .submit-btn {
    width: 100%;
    height: 88rpx;
    background-color: #007AFF;
    color: white;
    border: none;
    border-radius: 8rpx;
    font-size: 32rpx;
  }
}

.user-list {
  margin-top: 60rpx;
  
  .user-item {
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;
    font-size: 28rpx;
  }
}
</style>
```

#### 条件编译
```vue
<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <button open-type="getUserInfo" @getuserinfo="onGetUserInfo">
      微信获取用户信息
    </button>
    <!-- #endif -->
    
    <!-- #ifdef MP-ALIPAY -->
    <button open-type="getAuthorize" @getAuthorize="onGetAuthorize">
      支付宝获取用户信息
    </button>
    <!-- #endif -->
    
    <!-- #ifdef H5 -->
    <button @click="login">H5登录</button>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  methods: {
    // #ifdef MP-WEIXIN
    onGetUserInfo(e) {
      console.log('微信用户信息:', e.detail.userInfo)
    },
    // #endif
    
    // #ifdef MP-ALIPAY
    onGetAuthorize(e) {
      console.log('支付宝用户信息:', e)
    },
    // #endif
    
    // #ifdef H5
    login() {
      // H5 登录逻辑
    }
    // #endif
  }
}
</script>

<style>
/* #ifdef MP-WEIXIN */
.wechat-style {
  background-color: #07C160;
}
/* #endif */

/* #ifdef MP-ALIPAY */
.alipay-style {
  background-color: #1677FF;
}
/* #endif */
</style>
```

## 🏗️ 原生小程序开发

### 微信小程序
```javascript
// app.js
App({
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  globalData: {
    userInfo: null
  }
})
```

```xml
<!-- pages/index/index.wxml -->
<view class="container">
  <view class="userinfo">
    <button 
      wx:if="{{!hasUserInfo && canIUse}}" 
      open-type="getUserInfo" 
      bindgetuserinfo="getUserInfo"
    >
      获取头像昵称
    </button>
    <block wx:else>
      <image bindtap="bindViewTap" 
             src="{{userInfo.avatarUrl}}" 
             mode="cover" 
             class="userinfo-avatar">
      </image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
  
  <view class="usermotto">
    <text class="user-motto">{{motto}}</text>
  </view>
</view>
```

```javascript
// pages/index/index.js
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
```

```css
/* pages/index/index.wxss */
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 200rpx;
}
```

## 📦 生态工具

### 状态管理
```javascript
// Taro Redux 集成
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}
```

### UI 组件库
```jsx
// Taro UI
import { AtButton, AtCard, AtList, AtListItem } from 'taro-ui'

const MyComponent = () => {
  return (
    <View>
      <AtCard
        title='卡片标题'
        content='这是卡片内容'
      />
      
      <AtList>
        <AtListItem 
          title='标题文字'
          arrow='right'
          thumb='https://example.com/thumb.png'
        />
      </AtList>
      
      <AtButton 
        type='primary' 
        onClick={handleClick}
      >
        按钮
      </AtButton>
    </View>
  )
}
```

```vue
<!-- uni-app uView UI -->
<template>
  <view>
    <u-card 
      title="卡片标题"
      sub-title="副标题"
      thumb="https://example.com/thumb.png"
    >
      卡片内容
    </u-card>
    
    <u-button 
      type="primary" 
      @click="handleClick"
    >
      按钮
    </u-button>
  </view>
</template>
```

## 🧪 测试

### Taro 测试
```javascript
// __tests__/pages/index.test.js
import { render, fireEvent } from '@testing-library/react'
import Index from '../../pages/index/index'

describe('Index Page', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Index />)
    
    expect(getByText('Hello Taro')).toBeInTheDocument()
  })
  
  it('should handle button click', () => {
    const mockFn = jest.fn()
    const { getByText } = render(<Index onButtonClick={mockFn} />)
    
    fireEvent.click(getByText('获取用户信息'))
    
    expect(mockFn).toHaveBeenCalled()
  })
})
```

## 🎯 选择建议

### 选择原生小程序开发如果：
- 只需要开发单一平台
- 追求最佳性能和体验
- 团队熟悉平台特定语法

### 选择 Taro 如果：
- 团队熟悉 React 技术栈
- 需要跨平台开发
- 希望代码复用率高

### 选择 uni-app 如果：
- 团队熟悉 Vue 技术栈
- 需要快速开发
- 对性能要求不是特别高

### 开发建议：
1. **性能优化**：避免频繁的 setData 调用
2. **用户体验**：合理使用 loading 和 toast
3. **代码规范**：保持一致的代码风格
4. **测试覆盖**：编写单元测试和集成测试

小程序开发需要考虑平台特性和限制，选择合适的框架能显著提高开发效率和代码质量。
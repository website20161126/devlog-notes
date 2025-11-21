# 移动端框架

移动端开发框架让开发者能够使用 Web 技术构建原生移动应用，实现跨平台开发。主流的移动端框架包括 React Native、Flutter、Ionic 等。

## 📱 主流移动端框架对比

| 框架 | 开发语言 | 性能 | 学习成本 | 生态 | 适用场景 |
|------|----------|------|----------|------|----------|
| [React Native](https://reactnative.dev/) | JavaScript/TypeScript | 高 | 中等 | 丰富 | Web 技术栈团队 |
| [Flutter](https://flutter.dev/) | Dart | 很高 | 中等 | 发展中 | 高性能应用 |
| [Ionic](https://ionicframework.com/) | HTML/CSS/JavaScript | 中等 | 简单 | 完善 | 快速原型开发 |
| [NativeScript](https://nativescript.org/) | JavaScript/TypeScript | 高 | 中等 | 中等 | 原生功能需求多 |



## 🚀 React Native

### 环境搭建
```bash
# 安装 React Native CLI
npm install -g react-native-cli

# 创建项目
npx react-native init MyMobileApp

# 启动开发
cd MyMobileApp
npx react-native run-android  # Android
npx react-native run-ios      # iOS
```

### 基础组件使用
```jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

const App = () => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/logo.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>React Native App</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>
            Clicked {count} times
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
```

### 导航
```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: '首页' }}
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{ title: '详情' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### 原生模块
```java
// Android (MainActivity.java)
package com.myapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class NativeModule extends ReactContextBaseJavaModule {
  NativeModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "NativeModule";
  }

  @ReactMethod
  public void getDeviceName(Promise promise) {
    try {
      String deviceName = android.os.Build.MODEL;
      promise.resolve(deviceName);
    } catch (Exception e) {
      promise.reject("ERROR", e.getMessage());
    }
  }
}
```

```jsx
// JavaScript 使用
import { NativeModules } from 'react-native';

const { NativeModule } = NativeModules;

const getDeviceInfo = async () => {
  try {
    const deviceName = await NativeModule.getDeviceName();
    console.log('Device name:', deviceName);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🎨 Flutter

### 环境搭建
```bash
# 安装 Flutter SDK
# 下载 https://flutter.dev/docs/get-started/install

# 检查环境
flutter doctor

# 创建项目
flutter create my_flutter_app

# 运行应用
cd my_flutter_app
flutter run
```

### Dart 语言基础
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

### 常用组件
```dart
class WidgetExamples extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        padding: EdgeInsets.all(16),
        children: [
          // 文本组件
          Text(
            'Hello Flutter',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.blue,
            ),
          ),
          
          SizedBox(height: 20),
          
          // 图片组件
          Image.network(
            'https://example.com/image.jpg',
            height: 200,
            fit: BoxFit.cover,
          ),
          
          SizedBox(height: 20),
          
          // 按钮组件
          ElevatedButton(
            onPressed: () {
              print('Button pressed');
            },
            child: Text('Click me'),
          ),
          
          SizedBox(height: 20),
          
          // 输入框
          TextField(
            decoration: InputDecoration(
              labelText: 'Enter your name',
              border: OutlineInputBorder(),
            ),
          ),
          
          SizedBox(height: 20),
          
          // 列表
          ListView.builder(
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemCount: 10,
            itemBuilder: (context, index) {
              return ListTile(
                leading: Icon(Icons.person),
                title: Text('Item $index'),
                subtitle: Text('Subtitle $index'),
                trailing: Icon(Icons.arrow_forward_ios),
              );
            },
          ),
        ],
      ),
    );
  }
}
```

### 网络请求
```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static Future<List<User>> fetchUsers() async {
    final response = await http.get(
      Uri.parse('https://jsonplaceholder.typicode.com/users')
    );

    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      return data.map((json) => User.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load users');
    }
  }
}

class User {
  final int id;
  final String name;
  final String email;

  User({required this.id, required this.name, required this.email});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }
}
```

## 🔋 Ionic

### 环境搭建
```bash
# 安装 Ionic CLI
npm install -g @ionic/cli

# 创建项目
ionic start my-ionic-app tabs --type=react

# 启动开发服务器
cd my-ionic-app
ionic serve

# 构建移动应用
ionic capacitor build android
ionic capacitor build ios
```

### 基础组件
```tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className="container">
          <h1>Welcome to Ionic</h1>
          <p>Modern web development with Ionic Framework</p>
          
          <IonButton expand="block" fill="clear">
            Get Started
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
```

### 使用 Capacitor 访问原生功能
```tsx
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    
    // 处理拍摄的照片
    console.log('Photo taken:', image.webPath);
  } catch (error) {
    console.error('Camera error:', error);
  }
};

// 在组件中使用
const CameraComponent: React.FC = () => {
  return (
    <div>
      <IonButton onClick={takePicture}>
        Take Photo
      </IonButton>
    </div>
  );
};
```

## 📊 性能优化

### React Native 优化
```jsx
import React, { memo, useMemo, useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';

// 使用 memo 优化组件
const UserItem = memo(({ user, onPress }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.name}>{user.name}</Text>
    <Text style={styles.email}>{user.email}</Text>
  </View>
));

const UserList = ({ users }) => {
  // 使用 useMemo 优化计算
  const filteredUsers = useMemo(() => {
    return users.filter(user => user.isActive);
  }, [users]);

  // 使用 useCallback 优化函数
  const handlePress = useCallback((userId) => {
    console.log('User pressed:', userId);
  }, []);

  return (
    <FlatList
      data={filteredUsers}
      renderItem={({ item }) => (
        <UserItem 
          user={item} 
          onPress={() => handlePress(item.id)} 
        />
      )}
      keyExtractor={item => item.id}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};
```

### Flutter 优化
```dart
class OptimizedList extends StatelessWidget {
  final List<Item> items;

  const OptimizedList({Key? key, required this.items}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      // 使用 const 构造函数
      itemBuilder: (context, index) {
        return ItemWidget(
          key: ValueKey(items[index].id),
          item: items[index],
        );
      },
    );
  }
}

// 使用 const 构造函数优化
class ItemWidget extends StatelessWidget {
  final Item item;

  const ItemWidget({Key? key, required this.item}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const ListTile(
      leading: Icon(Icons.person),
      title: Text('User Name'),
      subtitle: Text('User Email'),
    );
  }
}
```

## 🧪 测试

### React Native 测试
```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('should handle button press', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<MyComponent onPress={mockFn} />);
    
    fireEvent.press(getByText('Press me'));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### Flutter 测试
```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/main.dart';

void main() {
  testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    // 构建应用
    await tester.pumpWidget(MyApp());

    // 验证初始状态
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);

    // 点击按钮
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();

    // 验证状态变化
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}
```

## 🎯 选择建议

### 选择 React Native 如果：
- 团队熟悉 React 技术栈
- 需要快速开发
- 社区生态很重要
- 可以接受接近原生但非原生的性能

### 选择 Flutter 如果：
- 追求最佳性能
- 需要一致的 UI 表现
- 团队愿意学习 Dart
- 对动画和视觉效果要求高

### 选择 Ionic 如果：
- 团队主要是 Web 开发者
- 需要快速原型开发
- 对性能要求不是特别高
- 希望最大化代码复用

移动端框架的选择应该基于项目需求、团队技术栈和性能要求综合考虑。每个框架都有其优势和适用场景，关键是找到最适合你项目的解决方案。
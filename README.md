# React Hooks + Context打造简易redux
> `Hook`是`React 16.8`的新特性，它可以让在不编写`class`类组件的情况下使用`state`以及其他的`React`特性；而`Context`是`React16.3`版本里面引入新的`Context API`，在以往`React`版本中存在一个`Context API`，那是一个幕后试验性功能，官方提议避免使用,`Redux`的原理就是建立在旧的`Context API`。现在新的`Context ApI`提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法,为数据通讯另辟蹊径。

### Context简介

为解决多层嵌套不同层级组件之间`props`数据传递，这种数据传递及其繁杂，而且后期不易进行维护，为避免`driling`式数据通讯，可以采用`redux`进行数据通讯。在新版本`React 16.8.6`中`Context`为我们带来新的通讯方式。

#### `Context API`组成部分

- `React.createContext`函数：创建`context`上下文，参数是一个默认值（需要传递`state`数据）,`state`可以是`Object、Array`或者基本类型数据。

- `Provider`：由`React.createContext`创建返回对象的属性。在[Redux vs. The React Context API](https://link.juejin.im/?target=https%3A%2F%2Fdaveceddia.com%2Fcontext-api-vs-redux%2F)中比喻成构建组件树中的`电子总线`比较形象。

- `Consumer`：由`React.createContext`创建返回对象的属性。比喻接入`电子总线`获取数据。

#### `Context `  vs  `redux`

`Context`的`context.Provider/Context.Consumer`和`redux`的`provider/connect`非常相似。`Context`采用的是生产者消费者的模式,我们可以利用高阶函数(`Hoc`)模拟实现一个`redux`。

`redux`是通过`dispatch`一个`action`去修改`store`数据；在`React 16.8.6`版本的`React hooks`提供的`useredcuers`和`useContext`为我们更方便通过`Context+hooks`的形式去打造一个属于自己`redux`

#### `Context` 简单例子

> `Context `设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

- `Class.contextType`

挂载在` class `上的 `contextType` 属性会被重赋值为一个由 [`React.createContext()`](https://react.docschina.org/docs/context.html#reactcreatecontext) 创建的 `Context` 对象。这能让你使用 `this.context` 来消费最近 `Context` 上的那个值。你可以在任何生命周期中访问到它，包括` render` 函数中。

- `Context.Consumer`

让你在函数式组件中完成订阅 `context`。这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 `context` 值，返回一个 `React `节点。传递给函数的` value `值等同于往上组件树离这个 `context `最近的` Provider` 提供的 `value` 值。如果没有对应的 `Provider`，`value` 参数等同于传递给` createContext() `的 `defaultValue`。

```javascript
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
// 也可以按照这种形式获取
function ThemedButton(){
    return (
      <ThemeContext.Counsumer>
        {theme =>(
         <Button theme={theme} />
         )
  		}
       </ThemeContext.Counsumer>
      );
}
```

`context`的详细用法可以参考 [Context文档](https://react.docschina.org/docs/context.html)

### React Hooks

`React Hooks`是`React 16.8.6`版本为函数式组件添加了在各生命周期中获取`state`和`props`的通道。可让您在不编写类的情况下使用 state(状态) 和其他 React 功能。不再需要写`class`组件，你的所有组件都将是`Function`。如果想了解更多关于`React hooks`信息可以参考[Hooks API 参考](http://react.html.cn/docs/hooks-reference.html)。

#### 基础钩子API
- `useState`:获取组件`state`状态数据，第一个参数是保存的数据，第二参数是操作数据的方法,类似于`setState`。可用`ES6`的数组解构赋值来进行获取。
- `useEffect`: 网络请求、订阅某个模块、`DOM`操作都是副作用，`useEffect`是专门用来处理副作用的。在`class`类组件中,`componentDidMount`和`componentDidUpdate`生命周期函数是用来处理副作用的。
- `useContext`:`useContext`可以很方便去订阅`context`的改变，并在合适的时候重渲染组件。例如上面的函数式组件中，通过`Consumer`的形式获取`Context`的数据，有了`useContext`可以改写成下面：
```javascript
function ThemedButton(){
    const value = useContext(ThemeContxet);
    return (
         <Button theme={value} />
      );
}
```
#### useReducers API

如果习惯了`redux`通过`reducer`改变`state`或者`props`的形式，应该比较很好上手`useReducers`，`useReducers`和`useContext`是这篇文章比较重点的`API`。

- `useReducers`：`useReducers`可以传入三个参数，第一个是自定义`reducer`，第二参数是初始化默认值，第三个参数是一个函数，接受第二个参数进行计算获取默认值(可选)。
```javascript
const [state,dispatch] = useReducer(reducer,initialValue)
```
下面是`useReducers`官方示例：

```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, {count: initialCount});
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```
### 简易版Redux
`redux`具有`Provider`组件，通过`store`进行传值。在这里，我们使用`Context`模拟实现`Provider`和`store`传值，完整代码可以参考 [simple-redux](https://github.com/Harhao/simple-redux)。
#### 封装`Provider`组件
代码中的`storeContext`是`React.createContext()`函数创建的Context对象。`this.props.store`是模拟通过`store`传值操作。

```javascript
import React,{Component} from 'react';
import {storeContext} from './store';
export default class Provider extends Component{
    render(){
        return (
            <storeContext.Provider value={this.props.store}>
                {this.props.children}
            </storeContext.Provider>
        )
    }
}
```
#### store数据管理

`store`文件，包括`reducer`、`Context`的创建，`initialState`与`reducers`的定义。
```javascript
import React from 'react';
export const storeContext = React.createContext();
export const initialState = {
    user:'kiwis',
    age:23
}
export const reducer = (state, action)=>{
    switch (action.type) {
      case 'CHANGENAME':
        return {user:'harhao',age:24}
      default:
        return initialState;
    }
}

```
#### App.js入口
在根组件`App.js`中，使用`React hooks`d的`useReducer`钩子函数,返回更改`state`的`dispatch`函数。然后把`store`数据和`dispatch`传递进封装的`Provider`组件中。
```javascript
import React,{useReducer} from 'react';
import Provider from './views/Provider';
import Child from './views/child';
import {initialState as store,reducer} from './views/store';
import './App.css';

function App() {
  const [state,dispatch] = useReducer(reducer,store);
  return (
    <div className="App">
      <Provider store={{state,dispatch}}>
        <Child/>
      </Provider>
    </div>
  );
}
export default App;
```
#### useConnect自定义Hook
在`useConext`外包裹一层函数，更好模拟`connect`语法。这里采用自定义`React hooks`的方法。定义一个自定`hook`函数`useConnect`,如下所示：
```javascript
import {useConext} from 'react';
export default function useConnect(props){
    return useContext(props);
}
```
#### Child子组件

在`App.js`的子组件`Child`中,在`redux`中通过`connect`高阶函数来传递数据。这里可以使用自定义`React hooks`函数`useConnect`获取`state`和`dispatch`。

```javascript
import React,{useContext} from 'react';
import useConnect from './connect';
import {storeContext} from './store';
import DeepChild from './deepChild';
function Child() {
    const {state,dispatch}= useConnect(storeContext);
    return (
        <div className="child">
            <p>姓名:{state.user}</p>
            <p>年龄:{state.age}</p>
            <button onClick={()=>dispatch({type:'CHANGENAME'})}>changeName</button>
            <p>deep child:</p>
            <DeepChild/>
        </div>

    );
}

export default Child;
```
#### DeepChild(孙组件)

在`Child`子组件中，引入`DeepChild`组件。通过`useContext`获取顶层最近的`state`数据。
```javascript
import React,{useContext} from 'react';
import {storeContext} from './store';
import useConnect from './connect';
export default function DeepChild(){
    const {state} = useConnect(storeContext);
    return (
        <div>
            {state.user}
        </div>
    )
}
```
### 运行效果

`child`子组件和`DeepChild`孙组件通过`useConnect`获取顶层数据，最终运行效果如下所示：

![demo](https://user-gold-cdn.xitu.io/2019/6/14/16b53ae1fea18183?w=329&h=363&f=gif&s=9266)

>如果喜欢可以给个赞~或星~哟<br/>
git地址:[https://github.com/Harhao/simple-redux](https://github.com/Harhao/simple-redux)

> 参考文章<br/>
[React中文文档](https://react.docschina.org/docs/context.html#reactcreatecontext)<br/>
[[译]2019 React Redux 完全指南](https://juejin.im/post/5cac8ccd6fb9a068530111c7)<br/>
[[译] Redux vs. React 的 Context API](https://juejin.im/post/5cee43ad518825526b294a32#heading-9)<br/>
[React Hooks 解析（上）：基础](https://mp.weixin.qq.com/s?__biz=MzIzMzIwMDQ1Mw==&mid=2649187994&idx=1&sn=d1eabc35388b5f5b1d5f5b0cab75a8ff&chksm=f09a88b0c7ed01a6fe9f79026f798ce4592ccedf8f76c7850f7d58998b50b95c77f45e19c526&mpshare=1&scene=1&srcid=&pass_ticket=H2IRDfdbpnrRNkUjKu7MapsuZQ85iMMDmYSQGZ4hDxd8neiGY6lOoC7fEZrUrWQb#rd)<br/>
[React Hooks 解析（下）：进阶](https://mp.weixin.qq.com/s?__biz=MzIzMzIwMDQ1Mw==&mid=2649187998&idx=1&sn=5cd7e32f5c364afa83cb6d52b864fc2f&chksm=f09a88b4c7ed01a265c69cda59c2eded0b38bfacdd119b305fc2d011955624a3a6a8dbfa3ca9&mpshare=1&scene=1&srcid=&pass_ticket=H2IRDfdbpnrRNkUjKu7MapsuZQ85iMMDmYSQGZ4hDxd8neiGY6lOoC7fEZrUrWQb#rd)


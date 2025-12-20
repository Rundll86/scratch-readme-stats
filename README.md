# Scratch README Stats
用于生成适用于Scratch社区的个人信息卡片

## 快速生成个人社区信息卡片

在您的Markdown里嵌入如下代码
```md
![](http://scratch-readme-state.yearnstudio.cn/?code=你的40codeID&username=你的昵称)
```

你会得到下图所示的卡片

![](http://scratch-readme-state.yearnstudio.cn/?code=858&zc=125&username=阳毅)

---

## 各个参数

| 参数 | 描述 |
| --- | --- |
| code | 40code账户ID |
| zc | ZeroCat社区账户ID |
| username | 显示昵称(可自定义) |
| color | 颜色(诸如`aaaaaa`) |

### 默认值
- color: `2f80ed`
- username: `Developer`

---

## TODO
- [x] 添加主题切换
- [ ] 支持小盒子社区
- [x] 备用线路部署

## 线路

### ESA边缘函数
```
http://scratch-readme-state.yearnstudio.cn
```

### EdgeOne边缘函数
> 支持HTTP/HTTPS
```
https://screadme.yearnstudio.cn/
```

## 灵感来源

[anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
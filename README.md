# Scratch README Stats

用于生成适用于Scratch社区的个人信息卡片

## 快速生成个人社区信息卡片

在您的Markdown里嵌入如下代码

```md
![提示文字](http://scratch-readme-state.yearnstudio.cn/?code=你的40codeID&username=你的昵称)
```

你会得到下图所示的卡片

![阳毅 个人卡片](http://scratch-readme-state.yearnstudio.cn/?code=858&zc=125&username=阳毅)

---

## 各个参数

社区账户填写：

| 参数       | 描述                                   |
|------------|----------------------------------------|
| code       | 40code账户ID                           |
| zc         | ZeroCat账户ID                          |
| sbox       | 小盒子社区账户ID                       |
| ccw        | 共创世界账户Oid（/student/**XXX**）    |
| scratch    | Scratch官方社区 用户名                 |
| kernyr     | 主核社区 用户名                        |
| clipcc     | 别针社区账户ID                         |

其他信息填写：

| 参数        | 描述                                   |
|-------------|----------------------------------------|
| username*   | 显示昵称(可自定义)                     |
| color*      | 颜色(诸如`red`、`FF0000`)              |
| theme*      | 主题(dark/light)                       |
| rankSystem* | 分级系统ID(default/ccw/scratch/kernyr) |

## 社区支持情况

| 社区             | 支持度                            |
|------------------|-----------------------------------|
| 40code           | 公开作品数/点赞数/观看数          |
| 别针社区         | 公开作品数/点赞数/收藏数/播放数   |
| 共创世界         | 公开作品数/点赞数/收藏数/试玩数   |
| Scratch          | 公开作品数/Loves/Favourites/Views |
| ZeroCat          | 公开作品数/Stars                  |
| 主核社区         | 话题数/点赞数/转发数              |
| 小盒子社区(Sbox) | Likes/Stars/views/pr              |

欢迎各位前来贡献

### 默认值

- color: `2f80ed`
- username: `Unnamed Developer`
- theme: `dark`
- rankSystem: `default`

---

## TODO

- [x] 添加主题切换
- [x] 支持小盒子社区
- [x] 备用线路部署

## 线路

### ESA边缘函数

```plain
http://scratch-readme-state.yearnstudio.cn
```

### EdgeOne边缘函数(荐)
>
> 支持HTTP/HTTPS

```plain
https://screadme.yearnstudio.cn/
```

## 灵感来源

[anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

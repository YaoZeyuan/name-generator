# 起名辅助工具

源代码位于 resource 文档中, 方便发版

发布时发布到 gh-pages 分支上

# 开发指南

```bash
#   安装yarn
npm i -g yarn
#   在resource目录下进行开发
cd ./resource
#   切换到gh-pages分支
git checkout gh-pages -f
#   安装依赖
yarn
#   启动命令
yarn start
```

# 发布指南

```bash
#   已配置build脚本, build完成后, 自动提交并发布
yarn build
```

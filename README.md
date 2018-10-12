### Wall Robot 瓦力机器人

一个钉钉群机器人，用于：

- 每周2、4工作日上午10点提醒所有人开晨会
- 每周最后一个工作日下午6点提醒所有人更新周报
- 每个工作日下午3天发送Bug报告

### 开始
```bash
npm install pm2 -g # 安装到全局, 可能需要 sudo
npm install

# 配置自己的 app.dev.config.js
cp app.config.js app.dev.config.js

# 需要配置自己的钉钉机器人 access_token
# 如果需要抓取禅道Bug的话，请配置 ZENTAO 对应的 username、password

# pm2 启动
pm2 app.dev.config.js

```
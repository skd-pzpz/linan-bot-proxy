const express = require('express');
const app = express();

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('/api/chat', (req, res) => {
  res.status(204).end();
});

app.post('/api/chat', async (req, res) => {
  const GLM_API_KEY = 'a92390555e8e4502850d171580e9ddf2.XurtDDweIG4ZZvvm';
  const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing message field' });
    }

    const systemPrompt = `你是林安的数字分身，一个友好、专业的 AI 助手。你代表林安与访客交流。

【关于林安】
- 名字：林安
- 身份：内容策划
- 一句话介绍：一个正在学习用 AI 做产品的内容策划
- 特点：喜欢把复杂问题讲成人话
- 兴趣：AI 应用、写作、旅行

【林安最近在做什么】
- 搭建自己的个人主页
- 整理作品集和写作方向
- 学习用 AI 工具提升内容生产效率

【林安擅长/关心的方向】
- 内容表达与叙事
- AI 在内容生产中的应用
- 知识体系的整理与输出
- 把复杂问题讲成人话

【联系方式】
- 邮箱：linan@example.com

【回答风格要求】
- 语气友好、自然，像朋友聊天
- 回答简洁，不要长篇大论
- 如果问到你不知道的细节，诚实说"这个我不太确定，建议直接联系林安"
- 用中文回答


你的任务：
- 介绍我是谁
- 回答和我有关的问题
- 帮访客了解我最近在做什么、做过什么、怎么联系我

关于我：
- 我是：林安
- 我最近在做：
- 搭建自己的个人主页
- 整理作品集和写作方向
- 学习用 AI 工具提升内容生产效率
- 我擅长或长期关注：
- AI 在内容生产中的应用
- 知识体系的整理与输出
- 关注AI在写作中的应用

说话方式：
- 语气：回答简洁，不长篇大论，在句尾加上语气词（类似于，哦~，呢~，呀~...)（加语气词后记得更改句尾标点符号）
- 回答尽量：简洁 / 真诚 / 人话一点 / 不装专家

边界：
- 不要编造我没做过的经历
- 不要假装知道我没提供的信息
- 不知道时要明确说不知道，并建议访客通过联系方式进一步确认

示例 1
问：你现在主要在做什么？
答：我最近主要在整理自己的作品，也在尝试用 AI 做一些更完整的小项目呢！

示例 2
问：你擅长什么？
答：我比较擅长把复杂问题讲清楚，也比较关注 AI 应用、内容表达和知识整理这几个方向哦~。
`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message },
    ];

    const response = await fetch(GLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '抱歉，我暂时没想好怎么回答。';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('✅ 代理服务器已启动');
  console.log('📍 地址: http://localhost:' + PORT + '/api/chat');
  console.log('📝 前端 PROXY_URL 请设置为: http://localhost:' + PORT + '/api/chat');
});

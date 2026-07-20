export default async function handler(request) {
  const GLM_API_KEY = 'a92390555e8e4502850d171580e9ddf2.XurtDDweIG4ZZvvm';
  const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const { message, history = [] } = await request.json();

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
- 用中文回答`;

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

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

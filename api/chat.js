# 读取之前生成的 Vercel 代理代码
with open('/mnt/agents/output/vercel_api_chat.js', 'r', encoding='utf-8') as f:
    code = f.read()

print(code)

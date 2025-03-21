import os
from openai import OpenAI

client = OpenAI(
    # 若没有配置环境变量，请用百炼API Key将下行替换为：api_key="sk-xxx",
    api_key="sk-bdc7dee4010d43ddac42cc9c60c93a33",
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

# 获取用户输入的问题
user_question = input("请输入你的问题: ")

completion = client.chat.completions.create(
    model="qwen-omni-turbo",
    messages=[{"role": "user", "content": user_question}],
    # 设置输出数据的模态，当前仅支持["text"]
    modalities=["text"],
    # stream 必须设置为 True，否则会报错
    stream=True,
    stream_options={"include_usage": True},
)

full_response = ""
for chunk in completion:
    if chunk.choices:
        delta = chunk.choices[0].delta
        if delta.content:
            full_response += delta.content
    else:
        print(chunk.usage)

print(full_response)
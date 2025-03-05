import requests
import json

# 定义 API 地址
url = "https://gpt-api.hkust-gz.edu.cn/v1/chat/completions"

# 定义请求头
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer KEY"  # 请将 KEY 替换为你的实际 API 密钥
}

# 从用户输入获取内容
user_input = input("请输入你的问题：")

# 定义请求数据
data = {
    "model": "DeepSeek-R1-671B",  # 模型名称
    "messages": [{"role": "user", "content": user_input}],  # 用户输入
    "temperature": 0.7  # 温度参数
}

# 发送 POST 请求
response = requests.post(url, headers=headers, data=json.dumps(data))

# 处理 API 响应
if response.status_code == 200:
    print("请求成功：")
    result = response.json()
    print(json.dumps(result, indent=4))  # 格式化打印 JSON 数据

    # 将结果保存到文件
    with open("response.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=4)
    print("结果已保存到 response.json 文件。")
else:
    print(f"请求失败，状态码：{response.status_code}")
    print(response.text)
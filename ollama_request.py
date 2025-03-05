import requests

message_list = []

while True:
    text = input("请输入: ")
    user_dict = {"role": "user", "content": text}
    message_list.append(user_dict)

    res = requests.post(
        url="http://localhost:11434/api/chat",
        json={
            "model": "deepseek-r1:7b", 
            "messages": message_list,
            "stream": False
            "temperature": 0.7,  # 显式设置 temperature
            "max_tokens": 100    # 显式设置 max_tokens
        }
    )

    data_dict = res.json()
    res_msg_dict = data_dict['message']
    print(res_msg_dict)

    message_list.append(res_msg_dict)
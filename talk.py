from llama_cpp import Llama
import time

def stream_callback(token: str, **kwargs):
    """ 实时流式输出token的回调函数 """
    print(token, end="", flush=True)

# 初始化模型（参数根据你的硬件调整）
model = Llama(
    model_path="../models/lmstudio-community/DeepSeek-R1-Distill-Qwen-7B-GGUF/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf",  # 改为你的模型路径
    n_ctx=2048,      # 上下文长度
    n_threads=4,     # 使用CPU线程数
    n_gpu_layers=33,  # GPU加速层数（如果使用CUDA）
    verbose=True
)

def chat():
    history = []
    print("\n=== 对话开始（输入 '退出' 结束）===")
    
    while True:
        try:
            # 获取用户输入
            user_input = input("\n\n[你]: ")
            
            if user_input.lower() in ["退出", "exit"]:
                print("\n对话结束")
                break
                
            # 构建完整prompt
            full_prompt = "\n".join(history + [f"[你]: {user_input}", "[AI]:"])
            
            print("[AI]: ", end="", flush=True)  # 先打印前缀
            
            # 流式生成
            response = model.create_chat_completion(
                messages=[{"role": "user", "content": user_input}],
                temperature=0.7,
                max_tokens=500,
                stop=["[你]:"],  # 停止标记
                stream=True
            )
            
            # 实时流式输出
            full_response = ""
            for chunk in response:
                delta = chunk['choices'][0]['delta']
                if "content" in delta:
                    token = delta["content"]
                    print(token, end="", flush=True)
                    full_response += token
            
            # 保存对话历史（控制长度）
            history.append(f"[你]: {user_input}")
            history.append(f"[AI]: {full_response}")
            history = history[-6:]  # 保留最近3轮对话
            
        except KeyboardInterrupt:
            print("\n对话终止")
            break

if __name__ == "__main__":
    chat()
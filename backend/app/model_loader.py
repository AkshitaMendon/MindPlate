# # app/model_loader.py
# import os
# import torch
# from transformers import AutoTokenizer, AutoModelForCausalLM
# from dotenv import load_dotenv

# load_dotenv()

# MODEL_PATH = os.getenv("MODEL_PATH", "./smollm_mealplan_final")
# DEVICE = os.getenv("DEVICE", "auto")

# def load_model():
#     print("🔄 Loading SmolLM model...")

#     tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

#     # 👇 The key fix: specify offload_folder
#     model = AutoModelForCausalLM.from_pretrained(
#         MODEL_PATH,
#         torch_dtype=torch.float16,
#         device_map=None,
#         offload_folder="./model_offload",   # temporary disk cache
#         low_cpu_mem_usage=True
#     )

#     print("✅ Model loaded successfully!")
#     return model, tokenizer

# app/model_loader.py
# app/model_loader.py
import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from dotenv import load_dotenv
import warnings

warnings.filterwarnings("ignore", category=UserWarning, module="torch.nn.modules.module")

load_dotenv()

MODEL_PATH = os.getenv("MODEL_PATH", "./smollm_mealplan_final")
DEVICE = os.getenv("DEVICE", "auto")

def load_model():
    print("🔄 Loading SmolLM model...")

    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_PATH,
        dtype=torch.float16,
        device_map=None,
        offload_folder="./model_offload",      # <== crucial line
        low_cpu_mem_usage=True
    )

    model.eval()
    print("✅ Model loaded successfully!")
    return model, tokenizer



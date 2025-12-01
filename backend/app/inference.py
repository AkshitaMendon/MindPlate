# # # app/inference.py
# # import torch

# # def generate_mealplan(model, tokenizer, user_input: dict):
# #     """
# #     Generate a meal plan based on user input using SmolLM.
# #     """
# #     prompt = (
# #         f"Generate a structured weekly meal plan in JSON format for a university student.\n"
# #         f"The JSON must include breakfast, lunch, and dinner, each with 3 options.\n"
# #         f"Each option should contain description, ingredients, and benefits.\n\n"
# #         f"User Profile:\n"
# #         f"Age: {user_input.get('Age')}\n"
# #         f"Gender: {user_input.get('Gender')}\n"
# #         f"BMI: {user_input.get('BMI')}\n"
# #         f"Mental Health Condition: {user_input.get('Mental Health Condition')}\n"
# #         f"Daily Calorie Target: {user_input.get('Daily Calorie Target')}\n"
# #         f"Country of Origin: {user_input.get('Country of Origin')}\n"
# #         f"Country of Residence: {user_input.get('Country of Residence')}\n\n"
# #         f"Output (JSON):\n"
# #     )

# #     inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

# #     with torch.no_grad():
# #         outputs = model.generate(
# #             **inputs,
# #             max_new_tokens=1200,
# #             do_sample=False,
# #             temperature=0.7,
# #             top_p=0.9,
# #             repetition_penalty=1.1,
# #             eos_token_id=None
# #         )

# #     result = tokenizer.decode(outputs[0], skip_special_tokens=True)
# #     if "Output (JSON):" in result:
# #         result = result.split("Output (JSON):")[-1].strip()
# #     return result
# # app/inference.py
# import torch
# import json
# from transformers import pipeline
# import re
# import json
# import json_repair

# def build_prompt(data):
#     """Constructs the input prompt from the student profile"""
#     prompt = f"""Example:
# Age: 22
# Gender: Male
# BMI: 25
# Mental Health Condition: Anxiety
# Daily Calorie Target: 1800
# Country of Origin: India
# Country of Residence: Canada

# Output (JSON):
# {{"breakfast":{{"meal_type":"Breakfast","options":[{{"description":"Oatmeal with nuts","ingredients":["Oats","Almond milk","Walnuts"],"benefits":"Helps maintain energy and reduces anxiety."}}]}},
# "lunch":{{"meal_type":"Lunch","options":[{{"description":"Grilled chicken salad","ingredients":["Grilled chicken","Spinach","Olive oil"],"benefits":"High protein and magnesium support stress reduction."}}]}},
# "dinner":{{"meal_type":"Dinner","options":[{{"description":"Vegetable soup","ingredients":["Mixed vegetables","Lentils","Olive oil"],"benefits":"Light, nutrient-dense and calming before sleep."}}]}}}}

# Now generate the meal plan for the following student:
# Age: {data['age']}
# Gender: {data['gender']}
# BMI: {data['bmi']}
# Mental Health Condition: {data['mental_health']}
# Daily Calorie Target: {data['calories']}
# Country of Origin: {data['origin']}
# Country of Residence: {data['residence']}

# Output (JSON):
# """
#     return prompt


# # def generate_mealplan(model, tokenizer, data):
# #     """Runs model inference and returns generated meal plan"""
# #     device = 0 if torch.cuda.is_available() else -1
# #     pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, device=device)

# #     prompt = build_prompt(data)

# #     output = pipe(
# #         prompt,
# #         max_new_tokens=1000,
# #         do_sample=True,
# #         temperature=0.7,
# #         top_p=0.9,
# #         repetition_penalty=1.1
# #     )[0]["generated_text"]

# #     # Extract clean JSON
# #     generated = output.split("Output (JSON):")[-1].strip()

# #     # Try parsing JSON safely
# #     try:
# #         start = generated.find("{")
# #         end = generated.rfind("}")
# #         json_str = generated[start:end + 1]
# #         plan = json.loads(json_str)
# #     except Exception:
# #         plan = {"error": "Could not parse JSON", "raw_output": generated}

# #     return plan

# def generate_mealplan(model, tokenizer, data):
#     """Runs model inference and returns generated meal plan"""

#     device = 0 if torch.cuda.is_available() else -1
#     pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, device=device)

#     prompt = build_prompt(data)

#     output = pipe(
#         prompt,
#         max_new_tokens=1000,
#         do_sample=True,
#         temperature=0.7,
#         top_p=0.9,
#         repetition_penalty=1.1
#     )[0]["generated_text"]

#     # -----------------------
#     # CLEANING & JSON PARSING
#     # -----------------------
#     generated = output.split("Output (JSON):")[-1].strip()

#     # Step 1 — remove backticks, codeblocks
#     generated = generated.replace("```", "").replace("`", "").strip()

#     # Step 2 — remove trailing "Note:" or extra text after JSON
#     generated = re.split(r"\n[A-Za-z ]+:$", generated)[0].strip()

#     # Step 3 — find the JSON object inside the text
#     start = generated.find("{")
#     end = generated.rfind("}")

#     if start == -1 or end == -1:
#         return {"error": "No JSON found", "raw_output": generated}

#     json_str = generated[start:end + 1]

#     # Step 4 — try exact JSON loading
#     try:
#         return json.loads(json_str)
#     except Exception:
#         pass

#     # Step 5 — try repaired JSON
#     try:
#         repaired = json_repair.loads(json_str)
#         return repaired
#     except Exception:
#         return {"error": "Could not parse even after repair", "raw_output": generated}


import os
import requests
import json
import re
import json_repair
from dotenv import load_dotenv

load_dotenv()

# Load LLM server endpoint from .env
LLM_URL = os.getenv("LLM_SERVER_URL")


def build_prompt(data):
    """Construct the full structured prompt from the student profile."""
    prompt = f"""Example:
Age: 22
Gender: Male
BMI: 25
Mental Health Condition: Anxiety
Daily Calorie Target: 1800
Country of Origin: India
Country of Residence: Canada

Output (JSON):
{{"breakfast":{{"meal_type":"Breakfast","options":[{{"description":"Oatmeal with nuts","ingredients":["Oats","Almond milk","Walnuts"],"benefits":"Helps maintain energy and reduces anxiety."}}]}},"lunch":{{"meal_type":"Lunch","options":[{{"description":"Grilled chicken salad","ingredients":["Grilled chicken","Spinach","Olive oil"],"benefits":"High protein and magnesium support stress reduction."}}]}},"dinner":{{"meal_type":"Dinner","options":[{{"description":"Vegetable soup","ingredients":["Mixed vegetables","Lentils","Olive oil"],"benefits":"Light, nutrient-dense and calming before sleep."}}]}}}}

Now generate the meal plan for the following student:
Age: {data['age']}
Gender: {data['gender']}
BMI: {data['bmi']}
Mental Health Condition: {data['mental_health']}
Daily Calorie Target: {data['calories']}
Country of Origin: {data['origin']}
Country of Residence: {data['residence']}

Output (JSON):
"""
    return prompt


def generate_mealplan(data):
    """
    1. Build structured prompt
    2. Send prompt to GPU model server
    3. Parse JSON and return clean response
    """

    if not LLM_URL:
        return {"error": "LLM_SERVER_URL not set in .env"}

    # STEP 1 — build the correct LORA-trained structured prompt
    prompt = build_prompt(data)

    # STEP 2 — send to remote LLM
    try:
        response = requests.post(LLM_URL, json={"prompt": prompt})
        response.raise_for_status()
    except Exception as e:
        return {"error": f"LLM endpoint failed: {str(e)}"}

    raw_text = response.json().get("response", "")

    # STEP 3 — extract text after the "Output (JSON):" marker
    generated = raw_text.split("Output (JSON):")[-1].strip()

    # Step 4 — clean markdown/code fencing
    generated = generated.replace("```", "").replace("`", "").strip()

    # Step 5 — extract JSON block
    start = generated.find("{")
    end = generated.rfind("}")

    if start == -1 or end == -1:
        return {"error": "No JSON found", "raw_output": generated}

    json_str = generated[start:end + 1]

    # STEP 6 — try normal JSON parsing
    try:
        return json.loads(json_str)
    except Exception:
        pass

    # STEP 7 — try repaired JSON
    try:
        return json_repair.loads(json_str)
    except Exception:
        return {"error": "Could not parse JSON", "raw_output": generated}

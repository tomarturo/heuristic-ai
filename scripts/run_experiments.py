#!/usr/bin/env python3
"""
Minimal UX Evaluation Experiment Runner
Starts with local Ollama models to prototype the pipeline
"""

import json
import requests
import base64
import time
from datetime import datetime
from pathlib import Path

class UXExperimentRunner:
    def __init__(self, output_dir="public/raw"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.ollama_base_url = "http://localhost:11434"
        
    def encode_image(self, image_path):
        """Convert image to base64 for Ollama"""
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    
    def run_ollama_vision(self, model, prompt, image_path):
        """Send prompt + image to local Ollama model"""
        image_b64 = self.encode_image(image_path)
        
        payload = {
            "model": model,
            "prompt": prompt,
            "images": [image_b64],
            "stream": False
        }
        
        start_time = time.time()
        
        try:
            response = requests.post(
                f"{self.ollama_base_url}/api/generate",
                json=payload,
                timeout=120  # Vision models can be slow
            )
            response.raise_for_status()
            
            end_time = time.time()
            duration = end_time - start_time
            
            response_data = response.json()
            
            return {
                "response": response_data["response"],
                "duration_seconds": round(duration, 2),
                "prompt_eval_count": response_data.get("prompt_eval_count", 0),
                "eval_count": response_data.get("eval_count", 0),  # Output tokens
                "total_duration": response_data.get("total_duration", 0),
                "prompt_eval_duration": response_data.get("prompt_eval_duration", 0),
                "eval_duration": response_data.get("eval_duration", 0)
            }
        except Exception as e:
            end_time = time.time()
            duration = end_time - start_time
            return {
                "response": f"Error: {str(e)}",
                "duration_seconds": round(duration, 2),
                "prompt_eval_count": 0,
                "eval_count": 0,
                "total_duration": 0,
                "prompt_eval_duration": 0,
                "eval_duration": 0
            }
    
    def run_single_experiment(self, interface_path, interface_id):
        """Run one complete experiment: one interface, one model, one prompt"""
        
        # Simple UX evaluation prompt
        prompt = """
        Analyze this user interface screenshot for usability issues using Nielsen's 10 usability heuristics:
        
        1. Visibility of system status
        2. Match between system and real world
        3. User control and freedom
        4. Consistency and standards
        5. Error prevention
        6. Recognition rather than recall
        7. Flexibility and efficiency of use
        8. Aesthetic and minimalist design
        9. Help users recognize and recover from errors
        10. Help and documentation
        
        For each issue you find, provide:
        - Brief title
        - Which heuristic it violates
        - Severity (1-5, where 5 is critical)
        - Specific location description
        - Actionable recommendation
        
        Format your response as a JSON object with an 'issues' array.
        Return ONLY valid JSON without markdown formatting or code blocks.
        """
        
        # Run with llava model (install with: ollama pull llava)
        model = "llava"
        
        print(f"Running experiment on {interface_id}...")
        result = self.run_ollama_vision(model, prompt, interface_path)
        
        # Structure the output
        experiment_data = {
            "experiment_id": f"exp_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "timestamp": datetime.now().isoformat(),
            "interface_id": interface_id,
            "model": model,
            "prompt_type": "nielsen_heuristics_json",
            "raw_response": result["response"],
            "metrics": {
                "duration_seconds": result["duration_seconds"],
                "output_tokens": result["eval_count"],
                "prompt_tokens": result["prompt_eval_count"],  # Includes image processing
                "total_tokens": result["prompt_eval_count"] + result["eval_count"],
                "tokens_per_second": round(result["eval_count"] / result["duration_seconds"], 2) if result["duration_seconds"] > 0 else 0,
                "ollama_total_duration_ns": result["total_duration"],
                "ollama_prompt_eval_duration_ns": result["prompt_eval_duration"],
                "ollama_eval_duration_ns": result["eval_duration"]
            },
            "status": "completed" if "Error:" not in result["response"] else "error"
        }
        
        return experiment_data
    
    def save_results(self, experiment_data):
        """Save experiment results to JSON file for frontend"""
        filename = f"experiment_{experiment_data['experiment_id']}.json"
        filepath = self.output_dir / filename
        
        with open(filepath, 'w') as f:
            json.dump(experiment_data, f, indent=2)
        
        print(f"Results saved to {filepath}")
        return filepath
    
    def run_basic_pipeline(self, interface_path, interface_id):
        """Complete pipeline: run experiment + save results"""
        experiment_data = self.run_single_experiment(interface_path, interface_id)
        result_file = self.save_results(experiment_data)
        
        print("\n" + "="*50)
        print("EXPERIMENT COMPLETE")
        print("="*50)
        print(f"Interface: {interface_id}")
        print(f"Model: {experiment_data['model']}")
        print(f"Status: {experiment_data['status']}")
        print(f"Duration: {experiment_data['metrics']['duration_seconds']}s")
        print(f"Output tokens: {experiment_data['metrics']['output_tokens']}")
        print(f"Prompt tokens: {experiment_data['metrics']['prompt_tokens']}")
        print(f"Tokens/sec: {experiment_data['metrics']['tokens_per_second']}")
        print(f"Results: {result_file}")
        
        return experiment_data

# Example usage
if __name__ == "__main__":
    runner = UXExperimentRunner()
    
    # Test with a sample screenshot
    # Put a screenshot in a 'test_interfaces' folder
    test_image = "test-interfaces/sample-ui.png"
    
    if Path(test_image).exists():
        result = runner.run_basic_pipeline(test_image, "sample-ui")
        print(f"\nRaw model response preview:")
        print(result["raw_response"][:200] + "...")
    else:
        print(f"Put a test screenshot at: {test_image}")
        print("Then run this script to test the pipeline!")
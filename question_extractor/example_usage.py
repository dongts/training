#!/usr/bin/env python3
"""
Example usage of the QuestionExtractor class.

This script demonstrates how to use the QuestionExtractor to extract questions
from an Excel file and convert them to JSON format.
"""

from excel import QuestionExtractor
import json
import os


def example_usage():
    """Demonstrate how to use the QuestionExtractor."""
    
    # Example 1: Basic usage with library
    print("=== Example 1: Basic Library Usage ===")
    
    # Assuming you have an Excel file named 'questions.xlsx'
    excel_file = 'questions.xlsx'
    
    if not os.path.exists(excel_file):
        print(f"Excel file '{excel_file}' not found. Please provide a valid Excel file.")
        print("Expected format: columns should include 'index', 'question', 'A', 'B', 'C', 'D', 'correct', 'explain'")
        return
    
    # Create extractor instance
    extractor = QuestionExtractor(excel_file, source_name="Nghiệp vụ công tác Đảng")
    
    # Extract questions
    questions = extractor.extract_questions()
    
    if questions:
        print(f"Successfully extracted {len(questions)} questions")
        
        # Display first question as example
        print("\nSample question:")
        print(json.dumps(questions[0], ensure_ascii=False, indent=2))
        
        # Save to JSON file
        extractor.save_to_json(questions, 'extracted_questions.json')
        
    else:
        print("No questions were extracted. Please check your Excel file format.")
    
    print("\n" + "="*50)
    
    # Example 2: Command line usage instructions
    print("=== Example 2: Command Line Usage ===")
    print("You can also use this as a command-line tool:")
    print(f"python excel.py {excel_file} -o output.json -s 'Your Source Name'")
    print(f"python excel.py {excel_file} --sheet 'Sheet1' -o output.json")
    print()
    print("Command line options:")
    print("  excel_file        : Path to the Excel file (required)")
    print("  -o, --output      : Output JSON file path (default: questions.json)")
    print("  -s, --source      : Source/subject name (default: uses sheet name)")
    print("  --sheet          : Sheet name to read (default: first sheet)")


def create_sample_excel():
    """Create a sample Excel file for testing."""
    import pandas as pd
    
    sample_data = {
        'index': [1, 2],
        'question': [
            "Tổ chức cơ sở đảng theo Điều lệ Đảng hiện hành bao gồm:",
            "Đảng viên phải có những phẩm chất nào?"
        ],
        'A': [
            "Chi bộ cơ sở, Đảng bộ cơ sở, Ban cán sự đảng",
            "Trung thực, gần gũi nhân dân"
        ],
        'B': [
            "Chi bộ cơ sở, Đảng bộ cơ sở.",
            "Có đạo đức cách mạng"
        ],
        'C': [
            "Chi bộ cơ sở, Đảng bộ cơ sở, Đảng đoàn",
            "Có ý thức tổ chức kỷ luật"
        ],
        'D': [
            "Chi bộ cơ sở, Đảng bộ cơ sở, Đảng bộ bộ phận.",
            "Tất cả các đáp án trên"
        ],
        'correct': ['B', 'D'],
        'explain': [
            "Điều 21 Điều lệ Đảng",
            "Theo điều lệ Đảng về phẩm chất đảng viên"
        ]
    }
    
    df = pd.DataFrame(sample_data)
    df.to_excel('sample_questions.xlsx', index=False)
    print("Created sample Excel file: sample_questions.xlsx")


if __name__ == "__main__":
    # Uncomment the line below to create a sample Excel file for testing
    # create_sample_excel()
    
    example_usage()

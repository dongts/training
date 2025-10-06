#!/usr/bin/env python3
"""
Test script to demonstrate Excel to JSON conversion functionality.
This script creates a sample Excel file and converts it to JSON format.
"""

import pandas as pd
import os
from excel import QuestionExtractor
import json

def create_sample_excel():
    """Create a sample Excel file with the expected column structure."""
    
    sample_data = {
        'index': [1, 2, 3],
        'question_code': ['Q001', 'Q002', 'Q003'],
        'question': [
            "Đối tượng nào sau đây không thuộc phạm vi áp dụng của Luật Đấu thầu?*",
            "Thời gian đấu thầu tối thiểu là bao nhiêu ngày?",
            "Ai là người có thẩm quyền phê duyệt kế hoạch đấu thầu?"
        ],
        'A': [
            "Cơ quan nhà nước sử dụng vốn ngân sách nhà nước",
            "15 ngày",
            "Thủ trưởng cơ quan"
        ],
        'B': [
            "Doanh nghiệp nhà nước thực hiện dự án đầu tư sử dụng vốn ngân sách nhà nước",
            "20 ngày", 
            "Giám đốc sở"
        ],
        'C': [
            "Doanh nghiệp do doanh nghiệp nhà nước nắm 100% vốn điều lệ thực hiện dự án đầu tư không sử dụng vốn ngân sách nhà nước",
            "30 ngày",
            "Chủ tịch UBND"
        ],
        'D': [
            "Tổ chức chính trị - xã hội sử dụng NSNN, nguồn thu hợp pháp của tổ chức để thực hiện dự án đầu tư",
            "45 ngày",
            "Bộ trưởng"
        ],
        'Blank': ['', '', ''],  # Empty column as specified
        'Answer': ['C', 'B', 'A'],  # Correct answers
        'Note': [
            "Theo Điều 1 Luật Đấu thầu",
            "Theo quy định về thời gian đấu thầu",
            "Theo quy định về thẩm quyền phê duyệt"
        ],
        'Status': ['Active', 'Active', 'Active']
    }
    
    df = pd.DataFrame(sample_data)
    excel_filename = 'sample_questions.xlsx'
    df.to_excel(excel_filename, index=False)
    print(f"Created sample Excel file: {excel_filename}")
    return excel_filename

def test_conversion():
    """Test the Excel to JSON conversion."""
    
    # Create sample Excel file
    excel_file = create_sample_excel()
    
    # Create extractor and process file
    extractor = QuestionExtractor(excel_file)
    questions = extractor.extract_questions()
    
    if questions:
        # Generate JSON filename based on Excel filename
        base_name = os.path.splitext(os.path.basename(excel_file))[0]
        json_filename = f"{base_name}.json"
        
        # Save to JSON
        extractor.save_to_json(questions, json_filename)
        
        print(f"\nSuccessfully converted {excel_file} to {json_filename}")
        print(f"Extracted {len(questions)} questions")
        
        # Display the first question
        print("\nFirst question in JSON format:")
        print(json.dumps(questions[0], ensure_ascii=False, indent=2))
        
        return json_filename
    else:
        print("No questions were extracted.")
        return None

if __name__ == "__main__":
    print("Testing Excel to JSON conversion...")
    json_file = test_conversion()
    
    if json_file:
        print(f"\nTest completed successfully!")
        print(f"JSON file created: {json_file}")
        print("\nYou can now use this script with your own Excel files:")
        print("python excel.py your_file.xlsx")
        print("or")
        print("python excel.py your_file.xlsx -o custom_output.json")
    else:
        print("Test failed. Please check the code.")

#!/usr/bin/env python3
"""
Test script for the QuestionExtractor.

This script creates sample data and tests the extraction functionality.
"""

import pandas as pd
import json
import os
import sys

def create_test_excel():
    """Create a test Excel file with sample Vietnamese questions."""
    sample_data = {
        'index': [1, 2, 3],
        'question': [
            "Tổ chức cơ sở đảng theo Điều lệ Đảng hiện hành bao gồm:",
            "Đảng viên phải có những phẩm chất nào theo Điều lệ Đảng?",
            "Nguyên tắc tổ chức và hoạt động của Đảng là gì?"
        ],
        'A': [
            "Chi bộ cơ sở, Đảng bộ cơ sở, Ban cán sự đảng",
            "Trung thực, gần gũi nhân dân",
            "Tập trung dân chủ"
        ],
        'B': [
            "Chi bộ cơ sở, Đảng bộ cơ sở.",
            "Có đạo đức cách mạng",
            "Dân chủ tập trung"
        ],
        'C': [
            "Chi bộ cơ sở, Đảng bộ cơ sở, Đảng đoàn",
            "Có ý thức tổ chức kỷ luật",
            "Tập trung dân chủ, dân chủ tập trung"
        ],
        'D': [
            "Chi bộ cơ sở, Đảng bộ cơ sở, Đảng bộ bộ phận.",
            "Tất cả các đáp án trên",
            "Không có nguyên tắc cụ thể"
        ],
        'correct': ['B', 'D', 'B'],
        'explain': [
            "Điều 21 Điều lệ Đảng",
            "Theo điều lệ Đảng về phẩm chất đảng viên",
            "Điều 3 Điều lệ Đảng"
        ]
    }
    
    df = pd.DataFrame(sample_data)
    test_file = 'test_questions.xlsx'
    df.to_excel(test_file, index=False, sheet_name='Nghiệp vụ công tác Đảng')
    print(f"✓ Created test Excel file: {test_file}")
    return test_file

def test_extraction():
    """Test the question extraction functionality."""
    try:
        # Import the extractor
        from excel import QuestionExtractor
        
        # Create test data
        test_file = create_test_excel()
        
        # Test extraction
        print(f"\n📝 Testing extraction from {test_file}...")
        extractor = QuestionExtractor(test_file, source_name="Nghiệp vụ công tác Đảng")
        questions = extractor.extract_questions()
        
        if not questions:
            print("❌ No questions extracted!")
            return False
        
        print(f"✓ Successfully extracted {len(questions)} questions")
        
        # Validate first question structure
        first_question = questions[0]
        expected_keys = ["source", "number", "question", "options", "answer_letter", "answer_explanation"]
        
        for key in expected_keys:
            if key not in first_question:
                print(f"❌ Missing key: {key}")
                return False
        
        print("✓ Question structure validation passed")
        
        # Check specific values
        if first_question["number"] != 1:
            print(f"❌ Expected number 1, got {first_question['number']}")
            return False
        
        if len(first_question["options"]) != 4:
            print(f"❌ Expected 4 options, got {len(first_question['options'])}")
            return False
        
        if first_question["answer_letter"] != "B":
            print(f"❌ Expected answer 'B', got '{first_question['answer_letter']}'")
            return False
        
        print("✓ Question content validation passed")
        
        # Test JSON output
        output_file = 'test_output.json'
        extractor.save_to_json(questions, output_file)
        
        # Verify JSON file
        if os.path.exists(output_file):
            with open(output_file, 'r', encoding='utf-8') as f:
                loaded_questions = json.load(f)
            
            if len(loaded_questions) == len(questions):
                print(f"✓ JSON output saved successfully to {output_file}")
            else:
                print(f"❌ JSON file has {len(loaded_questions)} questions, expected {len(questions)}")
                return False
        else:
            print(f"❌ JSON output file {output_file} was not created")
            return False
        
        # Display sample output
        print(f"\n📋 Sample extracted question:")
        print(json.dumps(first_question, ensure_ascii=False, indent=2))
        
        # Cleanup
        if os.path.exists(test_file):
            os.remove(test_file)
            print(f"\n🧹 Cleaned up test file: {test_file}")
        
        if os.path.exists(output_file):
            os.remove(output_file)
            print(f"🧹 Cleaned up output file: {output_file}")
        
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure to install dependencies: pip install pandas openpyxl")
        return False
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        return False

def main():
    """Run the test suite."""
    print("🧪 Testing Question Extractor")
    print("=" * 40)
    
    success = test_extraction()
    
    print("\n" + "=" * 40)
    if success:
        print("✅ All tests passed!")
        print("\n🎉 The Question Extractor is working correctly!")
        print("\nNext steps:")
        print("1. Install dependencies: pip install -r requirements.txt")
        print("2. Use your own Excel file with the expected format")
        print("3. Run: python excel.py your_file.xlsx")
    else:
        print("❌ Some tests failed!")
        print("\nPlease check the errors above and ensure dependencies are installed.")
        sys.exit(1)

if __name__ == "__main__":
    main()

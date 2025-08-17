#!/usr/bin/env python3
"""
Debug script to test the fixed extractor with better error handling and output.
"""

import pandas as pd
import json
import os
from excel import QuestionExtractor


def create_debug_excel():
    """Create a test Excel file that matches your format exactly."""
    # Sample data that matches the structure from your output
    sample_data = {
        'index': [1, 2],
        'question': [
            "Khi thẩm tra lý lịch người vào Đảng có cha, mẹ đẻ, anh, chị, em ruột đang là đảng viên đã khai đầy đủ, rõ ràng theo quy định thì phương pháp thẩm tra nào được áp dụng trong các phương án sau",
            "Điều kiện để được kết nạp vào Đảng là gì?"
        ],
        'A': [
            "Không phải đi thẩm tra, xác minh về các đối tượng trên",
            "Tuổi từ 18 trở lên"
        ],
        'B': [
            "Vẫn phải đi thẩm tra, xác minh và phải có xác nhận của cấp uỷ nơi đến thẩm tra vào lý lịch của người xin vào Đảng về các đối tượng trên",
            "Có đạo đức tốt"
        ],
        'C': [
            "Cần đến cơ quan, đơn vị nơi quản lý hồ sơ đảng viên và nơi người thân đang sinh hoạt đảng để đối khớp với lý lịch của người thân",
            "Tự nguyện xin vào Đảng"
        ],
        'D': [
            "Tất cả các phương án trên đều đúng",
            "Tất cả các đáp án trên"
        ],
        'correct': ['C', 'D'],  # This should be the letter, not the full text
        'explain': [
            "Theo quy định về thẩm tra lý lịch",
            "Theo Điều lệ Đảng về điều kiện kết nạp"
        ]
    }
    
    df = pd.DataFrame(sample_data)
    test_file = 'debug_questions.xlsx'
    df.to_excel(test_file, index=False)
    print(f"✓ Created debug Excel file: {test_file}")
    return test_file


def test_fixed_extraction():
    """Test the fixed extraction logic."""
    try:
        # Create test file
        test_file = create_debug_excel()
        
        print(f"\n🔍 Testing fixed extraction from {test_file}...")
        
        # Create extractor
        extractor = QuestionExtractor(test_file, source_name="Nghiệp vụ công tác Đảng")
        
        # Extract questions
        questions = extractor.extract_questions()
        
        if not questions:
            print("❌ No questions extracted!")
            return False
        
        print(f"✓ Successfully extracted {len(questions)} questions")
        
        # Display the results
        for i, question in enumerate(questions):
            print(f"\n📋 Question {i+1}:")
            print(json.dumps(question, ensure_ascii=False, indent=2))
            
            # Validate the structure
            print(f"\n🔍 Validation for Question {i+1}:")
            print(f"  - Number: {question.get('number')} (type: {type(question.get('number'))})")
            print(f"  - Options count: {len(question.get('options', []))}")
            print(f"  - Options: {question.get('options')}")
            print(f"  - Answer letter: '{question.get('answer_letter')}' (should be A/B/C/D)")
            print(f"  - Answer explanation: '{question.get('answer_explanation')}'")
            
            # Check if answer letter is correct
            answer_letter = question.get('answer_letter', '')
            if answer_letter not in ['A', 'B', 'C', 'D']:
                print(f"  ⚠️  Answer letter '{answer_letter}' is not A/B/C/D!")
            else:
                print(f"  ✓ Answer letter is valid")
            
            # Check if we have exactly 4 options
            options = question.get('options', [])
            if len(options) != 4:
                print(f"  ⚠️  Expected 4 options, got {len(options)}")
            else:
                print(f"  ✓ Has exactly 4 options")
                
        # Save output
        output_file = 'debug_output.json'
        extractor.save_to_json(questions, output_file)
        print(f"\n💾 Saved results to {output_file}")
        
        # Cleanup
        if os.path.exists(test_file):
            os.remove(test_file)
            print(f"🧹 Cleaned up {test_file}")
            
        return True
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    print("🛠️  Testing Fixed Question Extractor")
    print("=" * 50)
    
    success = test_fixed_extraction()
    
    print("\n" + "=" * 50)
    if success:
        print("✅ Fixed extraction test passed!")
    else:
        print("❌ Fixed extraction test failed!")

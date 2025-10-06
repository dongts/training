import pandas as pd
import json
import argparse
from typing import List, Dict, Any
import sys


class QuestionExtractor:
    """Extract questions from Excel file and convert to JSON format."""
    
    def __init__(self, excel_file: str, source_name: str = None):
        """
        Initialize the question extractor.
        
        Args:
            excel_file: Path to the Excel file
            source_name: Name of the source/subject (if not provided, will use sheet name)
        """
        self.excel_file = excel_file
        self.source_name = source_name
        
    def extract_questions(self, sheet_name: str = None) -> List[Dict[str, Any]]:
        """
        Extract questions from Excel file and return as JSON-compatible list.
        
        Args:
            sheet_name: Name of the sheet to read (if None, reads first sheet)
            
        Returns:
            List of question dictionaries
        """
        try:
            # Read Excel file
            if sheet_name:
                df = pd.read_excel(self.excel_file, sheet_name=sheet_name)
            else:
                df = pd.read_excel(self.excel_file)
                
            # Use sheet name as source if not provided
            if not self.source_name:
                if sheet_name:
                    self.source_name = sheet_name
                else:
                    # Get the first sheet name
                    xl_file = pd.ExcelFile(self.excel_file)
                    self.source_name = xl_file.sheet_names[0]
            
            # Print available columns for debugging
            print(f"Available columns in Excel: {list(df.columns)}")
            
            # Create more precise column mapping
            column_mapping = self._create_column_mapping(df.columns)
            print(f"Column mapping: {column_mapping}")
            
            # Extract questions
            questions = []
            
            for idx, row in df.iterrows():
                # Skip empty rows
                if pd.isna(row.get(column_mapping.get('question'), '')):
                    continue
                    
                try:
                    # Get the 4 options in order A, B, C, D
                    options = []
                    for option_key in ['A', 'B', 'C', 'D']:
                        option_text = self._safe_get_text(row, column_mapping.get(option_key))
                        options.append(option_text)
                    
                    # Get the correct answer and normalize to letter
                    raw_answer = self._safe_get_text(row, column_mapping.get('answer'))
                    answer_letter = self._normalize_answer_letter(raw_answer, options)
                    
                    # Get question number (use index if available, otherwise use row number)
                    question_number = self._safe_get_number(row, column_mapping.get('index'))
                    if question_number == 0:
                        question_number = idx + 1
                    
                    question_obj = {
                        "original_question_number": question_number,
                        "question": self._safe_get_text(row, column_mapping.get('question')),
                        "options": options,
                        "answer_letter": answer_letter,
                        "question_number": question_number
                    }
                    
                    # Only add if question is not empty
                    if question_obj["question"].strip():
                        questions.append(question_obj)
                        
                except Exception as e:
                    print(f"Error processing row {idx}: {e}")
                    continue
            
            return questions
            
        except Exception as e:
            print(f"Error reading Excel file: {e}")
            return []
    
    def _create_column_mapping(self, columns):
        """Create precise column mapping for Excel columns."""
        mapping = {}
        
        # Convert columns to list for easier handling
        col_list = list(columns)
        
        # Try to find exact matches first, then fuzzy matches
        expected_patterns = {
            'index': ['index', 'idx', 'number', 'num', 'stt'],
            'question_code': ['question_code', 'questioncode', 'mã câu hỏi', 'macauhoi'],
            'question': ['question', 'câu hỏi', 'cauhoi'],
            'A': ['A', 'option a', 'option_a', 'lựa chọn a'],
            'B': ['B', 'option b', 'option_b', 'lựa chọn b'], 
            'C': ['C', 'option c', 'option_c', 'lựa chọn c'],
            'D': ['D', 'option d', 'option_d', 'lựa chọn d'],
            'answer': ['answer', 'đáp án', 'dapan', 'đúng', 'correct'],
            'note': ['note', 'ghi chú', 'ghichu', 'explanation', 'giải thích', 'giaithich'],
            'status': ['status', 'trạng thái', 'trangthai']
        }
        
        for expected_key, patterns in expected_patterns.items():
            found = False
            # First try exact match (case insensitive)
            for col in col_list:
                if str(col).lower().strip() in [p.lower() for p in patterns]:
                    mapping[expected_key] = col
                    found = True
                    break
            
            # If not found, try partial match
            if not found:
                for col in col_list:
                    col_lower = str(col).lower().strip()
                    for pattern in patterns:
                        if pattern.lower() in col_lower or col_lower in pattern.lower():
                            mapping[expected_key] = col
                            found = True
                            break
                    if found:
                        break
            
            if not found:
                print(f"Warning: Could not find column for '{expected_key}'. Available: {col_list}")
        
        return mapping
    
    def _normalize_answer_letter(self, raw_answer: str, options: list) -> str:
        """Normalize answer to letter A/B/C/D."""
        if not raw_answer:
            return ''
        
        raw_answer = raw_answer.strip()
        
        # If it's already a single letter A, B, C, or D
        if raw_answer.upper() in ['A', 'B', 'C', 'D']:
            return raw_answer.upper()
        
        # If it's the full text of one of the options, find which letter it corresponds to
        for i, option in enumerate(options):
            if option and raw_answer.strip() == option.strip():
                return ['A', 'B', 'C', 'D'][i]
        
        # If it contains a letter at the beginning
        if raw_answer and raw_answer[0].upper() in ['A', 'B', 'C', 'D']:
            return raw_answer[0].upper()
        
        # Default fallback
        print(f"Warning: Could not normalize answer '{raw_answer}' to letter. Using as-is.")
        return raw_answer

    def _safe_get_text(self, row: pd.Series, column: str) -> str:
        """Safely get text value from row, handling NaN values."""
        try:
            if column is None:
                return ''
            value = row.get(column, '')
            if pd.isna(value):
                return ''
            return str(value).strip()
        except:
            return ''
    
    def _safe_get_number(self, row: pd.Series, column: str) -> int:
        """Safely get number value from row, handling NaN values."""
        try:
            if column is None:
                return 0
            value = row.get(column, 0)
            if pd.isna(value):
                return 0
            return int(float(value))
        except:
            return 0
    
    def save_to_json(self, questions: List[Dict[str, Any]], output_file: str):
        """Save questions to JSON file."""
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(questions, f, ensure_ascii=False, indent=2)
            print(f"Successfully saved {len(questions)} questions to {output_file}")
        except Exception as e:
            print(f"Error saving to JSON: {e}")


def main():
    """Main function to run the question extractor from command line."""
    parser = argparse.ArgumentParser(description='Extract questions from Excel file to JSON format')
    parser.add_argument('excel_file', help='Path to the Excel file')
    parser.add_argument('-o', '--output', help='Output JSON file path', default=None)
    parser.add_argument('-s', '--source', help='Source/subject name', default=None)
    parser.add_argument('--sheet', help='Sheet name to read', default=None)
    
    args = parser.parse_args()
    
    # Generate output filename if not provided
    if args.output is None:
        import os
        base_name = os.path.splitext(os.path.basename(args.excel_file))[0]
        args.output = f"{base_name}.json"
    
    # Create extractor and process file
    extractor = QuestionExtractor(args.excel_file, args.source)
    questions = extractor.extract_questions(args.sheet)
    
    if questions:
        extractor.save_to_json(questions, args.output)
        print(f"\nExtracted {len(questions)} questions from {args.excel_file}")
        print(f"Saved to: {args.output}")
        print(f"Sample question:")
        print(json.dumps(questions[0], ensure_ascii=False, indent=2))
    else:
        print("No questions were extracted. Please check your Excel file format.")


if __name__ == "__main__":
    main()

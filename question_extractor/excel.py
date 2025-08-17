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
            
            # Expected columns: index, question, A, B, C, D, correct, explain
            expected_columns = ['index', 'question', 'A', 'B', 'C', 'D', 'correct', 'explain']
            
            # Check if columns exist (case-insensitive)
            df_columns_lower = [col.lower() for col in df.columns]
            column_mapping = {}
            
            for expected_col in expected_columns:
                found = False
                for i, col in enumerate(df_columns_lower):
                    if expected_col.lower() in col or col in expected_col.lower():
                        column_mapping[expected_col] = df.columns[i]
                        found = True
                        break
                if not found:
                    print(f"Warning: Column '{expected_col}' not found. Available columns: {list(df.columns)}")
            
            # Extract questions
            questions = []
            
            for idx, row in df.iterrows():
                # Skip empty rows
                if pd.isna(row.get(column_mapping.get('question', 'question'), '')):
                    continue
                    
                try:
                    question_obj = {
                        "source": self.source_name,
                        "number": self._safe_get_number(row, column_mapping.get('index', 'index')),
                        "question": self._safe_get_text(row, column_mapping.get('question', 'question')),
                        "options": [
                            self._safe_get_text(row, column_mapping.get('A', 'A')),
                            self._safe_get_text(row, column_mapping.get('B', 'B')),
                            self._safe_get_text(row, column_mapping.get('C', 'C')),
                            self._safe_get_text(row, column_mapping.get('D', 'D'))
                        ],
                        "answer_letter": self._safe_get_text(row, column_mapping.get('correct', 'correct')),
                        "answer_explanation": self._safe_get_text(row, column_mapping.get('explain', 'explain'))
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
    
    def _safe_get_text(self, row: pd.Series, column: str) -> str:
        """Safely get text value from row, handling NaN values."""
        try:
            value = row.get(column, '')
            if pd.isna(value):
                return ''
            return str(value).strip()
        except:
            return ''
    
    def _safe_get_number(self, row: pd.Series, column: str) -> int:
        """Safely get number value from row, handling NaN values."""
        try:
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
    parser.add_argument('-o', '--output', help='Output JSON file path', default='questions.json')
    parser.add_argument('-s', '--source', help='Source/subject name', default=None)
    parser.add_argument('--sheet', help='Sheet name to read', default=None)
    
    args = parser.parse_args()
    
    # Create extractor and process file
    extractor = QuestionExtractor(args.excel_file, args.source)
    questions = extractor.extract_questions(args.sheet)
    
    if questions:
        extractor.save_to_json(questions, args.output)
        print(f"\nExtracted {len(questions)} questions from {args.excel_file}")
        print(f"Sample question:")
        print(json.dumps(questions[0], ensure_ascii=False, indent=2))
    else:
        print("No questions were extracted. Please check your Excel file format.")


if __name__ == "__main__":
    main()

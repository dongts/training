# Question Extractor from Excel

A Python tool to extract multiple-choice questions from Excel files and convert them to JSON format.

## Features

- Extracts questions from Excel files with a specific format
- Supports Vietnamese text with proper UTF-8 encoding
- Flexible column mapping (case-insensitive)
- Command-line interface and Python library usage
- Robust error handling for malformed data

## Expected Excel Format

Your Excel file should have the following columns:

| index | question | A | B | C | D | correct | explain |
|-------|----------|---|---|---|---|---------|---------|
| 1 | Question text | Option A | Option B | Option C | Option D | B | Explanation |
| 2 | Question text | Option A | Option B | Option C | Option D | C | Explanation |

- **index**: Question number
- **question**: The question text
- **A, B, C, D**: Multiple choice options
- **correct**: The correct answer letter (A, B, C, or D)
- **explain**: Explanation for the correct answer

## Installation

1. Install required dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Command Line Usage

Basic usage:
```bash
python excel.py your_questions.xlsx
```

With custom output file and source name:
```bash
python excel.py your_questions.xlsx -o output.json -s "Your Subject Name"
```

With specific sheet:
```bash
python excel.py your_questions.xlsx --sheet "Sheet1" -o output.json
```

### Library Usage

```python
from excel import QuestionExtractor

# Create extractor instance
extractor = QuestionExtractor('your_questions.xlsx', source_name="Your Subject")

# Extract questions
questions = extractor.extract_questions()

# Save to JSON
extractor.save_to_json(questions, 'output.json')
```

## Output Format

The tool generates a JSON array with the following structure:

```json
[
  {
    "source": "Nghiệp vụ công tác Đảng",
    "number": 54,
    "question": "Tổ chức cơ sở đảng theo Điều lệ Đảng hiện hành bao gồm:",
    "options": [
      "Chi bộ cơ sở, Đảng bộ cơ sở, Ban cán sự đảng",
      "Chi bộ cơ sở, Đảng bộ cơ sở.",
      "Chi bộ cơ sở, Đảng bộ cơ sở, Đảng đoàn",
      "Chi bộ cơ sở, Đảng bộ cơ sở, Đảng bộ bộ phận."
    ],
    "answer_letter": "B",
    "answer_explanation": "Điều 21 Điều lệ Đảng"
  }
]
```

## Command Line Options

- `excel_file`: Path to the Excel file (required)
- `-o, --output`: Output JSON file path (default: questions.json)
- `-s, --source`: Source/subject name (default: uses sheet name)
- `--sheet`: Sheet name to read (default: first sheet)

## Error Handling

The tool includes robust error handling for:
- Missing or malformed Excel files
- Missing columns (with warnings)
- Empty rows or cells
- Invalid data types

## Example

See `example_usage.py` for detailed examples of how to use the extractor both as a library and from the command line.

## Requirements

- Python 3.7+
- pandas>=1.5.0
- openpyxl>=3.0.0

## License

This project is open source and available under the MIT License.

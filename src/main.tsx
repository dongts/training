import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Shuffle, RotateCcw, CheckCircle, XCircle, Award, BookOpen, List, X } from 'lucide-react';

interface QuizQuestion {
  source: string;
  number: number;
  question: string;
  options: string[];
  answer_letter: string;
  answer_explanation: string;
}

interface AnsweredQuestion {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: string[];
}

interface QuestionStatus {
  answered: boolean;
  isCorrect?: boolean;
  selectedAnswer?: string;
}

const QuizApp = () => {
  // Quiz data from the JSON
  const quizData = [
  {
      "source": "Sheet1",
    "number": 1,
    "question": "Khi thẩm tra lý lịch người vào Đảng có cha, mẹ đẻ, anh, chị, em ruột đang là đảng viên đã khai đầy đủ, rõ ràng theo quy định thì phương pháp thẩm tra nào được áp dụng trong các phương án sau",
    "options": [
      "Không phải đi thẩm tra, xác minh về các đối tượng trên",
      "Vẫn phải đi thẩm tra, xác minh và phải có xác nhận của cấp uỷ nơi đến thẩm tra vào lý lịch của người xin vào Đảng về các đối tượng trên",
      "Cần đến cơ quan, đơn vị  nơi quản lý hồ sơ đảng viên và nơi người thân đang sinh hoạt đảng để đối khớp với lý lịch của người thân",
        "1"
    ],
      "answer_letter": "Cần đến cơ quan, đơn vị  nơi quản lý hồ sơ đảng viên và nơi người thân đang sinh hoạt đảng để đối khớp với lý lịch của người thân",
      "answer_explanation": "Không phải đi thẩm tra, xác minh về các đối tượng trên"
  },
  {
      "source": "Sheet1",
    "number": 2,
    "question": "Trong Chi bộ đồng chí X là đảng viên chính thức được 6 tháng, đồng chí cùng công tác với quần chúng ưu tú Y được 02 năm và là người được chi bộ phân công giúp đỡ quần chúng Y vào Đảng. Theo đồng chí, đồng chí X đã đủ điều kiện để giới thiệu quần chúng Y vào Đảng hay chưa ?",
    "options": [
      "Có đủ điều kiện.",
      "Chưa đủ điều kiện.",
      "Khi đồng chí X là đảng viên chính thức được 1 năm thì đủ điều kiện để giới thiệu",
        "2"
    ],
      "answer_letter": "Khi đồng chí X là đảng viên chính thức được 1 năm thì đủ điều kiện để giới thiệu",
      "answer_explanation": "Có đủ điều kiện."
  },
  {
      "source": "Sheet1",
    "number": 3,
    "question": "Chi bộ có 22 đảng viên (20 đảng viên chính thức, 2 đảng viên dự bị). Tại hội nghị đảng viên kiểm điểm, đánh giá, xếp loại đảng viên cuối năm của chi bộ có 4 đồng chí vắng mặt đi công tác (trong đó có 3 đảng viên chính thức và 1 đảng viên dự bị), còn 18 đồng chí tham dự hội nghị. Khi biểu quyết phân loại chất lượng đảng viên và tính tỷ lệ biểu quyết thì có 4 loại ý kiến dưới đây, theo đồng chí ý kiến nào là đúng?",
    "options": [
      "Tỷ lệ biểu quyết tán thành tính trên tổng số đảng viên chính thức của chi bộ (20 đồng chí)",
      "Tỷ lệ biểu quyết tán thành tính trên tổng số đảng viên chính thức có mặt tại hội nghị (17 đồng chí)",
      "Tỉ lệ biểu quyết tán thành tính trên tổng số đảng viên của chi bộ",
        "3"
    ],
      "answer_letter": "Tỉ lệ biểu quyết tán thành tính trên tổng số đảng viên của chi bộ",
      "answer_explanation": "Tỷ lệ biểu quyết tán thành tính trên tổng số đảng viên chính thức của chi bộ (20 đồng chí)"
  },
  {
      "source": "Sheet1",
    "number": 4,
    "question": "Khi bàn về quy trình kết nạp Đảng tại một chi bộ có các loại ý kiến sau, theo đồng chí ý kiến nào là đúng",
    "options": [
      "Người vào Đảng phải viết đơn tự nguyện xin vào Đảng trước khi khai lý lịch",
      "Sau khi khai lý lịch, người vào đảng viết đơn tự nguyện xin vào Đảng và gửi chi bộ",
      "Sau khi khai lý lịch, chi bộ tiến hành thẩm tra xong người xin vào Đảng mới viết đơn tự nguyện xin vào Đảng",
        "4"
    ],
      "answer_letter": "Sau khi khai lý lịch, chi bộ tiến hành thẩm tra xong người xin vào Đảng mới viết đơn tự nguyện xin vào Đảng",
      "answer_explanation": "Người vào Đảng phải viết đơn tự nguyện xin vào Đảng trước khi khai lý lịch"
  },
  {
      "source": "Sheet1",
    "number": 5,
    "question": "Đảng viên dự bị X đã hoàn thành đủ 12 tháng dự bị, chi bộ đã họp để làm các thủ tục xét đề nghị chuyển đảng chính thức nhưng chưa được cấp có thẩm quyền ra quyết định công nhận đảng viên chính thức. Trong kỳ  đại hội chi bộ nhiệm kỳ 2025 - 2027, theo đ/c ĐV X có được đại biểu đại hội  giới thiệu ứng cử chi uỷ chi bộ không?",
    "options": [
        "Được, vì đảng viên\nđã hoàn thành 12 tháng dự bị",
      "Không được, vì cấp có thẩm quyền chưa ra quyết định chuyển đảng chính thức",
        "Được, vì đảng viên\nđã được chi bộ bỏ phiếu đề nghị công nhận đảng viên chính thức",
        "5"
    ],
      "answer_letter": "Được, vì đảng viên\nđã được chi bộ bỏ phiếu đề nghị công nhận đảng viên chính thức",
      "answer_explanation": "Được, vì đảng viên\nđã hoàn thành 12 tháng dự bị"
  },
  {
      "source": "Sheet1",
    "number": 6,
    "question": "Đồng chí X được cấp uỷ có thẩm quyền ký Quyết định Kết nạp đảng viên ngày 25/8/2024; chi bộ tổ chức kết nạp đảng cho đồng chí X ngày 15/9/2024. Trong chi bộ có các ý kiến khác nhau khi tính tuổi Đảng cho đồng chí X",
    "options": [
      "Tuổi đảng của đồng chí X được tính từ ngày ghi trong Quyết định Kết nạp đảng viên (ngày 25/8/2024)",
      "Tuổi đảng của đồng chí X được tính từ ngày chi bộ tổ chức lễ kết nạp Đảng cho đồng chí X (ngày 15/9/2024)",
      "Tuổi đảng của đồng chí X được tính từ ngày nhận quyết định",
        "6"
    ],
      "answer_letter": "Tuổi đảng của đồng chí X được tính từ ngày nhận quyết định",
      "answer_explanation": "Tuổi đảng của đồng chí X được tính từ ngày ghi trong Quyết định Kết nạp đảng viên (ngày 25/8/2024)"
  },
  {
      "source": "Sheet1",
    "number": 7,
    "question": "Giấy chứng nhận học lớp bồi dưỡng nhận thức về Đảng của quần chúng ưu tú có giá trị sử dụng trong thơi gian bao lâu?",
    "options": [
      "36 tháng",
      "60 tháng",
      "24 tháng",
        "7"
    ],
      "answer_letter": "24 tháng",
      "answer_explanation": "36 tháng"
  },
  {
      "source": "Sheet1",
    "number": 8,
      "question": "Đảng viên X là ủy viên Ban Chấp hành Đảng bộ cơ sở sinh hoạt tại chi bộ. Vừa qua, Đảng ủy giao cho đảng viên X thực hiện một số nhiệm vụ của cấp uỷ nhưng đồng chí không hoàn thành. Chi bộ trực thuộc nơi đảng viên X sinh hoạt  xem xét  kỷ luật đồng chí X với hình thức Khiển trách.  Trong chi bộ có các loại ý kiến sau, theo đồng chí ý kiến nào là đúng?",
    "options": [
      "Chi bộ phải kỷ luật đồng chí X với hình thức cảnh cáo mới đúng",
      "Chi bộ đủ thẩm quyền kỷ luật đồng chí X.",
      "Chi  bộ xem xét kỷ luật đồng chí X là đúng nhưng hình thức kỷ luật cần xem xét lại",
        "8"
    ],
      "answer_letter": "Chi  bộ xem xét kỷ luật đồng chí X là đúng nhưng hình thức kỷ luật cần xem xét lại",
      "answer_explanation": "Chi bộ phải kỷ luật đồng chí X với hình thức cảnh cáo mới đúng"
  },
  {
      "source": "Sheet1",
    "number": 9,
      "question": "Chi bộ chuẩn bị cho thẩm tra xác minh lý lịch quần chúng X để làm thủ tục kết nạp Đảng. Trong chi bộ có các loại ý kiến sau, theo đồng chí ý kiến nào là đúng?",
    "options": [
      "Chi uỷ chi bộ họp và ghi nhận xét, kết luận vào lý lịch của quần chúng X ngay khi quần chúng X khai xong lý lịch",
      "Để đảm bảo thủ tục, trước khi cử người đi xác minh lý lịch, chi uỷ chi bộ phải ghi nhận xét, kết luận vào lý lịch.",
        "Chi uỷ chi bộ nhận xét, kết luận vào lý lịch của quần chúng X sau khi có kết quả thẩm tra theo quy định",
        "9"
    ],
      "answer_letter": "Chi uỷ chi bộ nhận xét, kết luận vào lý lịch của quần chúng X sau khi có kết quả thẩm tra theo quy định",
      "answer_explanation": "Chi uỷ chi bộ họp và ghi nhận xét, kết luận vào lý lịch của quần chúng X ngay khi quần chúng X khai xong lý lịch"
  },
  {
      "source": "Sheet1",
    "number": 10,
    "question": "Cấp ủy từ cấp tổ chức Đảng nào thì được bầu UBKT của Đảng.",
    "options": [
      "Theo Quy định thi hành Điều lệ Đảng thì từ cấp Đảng uỷ cơ sở trở lên mới được bầu UBKT",
      "Chi bộ cơ sở, đảng uỷ bộ phận đều có thể thành lập UBKT để thực hiện các nhiệm vụ công tác kiểm tra, giám sát ở cơ sở, thực hiện chức năng lãnh đạo của Đảng.",
      "Chi bộ trực thuộc cũng được thành lập UBKT để thực hiện công tác kiểm tra, giám sát tại chi bộ",
        "10"
    ],
      "answer_letter": "Chi bộ trực thuộc cũng được thành lập UBKT để thực hiện công tác kiểm tra, giám sát tại chi bộ",
      "answer_explanation": "Theo Quy định thi hành Điều lệ Đảng thì từ cấp Đảng uỷ cơ sở trở lên mới được bầu UBKT"
  },
  {
      "source": "Sheet1",
    "number": 11,
    "question": "Một đảng viên là cán bộ tín dụng cho vay ưu đãi sai đối tượng, đã vi phạm chức trách nhiệm vụ được giao, đã xử lý kỷ luật chuyên môn. Khi họp xét thi hành kỷ luật đảng viên, trong chi bộ có các ý kiến sau, theo đồng chí ý kiến nào là đúng?",
    "options": [
      "Khiển trách",
      "Cảnh cáo",
      "Khai trừ khỏi đảng",
        "11"
    ],
      "answer_letter": "Khai trừ khỏi đảng",
      "answer_explanation": "Khiển trách"
  },
  {
      "source": "Sheet1",
    "number": 12,
    "question": "Chi bộ có 4 đảng viên (03 đảng viên chính thức, 01 đảng viên dự bị). Sau đó một đảng viên chính thức chuyển đi đơn vị khác; nay chi bộ còn 02 đảng viên chính thức và 01 đảng viên dự bị. Đến thời kỳ làm thủ tục chuyển đảng chính thức cho đảng viên dự bị. Có các ý kiến sau, đồng chí cho biết ý kiến nào là đúng",
    "options": [
      "Không họp chi bộ được vì không đủ 3 đảng viên chính thức trở lên.",
      "Vẫn họp bình thường để chuyển đảng chính thức cho đảng viên dự bị",
      "Chờ khi nào chi bộ đủ 3 đảng viên chính thức trở lên mới họp để chuyển đảng chính thức cho đảng viên dự bị",
        "12"
    ],
      "answer_letter": "Chờ khi nào chi bộ đủ 3 đảng viên chính thức trở lên mới họp để chuyển đảng chính thức cho đảng viên dự bị",
      "answer_explanation": "Không họp chi bộ được vì không đủ 3 đảng viên chính thức trở lên."
  },
  {
      "source": "Sheet1",
    "number": 13,
      "question": "Theo quy định của BCHTW Đảng, kể từ ngày nhận được quyết định kết nạp đảng viên của cấp uỷ có thẩm quyền, chậm nhất bao nhiêu ngày làm việc thì chi bộ phải tổ chức lễ kết nạp\ncho đảng viên:",
    "options": [
      "30 ngày",
      "30 ngày làm việc",
      "60 ngày",
        "13"
    ],
      "answer_letter": "60 ngày",
      "answer_explanation": "30 ngày"
  },
  {
      "source": "Sheet1",
    "number": 14,
      "question": "Chi bộ X có nghị quyết đề nghị đảng ủy cơ sở xem xét kết nạp hai đảng viên mới là nữ: Một người 55 tuổi và một người 58 tuổi. Trong chi bộ có các ý kiến sau, theo đồng chí ý kiến nào là đúng?",
    "options": [
        "2 người trên đã quá tuổi kết nạp vào đảng",
      "Phải xin ý kiến của đảng uỷ cấp trên vì trường hợp này do Trung ương xem xét, quyết định",
        "Việc xem xét kết nạp vào Đảng cho 2 quần chúng trên vẫn đúng với quy định của Điều lệ Đảng",
        "14"
    ],
      "answer_letter": "Việc xem xét kết nạp vào Đảng cho 2 quần chúng trên vẫn đúng với quy định của Điều lệ Đảng",
      "answer_explanation": "2 người trên đã quá tuổi kết nạp vào đảng"
  },
  {
      "source": "Sheet1",
    "number": 15,
    "question": "Theo quy định hiện hành, quần chúng A là cảm tình đảng, phấn đấu tốt, phẩm chất đạo đức tốt, đủ tiêu chuẩn vào Đảng, nhưng có bố đẻ trước đây là đảng viên, nay tự ý bỏ sinh hoạt đảng, như vậy quần chúng A có được xét kết nạp vào Đảng không?",
    "options": [
      "Không được kết nạp vào đảng",
      "Có được kết nạp vào đảng",
      "Không được đề nghị xem xét kết nạp",
        "15"
    ],
      "answer_letter": "Không được đề nghị xem xét kết nạp",
      "answer_explanation": "Không được kết nạp vào đảng"
  },
  {
      "source": "Sheet1",
    "number": 16,
    "question": "Dảng viên X không lưu giữ đủ hồ sơ tín dụng theo quy định của pháp luật (trong ngành tài chính, ngân hàng) và gây hậu quả ít nghiêm trọng, đã xử lý kỷ luật chuyên môn. Chi bộ họp để xét hình thức kỷ luật đối với đảng viên X",
    "options": [
      "Khiển trách",
      "Cảnh cáo",
      "Khai trừ khỏi đảng",
        "16"
    ],
      "answer_letter": "Khai trừ khỏi đảng",
      "answer_explanation": "Khiển trách"
  },
  {
      "source": "Sheet1",
    "number": 17,
    "question": "Theo quy định hiện hành của đảng, đối với đảng ủy cơ sở được ủy quyền thực hiện nhiệm vụ cấp trên cơ sở, quyết định kết nạp đảng viên có giá trị khi nào?",
    "options": [
      "100% ý kiến đồng ý",
      "Có 1/3 ý kiến đồng ý trở lên",
      "Có 1/2 ý kiến đồng ý trở lên",
        "17"
    ],
      "answer_letter": "Có 1/2 ý kiến đồng ý trở lên",
      "answer_explanation": "100% ý kiến đồng ý"
  },
  {
      "source": "Sheet1",
    "number": 18,
      "question": "Theo quy định hiện hành, trong khi làm việc với đoàn kiểm tra của Đảng ủy cấp trên, đảng viên X là đối tượng kiểm tra đã dùng máy ghi âm để ghi âm nội dung buổi làm việc.  Ý kiến nào sau đây là đúng?",
    "options": [
      "Đoàn kiểm tra cho phép đảng viên X được ghi âm nội dung buổi làm việc",
        "Đoàn kiểm tra yêu cầu đảng viên X\nkhông được sử dụng các phương tiện ghi âm trong khi làm việc với đoàn",
        "Đoàn kiểm tra không có ý kiến",
        "18"
    ],
      "answer_letter": "Đoàn kiểm tra không có ý kiến",
      "answer_explanation": "Đoàn kiểm tra cho phép đảng viên X được ghi âm nội dung buổi làm việc"
  },
  {
      "source": "Sheet1",
    "number": 19,
    "question": "Theo quy định hiện hành cùa đảng, kể từ ngày đảng viên hết 12 tháng dự bị thì thời hạn chi bộ phải xét và đề nghị công nhận chính thức cho đảng viên là khi nào?",
    "options": [
      "30 ngày",
      "30 ngày làm việc",
      "45 ngày",
        "19"
    ],
      "answer_letter": "45 ngày",
      "answer_explanation": "30 ngày"
  },
  {
      "source": "Sheet1",
    "number": 20,
    "question": "Theo Quy định của đảng, sinh hoạt định kỳ của chi bộ trực thuộc được quy định như thế nào?",
    "options": [
      "Họp thường lệ 1 tháng 2 lần",
      "Họp thường lệ 1 quý 1 lần",
      "Họp thường lệ 1 tháng 1 lần",
        "20"
    ],
      "answer_letter": "Họp thường lệ 1 tháng 1 lần",
      "answer_explanation": "Họp thường lệ 1 tháng 2 lần"
  },
  {
      "source": "Sheet1",
    "number": 21,
    "question": "Theo quy định hiện hành của Đảng, cấp ủy viên khi chuyển sinh hoạt đảng tạm thời sang tổ chức đảng khác có còn là cấp ủy viên của cấp ủy nơi sinh hoạt chính thức hay không?",
    "options": [
      "Không còn là cấp ủy viên",
      "Là cấp ủy viên nơi sinh hoạt tạm thời",
      "Vẫn là cấp ủy viên nơi sinh hoạt chính thức",
        "21"
    ],
      "answer_letter": "Vẫn là cấp ủy viên nơi sinh hoạt chính thức",
      "answer_explanation": "Không còn là cấp ủy viên"
  },
  {
      "source": "Sheet1",
    "number": 22,
    "question": "Theo quy định 294-QĐ/TW ngày 26/5/2025 của BCH TW về thi hành Điều lệ Đảng, việc thôi tham gia cấp ủy của các đồng chí cấp ủy viên khi có quyết định nghỉ công tác hoặc chuyển công tác khác hoặc thôi việc được quy định như thế nào?",
    "options": [
      "Cấp ủy viên khi có quyết định nghỉ hưu thì thôi tham gia cấp ủy đương nhiệm từ thời điểm nghỉ hưu để hưởng chế độ bảo hiểm XH đã được ghi trong thông báo hoặc quyết định nghỉ hưu",
      "Cấp ủy viên có quyết định thôi làm công tác quản lý hoặc thôi việc thì thôi tham gia cấp ủy đương nhiệm từ thời điểm quyết định thôi làm công tác quản lý hoặc thôi việc có hiệu lực thi hành",
      "Cả 2 phương án trên đều đúng",
        "22"
    ],
      "answer_letter": "Cả 2 phương án trên đều đúng",
      "answer_explanation": "Cấp ủy viên khi có quyết định nghỉ hưu thì thôi tham gia cấp ủy đương nhiệm từ thời điểm nghỉ hưu để hưởng chế độ bảo hiểm XH đã được ghi trong thông báo hoặc quyết định nghỉ hưu"
  },
  {
      "source": "Sheet1",
    "number": 23,
    "question": "Theo quy định hiện hành của Đảng, cấp ủy nhiệm kỳ mới được điều hành công việc khi nào",
    "options": [
      "Ngay sau khi được bầu",
      "Sau khi có quyết định chuẩn y của cấp có thẩm quyền",
      "Sau khi công bố quyết định chuẩn y của cấp có thẩm quyền",
        "23"
    ],
      "answer_letter": "Sau khi công bố quyết định chuẩn y của cấp có thẩm quyền",
      "answer_explanation": "Ngay sau khi được bầu"
  },
  {
      "source": "Sheet1",
    "number": 24,
    "question": "Điều lệ đảng gồm có bao nhiêu chương, bao nhiêu điều",
    "options": [
      "11 chương, 46 điều",
      "12 chương, 45 điều",
      "11 chương, 48 điều",
        "24"
    ],
      "answer_letter": "11 chương, 48 điều",
      "answer_explanation": "11 chương, 46 điều"
  },
  {
      "source": "Sheet1",
    "number": 25,
    "question": "Không áp dụng thời hiệu xử lý kỷ luật về đảng đối với hành vi nào sau đây",
    "options": [
      "Khiển trách",
      "Cảnh cáo",
      "Cách chức",
        "25"
    ],
      "answer_letter": "Cách chức",
      "answer_explanation": "Khiển trách"
  },
  {
      "source": "Sheet1",
    "number": 26,
    "question": "Tổ chức đảng nào không có thẩm quyền kỷ luật đảng viên vi phạm",
    "options": [
      "Chi bộ",
      "Chi ủy",
      "Ủy ban kiểm tra Đảng ủy cơ sở",
        "26"
    ],
      "answer_letter": "Ủy ban kiểm tra Đảng ủy cơ sở",
      "answer_explanation": "Chi bộ"
  },
  {
      "source": "Sheet1",
    "number": 27,
    "question": "Kỷ luật đảng viên vi phạm của chi bộ có hiệu lực khi nào",
    "options": [
      "Ngay sau khi công bố Quyết định kỷ luật",
      "Ngay sau khi chi bộ công bố kết quả biểu quyết quyết định kỷ luật",
      "Ngay sau khi ban hành Quyết định kỷ luật",
        "27"
    ],
      "answer_letter": "Ngay sau khi ban hành Quyết định kỷ luật",
      "answer_explanation": "Ngay sau khi công bố Quyết định kỷ luật"
  },
  {
      "source": "Sheet1",
    "number": 28,
    "question": "Đảng viên vi phạm được tổ chức đảng nhiều lần mời đến kiểm điểm nhưng không đến mà không có lý do chính đáng thì tổ chức đảng có xem xét, xử lý không",
    "options": [
      "Không xem xét, xử lý",
      "Vẫn tiếp tục xem xét, xử lý theo thẩm quyền",
      "Dừng cuộc kiểm tra chờ xin ý kiến chỉ đạo của cấp trên",
        "28"
    ],
      "answer_letter": "Dừng cuộc kiểm tra chờ xin ý kiến chỉ đạo của cấp trên",
      "answer_explanation": "Không xem xét, xử lý"
  },
  {
      "source": "Sheet1",
    "number": 29,
    "question": "Những nội dung nào sau đây thuộc nội dung chi bộ kiểm tra đảng viên",
    "options": [
      "Việc thực hiện nhiệm vụ đảng viên",
      "Việc thực hiện Nghị quyết của chi  bộ, Việc thực hiện nhiệm vụ do chi bộ phân công",
      "Quy định về trách nhiệm nêu gương, về những điều đảng viên không được làm",
        "29"
    ],
      "answer_letter": "Quy định về trách nhiệm nêu gương, về những điều đảng viên không được làm",
      "answer_explanation": "Việc thực hiện nhiệm vụ đảng viên"
  },
  {
      "source": "Sheet1",
    "number": 30,
      "question": "Nội dung nào sau đây được coi là không vi phạm những điều đảng viên không được làm",
    "options": [
        "Phát ngôn có nội dung trái với nghị quyết, chỉ thị, quy định, quyết định, quy chế, kết luận của Đảng và pháp luật của Nhà nước",
      "Phát biểu, nêu ý kiến khác nhau trong các cuộc hội thảo khoa học, hội nghị được cơ quan có thẩm quyền tổ chức",
      "Báo cáo, lập hồ sơ, kê khai lý lịch, kê khai tài sản, thu nhập không trung thực",
        "30"
    ],
      "answer_letter": "Báo cáo, lập hồ sơ, kê khai lý lịch, kê khai tài sản, thu nhập không trung thực",
      "answer_explanation": "Phát ngôn có nội dung trái với nghị quyết, chỉ thị, quy định, quyết định, quy chế, kết luận của Đảng và pháp luật của Nhà nước"
  },
  {
      "source": "Sheet1",
    "number": 31,
    "question": "Trong thời hạn bao nhiêu ngày làm việc kể từ ngày đảng viên nhận được quyết định kỷ luật, đảng viên có quyền khiếu nại với cấp ủy cấp trên cho đến Ban Chấp hành TW",
    "options": [
      "Trong thời hạn 30 ngày",
      "Trong thời hạn 30 ngày làm việc",
      "Trong thời hạn 60 ngày",
        "31"
    ],
      "answer_letter": "Trong thời hạn 60 ngày",
      "answer_explanation": "Trong thời hạn 30 ngày"
  },
  {
      "source": "Sheet1",
    "number": 32,
    "question": "Tổ chức nào sau đây không có thẩm quyền kiểm tra khi đảng viên có dấu hiệu vi phạm",
    "options": [
      "Cấp ủy, ban thường vụ cấp ủy",
      "Ủy ban kiểm tra",
      "Chi bộ trực thuộc",
        "32"
    ],
      "answer_letter": "Chi bộ trực thuộc",
      "answer_explanation": "Cấp ủy, ban thường vụ cấp ủy"
  },
  {
      "source": "Sheet1",
    "number": 33,
    "question": "Trước khi họp quyết định kỷ luật đảng viên vi phạm, đại diện tổ chức đảng có thẩm quyền phải thực hiện nội dung nào say đây",
    "options": [
      "Yêu cầu đảng viên nhận khuyết điểm, vi phạm",
      "Trao đổi với người tố cáo để họ tham gia ý kiến",
      "Thông báo dự kiến về hình thức kỷ luật cho đảng viên vi phạm",
        "33"
    ],
      "answer_letter": "Thông báo dự kiến về hình thức kỷ luật cho đảng viên vi phạm",
      "answer_explanation": "Yêu cầu đảng viên nhận khuyết điểm, vi phạm"
  },
  {
      "source": "Sheet1",
    "number": 34,
      "question": "Theo HD 36-HD/VPTW, ngày 3/4/2018 của Văn phòng TW Đảng thì số văn bản của cấp ủy, cơ quan, tổ chức đảng các cấp ghi như thế nào là đúng",
    "options": [
        "Ghi theo từng năm",
        "Ghi liên tục từ số 01 cho mỗi tên loại văn bản trong từng\nnăm",
      "Ghi liên tục từ số 01 cho mỗi tên loại văn bản trong một nhiệm kỳ cấp ủy",
        "34"
    ],
      "answer_letter": "Ghi liên tục từ số 01 cho mỗi tên loại văn bản trong một nhiệm kỳ cấp ủy",
      "answer_explanation": "Ghi theo từng năm"
  },
  {
      "source": "Sheet1",
    "number": 35,
    "question": "Đảng viên bị đình chỉ sinh hoạt đảng có phải nộp đảng phí không",
    "options": [
      "Không đóng đảng phí",
      "Chờ hết bị đình chỉ thì đóng đảng phí",
      "Có đóng đảng phí",
        "35"
    ],
      "answer_letter": "Có đóng đảng phí",
      "answer_explanation": "Không đóng đảng phí"
  },
  {
      "source": "Sheet1",
    "number": 36,
    "question": "Trong những văn bản sau đây, văn bản nào Chi bộ cơ sở, chi bộ trực thuộc đảng ủy cơ sở, đảng ủy bộ phận không ban hành",
    "options": [
      "Quy chế",
      "Thông báo",
      "Kết luận",
        "36"
    ],
      "answer_letter": "Kết luận",
      "answer_explanation": "Quy chế"
  },
  {
      "source": "Sheet1",
    "number": 37,
    "question": "Theo hướng dẫn của Văn phòng Trung ương quy định về chế độ nộp đảng phí, chi bộ trực thuộc đảng ủy cơ sở nộp đảng phí lên cấp trên theo mức nào là đúng",
    "options": [
        "0.4",
        "0.5",
        "0.6",
        "37"
      ],
      "answer_letter": "0.6",
      "answer_explanation": "0.4"
    },
    {
      "source": "Sheet1",
    "number": 38,
    "question": "Theo hướng dẫn 36-HD/VPTW, ngày 3/4/2018 của Văn phòng TW Đảng thì số và ký hiệu văn bản được thể hiện như thế nào là đúng?",
    "options": [
      "Số: 01 - BC/CB",
      "Số 01/BC-CB",
      "Số 01-BC/CB",
        "38"
    ],
      "answer_letter": "Số 01-BC/CB",
      "answer_explanation": "Số: 01 - BC/CB"
  },
  {
      "source": "Sheet1",
    "number": 39,
      "question": "Kỹ thuật trình bày tên loại văn bản và trích yếu nội dung văn bản theo Hướng dẫn số 36- HD/VPTW, ngày 3/4/2018 của văn phòng TW Đảng ?",
    "options": [
        "Tên loại văn bản trình bày 1 dòng riêng, trích yếu nội dung văn bản trình bày dưới tên loại văn bản, phía dưới trích yếu nội dung văn bản có 5 dấu gạch nối (-) ngăn cách\nvới nội dung văn bản",
      "Tên loại văn bản và trích yếu nội dung văn bản trình bày cùng 1 dòng",
        "Tên loại văn bản trình bày 1 dòng riêng, trích yếu nội dung văn bản có đường kẻ ngang",
        "39"
    ],
      "answer_letter": "Tên loại văn bản trình bày 1 dòng riêng, trích yếu nội dung văn bản có đường kẻ ngang",
      "answer_explanation": "Tên loại văn bản trình bày 1 dòng riêng, trích yếu nội dung văn bản trình bày dưới tên loại văn bản, phía dưới trích yếu nội dung văn bản có 5 dấu gạch nối (-) ngăn cách\nvới nội dung văn bản"
  },
  {
      "source": "Sheet1",
    "number": 40,
    "question": "Theo Hướng dẫn số 36-HD/VPTW, ngày 3/4/2018 của văn phòng TW Đảng về thể thức văn bản của đảng, quy định trong Công văn thì nội dung trích yếu được ghi dưới số và ký hiệu - với cỡ, kiểu chữ nào?",
    "options": [
      "Cỡ chữ 14, kiểu chữ in thường",
      "Cỡ chữ 14, kiểu chữ in thường, nghiêng",
      "Cỡ chữ 12, kiểu chữ in thường",
        "40"
    ],
      "answer_letter": "Cỡ chữ 12, kiểu chữ in thường",
      "answer_explanation": "Cỡ chữ 14, kiểu chữ in thường"
  },
  {
      "source": "Sheet1",
    "number": 41,
    "question": "Theo Hướng dẫn số 03-HD/TW ngày 27/12/2022 của Ban Bí thư, Chi bộ được thực hiện thí điểm sinh hoạt đảng theo tổ đảng phải đảm báo điều kiện nào sau đây",
    "options": [
      "Có đông đảng viên.",
      "Có nhiều tổ đảng.",
      "Có thành lập tổ đảng và có từ 50 đảng viên trở lên",
        "41"
    ],
      "answer_letter": "Có thành lập tổ đảng và có từ 50 đảng viên trở lên",
      "answer_explanation": "Có đông đảng viên."
  },
  {
      "source": "Sheet1",
    "number": 42,
    "question": "Chi bộ thí điểm sinh hoạt đảng theo tổ đảng thay cho sinh hoạt toàn thể chi bộ được áp dụng bao nhiêu lần trong năm?",
    "options": [
      "Không quá 1 lần trong năm",
      "Không quá 3 lần trong năm",
      "Không quá 6 lần trong năm",
        "42"
    ],
      "answer_letter": "Không quá 6 lần trong năm",
      "answer_explanation": "Không quá 1 lần trong năm"
  },
  {
      "source": "Sheet1",
    "number": 43,
    "question": "Theo Quy định số 294-QĐ/TW ngày 26 tháng 5 năm 2025của Ban Chấp hành Trung ương (khoá XIII) quy định thi hành Điều lệ Đảng, việc quản lý hồ sơ đảng viên, được cấp ủy có thẩm quyền giao cho tổ chức hay cá nhân nào?",
    "options": [
      "Ban tổ chức cấp ủy cấp huyện và tương đương",
      "Bí thư chi bộ",
      "Cấp ủy cơ sở",
        "43"
    ],
      "answer_letter": "Cấp ủy cơ sở",
      "answer_explanation": "Ban tổ chức cấp ủy cấp huyện và tương đương"
  },
  {
      "source": "Sheet1",
    "number": 44,
    "question": "Theo Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ (khoá XIII) về một số vấn đề cụ thể thi hành Điều lệ Đảng, nghị quyết đề nghị kết nạp đảng viên của chi bộ có giá trị khi?",
    "options": [
      "Có trên một nửa số đảng viên chính thức đồng ý",
      "Có ít nhất 2/3 số đảng viên chính thức đồng ý",
      "Có 3/4 số đảng viên chính thức đồng ý",
        "44"
    ],
      "answer_letter": "Có 3/4 số đảng viên chính thức đồng ý",
      "answer_explanation": "Có trên một nửa số đảng viên chính thức đồng ý"
  },
  {
      "source": "Sheet1",
    "number": 45,
      "question": "Hội nghị lần thứ 6, Ban chấp hành Trung ương Đảng khóa XIII đã ban hành văn bản nào sau đây?",
    "options": [
        "Kết luận số 21-KL/TW ngày 25/10/2021 về đẩy mạnh xây dựng, chỉnh đốn Đảng và hệ thống chính trị; kiên quyết ngăn chặn, đẩy lùi, xử lý nghiêm cán bộ, đảng viên suy thoái về tư tưởng chính trị, đạo đức, lối sống, biểu hiện \"tự diễn biến\", \"tự chuyển hoá\"",
      "Nghị quyết số 28-NQ/TW ngày 17/11/2022  về tiếp tục đổi mới phương thức lãnh đạo, cầm quyền của Đảng đối với hệ thống chính trị trong giai đoạn mới.",
      "Quy định số 22-QĐ/TW  ngày 28/07/2021 về công tác kiểm tra, giám sát và thi hành kỷ luật của Đảng",
        "45"
    ],
      "answer_letter": "Quy định số 22-QĐ/TW  ngày 28/07/2021 về công tác kiểm tra, giám sát và thi hành kỷ luật của Đảng",
      "answer_explanation": "Kết luận số 21-KL/TW ngày 25/10/2021 về đẩy mạnh xây dựng, chỉnh đốn Đảng và hệ thống chính trị; kiên quyết ngăn chặn, đẩy lùi, xử lý nghiêm cán bộ, đảng viên suy thoái về tư tưởng chính trị, đạo đức, lối sống, biểu hiện \"tự diễn biến\", \"tự chuyển hoá\""
  },
  {
      "source": "Sheet1",
    "number": 46,
      "question": "Nơi có tổ chức Đoàn thanh niên Cộng sản Hồ Chí Minh, người vào Đảng trong độ tuổi thanh niên phải được bao nhiêu đảng viên chính thức và tổ chức nào giới thiệu",
    "options": [
        "Một đảng viên chính thức và Ban chấp hành đoàn cơ sở giới thiệu",
        "Hai đảng viên chính thức và Ban chấp hành đoàn cơ sở giới thiệu",
        "Một đảng viên chính thức, BCH đoàn cơ sở và BCH công đoàn cơ sở giới thiệu",
        "46"
      ],
      "answer_letter": "Một đảng viên chính thức, BCH đoàn cơ sở và BCH công đoàn cơ sở giới thiệu",
      "answer_explanation": "Một đảng viên chính thức và Ban chấp hành đoàn cơ sở giới thiệu"
    },
    {
      "source": "Sheet1",
    "number": 47,
      "question": "Tại thời điểm chi bộ xét kết nạp, người vào Đảng phải có điều kiện tuổi đời như thế nào là đúng với Quy định thi hành Điều lệ Đảng hiện\nhành?",
    "options": [
      "Đủ 18 tuổi (tính theo năm).",
      "Đủ 20 tuổi (tính theo tháng",
      "Đủ 18 tuổi trở lên (tính theo tháng).",
        "47"
    ],
      "answer_letter": "Đủ 18 tuổi trở lên (tính theo tháng).",
      "answer_explanation": "Đủ 18 tuổi (tính theo năm)."
  },
  {
      "source": "Sheet1",
    "number": 48,
    "question": "Theo Quy định số 294-QĐ/TW ngày 26/5/2025 của Ban Chấp hành Trung ương (khoá XIII) quy định thi hành Điều lệ Đảng, không xem xét kếp nạp lại những người đã ra khỏi Đảng vì lý do nào?",
    "options": [
      "Vi phạm chính sách dân số, kế hoạch hóa gia đình",
      "Gây mất đoàn kết nội bộ nghiêm trọng.",
      "Làm đơn xin ra khỏi Đảng vì gia đình có lý do đặc biệt",
        "48"
    ],
      "answer_letter": "Làm đơn xin ra khỏi Đảng vì gia đình có lý do đặc biệt",
      "answer_explanation": "Vi phạm chính sách dân số, kế hoạch hóa gia đình"
  },
  {
      "source": "Sheet1",
    "number": 49,
      "question": "Theo Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ (khoá XIII) về một số vấn đề cụ thể thi hành Điều lệ Đảng, thẩm tra lý lịch\nngười vào Đảng gồm",
    "options": [
        "Thẩm tra người vào Đảng; cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân; vợ hoặc chồng, con đẻ của người vào Đảng có năng lực hành vi dân sự đầy đủ",
        "Thẩm tra người vào Đảng, cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân",
      "Thẩm tra người vào Đảng, cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân; vợ hoặc chồng, cô, dì, chú, bác bên nội và bên ngoại của người vào Đảng",
        "49"
    ],
      "answer_letter": "Thẩm tra người vào Đảng, cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân; vợ hoặc chồng, cô, dì, chú, bác bên nội và bên ngoại của người vào Đảng",
      "answer_explanation": "Thẩm tra người vào Đảng; cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân; vợ hoặc chồng, con đẻ của người vào Đảng có năng lực hành vi dân sự đầy đủ"
  },
  {
      "source": "Sheet1",
    "number": 50,
    "question": "Thời gian dự bị của đảng viên được tính từ ngày nào",
    "options": [
      "Ngày ghi trong quyết định kết nạp",
      "Ngày chi bộ tổ chức lễ kết nạp",
      "Ngày chi bộ ra nghị quyết kết nạp",
        "50"
    ],
      "answer_letter": "Ngày chi bộ ra nghị quyết kết nạp",
      "answer_explanation": "Ngày ghi trong quyết định kết nạp"
  },
  {
      "source": "Sheet1",
    "number": 51,
    "question": "Chi bộ họp xét chuyển đảng chính thức cho Đảng viên dự bị, khi được tỷ lệ bao nhiêu số đảng viên chính thức biểu quyết đồng ý thì ra nghị quyết đề nghị cấp uỷ cấp trên xét?",
    "options": [
      "Được hơn một nửa số đảng viên chính thức trở lên đồng ý",
      "Được 2/3 số đảng viên chính thức trở lên đồng ý",
      "Được 3/4 số đảng viên chính thức trở lên đồng ý",
        "51"
    ],
      "answer_letter": "Được 3/4 số đảng viên chính thức trở lên đồng ý",
      "answer_explanation": "Được hơn một nửa số đảng viên chính thức trở lên đồng ý"
  },
  {
      "source": "Sheet1",
    "number": 52,
    "question": "Theo Quy định số 294-QĐ/TW ngày 26/5/2025 của Ban Chấp hành Trung ương (khoá XIII) quy định thi hành Điều lệ Đảng, người giới thiệu quần chúng ưu tú vào Đảng phải là:",
    "options": [
      "Đảng viên cùng công tác với người được giới thiệu vào Đảng 12 tháng trở lên",
      "Đảng viên chính thức, cùng công tác với người được giới thiệu vào Đảng 06 tháng trở lên.",
        "Là đảng viên chính thức, cùng công tác, lao động, học tập, hoặc cùng sinh hoạt nơi cư trú ít nhất 12 tháng với người\nđược giới thiệu vào Đảng trong cùng một đơn vị thuộc phạm vi lãnh đạo của đảng bộ, chi bộ cơ sở",
        "52"
    ],
      "answer_letter": "Là đảng viên chính thức, cùng công tác, lao động, học tập, hoặc cùng sinh hoạt nơi cư trú ít nhất 12 tháng với người\nđược giới thiệu vào Đảng trong cùng một đơn vị thuộc phạm vi lãnh đạo của đảng bộ, chi bộ cơ sở",
      "answer_explanation": "Đảng viên cùng công tác với người được giới thiệu vào Đảng 12 tháng trở lên"
  },
  {
      "source": "Sheet1",
    "number": 53,
      "question": "Theo Quy định số 294-QĐ/TW ngày 26/5/2025 của Ban Chấp hành Trung ương (khoá XIII) quy định thi hành Điều lệ Đảng, Đảng viên\nđược cấp có thẩm quyền quyết định chuyển công tác sang đơn vị mới, được nghỉ hưu, nghỉ mất sức, thôi việc, phục viên hoặc thay đổi nơi cư trú lâu dài thì trong thời hạn bao nhiêu ngày làm việc kể từ ngày quyết định có hiệu lực hoặc thay đổi nơi cư trú phải làm thủ tục chuyển sinh hoạt đảng chính thức?",
    "options": [
      "Trong vòng 15 ngày làm việc",
      "Trong vòng 30 ngày làm việc",
      "Trong vòng 45 ngày làm việc.",
        "53"
    ],
      "answer_letter": "Trong vòng 45 ngày làm việc.",
      "answer_explanation": "Trong vòng 15 ngày làm việc"
  },
  {
      "source": "Sheet1",
    "number": 54,
      "question": "Tổ chức cơ sở đảng theo Điều lệ Đảng hiện hành bao gồm:",
    "options": [
        "Chi bộ cơ sở, Đảng bộ cơ sở, Ban cán sự đảng",
        "Chi bộ cơ sở, Đảng bộ cơ sở.",
        "Chi bộ cơ sở, Đảng bộ cơ sở, Đảng đoàn",
        "54"
      ],
      "answer_letter": "Chi bộ cơ sở, Đảng bộ cơ sở, Đảng đoàn",
      "answer_explanation": "Chi bộ cơ sở, Đảng bộ cơ sở, Ban cán sự đảng"
    },
    {
      "source": "Sheet1",
    "number": 55,
      "question": "Nguyên tắc cơ bản trong tổ chức và hoạt động của Đảng là:",
    "options": [
        "Hoạt động trong khuôn khổ Hiến pháp và pháp luật",
      "Tự phê bình và phê bình",
      "Đoàn kết trên cương lĩnh chính trị và Điều lệ Đảng",
        "55"
    ],
      "answer_letter": "Đoàn kết trên cương lĩnh chính trị và Điều lệ Đảng",
      "answer_explanation": "Hoạt động trong khuôn khổ Hiến pháp và pháp luật"
  },
  {
      "source": "Sheet1",
    "number": 56,
    "question": "Chi bộ có thẩm quyền giải quyết tố cáo và kiểm tra đảng viên khi có dấu hiệu vi phạm trong những trường hợp nào?",
    "options": [
      "Thực hiện nhiệm vụ chi bộ giao",
      "Thực hiện nhiệm vụ đảng viên (trừ nhiệm vụ cấp trên giao).",
      "Dấu hiệu vi phạm về phẩm chất, chính trị, đạo đức lối sống",
        "56"
    ],
      "answer_letter": "Dấu hiệu vi phạm về phẩm chất, chính trị, đạo đức lối sống",
      "answer_explanation": "Thực hiện nhiệm vụ chi bộ giao"
  },
  {
      "source": "Sheet1",
    "number": 57,
    "question": "Theo quy định của Điều lệ Đảng hiện hành, tổ chức nào dưới đây họp thường lệ mỗi tháng một lần?",
    "options": [
      "Chi bộ, Đảng ủy cơ sở",
      "Đảng bộ cơ sở",
      "Đảng bộ huyện và tương đương",
        "57"
    ],
      "answer_letter": "Đảng bộ huyện và tương đương",
      "answer_explanation": "Chi bộ, Đảng ủy cơ sở"
  },
  {
      "source": "Sheet1",
    "number": 58,
    "question": "Kiểm tra của Đảng bao gồm các hình thức nào sau đây:",
    "options": [
      "Kiểm tra thường xuyên",
      "Kiểm tra định kỳ",
      "Kiểm tra bất thường (khi có dấu hiệu vi phạm).",
        "58"
    ],
      "answer_letter": "Kiểm tra bất thường (khi có dấu hiệu vi phạm).",
      "answer_explanation": "Kiểm tra thường xuyên"
  },
  {
      "source": "Sheet1",
    "number": 59,
    "question": "Theo Hướng dẫn số 08-HD/TW ngày 10/6/2025 về thực hiện một số nội dung trong QĐ 296- QĐ/TW ngày 30/5/2025 quy định:",
    "options": [
      "Chi bộ chủ yếu giám sát thường xuyên đối với đảng viên nơi công tác, sinh hoạt và nơi cư trú; chi bộ có chi ủy, chi bộ có trên 30 đảng viên và đảng viên hoạt động phân tán hoặc có nhiều tổ đảng trực thuộc thì thực hiện giám sát theo chuyên đề",
      "Chi bộ chỉ giám sát thường xuyên",
      "Chi bộ chỉ giám sát chuyên đề",
        "59"
    ],
      "answer_letter": "Chi bộ chỉ giám sát chuyên đề",
      "answer_explanation": "Chi bộ chủ yếu giám sát thường xuyên đối với đảng viên nơi công tác, sinh hoạt và nơi cư trú; chi bộ có chi ủy, chi bộ có trên 30 đảng viên và đảng viên hoạt động phân tán hoặc có nhiều tổ đảng trực thuộc thì thực hiện giám sát theo chuyên đề"
  },
  {
      "source": "Sheet1",
    "number": 60,
    "question": "Chủ thể kiểm tra, giám sát của Đảng ở cơ sở là:",
    "options": [
        "Chi ủy, chi bộ, đảng ủy bộ phận, ban thường vụ\nđảng ủy cơ sở, đảng ủy cơ sở; ủy ban kiểm tra\nđảng ủy cơ sở",
        "Chi bộ, đảng ủy bộ phận,  đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở",
        "Chi bộ, Đảng ủy bộ phận, Ban thường vụ đảng ủy cơ sở, Đảng ủy từ cấp cơ sở trở lên; Ủy ban kiểm tra, các ban đảng,\nvăn phòng cấp ủy (gọi chung là các cơ quan tham mưu, giúp việc của cấp ủy)",
        "60"
      ],
      "answer_letter": "Chi bộ, Đảng ủy bộ phận, Ban thường vụ đảng ủy cơ sở, Đảng ủy từ cấp cơ sở trở lên; Ủy ban kiểm tra, các ban đảng,\nvăn phòng cấp ủy (gọi chung là các cơ quan tham mưu, giúp việc của cấp ủy)",
      "answer_explanation": "Chi ủy, chi bộ, đảng ủy bộ phận, ban thường vụ\nđảng ủy cơ sở, đảng ủy cơ sở; ủy ban kiểm tra\nđảng ủy cơ sở"
    },
    {
      "source": "Sheet1",
    "number": 61,
    "question": "Đối tượng kiểm tra, giám sát của Đảng là:",
    "options": [
        "Chi ủy, chi bộ, đảng ủy bộ phận, ban thường vụ\nđảng ủy cơ sở, đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở",
      "Chi ủy, chi bộ, Đảng ủy bộ phận, Ban thường vụ đảng ủy cơ sở, Đảng ủy từ cấp cơ sở trở lên; Ủy ban kiểm tra; các cơ quan tham mưu, giúp việc của cấp ủy; đảng viên",
      "Chi bộ, đảng ủy bộ phận, ban thường vụ đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở; đảng viên",
        "61"
    ],
      "answer_letter": "Chi bộ, đảng ủy bộ phận, ban thường vụ đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở; đảng viên",
      "answer_explanation": "Chi ủy, chi bộ, đảng ủy bộ phận, ban thường vụ\nđảng ủy cơ sở, đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở"
  },
  {
      "source": "Sheet1",
    "number": 62,
    "question": "Chi bộ kiểm tra, giám sát đảng viên về:",
    "options": [
      "Việc thực hiện nhiệm vụ chuyên môn",
      "Việc thực hiện nhiệm vụ do đoàn thể giao",
      "Việc thực hiện nhiệm vụ đảng viên",
        "62"
    ],
      "answer_letter": "Việc thực hiện nhiệm vụ đảng viên",
      "answer_explanation": "Việc thực hiện nhiệm vụ chuyên môn"
  },
  {
      "source": "Sheet1",
    "number": 63,
    "question": "Đối tượng giám sát của chi bộ là:",
    "options": [
      "Đảng viên trong chi bộ trừ đảng viên giữ chức vụ lãnh đạo quản lý",
      "Đảng viên trong chi bộ (kể cả cấp ủy viên các cấp, đảng viên thuộc diện cấp ủy cấp trên quản lý",
      "Đảng viên trong chi bộ (kể cả cấp ủy viên các cấp, đảng viên thuộc diện cấp ủy cùng cấp quản lý).",
        "63"
    ],
      "answer_letter": "Đảng viên trong chi bộ (kể cả cấp ủy viên các cấp, đảng viên thuộc diện cấp ủy cùng cấp quản lý).",
      "answer_explanation": "Đảng viên trong chi bộ trừ đảng viên giữ chức vụ lãnh đạo quản lý"
  },
  {
      "source": "Sheet1",
    "number": 64,
      "question": "Theo Quy định số 296-QĐ/TW ngày 30/5/2025 Quy định về công tác kiểm tra, giám sát, kỷ luật của Đảng, thời hiệu xử lý kỷ luật của Đảng là:",
    "options": [
        "Thời hạn mà đảng viên chịu kỷ luật",
      "Thời hạn mà tổ chức đảng có thẩm quyền đảng xem xét kỷ luật đảng viên vi phạm",
      "Thời hạn mà đảng viên vi phạm chưa bị xe xét xử lý kỷ luật",
        "64"
    ],
      "answer_letter": "Thời hạn mà đảng viên vi phạm chưa bị xe xét xử lý kỷ luật",
      "answer_explanation": "Thời hạn mà đảng viên chịu kỷ luật"
  },
  {
      "source": "Sheet1",
    "number": 65,
    "question": "Theo Quy định số 296-QĐ/TW ngày 30/5/2025 Quy định về công tác kiểm tra, giám sát, kỷ luật của Đảng, thời hiệu xử lý kỷ luật được tính trong thời hạn nào?",
    "options": [
      "Thời điểm tổ chức đảng, đảng viên có hành vi vi phạm đến khi tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật. Thời điểm xảy ra hành vi vi phạm phải được tổ chức đảng có thẩm quyền xem xét, làm rõ, kết luận",
      "Thời điểm tổ chức đảng tiến hành kiểm tra dấu hiệu vi phạm đến khi tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật.",
      "Thời điểm đảng vi bị phát hiện hành vi vi phạm đến khi tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật",
        "65"
    ],
      "answer_letter": "Thời điểm đảng vi bị phát hiện hành vi vi phạm đến khi tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật",
      "answer_explanation": "Thời điểm tổ chức đảng, đảng viên có hành vi vi phạm đến khi tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật. Thời điểm xảy ra hành vi vi phạm phải được tổ chức đảng có thẩm quyền xem xét, làm rõ, kết luận"
  },
  {
      "source": "Sheet1",
    "number": 66,
    "question": "Trong những nội dung sau, đâu là nội dung công tác kiểm tra của Đảng ủy cơ sở ?",
    "options": [
      "Kiểm tra tổ chức đảng, đảng viên trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước",
      "Kiểm tra tổ chức đảng trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước; nguyên tắc tập trung dân chủ, quy chế làm việc, chế độ công tác, dân chủ, đoàn kết; thực hành tiết kiệm, chống lãng phí; quản lý cán bộ; công tác cán bộ; giải quyết khiếu nại, tố cáo",
        "Kiểm tra tổ chức đảng trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước; việc chấp hành nguyên tắc tổ chức và hoạt động của đảng, giữ gìn đoàn kết nội bộ, quy chế làm việc, chế độ công tác, dân chủ trong đảng, thực hành tiết kiệm, phòng, chống tham nhũng, lãng phí, tiêu cực; quản lý, rèn luyện phậm chất\nđạo đức lối sống của đảng viên.",
        "66"
    ],
      "answer_letter": "Kiểm tra tổ chức đảng trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước; việc chấp hành nguyên tắc tổ chức và hoạt động của đảng, giữ gìn đoàn kết nội bộ, quy chế làm việc, chế độ công tác, dân chủ trong đảng, thực hành tiết kiệm, phòng, chống tham nhũng, lãng phí, tiêu cực; quản lý, rèn luyện phậm chất\nđạo đức lối sống của đảng viên.",
      "answer_explanation": "Kiểm tra tổ chức đảng, đảng viên trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước"
  },
  {
      "source": "Sheet1",
    "number": 67,
    "question": "Không giải quyết khiếu nại kỷ luật đối với những trường hợp nào sau đây:",
    "options": [
      "Quá thời hạn khiếu nại theo quy định",
      "Đang được cấp trên có thẩm quyền giải quyết; đã được cấp có thẩm quyền cao nhất xem xét, kết luận, quyết định",
      "Bị toà án quyết định hình phạt từ cải tạo không giam giữ trở lên chưa được toà án có thẩm quyền quyết định hủy bỏ bản án; khiếu nại hộ, khiếu nại khi chưa nhận được quyết định kỷ luật bằng văn bản của tổ chức đảng có thẩm quyền; từ chối nhận quyết định kỷ luật hoặc quyết định giải quyết khiếu nại kỷ luật đảng; đã chuyển sinh hoạt đảng chính thức sang tổ chức đảng khác không cùng đảng bộ cấp trên trực tiếp xong mới làm đơn khiếu nại",
        "67"
    ],
      "answer_letter": "Bị toà án quyết định hình phạt từ cải tạo không giam giữ trở lên chưa được toà án có thẩm quyền quyết định hủy bỏ bản án; khiếu nại hộ, khiếu nại khi chưa nhận được quyết định kỷ luật bằng văn bản của tổ chức đảng có thẩm quyền; từ chối nhận quyết định kỷ luật hoặc quyết định giải quyết khiếu nại kỷ luật đảng; đã chuyển sinh hoạt đảng chính thức sang tổ chức đảng khác không cùng đảng bộ cấp trên trực tiếp xong mới làm đơn khiếu nại",
      "answer_explanation": "Quá thời hạn khiếu nại theo quy định"
  },
  {
      "source": "Sheet1",
    "number": 68,
    "question": "Nguyên tắc thi hành kỷ luật trong Đảng, quy định trường hợp nào sau đây chưa xem xét xử lý kỷ luật",
    "options": [
      "Đảng viên vi phạm đang trong thời gian mang thai",
      "Đảng viên vi phạm đang nuôi con nhỏ dưới 12 tháng tuổi",
      "Đảng viên vi phạm bị bệnh nặng nằm viện",
        "68"
    ],
      "answer_letter": "Đảng viên vi phạm bị bệnh nặng nằm viện",
      "answer_explanation": "Đảng viên vi phạm đang trong thời gian mang thai"
  },
  {
      "source": "Sheet1",
    "number": 69,
    "question": "Hình thức kỷ luật của Đảng đối với đảng viên chính thức bao gồm:",
    "options": [
      "Khiển trách, cảnh cáo, phê bình",
      "Khiển trách, cảnh cáo, cách chức (nếu có chức vụ), khai trừ",
      "Khiển trách, cảnh cáo, phê bình, rút kinh nghiệm, khai trừ",
        "69"
    ],
      "answer_letter": "Khiển trách, cảnh cáo, phê bình, rút kinh nghiệm, khai trừ",
      "answer_explanation": "Khiển trách, cảnh cáo, phê bình"
  },
  {
      "source": "Sheet1",
    "number": 70,
    "question": "Chi bộ có thẩm quyền quyết định các hình thức kỷ luật nào?",
    "options": [
      "Khiển trách, cảnh cáo đảng viên",
      "Khiển trách, xóa tên đảng viên",
      "Cách chức chức vụ đảng viên; khai trừ đảng viên",
        "70"
    ],
      "answer_letter": "Cách chức chức vụ đảng viên; khai trừ đảng viên",
      "answer_explanation": "Khiển trách, cảnh cáo đảng viên"
  },
  {
      "source": "Sheet1",
    "number": 71,
    "question": "Chi bộ quyết định khiển trách, cảnh cáo đảng viên trong chi bộ (kể cả cấp ủy viên các cấp, đảng viên thuộc diện cấp ủy cấp trên quản lý) trong trường hợp nào?",
    "options": [
      "Vi phạm phẩm chất chính trị, tư tưởng, đạo đức, lối sống, nhiệm vụ do cấp trên giao",
      "Vi phạm phẩm chất chính trị, tư tưởng, đạo đức, lối sống, \"tự diễn biến\", \"tự chuyển hoá\", sinh hoạt đảng, thực hiện nhiệm vụ do chi bộ giao, thực hiện nhiệm vụ đảng viên (trừ nhiệm vụ do cấp trên giao).",
      "Vi phạm phẩm chất chính trị, tư tưởng, đạo đức, lối sống, sinh hoạt đảng, thực hiện nhiệm vụ đảng viên (kể cả nhiệm vụ do cấp trên giao).",
        "71"
    ],
      "answer_letter": "Vi phạm phẩm chất chính trị, tư tưởng, đạo đức, lối sống, sinh hoạt đảng, thực hiện nhiệm vụ đảng viên (kể cả nhiệm vụ do cấp trên giao).",
      "answer_explanation": "Vi phạm phẩm chất chính trị, tư tưởng, đạo đức, lối sống, nhiệm vụ do cấp trên giao"
  },
  {
      "source": "Sheet1",
    "number": 72,
    "question": "Quyết định khiển trách, cảnh cáo của chi bộ đối với đảng viên vi phạm có hiệu lực:",
    "options": [
      "Ngay sau khi chi bộ công bố quyết định kỷ luật",
      "Ngay sau khi chi bộ công bố kết quả biểu quyết quyết định kỷ luật",
      "Trong vòng 10 ngày, chi bộ ban hành quyết định kỷ luật trao cho đảng viên bị kỷ luật, báo cáo cấp trên và lưu hồ sơ",
        "72"
    ],
      "answer_letter": "Trong vòng 10 ngày, chi bộ ban hành quyết định kỷ luật trao cho đảng viên bị kỷ luật, báo cáo cấp trên và lưu hồ sơ",
      "answer_explanation": "Ngay sau khi chi bộ công bố quyết định kỷ luật"
  },
  {
      "source": "Sheet1",
    "number": 73,
      "question": "Quyết định kỷ luật của chi bộ trực thuộc (trong đảng bộ bộ phận, trong đảng bộ cơ sở):",
    "options": [
        "Được đóng dấu của Đảng ủy cơ sở vào phía trên, góc trái và được đảng ủy cơ\nsở chuẩn y",
      "Được Đảng ủy cơ sở ra quyết định chuẩn y",
        "Được đóng dấu của đảng ủy cơ sở vào phía trên, góc trái.\nĐảng ủy cơ sở hoặc cấp ủy cấp trên trực tiếp không phải ra quyết định chuẩn y.",
        "73"
    ],
      "answer_letter": "Được đóng dấu của đảng ủy cơ sở vào phía trên, góc trái.\nĐảng ủy cơ sở hoặc cấp ủy cấp trên trực tiếp không phải ra quyết định chuẩn y.",
      "answer_explanation": "Được đóng dấu của Đảng ủy cơ sở vào phía trên, góc trái và được đảng ủy cơ\nsở chuẩn y"
  },
  {
      "source": "Sheet1",
    "number": 74,
    "question": "Theo Hướng dẫn số 12-HD/BTCTW ngày 18/01/2022 Hướng dẫn nghiệp vụ công tác đảng viên, đảng viên phải khai lý lịch đảng viên để tổ chức đảng quản lý trong thời gian nào?",
    "options": [
      "Trong thời gian 30 ngày làm việc từ ngày chi bộ tổ chức lễ kết nạp vào Đảng",
      "Trong thời gian 60 ngày làm việc từ ngày chi bộ tổ chức lễ kết nạp vào Đảng",
      "Trong thời gian 90 ngày làm việc từ ngày chi bộ tổ chức lễ kết nạp vào Đảng",
        "74"
    ],
      "answer_letter": "Trong thời gian 90 ngày làm việc từ ngày chi bộ tổ chức lễ kết nạp vào Đảng",
      "answer_explanation": "Trong thời gian 30 ngày làm việc từ ngày chi bộ tổ chức lễ kết nạp vào Đảng"
  },
  {
      "source": "Sheet1",
    "number": 75,
      "question": "Theo Hướng dẫn số 36 -HD/VPTW, ngày 03/4/2018 của Văn phòng Trung ương Đảng thì thể thức đề ký văn bản của chi bộ (chi bộ cơ sở và chi bộ trực thuộc đảng ủy cơ sở) như thế nào là đúng?",
    "options": [
        "T.M CHI ỦY",
      "T.M CHI ỦY CHI BỘ",
        "T.M BAN CHẤP HÀNH CHI BỘ",
        "75"
    ],
      "answer_letter": "T.M BAN CHẤP HÀNH CHI BỘ",
      "answer_explanation": "T.M CHI ỦY"
  },
  {
      "source": "Sheet1",
    "number": 76,
    "question": "Theo Hướng dẫn số 12-HD/BTCTW ngày 18/01/2022, xét cho đảng viên được miễn công tác và sinh hoạt đảng không vì lý do tuổi cao, sức yếu trong các trường hợp nào?",
    "options": [
      "Do phải đi điều trị bệnh dài ngày hoặc điều trị bệnh ở xa nơi cư trú. Đảng viên ra nước ngoài làm nhiệm vụ đơn lẻ, vì việc riêng (du lịch, chữa bệnh, thăm thân nhân...); đảng viên đi lao động đơn lẻ, ở những vùng xa, không có tổ chức đảng hoặc điều kiện đi lại khó khăn, không thể tham gia sinh hoạt đảng",
      "Đi làm việc lưu động ở các địa phương, đơn vị trong nước thời gian dưới 1 năm, việc làm không ổn định, hoặc ở những nơi chưa có tổ chức đảng, không có điều kiện trở về tham gia sinh hoạt chi bộ theo quy định",
      "Đảng viên nữ trong thời gian nghỉ sinh con theo quy định của Bộ luật Lao động có nguyện vọng miễn sinh hoạt đảng",
        "76"
    ],
      "answer_letter": "Đảng viên nữ trong thời gian nghỉ sinh con theo quy định của Bộ luật Lao động có nguyện vọng miễn sinh hoạt đảng",
      "answer_explanation": "Do phải đi điều trị bệnh dài ngày hoặc điều trị bệnh ở xa nơi cư trú. Đảng viên ra nước ngoài làm nhiệm vụ đơn lẻ, vì việc riêng (du lịch, chữa bệnh, thăm thân nhân...); đảng viên đi lao động đơn lẻ, ở những vùng xa, không có tổ chức đảng hoặc điều kiện đi lại khó khăn, không thể tham gia sinh hoạt đảng"
  },
  {
      "source": "Sheet1",
    "number": 77,
    "question": "Theo Hướng dẫn số 12-HD/TCTW ngày 18/01/2022, khi hồ sơ đảng viên bị mất, cấp ủy nơi quản lý hồ sơ đảng viên tiến hành thẩm tra, xác minh (phối hợp với các cơ quan có liên quan nếu cần thiết) để làm rõ nguyên nhân mất hồ sơ đảng viên và thực hiện quy trình nào?",
    "options": [
      "Làm lại hồ sơ đảng viên",
      "Khôi phục hồ sơ đảng viên.",
      "Bổ sung hồ sơ đảng viên",
        "77"
    ],
      "answer_letter": "Bổ sung hồ sơ đảng viên",
      "answer_explanation": "Làm lại hồ sơ đảng viên"
  },
  {
      "source": "Sheet1",
    "number": 78,
    "question": "Theo quy định hiện hành giữa 2 kỳ đại hội, cơ quan lãnh đạo của Đảng bộ VCB là",
    "options": [
        "Đại hội đại biểu Đảng bộ VCB",
      "Thường trực Đảng ủy VCB",
        "Ban Thường vụ Đảng ủy VCB",
        "78"
    ],
      "answer_letter": "Ban Thường vụ Đảng ủy VCB",
      "answer_explanation": "Đại hội đại biểu Đảng bộ VCB"
  },
  {
      "source": "Sheet1",
    "number": 79,
    "question": "Theo hướng dẫn hiện hành của Ban Tổ chức Trung ương thì một chức danh quy hoạch nhiều nhất được bao nhiêu người?",
    "options": [
      "3 người.",
      "4 người.",
      "5 người",
        "79"
    ],
      "answer_letter": "5 người",
      "answer_explanation": "3 người."
  },
  {
      "source": "Sheet1",
    "number": 80,
    "question": "Theo quy định của Đảng hiện hành, cấp nào có quyền quyết định khiển trách, cảnh cáo tổ chức đảng vi phạm?",
    "options": [
      "Cấp ủy cùng cấp",
      "Cấp ủy hoặc BTV cấp ủy cấp trên trực tiếp",
      "Cấp ủy cấp trên cách một cấp",
        "80"
    ],
      "answer_letter": "Cấp ủy cấp trên cách một cấp",
      "answer_explanation": "Cấp ủy cùng cấp"
  },
  {
      "source": "Sheet1",
    "number": 81,
    "question": "Tại đại hội Đảng các cấp, việc bầu cử bằng hình thức biểu quyết giơ tay, có thể được áp dụng cho việc bầu cử nào?",
    "options": [
        "Bầu Đoàn Chủ tịch, Đoàn Thư ký đại hội.",
        "Bầu nhân sự cấp ủy.",
      "Bầu đại biểu chính thức đi dự đại hội cấp trên.",
        "81"
    ],
      "answer_letter": "Bầu đại biểu chính thức đi dự đại hội cấp trên.",
      "answer_explanation": "Bầu Đoàn Chủ tịch, Đoàn Thư ký đại hội."
  },
  {
      "source": "Sheet1",
    "number": 82,
    "question": "Nội dung nào sau đây không thuộc nhiệm vụ của UBKT các cấp:",
    "options": [
      "Kiểm tra chấp hành Điều lệ, chỉ thị, nghị quyết của Đảng đối với tổ chức đảng hoặc đảng viên",
      "Kiểm tra tổ chức đảng hoặc đảng viên khi có dấu hiệu vi phạm",
      "Giải quyết tố cáo đối với tổ chức đảng hoặc đảng viên",
        "82"
    ],
      "answer_letter": "Giải quyết tố cáo đối với tổ chức đảng hoặc đảng viên",
      "answer_explanation": "Kiểm tra chấp hành Điều lệ, chỉ thị, nghị quyết của Đảng đối với tổ chức đảng hoặc đảng viên"
  },
  {
      "source": "Sheet1",
    "number": 83,
    "question": "Điều lệ Đảng quy định hình thức kỷ luật đối với đảng viên dự bị là?",
    "options": [
      "Khiển trách, cảnh cáo.",
      "Khiển trách, cảnh cáo, xóa tên.",
      "Khiển trách, cảnh cáo, khai trừ",
        "83"
    ],
      "answer_letter": "Khiển trách, cảnh cáo, khai trừ",
      "answer_explanation": "Khiển trách, cảnh cáo."
  },
  {
      "source": "Sheet1",
    "number": 84,
    "question": "Đơn tố cáo như thế nào thì được giải quyết ?",
    "options": [
      "Đơn tố cáo giấu tên, mạo danh.",
      "Đơn tố cáo có nội dung nhưng không cụ thể.",
      "Đơn tố cáo có nội dung, có chữ ký bằng bản photo.",
        "84"
    ],
      "answer_letter": "Đơn tố cáo có nội dung, có chữ ký bằng bản photo.",
      "answer_explanation": "Đơn tố cáo giấu tên, mạo danh."
  },
  {
      "source": "Sheet1",
    "number": 85,
    "question": "Nội dung đơn tố cáo nào sau đây được dùng làm căn cứ kết hợp với các thông  tin khác để quyết định kiểm  tra  tổ chức đảng  cấp dưới, đảng viên khi có dấu hiệu vi phạm?",
    "options": [
      "Đơn  tố cáo đã được cấp có thẩm quyền giải quyết nhưng tái  tố, không có nội dung mới",
      "Đơn tố cáo giấu tên, mạo tên có nội dung, địa chỉ cụ thể.",
      "Đơn tố cáo có nội dung xác định được là vu cáo",
        "85"
    ],
      "answer_letter": "Đơn tố cáo có nội dung xác định được là vu cáo",
      "answer_explanation": "Đơn  tố cáo đã được cấp có thẩm quyền giải quyết nhưng tái  tố, không có nội dung mới"
  },
  {
      "source": "Sheet1",
      "number": 86,
    "question": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB về tiếp tục đổi mới, sắp xếp tổ chức bộ máy tinh gọn, hoạt động hiệu lực, hiệu quả ra đời theo tinh thần của Nghị quyết nào sau đây?",
    "options": [
      "Nghị quyết số 18-NQ/TW ngày 16/06/2022 của BCH Trung ương",
      "Nghị quyết số 18-NQ/TW ngày 25/10/2017 của BCH Trung ương",
      "Nghị quyết số 17-NQ/CP ngày 07/03/2019 của Thủ tướng Chính phủ",
        "86"
    ],
      "answer_letter": "Nghị quyết số 17-NQ/CP ngày 07/03/2019 của Thủ tướng Chính phủ",
      "answer_explanation": "Nghị quyết số 18-NQ/TW ngày 16/06/2022 của BCH Trung ương"
  },
  {
      "source": "Sheet1",
      "number": 87,
    "question": "Đâu là những hạn chế còn tồn tại trong quá trình kiện toàn mô hình tổ chức tại VCB được chỉ ra tại Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB?",
    "options": [
        "Các mảng hoạt động, nghiệp vụ được tổ chức tập trung về một đầu\nmối",
      "Một số mảng hoạt động, nghiệp vụ đang được thực hiện phân tán tại một số đơn vị khác nhau",
      "Các mảng hoạt động, nghiệp vụ được thực hiện một cách  đồng bộ",
        "87"
    ],
      "answer_letter": "Các mảng hoạt động, nghiệp vụ được thực hiện một cách  đồng bộ",
      "answer_explanation": "Các mảng hoạt động, nghiệp vụ được tổ chức tập trung về một đầu\nmối"
  },
  {
      "source": "Sheet1",
      "number": 88,
    "question": "Theo Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB, \"mô hình tổng thể tổ chức bộ máy của VCB đang tiếp tục được rà soát, hoàn thiện, một số lĩnh vực hoạt động, nghiệp vụ chưa kịp thời chuyển đổi phù hợp với yêu cầu, nhiệm vụ trong thời kỳ mới\" là:",
    "options": [
      "Tình hình",
      "Hạn chế, bất cập",
      "Nguyên nhân hạn chế, bất cập",
        "88"
    ],
      "answer_letter": "Nguyên nhân hạn chế, bất cập",
      "answer_explanation": "Tình hình"
  },
  {
      "source": "Sheet1",
      "number": 89,
    "question": "Theo quan điểm chỉ đạo của Đảng ủy VCB tại Nghị quyết 2537- NQ/ĐU ngày 06/03/2025, việc đổi mới, sắp xếp tổ chức bộ máy, cơ cấu lại lao động tại VCB cần được thực hiện như thế nào?",
    "options": [
      "Thực hiện thường xuyên, liên tục, tích cực, mạnh mẽ",
      "Thực hiện có trọng tâm, trọng điểm và lộ trình cụ thể đáp ứng yêu cầu trước mắt và lâu dài",
      "Phù hợp với chiến lược phát triển và thực tế hoạt động kinh doanh của VCB trong từng thời kỳ",
        "89"
    ],
      "answer_letter": "Phù hợp với chiến lược phát triển và thực tế hoạt động kinh doanh của VCB trong từng thời kỳ",
      "answer_explanation": "Thực hiện thường xuyên, liên tục, tích cực, mạnh mẽ"
  },
  {
      "source": "Sheet1",
      "number": 90,
    "question": "Đâu là nguyên tắc trong quá trình đổi mới, sắp xếp tổ chức bộ máy tại VCB được Đảng ủy VCB đưa ra tại Nghị quyết 2537-NQ/ĐU ngày 06/03/2025?",
    "options": [
      "Mỗi đơn vị thực hiện một việc, chủ trì việc thực hiện và chịu trách nhiệm chính",
      "Mỗi đơn vị thực hiện một việc, đảm bảo sự không chồng chéo, giao thoa",
        "Mỗi đơn vị thực hiện nhiều việc, một việc chỉ giao cho một đơn vị chủ trì thực hiện và chịu trách\nnhiệm chính, đảm bảo không chồng chéo, giao thoa, không bỏ sót chức năng, nhiệm vụ",
        "90"
    ],
      "answer_letter": "Mỗi đơn vị thực hiện nhiều việc, một việc chỉ giao cho một đơn vị chủ trì thực hiện và chịu trách\nnhiệm chính, đảm bảo không chồng chéo, giao thoa, không bỏ sót chức năng, nhiệm vụ",
      "answer_explanation": "Mỗi đơn vị thực hiện một việc, chủ trì việc thực hiện và chịu trách nhiệm chính"
  },
  {
      "source": "Sheet1",
      "number": 91,
    "question": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB quy định nguyên tắc phân bổ kế hoạch lao động cho các đơn vị trong thời gian tới như thế nào?",
    "options": [
        "Ưu tiên phân bổ tăng mới lao động bán hàng, lao động hỗ trợ kinh\ndoanh; Hạn chế phân bổ tăng mới lao động tác nghiệp/lao động giản đơn",
      "Ưu tiên phân bổ tăng mới lao động bán hàng, lao động trong lĩnh vực dữ liệu, công nghệ thông tin; Hạn chế phân bổ tăng mới lao động hỗ trợ/lao động giản đơn",
      "Ưu tiên phân bổ tăng mới lao động tác nghiệp, lao động trong lĩnh vực dữ liệu, công nghệ thông tin; Hạn chế phân bổ tăng mới lao động hỗ trợ/lao động giản đơn",
        "91"
    ],
      "answer_letter": "Ưu tiên phân bổ tăng mới lao động tác nghiệp, lao động trong lĩnh vực dữ liệu, công nghệ thông tin; Hạn chế phân bổ tăng mới lao động hỗ trợ/lao động giản đơn",
      "answer_explanation": "Ưu tiên phân bổ tăng mới lao động bán hàng, lao động hỗ trợ kinh\ndoanh; Hạn chế phân bổ tăng mới lao động tác nghiệp/lao động giản đơn"
  },
  {
      "source": "Sheet1",
      "number": 92,
    "question": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB quy định nguyên tắc sắp xếp, bố trí lại lao động tại Chi nhánh trong thời gian tới như thế nào?",
    "options": [
        "Lao động bán hàng chiếm tỷ lệ\n≥50% tổng số lao động của Chi nhánh",
        "Lao động bán hàng chiếm tỷ lệ\n≥60% tổng số lao động của Chi nhánh",
        "Lao động bán hàng chiếm tỷ lệ\n≥60% tổng số lao động chính thức của Chi nhánh",
        "92"
      ],
      "answer_letter": "Lao động bán hàng chiếm tỷ lệ\n≥60% tổng số lao động chính thức của Chi nhánh",
      "answer_explanation": "Lao động bán hàng chiếm tỷ lệ\n≥50% tổng số lao động của Chi nhánh"
    },
    {
      "source": "Sheet1",
      "number": 93,
    "question": "Đơn vị nào có trách nhiệm chủ trì việc theo dõi, đôn đốc tình hình thực hiện Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB?",
    "options": [
      "Ban Thường vụ Đảng ủy VCB",
      "Ban chấp hành Đảng bộ VCB",
      "Ủy ban kiểm tra Đảng ủy VCB",
        "93"
    ],
      "answer_letter": "Ủy ban kiểm tra Đảng ủy VCB",
      "answer_explanation": "Ban Thường vụ Đảng ủy VCB"
  },
  {
      "source": "Sheet1",
      "number": 94,
    "question": "Theo Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB, tối ưu hóa giá trị và hiệu quả nguồn nhân lực thông qua việc tiếp tục rà soát, xây dựng/điều chỉnh định biên lao động, cơ cấu nhân sự lãnh đạo của các đơn vị, hỗ trợ Chi nhánh trong việc bố trí sắp xếp lại lao động, là:",
    "options": [
      "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Ban Tổ chức Đảng ủy VCB thực hiện",
      "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Trụ sở chính thực hiện",
      "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Chi nhánh thực hiện",
        "94"
    ],
      "answer_letter": "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Chi nhánh thực hiện",
      "answer_explanation": "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Ban Tổ chức Đảng ủy VCB thực hiện"
  },
  {
      "source": "Sheet1",
      "number": 95,
    "question": "Theo Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB, nguyên tắc sắp xếp, cơ cấu lại lao động tại Chi nhánh trong thời gian tới là:",
    "options": [
      "Tuyển dụng bù đắp từ nguồn bên ngoài đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm",
      "Tuyển dụng bù đắp từ nguồn nội bộ đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm",
      "Hạn chế tối đa việc tuyển dụng bù đắp, bố trí nhân sự thay thế từ khối khách hàng đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm",
        "95"
      ],
      "answer_letter": "Hạn chế tối đa việc tuyển dụng bù đắp, bố trí nhân sự thay thế từ khối khách hàng đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm",
      "answer_explanation": "Tuyển dụng bù đắp từ nguồn bên ngoài đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm"
    },
    {
      "source": "Sheet1",
      "number": 96,
      "question": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB ra đời trong bối cảnh nào?",
    "options": [
        "Thực hiện Kết luận số 123- KL/TW ngày 24/01/2025 của BCH Trung ương",
        "Thực hiện Kết luận số 126-\nKL/TW ngày 14/02/2025 của Bộ Chính trị, Ban Bí thư",
        "Thực hiện Kết luận số 127-KL/TW ngày 28/02/2025 của Bộ Chính trị, Ban Bí thư",
        "96"
      ],
      "answer_letter": "Thực hiện Kết luận số 127-KL/TW ngày 28/02/2025 của Bộ Chính trị, Ban Bí thư",
      "answer_explanation": "Thực hiện Kết luận số 123- KL/TW ngày 24/01/2025 của BCH Trung ương"
    },
    {
      "source": "Sheet1",
      "number": 97,
      "question": "Kết luận 123-KL/TW ngày 24/01/2025 của BCH Trung ương đề ra mục tiêu tăng trưởng GDP năm 2025 của Việt Nam đạt từ bao nhiêu\n% trở lên?",
    "options": [
        "0.07",
        "0.08",
        "0.09",
        "97"
      ],
      "answer_letter": "0.09",
      "answer_explanation": "0.07"
    },
    {
      "source": "Sheet1",
      "number": 98,
      "question": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB đặt ra mục tiêu tổng quát tiếp tục triển khai cái gì?",
    "options": [
        "03 đột phá chiến lược và 03 trọng tâm chuyển dịch cơ cấu kinh doanh",
        "05 đột phá chiến lược và 05 trọng tâm chuyển dịch cơ cấu kinh doanh",
        "04 đột phá chiến lược và 06 trọng tâm chuyển dịch cơ cấu kinh doanh",
        "98"
      ],
      "answer_letter": "04 đột phá chiến lược và 06 trọng tâm chuyển dịch cơ cấu kinh doanh",
      "answer_explanation": "03 đột phá chiến lược và 03 trọng tâm chuyển dịch cơ cấu kinh doanh"
    },
    {
      "source": "Sheet1",
      "number": 99,
    "question": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB đặt ra mục tiêu năm 2025, VCB đạt mức tăng trưởng tín dụng tối thiểu bao nhiêu %?",
    "options": [
        "0.1",
        "0.15",
        "0.16",
        "99"
      ],
      "answer_letter": "0.16",
      "answer_explanation": "0.1"
    },
    {
      "source": "Sheet1",
      "number": 100,
      "question": "Theo Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB, cần khai thác dữ liệu gì trong quá trình phát triển nền tảng dữ liệu\nnhằm nâng cao khả năng quản trị, điều hành và phát triển hoạt động kinh doanh?",
    "options": [
      "Dữ liệu nguồn",
      "Dữ liệu điện tử",
      "Dữ liệu định tính",
        "100"
    ],
      "answer_letter": "Dữ liệu định tính",
      "answer_explanation": "Dữ liệu nguồn"
  },
  {
      "source": "Sheet1",
      "number": 101,
    "question": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB đặt ra nhiệm vụ phát triển phương pháp làm việc gì để thích ứng với chuyển đổi số?",
    "options": [
      "Phương pháp làm việc khoa học",
      "Phương pháp làm việc đổi mới",
      "Phương pháp làm việc Agile",
        "101"
    ],
      "answer_letter": "Phương pháp làm việc Agile",
      "answer_explanation": "Phương pháp làm việc khoa học"
  },
  {
      "source": "Sheet1",
      "number": 102,
    "question": "Đơn vị nào là đầu mối triển khai giải pháp thực hiện chương trình hành động/kế hoạch thực hiện Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB",
    "options": [
      "Ban chấp hành Đảng bộ VCB",
      "Ban điều hành VCB",
      "Ban chiến lược và Thư ký tổng hợp",
        "102"
    ],
      "answer_letter": "Ban chiến lược và Thư ký tổng hợp",
      "answer_explanation": "Ban chấp hành Đảng bộ VCB"
  },
  {
      "source": "Sheet1",
      "number": 103,
    "question": "Tại Kế hoạch hành động số 65-KH/ĐU ngày 09/05/2025 của Đảng ủy Vietcombank Sở giao dịch đề ra kế hoạch kinh doanh năm 2025 với tỷ lệ nợ nhóm 2 và tỷ lệ nợ xấu là bao nhiêu?",
    "options": [
      "Tỷ lệ nợ nhóm 2 < 0.5% và tỷ lệ nợ xấu < 1%",
      "Tỷ lệ nợ nhóm 2 < 0.5% và tỷ lệ nợ xấu < 0.5%",
      "Tỷ lệ nợ nhóm 2 < 0.3% và tỷ lệ nợ xấu < 0.3%",
        "103"
    ],
      "answer_letter": "Tỷ lệ nợ nhóm 2 < 0.3% và tỷ lệ nợ xấu < 0.3%",
      "answer_explanation": "Tỷ lệ nợ nhóm 2 < 0.5% và tỷ lệ nợ xấu < 1%"
  },
  {
      "source": "Sheet1",
      "number": 104,
    "question": "Tại Kế hoạch hành động số 65-KH/ĐU ngày 09/05/2025 của Đảng ủy Vietcombank Sở giao dịch đề ra kế hoạch kinh doanh nhiệm kỳ 2025 - 2030 mục tiêu huy động vốn tăng trưởng bình quân là bao nhiêu %?",
    "options": [
      "3 - 5%/năm",
      "5- 7%/năm",
      "6 - 8%/năm",
        "104"
    ],
      "answer_letter": "6 - 8%/năm",
      "answer_explanation": "3 - 5%/năm"
  },
  {
      "source": "Sheet1",
      "number": 105,
    "question": "Tại Kế hoạch hành động số 65-KH/ĐU ngày 09/05/2025 của Đảng ủy Vietcombank Sở giao dịch đề ra kế hoạch kinh doanh nhiệm kỳ 2025 - 2030 với mục tiêu tín dụng tăng trưởng tối thiểu là bao nhiêu %/năm?",
    "options": [
        "0.1",
        "0.12",
        "0.15",
        "105"
      ],
      "answer_letter": "0.15",
      "answer_explanation": "0.1"
    },
    {
      "source": "Sheet1",
      "number": 106,
      "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, phát triển lĩnh vực nào được xem là yếu tố quyết định phát triển của các\nquốc gia?",
    "options": [
        "Tài nguyên thiên nhiên phong phú",
        "Nguồn vốn đầu tư nước ngoài dồi dào",
        "Khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia",
        "106"
      ],
      "answer_letter": "Khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia",
      "answer_explanation": "Tài nguyên thiên nhiên phong phú"
    },
    {
      "source": "Sheet1",
      "number": 107,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, chủ thể nào giữ vai trò dẫn dắt, thúc đẩy phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số?",
    "options": [
      "Các tổ chức phi chính phủ",
      "Nhà nước",
      "Các tập đoàn kinh tế lớn",
        "107"
    ],
      "answer_letter": "Các tập đoàn kinh tế lớn",
      "answer_explanation": "Các tổ chức phi chính phủ"
  },
  {
      "source": "Sheet1",
      "number": 108,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia được xác định là?",
    "options": [
      "Nhiệm vụ cốt lõi",
      "Nhiệm vụ quan trọng",
      "Đột phá quan trọng hàng đầu, là động lực chính",
        "108"
    ],
      "answer_letter": "Đột phá quan trọng hàng đầu, là động lực chính",
      "answer_explanation": "Nhiệm vụ cốt lõi"
  },
  {
      "source": "Sheet1",
      "number": 109,
    "question": "Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị nhấn mạnh đến kỷ nguyên nào?",
    "options": [
      "Kỷ nguyên công nghiệp hóa, hiện đại hóa",
      "Kỷ nguyên số",
      "Kỷ nguyên hội nhập",
        "109"
    ],
      "answer_letter": "Kỷ nguyên hội nhập",
      "answer_explanation": "Kỷ nguyên công nghiệp hóa, hiện đại hóa"
  },
  {
      "source": "Sheet1",
      "number": 110,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, đổi mới sáng tạo và chuyển đổi số quốc gia được xem là cuộc cách mạng như thế nào?",
    "options": [
      "Chủ yếu trong lĩnh vực khoa học và công nghệ",
      "Sâu sắc, toàn diện trên tất cả các lĩnh vực",
      "Tập trung trong lĩnh vực kinh tế",
        "110"
    ],
      "answer_letter": "Tập trung trong lĩnh vực kinh tế",
      "answer_explanation": "Chủ yếu trong lĩnh vực khoa học và công nghệ"
  },
  {
      "source": "Sheet1",
      "number": 111,
    "question": "Theo nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, phong trào nào được triển khai sâu rộng để nâng cao kiến thức số cho người dân?",
    "options": [
      "Chính phủ số",
      "Học tập số",
      "Nhà trường số",
        "111"
    ],
      "answer_letter": "Nhà trường số",
      "answer_explanation": "Chính phủ số"
  },
  {
      "source": "Sheet1",
      "number": 112,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, quan điểm nào sau đây đúng về đổi mới tư duy xây dựng pháp luật liên quan tới đổi mới sáng tạo?",
    "options": [
      "Ưu tiên phát triển các công nghệ truyền thống",
      "Áp dụng quy định linh hoạt, phát huy thử nghiệm các công nghệ mới",
        "Bảo đảm yêu cầu quản lý và khuyến khích đổi mới sáng tạo,\nloại bỏ tư duy \"không quản được thì cấm\"",
        "112"
    ],
      "answer_letter": "Bảo đảm yêu cầu quản lý và khuyến khích đổi mới sáng tạo,\nloại bỏ tư duy \"không quản được thì cấm\"",
      "answer_explanation": "Ưu tiên phát triển các công nghệ truyền thống"
  },
  {
      "source": "Sheet1",
      "number": 113,
    "question": "Đâu là quan điểm của Đảng ủy VCB trong việc hoàn thiện cơ chế chính sách trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số tại Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB",
    "options": [
        "Đưa cơ chế chính sách thành một giá trị gia tăng trong phát triển\nkhoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số",
      "Đưa cơ chế chính sách thành một động lực trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số",
      "Đưa cơ chế chính sách thành một giải pháp cốt lõi trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số",
        "113"
    ],
      "answer_letter": "Đưa cơ chế chính sách thành một giải pháp cốt lõi trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số",
      "answer_explanation": "Đưa cơ chế chính sách thành một giá trị gia tăng trong phát triển\nkhoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số"
  },
  {
      "source": "Sheet1",
      "number": 114,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, hạ tầng số phải phát triển theo nguyên tắc nào?",
    "options": [
      "Đơn giản, tiết kiệm chi phí tối đa",
      "Cần đầu tư vào công nghệ viễn thông",
      "Hiện đại, đồng bộ, an ninh, an toàn, hiệu quả, tránh lãng phí",
        "114"
    ],
      "answer_letter": "Hiện đại, đồng bộ, an ninh, an toàn, hiệu quả, tránh lãng phí",
      "answer_explanation": "Đơn giản, tiết kiệm chi phí tối đa"
  },
  {
      "source": "Sheet1",
      "number": 115,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, đâu là lĩnh vực được xác định ưu tiên trong quan điểm tự chủ về công nghệ?",
    "options": [
      "Nghiên cứu cơ bản",
      "Công nghệ thông tin",
      "Công nghệ viễn thông",
        "115"
    ],
      "answer_letter": "Công nghệ viễn thông",
      "answer_explanation": "Nghiên cứu cơ bản"
  },
  {
      "source": "Sheet1",
      "number": 116,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, đâu không phải là hạn chế trong việc triển khai các chủ trương chính sách về đổi mới sáng tạo và chuyển đổi số tại VCB?",
    "options": [
      "Các chính sách pháp luật về chuyển đổi số đang dần hoàn thiện nhưng chưa theo kịp công nghệ mới",
        "Nguồn nhân lực Công nghệ thông tin và chuyển đổi số tại VCB\nchưa đáp ứng kịp nhu cầu phát triển mạnh mẽ của ngân hàng",
      "VCB còn phụ thuộc nhiều vào bên thứ ba trong việc đầu tư phát triển công nghệ",
        "116"
    ],
      "answer_letter": "VCB còn phụ thuộc nhiều vào bên thứ ba trong việc đầu tư phát triển công nghệ",
      "answer_explanation": "Các chính sách pháp luật về chuyển đổi số đang dần hoàn thiện nhưng chưa theo kịp công nghệ mới"
  },
  {
      "source": "Sheet1",
      "number": 117,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, dữ liệu được xác định là gì trong nền kinh tế số?",
    "options": [
      "Yếu tố chính và ảnh hưởng lớn",
      "Công cụ hỗ trợ chính",
      "Tư liệu sản xuất chính",
        "117"
    ],
      "answer_letter": "Tư liệu sản xuất chính",
      "answer_explanation": "Yếu tố chính và ảnh hưởng lớn"
  },
  {
      "source": "Sheet1",
      "number": 118,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, yếu tố nào được xem là điều kiện tiên quyết trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số?",
    "options": [
      "Hạ tầng",
      "Cơ chế, chính sách",
      "Công nghệ",
        "118"
    ],
      "answer_letter": "Công nghệ",
      "answer_explanation": "Hạ tầng"
  },
  {
      "source": "Sheet1",
      "number": 119,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, chủ thể nào được xác định là trung tâm và định hướng chuyển đổi số ngành Ngân hàng?",
    "options": [
      "Ngân hàng Nhà nước",
      "Các Ngân hàng thương mại",
      "Người dân và doanh nghiệp",
        "119"
    ],
      "answer_letter": "Người dân và doanh nghiệp",
      "answer_explanation": "Ngân hàng Nhà nước"
  },
  {
      "source": "Sheet1",
      "number": 120,
    "question": "Quan điểm chỉ đạo của Đảng ủy VCB tại Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 lấy gì là thước đo trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số tại VCB?",
    "options": [
      "Trải nghiệm khách hàng",
      "Số lượng sáng kiến cải tiến",
      "Điểm đánh giá khung năng lực",
        "120"
    ],
      "answer_letter": "Điểm đánh giá khung năng lực",
      "answer_explanation": "Trải nghiệm khách hàng"
  },
  {
      "source": "Sheet1",
      "number": 121,
    "question": "Theo quan điểm chỉ đạo tại Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, để tự chủ và cạnh tranh về công nghệ, VCB cần phải làm gì?",
    "options": [
      "Mua công nghệ từ các tổ chức nước ngoài",
      "Phát triển công nghệ riêng, đơn giản và tiết kiệm chi phí",
      "Đẩy mạnh nghiên cứu ứng dụng và chú trọng nghiên cứu cơ bản",
        "121"
      ],
      "answer_letter": "Đẩy mạnh nghiên cứu ứng dụng và chú trọng nghiên cứu cơ bản",
      "answer_explanation": "Mua công nghệ từ các tổ chức nước ngoài"
    },
    {
      "source": "Sheet1",
      "number": 122,
      "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, việc đảm bảo chủ quyền trên không gian mạng, đảm bảo an ninh mạng, an ninh dữ liệu, an toàn thông tin của VCB và khách hàng\nđược xác định như thế nào trong quá trình phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số tại VCB?",
    "options": [
      "Là yêu cầu quan trọng",
      "Là yêu cầu cấp bách, liên tục",
      "Là yêu cầu thường xuyên",
        "122"
    ],
      "answer_letter": "Là yêu cầu thường xuyên",
      "answer_explanation": "Là yêu cầu quan trọng"
  },
  {
      "source": "Sheet1",
      "number": 123,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, để phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số, cần phải làm gì đối với cơ chế chính sách?",
    "options": [
      "Điều chỉnh theo tình hình thực tế",
      "Hoàn thiện và đi trước một bước",
      "Thay đổi theo lộ trình để đảm bảo ổn định",
        "123"
    ],
      "answer_letter": "Thay đổi theo lộ trình để đảm bảo ổn định",
      "answer_explanation": "Điều chỉnh theo tình hình thực tế"
  },
  {
      "source": "Sheet1",
      "number": 124,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, việc xây dựng và triển khai chiến lược đổi mới sáng tạo của VCB đến năm 2025, tầm nhìn đến năm 2030 ưu tiên đến loại hình đổi mới sáng tạo nào?",
    "options": [
      "Đổi mới sáng tạo mở",
      "Đổi mới sáng tạo đột phá",
      "Đổi mới khoa học công nghệ",
        "124"
    ],
      "answer_letter": "Đổi mới khoa học công nghệ",
      "answer_explanation": "Đổi mới sáng tạo mở"
  },
  {
      "source": "Sheet1",
      "number": 125,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, cán bộ có trình độ chuyên môn khoa học kỹ thuật tại đơn vị sẽ được quan tâm cơ cấu bố trí tại đâu?",
    "options": [
      "Ban Giám đốc Chi nhánh",
      "Cấp ủy đơn vị",
      "Ban chấp hành Công đoàn cơ sở",
        "125"
    ],
      "answer_letter": "Ban chấp hành Công đoàn cơ sở",
      "answer_explanation": "Ban Giám đốc Chi nhánh"
  },
  {
      "source": "Sheet1",
      "number": 126,
    "question": "VCB hiện đang thu hút nhân sự công nghệ cao bằng hình thức nào?",
    "options": [
        "Tăng bậc lương tối đa cho cán bộ thuộc Khối Công nghệ thông tin &\nChuyển đổi số",
        "Áp dụng chế độ làm việc linh\nhoạt cho cán bộ thuộc Khối Công nghệ thông tin & Chuyển đổi số",
      "Áp dụng lương thỏa thuận cho nhân sự chủ chốt của Khối Công nghệ thông tin & Chuyển đổi số",
        "126"
    ],
      "answer_letter": "Áp dụng lương thỏa thuận cho nhân sự chủ chốt của Khối Công nghệ thông tin & Chuyển đổi số",
      "answer_explanation": "Tăng bậc lương tối đa cho cán bộ thuộc Khối Công nghệ thông tin &\nChuyển đổi số"
  },
  {
      "source": "Sheet1",
      "number": 127,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, dữ liệu cần được phát triển như thế nào trong quá trình đổi mới sáng tạo?",
    "options": [
      "Tập trung vào nguồn dữ liệu tại đơn vị",
      "Làm giàu, khai thác tối đa tiềm năng của dữ liệu, thúc đẩy phát triển nhanh cơ sở dữ liệu lớn, công nghiệp dữ liệu, kinh tế dữ liệu",
      "Giữ nguyên hiện trạng và phát triển thêm",
        "127"
    ],
      "answer_letter": "Giữ nguyên hiện trạng và phát triển thêm",
      "answer_explanation": "Tập trung vào nguồn dữ liệu tại đơn vị"
  },
  {
      "source": "Sheet1",
      "number": 128,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, giải pháp để thúc đẩy hoạt động nghiên cứu khoa học, ứng dụng công nghệ, đổi mới sáng tạo và chuyển đổi số trong hoạt động kinh doanh là tạo ra các dịch vụ sản phẩm như thế nào?",
    "options": [
      "Dịch vụ sản phẩm có hàm lượng công nghệ cao",
      "Dịch vụ sản phẩm sáng tạo",
      "Dịch vụ sản phẩm đơn giản, ưu việt và tiết kiệm chi phí",
        "128"
      ],
      "answer_letter": "Dịch vụ sản phẩm đơn giản, ưu việt và tiết kiệm chi phí",
      "answer_explanation": "Dịch vụ sản phẩm có hàm lượng công nghệ cao"
    },
    {
      "source": "Sheet1",
      "number": 129,
      "question": "Trong năm 2025, VCB đã thành lập bộ phận nào để thích ứng với quá trình chuyển đổi số?",
    "options": [
        "Khối Công nghệ thông tin và Chuyển đổi số",
        "Trung tâm đổi mới sáng tạo và Khối Dữ liệu",
      "Khối Vận hành",
        "129"
    ],
      "answer_letter": "Khối Vận hành",
      "answer_explanation": "Khối Công nghệ thông tin và Chuyển đổi số"
  },
  {
      "source": "Sheet1",
      "number": 130,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt mục tiêu đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số tại VCB cho giai đoạn nào?",
    "options": [
      "Đặt mục tiêu cho giai đoạn 2025 - 2030",
      "Đặt tầm nhìn cho giai đoạn 2030 - 2045",
      "Đặt mục tiêu đến năm 2025, tầm nhìn đến năm 2030",
        "130"
    ],
      "answer_letter": "Đặt mục tiêu đến năm 2025, tầm nhìn đến năm 2030",
      "answer_explanation": "Đặt mục tiêu cho giai đoạn 2025 - 2030"
  },
  {
      "source": "Sheet1",
      "number": 131,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt mục tiêu đến năm 2030, tỷ lệ khách hàng có sử dụng dịch vụ trên các kênh điện tử là bao nhiêu?",
    "options": [
      "≥ 50%",
      "≥ 60%",
      "≥ 70%",
        "131"
    ],
      "answer_letter": "≥ 70%",
      "answer_explanation": "≥ 50%"
  },
  {
      "source": "Sheet1",
      "number": 132,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, giải pháp để thúc đẩy hoạt động nghiên cứu khoa học, ứng dụng công nghệ, đổi mới sáng tạo và chuyển đổi số trong hoạt động kinh doanh là tối ưu hóa quy trình nội bộ trên cơ sở áp dụng các giải pháp nào?",
    "options": [
      "Cắt giảm các bước trung gian trong quá trình thực hiện quy trình nội bộ",
      "Cắt giảm thời gian luân chuyển hồ sơ giữa các bộ phận",
      "Áp dụng các giải pháp tự động hóa và số hóa nhằm tăng năng suất lao động và rút ngắn thời gian xử lý",
        "132"
    ],
      "answer_letter": "Áp dụng các giải pháp tự động hóa và số hóa nhằm tăng năng suất lao động và rút ngắn thời gian xử lý",
      "answer_explanation": "Cắt giảm các bước trung gian trong quá trình thực hiện quy trình nội bộ"
  },
  {
      "source": "Sheet1",
      "number": 133,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, vai trò của an ninh mạng trong chuyển đổi số là gì?",
    "options": [
      "Quan trọng đối với tổ chức",
      "Cần chú trọng nhiều",
      "Áp dụng riêng trong lĩnh vực tài chính - ngân hàng",
        "133"
    ],
      "answer_letter": "Áp dụng riêng trong lĩnh vực tài chính - ngân hàng",
      "answer_explanation": "Quan trọng đối với tổ chức"
  },
  {
      "source": "Sheet1",
      "number": 134,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt mục tiêu đến năm 2030, tỷ lệ doanh thu từ các kênh số là bao nhiêu?",
    "options": [
      "≥ 50%",
      "≥ 55%",
      "≥ 60%",
        "134"
    ],
      "answer_letter": "≥ 60%",
      "answer_explanation": "≥ 50%"
  },
  {
      "source": "Sheet1",
      "number": 135,
    "question": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt tầm nhìn đến năm 2045, số lượng cán bộ công nghệ thông tin đạt bao nhiêu % trên tổng số nhân sự của toàn hệ thống",
    "options": [
        "0.05",
        "0.08",
        "0.1",
        "135"
      ],
      "answer_letter": "0.1",
      "answer_explanation": "0.05"
    },
    {
      "source": "Sheet1",
      "number": 136,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt tầm nhìn đến năm 2045, tỷ lệ doanh thu từ các kênh số là bao nhiêu?",
    "options": [
      "≥ 50%",
      "≥ 55%",
      "≥ 60%",
        "136"
    ],
      "answer_letter": "≥ 60%",
      "answer_explanation": "≥ 50%"
  },
  {
      "source": "Sheet1",
      "number": 137,
    "question": "Đơn vị nào là đầu mối phối hợp xây dựng chương trình hành động/kế hoạch thực hiện Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB",
    "options": [
      "Ban chấp hành Đảng bộ VCB",
      "Ban điều hành VCB",
      "Ban Tuyên giáo Đảng ủy VCB",
        "137"
      ],
      "answer_letter": "Ban Tuyên giáo Đảng ủy VCB",
      "answer_explanation": "Ban chấp hành Đảng bộ VCB"
    },
    {
      "source": "Sheet1",
      "number": 138,
      "question": "Mục tiêu đến năm 2030, giao dịch không dùng tiền mặt đạt bao nhiêu\n% theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị?",
    "options": [
        "0.5",
        "0.6",
        "0.7",
        "138"
      ],
      "answer_letter": "0.7",
      "answer_explanation": "0.5"
    },
    {
      "source": "Sheet1",
      "number": 139,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, quy mô kinh tế số của Việt Nam dự kiến đạt tối thiểu bao nhiêu % GDP vào năm 2030?",
    "options": [
        "0.1",
        "0.2",
        "0.3",
        "139"
      ],
      "answer_letter": "0.3",
      "answer_explanation": "0.1"
    },
    {
      "source": "Sheet1",
      "number": 140,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, đến năm 2045, Việt Nam thuộc nhóm bao nhiêu nước dẫn đầu thế giới về đổi mới sáng tạo và chuyển đổi số?",
    "options": [
      "20",
      "30",
      "40",
        "140"
    ],
      "answer_letter": "40",
      "answer_explanation": "20"
  },
  {
      "source": "Sheet1",
      "number": 141,
    "question": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB ra đời trong bối cảnh nào?",
    "options": [
      "Đất nước ta đang bước vào kỷ nguyên phát triển mạnh mẽ, bứt phá toàn diện",
      "VCB đã đạt được tầm vóc, khẳng định được uy tín và vị thế tiên phong",
      "VCB đang phải đối mặt với nhiều khó khăn, thách thức, thậm chí có nguy cơ tụt hậu",
        "141"
      ],
      "answer_letter": "VCB đang phải đối mặt với nhiều khó khăn, thách thức, thậm chí có nguy cơ tụt hậu",
      "answer_explanation": "Đất nước ta đang bước vào kỷ nguyên phát triển mạnh mẽ, bứt phá toàn diện"
    },
    {
      "source": "Sheet1",
      "number": 142,
      "question": "Đâu là quan điểm chỉ đạo của Đảng ủy VCB tại Nghị quyết 2639- NQ/ĐU ngày 11/04/2025?",
    "options": [
        "Khơi dậy khát vọng phát triển đưa Vietcombank \"Đổi mới - Hiệu quả\n- Bền vững\"",
      "Khơi dậy khát vọng phát triển đưa Vietcombank \"Vượt qua thách thức - Duy trì vị thế dẫn đầu\"",
        "Khơi dậy khát vọng phát triển đưa Vietcombank \"Vượt lên thách thức\n- Vươn mình bứt phá - Vững bước tiên phong\"",
        "142"
    ],
      "answer_letter": "Khơi dậy khát vọng phát triển đưa Vietcombank \"Vượt lên thách thức\n- Vươn mình bứt phá - Vững bước tiên phong\"",
      "answer_explanation": "Khơi dậy khát vọng phát triển đưa Vietcombank \"Đổi mới - Hiệu quả\n- Bền vững\""
  },
  {
      "source": "Sheet1",
      "number": 143,
    "question": "Định hướng của Đảng ủy VCB tại Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 biến các giá trị bản sắc văn hóa Vietcombank thành:",
    "options": [
      "Động lực trong quản trị nhằm nâng tầm nội lực",
      "Hệ tư tưởng trong quản trị nhằm nâng tầm nội lực",
      "Giá trị cốt lõi trong quản trị nhằm nâng tầm nội lực",
        "143"
    ],
      "answer_letter": "Giá trị cốt lõi trong quản trị nhằm nâng tầm nội lực",
      "answer_explanation": "Động lực trong quản trị nhằm nâng tầm nội lực"
  },
  {
      "source": "Sheet1",
      "number": 144,
    "question": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB coi việc quản trị, khai thác và sử dụng cái gì như một tài nguyên sản xuất mới?",
    "options": [
      "Công nghệ",
      "Dữ liệu",
      "Nguồn vốn",
        "144"
      ],
      "answer_letter": "Nguồn vốn",
      "answer_explanation": "Công nghệ"
    },
    {
      "source": "Sheet1",
      "number": 145,
      "question": "Định hướng chuyển đổi số của Đảng ủy VCB tại Nghị quyết 2639- NQ/ĐU ngày 11/04/2025 bao gồm những khía cạnh nào?",
    "options": [
      "Nghiên cứu, ứng dụng các công nghệ mới",
      "Xây dựng các mô hình kinh doanh mới",
        "Phát triển sản phẩm số mới",
        "145"
    ],
      "answer_letter": "Phát triển sản phẩm số mới",
      "answer_explanation": "Nghiên cứu, ứng dụng các công nghệ mới"
  },
  {
      "source": "Sheet1",
      "number": 146,
    "question": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB đề ra mục tiêu đến năm 2030, VCB sẽ áp dụng các tiêu chuẩn nào trong quản trị rủi ro?",
    "options": [
      "Tiêu chuẩn ISO 31000",
      "Khung quản trị rủi ro tích hợp (ERM)",
      "Chuẩn mực Basel mới nhất",
        "146"
      ],
      "answer_letter": "Chuẩn mực Basel mới nhất",
      "answer_explanation": "Tiêu chuẩn ISO 31000"
    },
    {
      "source": "Sheet1",
      "number": 147,
      "question": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB đề ra mục tiêu đến năm 2030 có bao nhiêu % giao dịch của khách hàng\nđược thực hiện qua các kênh số?",
    "options": [
        "0.6",
        "0.7",
        "0.8",
        "147"
      ],
      "answer_letter": "0.8",
      "answer_explanation": "0.6"
    },
    {
      "source": "Sheet1",
      "number": 148,
    "question": "\"Đổi mới công tác đào tạo, quy hoạch gắn với bồi dưỡng năng lực lãnh đạo, năng lực số hóa\" thuộc nhóm giải pháp nào tại Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB?",
    "options": [
      "Giải pháp về tổ chức và quản lý",
      "Giải pháp về nguồn nhân lực và văn hóa doanh nghiệp",
      "Giải pháp về chuyển đổi số",
        "148"
    ],
      "answer_letter": "Giải pháp về chuyển đổi số",
      "answer_explanation": "Giải pháp về tổ chức và quản lý"
  },
  {
      "source": "Sheet1",
      "number": 149,
    "question": "Đâu là giải pháp về phát triển thị trường và dịch vụ tại Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB?",
    "options": [
        "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các\ngiải pháp tài chính riêng biệt, chú trọng phân khúc khách hàng bán buôn lớn",
        "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các\ngiải pháp tài chính toàn diện, chú trọng phân khúc khách hàng bán buôn lớn",
      "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các giải pháp tài chính riêng biệt, chú trọng phân khúc khách hàng FDI",
        "149"
    ],
      "answer_letter": "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các giải pháp tài chính riêng biệt, chú trọng phân khúc khách hàng FDI",
      "answer_explanation": "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các\ngiải pháp tài chính riêng biệt, chú trọng phân khúc khách hàng bán buôn lớn"
  },
  {
      "source": "Sheet1",
      "number": 150,
    "question": "Đơn vị nào có trách nhiệm chủ trì báo cáo tình hình, kết quả thực hiện Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB?",
    "options": [
      "Ban Thường vụ Đảng ủy VCB",
      "Ban chấp hành Đảng bộ VCB",
      "Ban Tuyên giáo Đảng ủy VCB",
        "150"
    ],
      "answer_letter": "Ban Tuyên giáo Đảng ủy VCB",
      "answer_explanation": "Ban Thường vụ Đảng ủy VCB"
  }
];

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus[]>([]);

  // Local storage functions
  const saveToLocalStorage = () => {
    const quizState = {
      questions,
      currentQuestionIndex,
      selectedAnswer,
      showResult,
      score,
      answeredQuestions,
      quizCompleted,
      questionStatus,
      timestamp: Date.now()
    };
    localStorage.setItem('quizProgress', JSON.stringify(quizState));
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('quizProgress');
      if (saved) {
        const state = JSON.parse(saved);
        // Check if saved data is not too old (24 hours)
        if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
          setQuestions(state.questions || []);
          setCurrentQuestionIndex(state.currentQuestionIndex || 0);
          setSelectedAnswer(state.selectedAnswer || '');
          setShowResult(state.showResult || false);
          setScore(state.score || 0);
          setAnsweredQuestions(state.answeredQuestions || []);
          setQuizCompleted(state.quizCompleted || false);
          setQuestionStatus(state.questionStatus || []);
          return true;
        }
      }
    } catch (error) {
      console.log('Error loading saved quiz:', error);
    }
    return false;
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('quizProgress');
  };

  // Initialize quiz on component mount
  useEffect(() => {
    const hasLoadedData = loadFromLocalStorage();
    if (!hasLoadedData) {
    shuffleQuestions();
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    if (questions.length > 0) {
      saveToLocalStorage();
    }
  }, [questions, currentQuestionIndex, selectedAnswer, showResult, score, answeredQuestions, quizCompleted, questionStatus]);

  const shuffleQuestions = () => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
    setQuestionStatus(new Array(shuffled.length).fill(null).map(() => ({ answered: false })));
    clearLocalStorage();
  };

  const handleAnswerSelect = (_option: string, index: number) => {
    const questionAlreadyAnswered = questionStatus[currentQuestionIndex]?.answered;
    if (!showResult && !questionAlreadyAnswered) {
      setSelectedAnswer(String.fromCharCode(65 + index)); // Convert to A, B, C, D
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    // Convert selectedAnswer letter to option text for comparison
    const selectedOptionIndex = selectedAnswer.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
    const selectedOptionText = currentQuestion.options[selectedOptionIndex];
    const isCorrect = selectedOptionText === currentQuestion.answer_letter;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Mark this question as answered with correct/incorrect status
    const newQuestionStatus = [...questionStatus];
    newQuestionStatus[currentQuestionIndex] = {
      answered: true,
      isCorrect,
      selectedAnswer
    };
    setQuestionStatus(newQuestionStatus);

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.answer_letter,
        isCorrect,
        options: currentQuestion.options
      }
    ]);

    setShowResult(true);
  };



  const resetQuiz = () => {
    shuffleQuestions();
  };

  // Navigate to specific question
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    
    // If this question was already answered, show the previous answer and result
    const questionAlreadyAnswered = questionStatus[index]?.answered;
    if (questionAlreadyAnswered) {
      setSelectedAnswer(questionStatus[index]?.selectedAnswer || '');
      setShowResult(true);
    } else {
      setSelectedAnswer('');
      setShowResult(false);
    }
    
    setShowQuestionList(false);
  };

  // Toggle question list visibility
  const toggleQuestionList = () => {
    setShowQuestionList(!showQuestionList);
  };

  // Navigation functions
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      
      // Check if the destination question was already answered
      const questionAlreadyAnswered = questionStatus[newIndex]?.answered;
      if (questionAlreadyAnswered) {
        setSelectedAnswer(questionStatus[newIndex]?.selectedAnswer || '');
        setShowResult(true);
      } else {
        setSelectedAnswer('');
        setShowResult(false);
      }
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      
      // Check if the destination question was already answered
      const questionAlreadyAnswered = questionStatus[newIndex]?.answered;
      if (questionAlreadyAnswered) {
        setSelectedAnswer(questionStatus[newIndex]?.selectedAnswer || '');
        setShowResult(true);
      } else {
      setSelectedAnswer('');
      setShowResult(false);
      }
    } else {
      setQuizCompleted(true);
    }
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (questions.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <Award className="mx-auto mb-4 text-6xl text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
          <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length} ({percentage}%)
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Review Your Answers</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {answeredQuestions.map((answer, index) => (
              <div key={index} className="border-l-4 border-gray-300 pl-4">
                <p className="font-medium text-gray-700 mb-2">
                  Question {index + 1}: {answer.question.substring(0, 100)}...
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`flex items-center gap-1 ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {answer.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    Your answer: {answer.selectedAnswer}
                  </span>
                  {!answer.isCorrect && (
                    <span className="text-green-600">
                      Correct: {answer.correctAnswer}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Employee Training Quiz
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleQuestionList}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <List className="w-4 h-4" />
              Questions
            </button>
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          <button
            onClick={shuffleQuestions}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}</span>
        </div>
      </div>

      {/* Question List Overlay */}
      {showQuestionList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={toggleQuestionList}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Question Navigation</h3>
              <button
                onClick={toggleQuestionList}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-80">
              <div className="grid grid-cols-1 gap-2">
                {questions.map((question, index) => {
                  const status = questionStatus[index] || { answered: false };
                  const isCurrent = currentQuestionIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`p-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-50'
                          : status.answered && status.isCorrect
                          ? 'border-green-200 bg-green-50 hover:bg-green-100'
                          : status.answered && !status.isCorrect
                          ? 'border-red-200 bg-red-50 hover:bg-red-100'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {status.answered && status.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : status.answered && !status.isCorrect ? (
                          <XCircle className="w-5 h-5 text-red-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm text-gray-800">
                          Question {index + 1}
                          {isCurrent && <span className=" text-blue-600"> (Current)</span>}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {question.question.substring(0, 80)}...
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="text-xs text-blue-600 mb-2 uppercase tracking-wide">
          {currentQuestion.source}
        </div>
        <h2 className="text-lg font-medium text-gray-800 leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option: string, index: number) => {
          const optionLetter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswer === optionLetter;
          const isCorrect = option === currentQuestion.answer_letter; // Compare option text with answer text
          const questionAlreadyAnswered = questionStatus[currentQuestionIndex]?.answered;
          
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
          
          if (showResult || questionAlreadyAnswered) {
            // Show result state - readonly with color coding
            if (isCorrect) {
              // ALWAYS highlight the correct answer in green
              buttonClass += "border-green-500 bg-green-50 text-green-800";
            } else if (isSelected) {
              // Show user's selected answer (if wrong, will be red)
              buttonClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              // Other unselected options remain neutral
              buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
            }
            buttonClass += " cursor-default"; // Make it clear it's not clickable
          } else {
            // Interactive state - can be clicked
            if (isSelected) {
              buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
            } else {
              buttonClass += "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 cursor-pointer";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option, index)}
              disabled={showResult || questionAlreadyAnswered}
              className={buttonClass}
            >
              <div className="flex items-start gap-3">
                <span className="font-bold text-sm mt-1 min-w-[24px]">
                  {optionLetter}.
                </span>
                <span className="flex-1">{option}</span>
                {(showResult || questionAlreadyAnswered) && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                )}
                {(showResult || questionAlreadyAnswered) && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 mt-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          {(showResult || questionStatus[currentQuestionIndex]?.answered) ? (
            (() => {
              const selectedOptionIndex = selectedAnswer.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
              const selectedOptionText = currentQuestion.options[selectedOptionIndex];
              return selectedOptionText === currentQuestion.answer_letter;
            })() ? (
              <div className="text-green-600 font-medium">
                ✓ Correct!
              </div>
            ) : (
              <div className="text-red-600 font-medium">
                ✗ Incorrect
              </div>
            )
          ) : (
            "Select an answer above"
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          {/* Submit Answer Button (only show if not submitted yet) */}
          {!showResult && !questionStatus[currentQuestionIndex]?.answered && (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answer
            </button>
          )}

          {/* Next Button */}
            <button
            onClick={goToNext}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next →'}
            </button>
        </div>
      </div>
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <QuizApp />
  </React.StrictMode>
);

export default QuizApp;
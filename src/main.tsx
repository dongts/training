import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Shuffle, RotateCcw, CheckCircle, XCircle, Award, BookOpen } from 'lucide-react';

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

const QuizApp = () => {
  // Quiz data from the JSON
  const quizData = [
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 1,
    "question": "Khi thẩm tra lý lịch người vào Đảng có cha, mẹ đẻ, anh, chị, em ruột đang là đảng viên đã khai đầy đủ, rõ ràng theo quy định thì phương pháp thẩm tra nào được áp dụng trong các phương án sau",
    "options": [
      "Không phải đi thẩm tra, xác minh về các đối tượng trên",
      "Vẫn phải đi thẩm tra, xác minh và phải có xác nhận của cấp uỷ nơi đến thẩm tra vào lý lịch của người xin vào Đảng về các đối tượng trên",
      "Cần đến cơ quan, đơn vị  nơi quản lý hồ sơ đảng viên và nơi người thân đang sinh hoạt đảng để đối khớp với lý lịch của người thân",
      "Chỉ cần đi thẩm tra, xác minh, không cần có xác nhận của cấp ủy nơi đến thẩm tra vào lý lịch của người xin vào Đảng về các đối tượng trên"
    ],
    "answer_letter": "C",
    "answer_explanation": "Căn cứ Điểm 3 (3.4 c) Phương pháp thẩm tra theo Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TW Đảng hướng dẫn một số vấn đề cụ thể thi hành Điều lệ Đảng: Nếu người vào đảng có một trong các trường hợp sau đây đang là đảng viên: Cha, mẹ đẻ, anh, chị, em ruột, con đẻ và trong lý lịch người vào đảng đã khai đầy đủ, rõ ràng, trung thực theo quy định, thì không phải thẩm tra, xác minh"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 2,
    "question": "Trong Chi bộ đồng chí X là đảng viên chính thức được 6 tháng, đồng chí cùng công tác với quần chúng ưu tú Y được 02 năm và là người được chi bộ phân công giúp đỡ quần chúng Y vào Đảng. Theo đồng chí, đồng chí X đã đủ điều kiện để giới thiệu quần chúng Y vào Đảng hay chưa ?",
    "options": [
      "Có đủ điều kiện.",
      "Chưa đủ điều kiện.",
      "Khi đồng chí X là đảng viên chính thức được 1 năm thì đủ điều kiện để giới thiệu",
      "Cả 3 đáp án trên đều sai"
    ],
    "answer_letter": "A",
    "answer_explanation": "Căn cứ Điều 4, khoản 2 Điều lệ Đảng, Người giới thiệu vào Đảng phải là đảng viên chính thức và cùng công tác với người vào Đảng ít nhất một năm, ở đây, đồng chí X là đảng viên chính thức được 6 tháng, đồng chí cùng công tác với quần chúng ưu tú Y được 2 năm nên đủ điều kiện giới thiệu quần chúng Y vào đảng."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 3,
    "question": "Chi bộ có 22 đảng viên (20 đảng viên chính thức, 2 đảng viên dự bị). Tại hội nghị đảng viên kiểm điểm, đánh giá, xếp loại đảng viên cuối năm của chi bộ có 4 đồng chí vắng mặt đi công tác (trong đó có 3 đảng viên chính thức và 1 đảng viên dự bị), còn 18 đồng chí tham dự hội nghị. Khi biểu quyết phân loại chất lượng đảng viên và tính tỷ lệ biểu quyết thì có 4 loại ý kiến dưới đây, theo đồng chí ý kiến nào là đúng?",
    "options": [
      "Tỷ lệ biểu quyết tán thành tính trên tổng số đảng viên chính thức của chi bộ (20 đồng chí)",
      "Tỷ lệ biểu quyết tán thành tính trên tổng số đảng viên chính thức có mặt tại hội nghị (17 đồng chí)",
      "Tỉ lệ biểu quyết tán thành tính trên tổng số đảng viên của chi bộ",
      "Tỉ lệ biểu quyết tán thành tính trên số đảng viên có mặt tại hội nghị"
    ],
    "answer_letter": "A",
    "answer_explanation": "Qui định thi hành Điều lệ Đảng số 294-QĐ/TW ngày 26/5/2025 của BCHTW ở điểm 9.3.2, Điều 9 đã ghi: “ Số thành viên của đại hội đảng viên, hội nghị đảng viên là tổng số đảng viên chính thức trong đảng bộ, chi bộ được triệu tập (trừ số đảng viên đã được giới thiệu sinh hoạt tạm thời ở đảng bộ khác và đảng viên đã được miễn công tác và sinh hoạt đảng không có mặt ở hội nghị (nếu đảng viên đó có mặt ở hội nghị đảng viên, tham gia biểu quyết thì vẫn tính). Căn cứ qui định trên, 03 đảng viên chính thức của chi bộ không thuộc diện được miễn công tác và sinh hoạt đảng khi vắng mặt không tham dự đại hội vẫn được tính vào tổng số đảng viên của chi bộ để tính kết quả bầu cử"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 4,
    "question": "Khi bàn về quy trình kết nạp Đảng tại một chi bộ có các loại ý kiến sau, theo đồng chí ý kiến nào là đúng",
    "options": [
      "Người vào Đảng phải viết đơn tự nguyện xin vào Đảng trước khi khai lý lịch",
      "Sau khi khai lý lịch, người vào đảng viết đơn tự nguyện xin vào Đảng và gửi chi bộ",
      "Sau khi khai lý lịch, chi bộ tiến hành thẩm tra xong người xin vào Đảng mới viết đơn tự nguyện xin vào Đảng",
      "Không có đáp án nào đúng"
    ],
    "answer_letter": "A",
    "answer_explanation": "Căn cứ Điều 4 Điều lệ Đảng, Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ- mục 3- Thủ tục kết nạp đảng viên. Người vào đảng phải có đơn tự nguyện xin vào Đảng và trình bày rõ những nhận thức của mình về mục đích, lý tưởng của đảng, về động cơ xin vào đảng, sau đó mới khai lý lịch để chi bộ đi thẩm tra, xác minh"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 5,
    "question": "Đảng viên dự bị X đã hoàn thành đủ 12 tháng dự bị, chi bộ đã họp để làm các thủ tục xét đề nghị chuyển đảng chính thức nhưng chưa được cấp có thẩm quyền ra quyết định công nhận đảng viên chính thức. Trong kỳ  đại hội chi bộ nhiệm kỳ 2025 - 2027, theo đ/c ĐV X có được đại biểu đại hội  giới thiệu ứng cử chi uỷ chi bộ không?",
    "options": [
      "Được, vì đảng viên đã hoàn thành 12 tháng dự bị",
      "Không được, vì cấp có thẩm quyền chưa ra quyết định chuyển đảng chính thức",
      "Được, vì đảng viên đã được chi bộ bỏ phiếu đề nghị công nhận đảng viên chính thức",
      "Cả ba đáp án đều sai"
    ],
    "answer_letter": "B",
    "answer_explanation": "Căn cứ Điều 3, khoản 4 Điều lệ Đảng, Đảng viên dự bị có các quyền ….., trừ quyền biểu quyết, ứng cử và bầu cử cơ quan lãnh đạo của Đảng."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 6,
    "question": "Đồng chí X được cấp uỷ có thẩm quyền ký Quyết định Kết nạp đảng viên ngày 25/8/2024; chi bộ tổ chức kết nạp đảng cho đồng chí X ngày 15/9/2024. Trong chi bộ có các ý kiến khác nhau khi tính tuổi Đảng cho đồng chí X",
    "options": [
      "Tuổi đảng của đồng chí X được tính từ ngày ghi trong Quyết định Kết nạp đảng viên (ngày 25/8/2024)",
      "Tuổi đảng của đồng chí X được tính từ ngày chi bộ tổ chức lễ kết nạp Đảng cho đồng chí X (ngày 15/9/2024)",
      "Tuổi đảng của đồng chí X được tính từ ngày nhận quyết định",
      "Cả 3 đáp án trên đều sai"
    ],
    "answer_letter": "A",
    "answer_explanation": "Căn cứ Điều 5, khoản 4 Điều lệ Đảng, Đảng viên đã được công nhận chính thức thì tuổi đảng của đảng viên tính từ ngày ghi trong quyết định kết nạp. Ở đây, quyết định kết nạp đảng của đồng chí X là ngày 25/8/2024 nên tuổi đảng được tính từ ngày này BỘ CÂU HỎI NGHIỆP VỤ CÔNG TÁC ĐẢNG Phương án Giải thích đáp án Đáp án TT Câu hỏi"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 7,
    "question": "Giấy chứng nhận học lớp bồi dưỡng nhận thức về Đảng của quần chúng ưu tú có giá trị sử dụng trong thơi gian bao lâu?",
    "options": [
      "36 tháng",
      "60 tháng",
      "24 tháng",
      "12 tháng"
    ],
    "answer_letter": "B",
    "answer_explanation": "Căn cứ Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ. Điểm (5.4) quy định thời hạn sử dụng văn bản trong hồ sơ xét kết nạp người vào Đảng. Giấy chứng nhận đã học lớp bồi dưỡng nhận thức về đảng có giá trị trong 60 tháng, quá 60 tháng thì chi bộ phải giới thiệu người vào đảng học lại để được cấp giấy chứng nhận mới trước khi xem xét kết nạp. Trường hợp này, giấy chứng nhận đã học lớp bồi dưỡng nhận thức về đảng của quần chúng X ngày 15/1/2020 thì đến ngày 15/1/2025 là hết hạn, ngày 3/2/2025 chi bộ họp xét và ra nghị quyết đề nghị đảng ủy cấp trên xem xét kết nạp là sai"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 8,
    "question": "Đảng viên X là ủy viên Ban Chấp hành Đảng bộ cơ sở sinh hoạt tại chi bộ. Vừa qua, Đảng ủy giao cho đảng viên X thực hiện một số nhiệm vụ của cấp uỷ nhưng đồng chí không hoàn thành. Chi bộ trực thuộc nơi đảng viên X sinh hoạt  xem xét  kỷ luật đồng chí X với hình thức Khiển trách.  Trong chi bộ có các loại ý kiến sau, theo đồng chí ý kiến nào là đúng?",
    "options": [
      "Chi bộ phải kỷ luật đồng chí X với hình thức cảnh cáo mới đúng",
      "Chi bộ đủ thẩm quyền kỷ luật đồng chí X.",
      "Chi  bộ xem xét kỷ luật đồng chí X là đúng nhưng hình thức kỷ luật cần xem xét lại",
      "Chi bộ không đủ thẩm quyền để kỷ luật đ/c X khi vi phạm nhiệm vụ cấp trên giao"
    ],
    "answer_letter": "C",
    "answer_explanation": "Căn cứ Mục 1.4 Khoản 1 Điều 10 - Quy định 296-QĐ/TW, ngày 30/5/2025 của BCH TW Đảng, Thẩm quyền thi hành kỷ luật đối với cấp ủy viên các cấp sinh hoạt tại chi bộ, từ cấp ủy viên đảng ủy cơ sở trở lên và cán bộ thuộc diện cấp ủy cấp trên quản lý, nếu vi phạm khi thực hiện nhiệm vụ do cấp trên giao mà phải áp dụng hình thức kỷ luật thì chi bộ đề nghị cấp có thẩm quyền xem xét, quyết định."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 9,
    "question": "Chi bộ chuẩn bị cho thẩm tra xác minh lý lịch quần chúng X để làm thủ tục kết nạp Đảng.",
    "options": [
      "Trong chi bộ có các loại ý kiến sau, theo đồng chí ý kiến nào là đúng?",
      "Chi uỷ chi bộ họp và ghi nhận xét, kết luận vào lý lịch của quần chúng X ngay khi quần chúng X khai xong lý lịch",
      "Để đảm bảo thủ tục, trước khi cử người đi xác minh lý lịch, chi uỷ chi bộ phải ghi nhận xét, kết luận vào lý lịch.",
      "Chi uỷ chi bộ nhận xét, kết luận vào lý lịch của quần chúng X sau khi có kết quả thẩm tra theo quy định Các ý kiến trên đều sai"
    ],
    "answer_letter": "C",
    "answer_explanation": "Theo Hướng dẫn 06 – mục 3.4, điểm d: trách nhiệm của chi bộ và cấp ủy cơ sở nơi có người vào Đảng là kiểm tra, đóng dấu giáp lai vào các trang trong lý lịch của người vào đảng (chi ủy chưa nhận xét và cấp ủy cơ sở chưa chứng nhận, ký tên, đóng dấu vào lý lịch), rồi gửi công văn đề nghị thẩm tra và lý lịch người xin vào đảng đến cấp ủy cơ sở hoặc cấp ủy cấp trên trực tiếp của tổ chức cơ sở đảng (nơi không có cấp ủy cơ sỏ) hoặc cơ quan có trách nhiệm để thẩm tra; trường hợp cần thiết thì chi bộ cử đảng viên đi thẩm tra. Đảng viên đi thẩm tra có trách nhiệm báo cáo cấp ủy những nội dung được giao bằng văn bản và chịu trách nhiệm trước đảng về nội dung đó. Chi bộ, cấp ủy cơ sở tổng hợp kết quả thẩm tra, ghi nội dung chứng nhận, ký tên, đóng dấu vào lý lịch của người vào đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 10,
    "question": "Cấp ủy từ cấp tổ chức Đảng nào thì được bầu UBKT của Đảng.",
    "options": [
      "Theo Quy định thi hành Điều lệ Đảng thì từ cấp Đảng uỷ cơ sở trở lên mới được bầu UBKT",
      "Chi bộ cơ sở, đảng uỷ bộ phận đều có thể thành lập UBKT để thực hiện các nhiệm vụ công tác kiểm tra, giám sát ở cơ sở, thực hiện chức năng lãnh đạo của Đảng.",
      "Chi bộ trực thuộc cũng được thành lập UBKT để thực hiện công tác kiểm tra, giám sát tại chi bộ",
      "Đảng ủy cấp trên cơ sở mới được thành lập UBKT"
    ],
    "answer_letter": "A",
    "answer_explanation": "Căn cứ Điều 7, Quy định 296-QĐ/TW, ngày 30/5/2025 của BCH TW Đảng: Ủy ban kiểm tra được lập từ đảng ủy cơ sở trở lên, do cấp ủy cùng cấp bầu, bầu Ủy viên UBKT trước, sau đó bầu Chủ nhiệm UBKT trong số ủy viên UBKT. Phó CN UBKT do UBKT bầu trong số UV UBKT. Việc bầu cử được thực hiện theo quy chế bầu cử trong Đảng. Trường hợp tổ chức đảng thành lập mới, do chia tách, sáp nhập, thực hiện công tác luân chuyển cán bộ ngành kiểm tra đảng thì BTV cấp ủy cấp trên trực tiếp chỉ định Ủy viên UBKT, Chủ nhiệm, Phó chủ nhiệm."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 11,
    "question": "Một đảng viên là cán bộ tín dụng cho vay ưu đãi sai đối tượng, đã vi phạm chức trách nhiệm vụ được giao, đã xử lý kỷ luật chuyên môn. Khi họp xét thi hành kỷ luật đảng viên, trong chi bộ có các ý kiến sau, theo đồng chí ý kiến nào là đúng?",
    "options": [
      "Khiển trách",
      "Cảnh cáo",
      "Khai trừ khỏi đảng",
      "Không bị kỷ luật đảng"
    ],
    "answer_letter": "B",
    "answer_explanation": "Căn cứ Điều 41; khoản 2 của Quy định số 69-QĐ/TW ngày 6/7/2022 của BCT quy định xử lý kỷ luật đảng viên vi phạm), kỷ luật bằng hình thức cảnh cáo đối với đảng viên vi phạm: cho vay ưu đãi sai đối tượng, vi phạm quy định mức vốn cho vay ưu đãi, phát hiện bên vay vốn sử dụng vốn vay sai mục đích nhưng không chấm dứt việc cho vay hoặc không thực hiện các biện pháp thu hồi số tiền đã cho vay."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 12,
    "question": "Chi bộ có 4 đảng viên (03 đảng viên chính thức, 01 đảng viên dự bị). Sau đó một đảng viên chính thức chuyển đi đơn vị khác; nay chi bộ còn 02 đảng viên chính thức và 01 đảng viên dự bị. Đến thời kỳ làm thủ tục chuyển đảng chính thức cho đảng viên dự bị. Có các ý kiến sau, đồng chí cho biết ý kiến nào là đúng",
    "options": [
      "Không họp chi bộ được vì không đủ 3 đảng viên chính thức trở lên.",
      "Vẫn họp bình thường để chuyển đảng chính thức cho đảng viên dự bị",
      "Chờ khi nào chi bộ đủ 3 đảng viên chính thức trở lên mới họp để chuyển đảng chính thức cho đảng viên dự bị",
      "Tất cả đáp án trên đều sai"
    ],
    "answer_letter": "A",
    "answer_explanation": "Căn cứ Điều 24, điểm 1. Điều lệ Đảng khoá XI: “Mỗi chi bộ ít nhất phải có ba đảng viên chính thức…”. Như vậy, khi chi bộ chỉ còn hai đảng viên chính thức, cấp uỷ cấp trên phải điều động ngay đảng viên về hoặc sáp nhập số đảng viên còn lại vào chi bộ khác để đảm bảo đúng quy định của Điều lệ Đảng và chi bộ mới có đủ điều kiện thực hiện các nguyên tắc hoạt động của tổ chức đảng;"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 13,
    "question": "Theo quy định của BCHTW Đảng, kể từ ngày nhận được quyết định kết nạp đảng viên của cấp uỷ có thẩm quyền, chậm nhất bao nhiêu ngày làm việc thì chi bộ phải tổ chức lễ kết nạp cho đảng viên:",
    "options": [
      "30 ngày",
      "30 ngày làm việc",
      "60 ngày",
      "60 ngày làm việc"
    ],
    "answer_letter": "B",
    "answer_explanation": "Căn cứ Điểm 4. Điều 5 - Quy định số 294-QĐ/TW ngày 26/5/2025 của BCHTW Đảng quy định thi hành Điều lệ Đảng). Trong thời hạn 30 ngày làm việc kể từ ngày nhận được quyết định kết nạp đảng viên của cấp ủy có thẩm quyền, chi bộ phải tổ chức lễ kết nạp cho đảng viên."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 14,
    "question": "Chi bộ X có nghị quyết đề nghị đảng ủy cơ sở xem xét kết nạp hai đảng viên mới là nữ: Một người 55 tuổi và một người 58 tuổi. Trong chi bộ có các ý kiến sau, theo đồng chí ý kiến nào là đúng? 2 người trên đã quá tuổi kết nạp vào đảng",
    "options": [
      "Phải xin ý kiến của đảng uỷ cấp trên vì trường hợp này do Trung ương xem xét, quyết định",
      "Việc xem xét kết nạp vào Đảng cho 2 quần chúng trên vẫn đúng với quy định của Điều lệ",
      "Đảng",
      "Chỉ kết nạp được người 55 tuổi vì người kia đã quá tuổi"
    ],
    "answer_letter": "C",
    "answer_explanation": "Theo Điều 1 Quy định số 294-QĐ/TW ngày 26/5/2025 của BCHTW Đảng quy định thi hành Điều lệ Đảng quy định, tại thời điểm chi bộ xét kết nạp, người vào đảng phải đủ 18 tuổi đến đủ 60 tuổi (tính theo tháng), việc kết nạp những người trên 60 tuổi do cấp ủy trực thuộc trung ương xem xét quyết định; chi bộ xem xét kết nạp 1 trường hợp 55 tuổi và 1 trường hợp 58 tuổi là được, vẫn đúng với quy định của Điều lệ đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 15,
    "question": "Theo quy định hiện hành, quần chúng A là cảm tình đảng, phấn đấu tốt, phẩm chất đạo đức tốt, đủ tiêu chuẩn vào Đảng, nhưng có bố đẻ trước đây là đảng viên, nay tự ý bỏ sinh hoạt đảng, như vậy quần chúng A có được xét kết nạp vào Đảng không?",
    "options": [
      "Không được kết nạp vào đảng",
      "Có được kết nạp vào đảng",
      "Không được đề nghị xem xét kết nạp",
      "Tất cả đáp án trên đều sai"
    ],
    "answer_letter": "B",
    "answer_explanation": "Căn cứ Điều 10, Chương III. Quy định số 58-QĐ/TW ngày 8/2/2022 của Bộ Chính trị “Một số vấn đề về bảo vệ chính trị nội bộ Đảng” việc xem xét, kết nạp những người có vấn đề chính trị vào đảng không quy định quần chúng cảm tình đảng có bố (mẹ) trước kia là đảng viên, nay tự ý bỏ sinh hoạt đảng là không được kết nạp vào Đảng. Như vậy, việc bố đẻ tự bỏ sinh hoạt Đảng, không ảnh hưởng đến vấn đề chính trị của người vào Đảng. Nếu người vào Đảng đã được chi bộ bồi dưỡng, giáo dục, có ý thức phấn đấu, rèn luyện, giác ngộ lý tưởng cách mạng của Đảng, được quần chúng tín nhiệm, đủ tiêu chuẩn và điều kiện quy định tại Điều 1, Điều lệ Đảng thì chi bộ xem xét, ra nghị quyết đề nghị cấp ủy có thẩm quyền quyết định kết nạp quần chúng đó vào Đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 16,
    "question": "Dảng viên X không lưu giữ đủ hồ sơ tín dụng theo quy định của pháp luật (trong ngành tài chính, ngân hàng) và gây hậu quả ít nghiêm trọng, đã xử lý kỷ luật chuyên môn. Chi bộ họp để xét hình thức kỷ luật đối với đảng viên X",
    "options": [
      "Khiển trách",
      "Cảnh cáo",
      "Khai trừ khỏi đảng",
      "Tất cả đáp án trên đều sai"
    ],
    "answer_letter": "A",
    "answer_explanation": "Căn cứ Điều 41.1.d, Quy định số 69-QĐ/TW ngày 6/7/2022 của BCH TƯ quy định xử lý kỷ luật đảng viên vi phạm: Không lưu giữ đủ hồ sơ tín dụng, cho gia hạn nợ quá thời gian hoặc quá số lần theo quy định; không thực hiện đầy đủ hoặc không đúng các điều kiện cho vay gây hậu quả ít nghiêm trọng thì kỷ luật bằng hình thức khiển trách."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 17,
    "question": "Theo quy định hiện hành của đảng, đối với đảng ủy cơ sở được ủy quyền thực hiện nhiệm vụ cấp trên cơ sở, quyết định kết nạp đảng viên có giá trị khi nào?",
    "options": [
      "100% ý kiến đồng ý",
      "Có 1/3 ý kiến đồng ý trở lên",
      "Có 1/2 ý kiến đồng ý trở lên",
      "Có 2/3 ý kiến đồng ý trở lên"
    ],
    "answer_letter": "D",
    "answer_explanation": "Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ, điểm 3.7.a … Đối với đảng ủy cơ sở được ủy quyền quyết dịnh kết nạp đảng viên thì phải được ít nhất 2/3 tổng số cấp ủy viên đồng ý mới được ra quyết định kết nạp đảng viên"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 18,
    "question": "Theo quy định hiện hành, trong khi làm việc với đoàn kiểm tra của Đảng ủy cấp trên, đảng viên",
    "options": [
      "X là đối tượng kiểm tra đã dùng máy ghi âm để ghi âm nội dung buổi làm việc.  Ý kiến nào sau đây là đúng?",
      "Đoàn kiểm tra cho phép đảng viên X được ghi âm nội dung buổi làm việc",
      "Đoàn kiểm tra yêu cầu đảng viên X không được sử dụng các phương tiện ghi âm trong khi làm việc với đoàn",
      "Đoàn kiểm tra không có ý kiến Chỉ cho phép ghi âm khi đối tượng kiểm tra trình bày ý kiên"
    ],
    "answer_letter": "B",
    "answer_explanation": "Điều 3, khoản 6, Quy định 22-QĐ/TW và QĐ 262-QĐ/TW ngày 3/2/2025 quy định về quyền và trách nhiệm của đối tượng kiểm tra, giám sát: ...Chấp hành nghiêm Điều lệ đảng, các quy định của đảng về KTGS, các quyết định, kết luận, yêu cầu của chủ thể kiểm tra, giám sát; báo cáo, giải trình đầy đủ, trung thực về các nội dung được yêu cầu; Không để lộ nội dung KTGS cho tổ chức, cá nhân không có trách nhiệm biết; không được sử dụng thiết bị ghi âm, ghi hình, thu phát sóng khi làm việc với chủ thể KTGS."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 19,
    "question": "Theo quy định hiện hành cùa đảng, kể từ ngày đảng viên hết 12 tháng dự bị thì thời hạn chi bộ phải xét và đề nghị công nhận chính thức cho đảng viên là khi nào?",
    "options": [
      "30 ngày",
      "30 ngày làm việc",
      "45 ngày",
      "45 ngày làm việc"
    ],
    "answer_letter": "B",
    "answer_explanation": "Điểm 4.2, Điều 4 Quy định 294-QĐ/TW ngày 26/5/2025 của BCH TW: Trong thời hạn 30 ngày làm việc, kể từ ngày đảng viên hết 12 tháng dự bị, chi bộ phải xét và đề nghị công nhận chính thức cho đảng viên; nếu không đủ điều kiện công nhận là đảng viên chính thức thì đề nghị lên cấp ủy có thầm quyền quyết định xóa tên."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 20,
    "question": "Theo Quy định của đảng, sinh hoạt định kỳ của chi bộ trực thuộc được quy định như thế nào?",
    "options": [
      "Họp thường lệ 1 tháng 2 lần",
      "Họp thường lệ 1 quý 1 lần",
      "Họp thường lệ 1 tháng 1 lần",
      "Họp thường lệ 1 năm 2 lần"
    ],
    "answer_letter": "C",
    "answer_explanation": "Điểm 2, Điều 24 Điều lệ Đảng: … Chi bộ, chi ủy họp thường lệ mỗi tháng 1 lần"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 21,
    "question": "Theo quy định hiện hành của Đảng, cấp ủy viên khi chuyển sinh hoạt đảng tạm thời sang tổ chức đảng khác có còn là cấp ủy viên của cấp ủy nơi sinh hoạt chính thức hay không?",
    "options": [
      "Không còn là cấp ủy viên",
      "Là cấp ủy viên nơi sinh hoạt tạm thời",
      "Vẫn là cấp ủy viên nơi sinh hoạt chính thức",
      "Tất cả đáp án trên đều sai"
    ],
    "answer_letter": "C",
    "answer_explanation": "Mục 6.3.2, Điểm c, Điều 6 Quy định 294-QĐ/TW ngày 26/5/2025 của BCH TW"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 22,
    "question": "Theo quy định 294-QĐ/TW ngày 26/5/2025 của BCH TW về thi hành Điều lệ Đảng, việc thôi tham gia cấp ủy của các đồng chí cấp ủy viên khi có quyết định nghỉ công tác hoặc chuyển công tác khác hoặc thôi việc được quy định như thế nào?",
    "options": [
      "Cấp ủy viên khi có quyết định nghỉ hưu thì thôi tham gia cấp ủy đương nhiệm từ thời điểm nghỉ hưu để hưởng chế độ bảo hiểm XH đã được ghi trong thông báo hoặc quyết định nghỉ hưu",
      "Cấp ủy viên có quyết định thôi làm công tác quản lý hoặc thôi việc thì thôi tham gia cấp ủy đương nhiệm từ thời điểm quyết định thôi làm công tác quản lý hoặc thôi việc có hiệu lực thi hành",
      "Cả 2 phương án trên đều đúng",
      "Cả 2 phương án trên đều sai"
    ],
    "answer_letter": "C",
    "answer_explanation": "Điểm 16.4, Điều 16 Quy định 294-QĐ/TW ngày 26/5/2025 của BCH TW"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 23,
    "question": "Theo quy định hiện hành của Đảng, cấp ủy nhiệm kỳ mới được điều hành công việc khi nào",
    "options": [
      "Ngay sau khi được bầu",
      "Sau khi có quyết định chuẩn y của cấp có thẩm quyền",
      "Sau khi công bố quyết định chuẩn y của cấp có thẩm quyền",
      "Sau khi cấp ủy khóa cũ bàn giao cho cấp ủy khóa mới"
    ],
    "answer_letter": "A",
    "answer_explanation": "Điều 13, điểm 1, Điều lệ Đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 24,
    "question": "Điều lệ đảng gồm có bao nhiêu chương, bao nhiêu điều",
    "options": [
      "11 chương, 46 điều",
      "12 chương, 45 điều",
      "11 chương, 48 điều",
      "12 chương, 48 điều"
    ],
    "answer_letter": "D",
    "answer_explanation": "Điều lệ Đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 25,
    "question": "Không áp dụng thời hiệu xử lý kỷ luật về đảng đối với hành vi nào sau đây",
    "options": [
      "Khiển trách",
      "Cảnh cáo",
      "Cách chức",
      "Khai trừ"
    ],
    "answer_letter": "D",
    "answer_explanation": "Quy định 69-0QĐ/TW, Điều 4, khoản 2,điểm b"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 26,
    "question": "Tổ chức đảng nào không có thẩm quyền kỷ luật đảng viên vi phạm",
    "options": [
      "Chi bộ",
      "Chi ủy",
      "Ủy ban kiểm tra Đảng ủy cơ sở",
      "Ban Thường vụ Đảng ủy cơ sở"
    ],
    "answer_letter": "B",
    "answer_explanation": "Chi ủy không thuộc tổ chức có thẩm quyền thi hành kỷ luật đảng viên được quy định tại Quy định 22-QĐ/TW, Điều 11"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 27,
    "question": "Kỷ luật đảng viên vi phạm của chi bộ có hiệu lực khi nào",
    "options": [
      "Ngay sau khi công bố Quyết định kỷ luật",
      "Ngay sau khi chi bộ công bố kết quả biểu quyết quyết định kỷ luật",
      "Ngay sau khi ban hành Quyết định kỷ luật",
      "Cả 3 đáp án trên đều sai"
    ],
    "answer_letter": "B",
    "answer_explanation": "Quy định 296-QĐ/TW, Điều 15, khoản 2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 28,
    "question": "Đảng viên vi phạm được tổ chức đảng nhiều lần mời đến kiểm điểm nhưng không đến mà không có lý do chính đáng thì tổ chức đảng có xem xét, xử lý không",
    "options": [
      "Không xem xét, xử lý",
      "Vẫn tiếp tục xem xét, xử lý theo thẩm quyền",
      "Dừng cuộc kiểm tra chờ xin ý kiến chỉ đạo của cấp trên",
      "Phải tìm được đảng viên đó để hỏi rõ lý do không đến kiểm điểm"
    ],
    "answer_letter": "B",
    "answer_explanation": "Quy định 296-QĐ/TW, điều 12, khoản 2, điểm 2.1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 29,
    "question": "Những nội dung nào sau đây thuộc nội dung chi bộ kiểm tra đảng viên",
    "options": [
      "Việc thực hiện nhiệm vụ đảng viên",
      "Việc thực hiện Nghị quyết của chi  bộ, Việc thực hiện nhiệm vụ do chi bộ phân công",
      "Quy định về trách nhiệm nêu gương, về những điều đảng viên không được làm",
      "Tất cả đáp án trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "Quy định 296-QĐ/TW, ngày 30/5/2025, Điều 6, khoản 1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 30,
    "question": "Nội dung nào sau đây được coi là không vi phạm những điều đảng viên không được làm Phát ngôn có nội dung trái với nghị quyết, chỉ thị, quy định, quyết định, quy chế, kết luận của Đảng và pháp luật của Nhà nước",
    "options": [
      "Phát biểu, nêu ý kiến khác nhau trong các cuộc hội thảo khoa học, hội nghị được cơ quan có thẩm quyền tổ chức",
      "Báo cáo, lập hồ sơ, kê khai lý lịch, kê khai tài sản, thu nhập không trung thực",
      "Đăng những thông tin thuộc danh mục bí mật của Đảng và",
      "Nhà nước do cơ quan, tổ chức có thẩm quyền ban hành."
    ],
    "answer_letter": "B",
    "answer_explanation": "Quy định 37-QĐ/TW ngày 25/10/2021 quy định về những điều đảng viên không được làm"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 31,
    "question": "Trong thời hạn bao nhiêu ngày làm việc kể từ ngày đảng viên nhận được quyết định kỷ luật, đảng viên có quyền khiếu nại với cấp ủy cấp trên cho đến Ban Chấp hành TW",
    "options": [
      "Trong thời hạn 30 ngày",
      "Trong thời hạn 30 ngày làm việc",
      "Trong thời hạn 60 ngày",
      "Trong thời hạn 60 ngày làm việc"
    ],
    "answer_letter": "A",
    "answer_explanation": "Quy định 296 - QĐ/TW ngày 30/5/2025, Điều 25, khoản 1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 32,
    "question": "Tổ chức nào sau đây không có thẩm quyền kiểm tra khi đảng viên có dấu hiệu vi phạm",
    "options": [
      "Cấp ủy, ban thường vụ cấp ủy",
      "Ủy ban kiểm tra",
      "Chi bộ trực thuộc",
      "Các ban tham mưu, giúp việc của cấp ủy"
    ],
    "answer_letter": "D",
    "answer_explanation": "Quy định 296 - QĐ/TW ngày 30/5/2025, Điều 5, khoản 1.3, điểm đ"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 33,
    "question": "Trước khi họp quyết định kỷ luật đảng viên vi phạm, đại diện tổ chức đảng có thẩm quyền phải thực hiện nội dung nào say đây",
    "options": [
      "Yêu cầu đảng viên nhận khuyết điểm, vi phạm",
      "Trao đổi với người tố cáo để họ tham gia ý kiến",
      "Thông báo dự kiến về hình thức kỷ luật cho đảng viên vi phạm",
      "Gặp, nghe đảng viên vi phạm trình bày ý kiến"
    ],
    "answer_letter": "D",
    "answer_explanation": "Quy định 296-QĐ/TW, điều 12, khoản 1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 34,
    "question": "Theo HD 36-HD/VPTW, ngày 3/4/2018 của",
    "options": [
      "Văn phòng TW Đảng thì số văn bản của cấp ủy, cơ quan, tổ chức đảng các cấp ghi như thế nào là đúng",
      "Ghi theo từng năm Ghi liên tục từ số 01 cho mỗi tên loại văn bản trong từng năm",
      "Ghi liên tục từ số 01 cho mỗi tên loại văn bản trong một nhiệm kỳ cấp ủy",
      "Ghi liên tục cho tất cả các loại văn bản của cấp ủy trong cả nhiệm kỳ"
    ],
    "answer_letter": "C",
    "answer_explanation": "HD 36-HD/VPTW ngày 3/4/2018 Mục 1, điều 1.3, khoản 1.3.1, mục a"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 35,
    "question": "Đảng viên bị đình chỉ sinh hoạt đảng có phải nộp đảng phí không",
    "options": [
      "Không đóng đảng phí",
      "Chờ hết bị đình chỉ thì đóng đảng phí",
      "Có đóng đảng phí",
      "Có đóng đảng phí theo mức quy định riêng"
    ],
    "answer_letter": "C",
    "answer_explanation": "Điều lệ Đảng, Điều 2, khoản 4, Đảng viên có nhiệm vụ sinh hoạt đảng và đóng đảng phí đúng quy định. Vì đảng viên bị đình chỉ sinh hoạt đảng vẫn là đảng viên của đảng, phải thực hiện các nhiệm vụ của đảng viên theo quy định của Điều lệ đảng, do đó vẫn phải đóng đảng phí theo quy định"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 36,
    "question": "Trong những văn bản sau đây, văn bản nào Chi bộ cơ sở, chi bộ trực thuộc đảng ủy cơ sở, đảng ủy bộ phận không ban hành",
    "options": [
      "Quy chế",
      "Thông báo",
      "Kết luận",
      "Cả 3 phương án trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "Quy định 66-QĐ/TW ngày 6/2/2017, điều 9, khoản 4, điểm c"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 37,
    "question": "Theo hướng dẫn của Văn phòng Trung ương quy định về chế độ nộp đảng phí, chi bộ trực thuộc đảng ủy cơ sở nộp đảng phí lên cấp trên theo mức nào là đúng",
    "options": [
      "'40%",
      "50%",
      "'60%",
      "70%"
    ],
    "answer_letter": "D",
    "answer_explanation": "Quyết định 342-QĐ/TW, ngày 28/12/2010 của BCH TW, điểm 1,  mục II"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 38,
    "question": "Theo hướng dẫn 36-HD/VPTW, ngày 3/4/2018 của Văn phòng TW Đảng thì số và ký hiệu văn bản được thể hiện như thế nào là đúng?",
    "options": [
      "Số: 01 - BC/CB",
      "Số 01/BC-CB",
      "Số 01-BC/CB",
      "Số: 01/BC-CB"
    ],
    "answer_letter": "C",
    "answer_explanation": "HD 36-HD/VPTW, ngày 3/4/2018 mục 1, điểm 1.3"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 39,
    "question": "Kỹ thuật trình bày tên loại văn bản và trích yếu nội dung văn bản theo Hướng dẫn số 36-",
    "options": [
      "HD/VPTW, ngày 3/4/2018 của văn phòng TW Đảng ?",
      "Tên loại văn bản trình bày 1 dòng riêng, trích yếu nội dung văn bản trình bày dưới tên loại văn bản, phía dưới trích yếu nội dung văn bản có 5 dấu gạch nối (-) ngăn cách với nội dung văn bản",
      "Tên loại văn bản và trích yếu nội dung văn bản trình bày cùng 1 dòng",
      "Tên loại văn bản trình bày 1 dòng riêng, trích yếu nội dung văn bản có đường kẻ ngang Cả ba đáp án đều đúng"
    ],
    "answer_letter": "A",
    "answer_explanation": "HD 36-HD/VPTW, mục 1, điều 1.5, khoản 1.5.2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 40,
    "question": "Theo Hướng dẫn số 36-HD/VPTW, ngày 3/4/2018 của văn phòng TW Đảng về thể thức văn bản của đảng, quy định trong Công văn thì nội dung trích yếu được ghi dưới số và ký hiệu - với cỡ, kiểu chữ nào?",
    "options": [
      "Cỡ chữ 14, kiểu chữ in thường",
      "Cỡ chữ 14, kiểu chữ in thường, nghiêng",
      "Cỡ chữ 12, kiểu chữ in thường",
      "Cỡ chữ 12, kiểu chữ in thường, nghiêng"
    ],
    "answer_letter": "D",
    "answer_explanation": "HD 36-HD/VPTW, mục 1, điều 1.5, khoản 1.5.2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 41,
    "question": "Theo Hướng dẫn số 03-HD/TW ngày 27/12/2022 của Ban Bí thư, Chi bộ được thực hiện thí điểm sinh hoạt đảng theo tổ đảng phải đảm báo điều kiện nào sau đây",
    "options": [
      "Có đông đảng viên.",
      "Có nhiều tổ đảng.",
      "Có thành lập tổ đảng và có từ 50 đảng viên trở lên",
      "Có nhiều tổ đảng và đảng viên sinh sống, hoạt động phân tán."
    ],
    "answer_letter": "C",
    "answer_explanation": "HD 03-HD/TW, Mục II, điểm 1.2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 42,
    "question": "Chi bộ thí điểm sinh hoạt đảng theo tổ đảng thay cho sinh hoạt toàn thể chi bộ được áp dụng bao nhiêu lần trong năm?",
    "options": [
      "Không quá 1 lần trong năm",
      "Không quá 3 lần trong năm",
      "Không quá 6 lần trong năm",
      "Tất cả các lần sinh hoạt thường kỳ"
    ],
    "answer_letter": "B",
    "answer_explanation": "HD 03-HD/TW, Mục II, điểm 2, ý 5"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 43,
    "question": "Theo Quy định số 294-QĐ/TW ngày 26 tháng 5 năm 2025của Ban Chấp hành Trung ương (khoá XIII) quy định thi hành Điều lệ Đảng, việc quản lý hồ sơ đảng viên, được cấp ủy có thẩm quyền giao cho tổ chức hay cá nhân nào?",
    "options": [
      "Ban tổ chức cấp ủy cấp huyện và tương đương",
      "Bí thư chi bộ",
      "Cấp ủy cơ sở",
      "Đảng viên"
    ],
    "answer_letter": "C",
    "answer_explanation": "QĐ 294-QĐ/TW ngày 26/5/2025, Điều 6, mục 6.2, khoản 6.2.1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 44,
    "question": "Theo Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ (khoá XIII) về một số vấn đề cụ thể thi hành Điều lệ Đảng, nghị quyết đề nghị kết nạp đảng viên của chi bộ có giá trị khi?",
    "options": [
      "Có trên một nửa số đảng viên chính thức đồng ý",
      "Có ít nhất 2/3 số đảng viên chính thức đồng ý",
      "Có 3/4 số đảng viên chính thức đồng ý",
      "Có 100% số đảng viên chính thức đồng ý"
    ],
    "answer_letter": "B",
    "answer_explanation": "Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ, mục 3, khoản 3.6, ý b"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 45,
    "question": "Hội nghị lần thứ 6, Ban chấp hành Trung ương Đảng khóa XIII đã ban hành văn bản nào sau đây? Kết luận số 21-KL/TW ngày 25/10/2021 về đẩy mạnh xây dựng, chỉnh đốn Đảng và hệ thống chính trị; kiên quyết ngăn chặn, đẩy lùi, xử lý nghiêm cán bộ, đảng viên suy thoái về tư tưởng chính trị, đạo đức, lối sống, biểu hiện \"tự diễn biến\", \"tự chuyển hoá\"",
    "options": [
      "Nghị quyết số 28-NQ/TW ngày 17/11/2022  về tiếp tục đổi mới phương thức lãnh đạo, cầm quyền của Đảng đối với hệ thống chính trị trong giai đoạn mới.",
      "Quy định số 22-QĐ/TW  ngày 28/07/2021 về công tác kiểm tra, giám sát và thi hành kỷ luật của Đảng",
      "Quy định số 24- QĐ/TW ngày 30/07/2021 về thi hành",
      "Điều lệ Đảng"
    ],
    "answer_letter": "B",
    "answer_explanation": ""
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 46,
    "question": "Nơi có tổ chức Đoàn thanh niên Cộng sản Hồ",
    "options": [
      "Chí Minh, người vào Đảng trong độ tuổi thanh niên phải được bao nhiêu đảng viên chính thức và tổ chức nào giới thiệu Một đảng viên chính thức và",
      "Ban chấp hành đoàn cơ sở giới thiệu Hai đảng viên chính thức và Ban chấp hành đoàn cơ sở giới thiệu",
      "Một đảng viên chính thức, BCH đoàn cơ sở và BCH công đoàn cơ sở giới thiệu Hai đảng viên chính thức,",
      "Ban chấp hành đoàn cơ sở và Ban chấp hành công đoàn cơ sở giới thiệu"
    ],
    "answer_letter": "A",
    "answer_explanation": "Điều 4 Điều lệ Đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 47,
    "question": "Tại thời điểm chi bộ xét kết nạp, người vào Đảng phải có điều kiện tuổi đời như thế nào là đúng với Quy định thi hành Điều lệ Đảng hiện hành?",
    "options": [
      "Đủ 18 tuổi (tính theo năm).",
      "Đủ 20 tuổi (tính theo tháng",
      "Đủ 18 tuổi trở lên (tính theo tháng).",
      "Đủ 20 tuổi (tính theo năm)."
    ],
    "answer_letter": "C",
    "answer_explanation": "Quy định 294-QĐ/TW ngày 26/5/2025 của BCH TW, Điều 1, mục 1, khoản 1.1.1."
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 48,
    "question": "Theo Quy định số 294-QĐ/TW ngày 26/5/2025 của Ban Chấp hành Trung ương (khoá XIII) quy định thi hành Điều lệ Đảng, không xem xét kếp nạp lại những người đã ra khỏi Đảng vì lý do nào?",
    "options": [
      "Vi phạm chính sách dân số, kế hoạch hóa gia đình",
      "Gây mất đoàn kết nội bộ nghiêm trọng.",
      "Làm đơn xin ra khỏi Đảng vì gia đình có lý do đặc biệt",
      "Vi phạm hình sự tội ít nghiệm trọng"
    ],
    "answer_letter": "B",
    "answer_explanation": "Quy định 294-QĐ/TW ngày 26/5/2025 của BCH TW, Điều 4, mục 3.5.2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 49,
    "question": "Theo Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ (khoá XIII) về một số vấn đề cụ thể thi hành Điều lệ Đảng, thẩm tra lý lịch người vào Đảng gồm",
    "options": [
      "Thẩm tra người vào Đảng; cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân; vợ hoặc chồng, con đẻ của người vào",
      "Đảng có năng lực hành vi dân sự đầy đủ Thẩm tra người vào Đảng, cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân",
      "Thẩm tra người vào Đảng, cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân; vợ hoặc chồng, cô, dì, chú, bác bên nội và bên ngoại của người vào Đảng",
      "Thẩm tra người vào Đảng; cha, mẹ đẻ, cha, mẹ vợ (chồng) hoặc người trực tiếp nuôi dưỡng bản thân; vợ hoặc chồng, con đẻ của người vào Đảng có năng lực hành vi dân sự đầy đủ; bên nội và bên ngoại của người vào Đảng"
    ],
    "answer_letter": "A",
    "answer_explanation": "Hướng dẫn số 06-HD/TW ngày 09/6/2025 của BCH TƯ, mục 3, khoản 3.4, ý a"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 50,
    "question": "Thời gian dự bị của đảng viên được tính từ ngày nào",
    "options": [
      "Ngày ghi trong quyết định kết nạp",
      "Ngày chi bộ tổ chức lễ kết nạp",
      "Ngày chi bộ ra nghị quyết kết nạp",
      "Ngày ghi trong chứng nhận hoàn thành lớp bồi dưỡng lý luận cho đảng viên mới"
    ],
    "answer_letter": "B",
    "answer_explanation": "Điều 5, Điều lệ Đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 51,
    "question": "Chi bộ họp xét chuyển đảng chính thức cho Đảng viên dự bị, khi được tỷ lệ bao nhiêu số đảng viên chính thức biểu quyết đồng ý thì ra nghị quyết đề nghị cấp uỷ cấp trên xét?",
    "options": [
      "Được hơn một nửa số đảng viên chính thức trở lên đồng ý",
      "Được 2/3 số đảng viên chính thức trở lên đồng ý",
      "Được 3/4 số đảng viên chính thức trở lên đồng ý",
      "Được 100% số đảng viên chính thức đồng ý"
    ],
    "answer_letter": "B",
    "answer_explanation": "Điều 5, Điều 4, Điều lệ Đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 52,
    "question": "Theo Quy định số 294-QĐ/TW ngày 26/5/2025 của Ban Chấp hành Trung ương (khoá XIII) quy định thi hành Điều lệ Đảng, người giới thiệu quần chúng ưu tú vào Đảng phải là:",
    "options": [
      "Đảng viên cùng công tác với người được giới thiệu vào Đảng 12 tháng trở lên",
      "Đảng viên chính thức, cùng công tác với người được giới thiệu vào Đảng 06 tháng trở lên.",
      "Là đảng viên chính thức, cùng công tác, lao động, học tập, hoặc cùng sinh hoạt nơi cư trú ít nhất 12 tháng với người được giới thiệu vào Đảng trong cùng một đơn vị thuộc phạm vi lãnh đạo của đảng bộ, chi bộ cơ sở",
      "Đảng viên cùng công tác với người được giới thiệu vào Đảng 12 tháng trở lên"
    ],
    "answer_letter": "C",
    "answer_explanation": "Quy định 294-QĐ/TW, Điều 4, khoản 3.2.1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 53,
    "question": "Theo Quy định số 294-QĐ/TW ngày 26/5/2025 của Ban Chấp hành Trung ương (khoá XIII) quy định thi hành Điều lệ Đảng, Đảng viên được cấp có thẩm quyền quyết định chuyển công tác sang đơn vị mới, được nghỉ hưu, nghỉ mất sức, thôi việc, phục viên hoặc thay đổi nơi cư trú lâu dài thì trong thời hạn bao nhiêu ngày làm việc kể từ ngày quyết định có hiệu lực hoặc thay đổi nơi cư trú phải làm thủ tục chuyển sinh hoạt đảng chính thức?",
    "options": [
      "Trong vòng 15 ngày làm việc",
      "Trong vòng 30 ngày làm việc",
      "Trong vòng 45 ngày làm việc.",
      "Trong vòng 60 ngày làm việc."
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 294-QĐ/TW ngày 26/5/2025, Điều 6, mục 6.3.1, ý a"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 54,
    "question": "Tổ chức cơ sở đảng theo Điều lệ Đảng hiện hành bao gồm: Chi bộ cơ sở, Đảng bộ cơ sở, Ban cán sự đảng Chi bộ cơ sở, Đảng bộ cơ sở.",
    "options": [
      "Chi bộ cơ sở, Đảng bộ cơ sở,",
      "Đảng đoàn",
      "Chi bộ cơ sở, Đảng bộ cơ sở,",
      "Đảng bộ bộ phận."
    ],
    "answer_letter": "B",
    "answer_explanation": "Điều 21 Điều lệ Đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 55,
    "question": "Nguyên tắc cơ bản trong tổ chức và hoạt động của Đảng là: Hoạt động trong khuôn khổ",
    "options": [
      "Hiến pháp và pháp luật",
      "Tự phê bình và phê bình",
      "Đoàn kết trên cương lĩnh chính trị và Điều lệ Đảng",
      "Tập trung dân chủ"
    ],
    "answer_letter": "D",
    "answer_explanation": "Điều 9, Điều lệ đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 56,
    "question": "Chi bộ có thẩm quyền giải quyết tố cáo và kiểm tra đảng viên khi có dấu hiệu vi phạm trong những trường hợp nào?",
    "options": [
      "Thực hiện nhiệm vụ chi bộ giao",
      "Thực hiện nhiệm vụ đảng viên (trừ nhiệm vụ cấp trên giao).",
      "Dấu hiệu vi phạm về phẩm chất, chính trị, đạo đức lối sống",
      "Cả 3 nội dung trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 18 và Điều 6"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 57,
    "question": "Theo quy định của Điều lệ Đảng hiện hành, tổ chức nào dưới đây họp thường lệ mỗi tháng một lần?",
    "options": [
      "Chi bộ, Đảng ủy cơ sở",
      "Đảng bộ cơ sở",
      "Đảng bộ huyện và tương đương",
      "Ban Thường vụ Đảng uỷ"
    ],
    "answer_letter": "A",
    "answer_explanation": "Điều 22 Điều lệ đảng, ý 4, 6"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 58,
    "question": "Kiểm tra của Đảng bao gồm các hình thức nào sau đây:",
    "options": [
      "Kiểm tra thường xuyên",
      "Kiểm tra định kỳ",
      "Kiểm tra bất thường (khi có dấu hiệu vi phạm).",
      "Tất cả các hình thức trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 296-QĐ/TW"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 59,
    "question": "Theo Hướng dẫn số 08-HD/TW ngày 10/6/2025 về thực hiện một số nội dung trong QĐ 296- QĐ/TW ngày 30/5/2025 quy định:",
    "options": [
      "Chi bộ chủ yếu giám sát thường xuyên đối với đảng viên nơi công tác, sinh hoạt và nơi cư trú; chi bộ có chi ủy, chi bộ có trên 30 đảng viên và đảng viên hoạt động phân tán hoặc có nhiều tổ đảng trực thuộc thì thực hiện giám sát theo chuyên đề",
      "Chi bộ chỉ giám sát thường xuyên",
      "Chi bộ chỉ giám sát chuyên đề",
      "Chi bộ giám sát thường xuyên và giám sát chuyên đề"
    ],
    "answer_letter": "A",
    "answer_explanation": "HD 08, phần II, mục 3, điểm 3.2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 60,
    "question": "Chủ thể kiểm tra, giám sát của Đảng ở cơ sở là:",
    "options": [
      "Chi ủy, chi bộ, đảng ủy bộ phận, ban thường vụ đảng ủy cơ sở, đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở",
      "Chi bộ, đảng ủy bộ phận, đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở Chi bộ, Đảng ủy bộ phận, Ban thường vụ đảng ủy cơ sở,",
      "Đảng ủy từ cấp cơ sở trở lên; Ủy ban kiểm tra, các ban đảng, văn phòng cấp ủy (gọi chung là các cơ quan tham mưu, giúp việc của cấp ủy)",
      "Ban Chấp hành TW, Bộ Chính trị, Ban Bí thư, cấp ủy, Ban thường vụ cấp ủy các cấp"
    ],
    "answer_letter": "C",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 3"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 61,
    "question": "Đối tượng kiểm tra, giám sát của Đảng là:",
    "options": [
      "Chi ủy, chi bộ, đảng ủy bộ phận, ban thường vụ đảng ủy cơ sở, đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở",
      "Chi ủy, chi bộ, Đảng ủy bộ phận, Ban thường vụ đảng ủy cơ sở, Đảng ủy từ cấp cơ sở trở lên; Ủy ban kiểm tra; các cơ quan tham mưu, giúp việc của cấp ủy; đảng viên",
      "Chi bộ, đảng ủy bộ phận, ban thường vụ đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở; đảng viên",
      "Chi bộ, ban thường vụ đảng ủy cơ sở; ủy ban kiểm tra đảng ủy cơ sở; đảng viên"
    ],
    "answer_letter": "B",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 3"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 62,
    "question": "Chi bộ kiểm tra, giám sát đảng viên về:",
    "options": [
      "Việc thực hiện nhiệm vụ chuyên môn",
      "Việc thực hiện nhiệm vụ do đoàn thể giao",
      "Việc thực hiện nhiệm vụ đảng viên",
      "Việc thực hiện nhiệm vụ chuyên môn và nhiệm vụ đảng viên"
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 6"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 63,
    "question": "Đối tượng giám sát của chi bộ là:",
    "options": [
      "Đảng viên trong chi bộ trừ đảng viên giữ chức vụ lãnh đạo quản lý",
      "Đảng viên trong chi bộ (kể cả cấp ủy viên các cấp, đảng viên thuộc diện cấp ủy cấp trên quản lý",
      "Đảng viên trong chi bộ (kể cả cấp ủy viên các cấp, đảng viên thuộc diện cấp ủy cùng cấp quản lý).",
      "Đảng viên trong chi bộ (trừ đảng viên giữ chức vụ quản lý và đảng viên thuộc diện cấp uỷ cấp trên quản lý)."
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 296-QĐ/TW"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 64,
    "question": "Theo Quy định số 296-QĐ/TW ngày 30/5/2025",
    "options": [
      "Quy định về công tác kiểm tra, giám sát, kỷ luật của Đảng, thời hiệu xử lý kỷ luật của Đảng là: Thời hạn mà đảng viên chịu kỷ luật",
      "Thời hạn mà tổ chức đảng có thẩm quyền đảng xem xét kỷ luật đảng viên vi phạm",
      "Thời hạn mà đảng viên vi phạm chưa bị xe xét xử lý kỷ luật",
      "Là thời hạn mà khi hết thời hạn đó, tổ chức đảng, đảng viên có hành vi vi phạm không bị xử lý kỷ luật"
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 3, ý 15"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 65,
    "question": "Theo Quy định số 296-QĐ/TW ngày 30/5/2025 Quy định về công tác kiểm tra, giám sát, kỷ luật của Đảng, thời hiệu xử lý kỷ luật được tính trong thời hạn nào?",
    "options": [
      "Thời điểm tổ chức đảng, đảng viên có hành vi vi phạm đến khi tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật. Thời điểm xảy ra hành vi vi phạm phải được tổ chức đảng có thẩm quyền xem xét, làm rõ, kết luận",
      "Thời điểm tổ chức đảng tiến hành kiểm tra dấu hiệu vi phạm đến khi tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật.",
      "Thời điểm đảng vi bị phát hiện hành vi vi phạm đến khi tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật",
      "Thời điểm tổ chức đảng có thẩm quyền kết luận vi phạm đến mức phải xử lý kỷ luật đến hết thời hạn đảng viên chịu kỷ luật"
    ],
    "answer_letter": "A",
    "answer_explanation": "HD 08-HD/TW ngày 10/6/2025, mục I, điểm 7"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 66,
    "question": "Trong những nội dung sau, đâu là nội dung công tác kiểm tra của Đảng ủy cơ sở ?",
    "options": [
      "Kiểm tra tổ chức đảng, đảng viên trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước",
      "Kiểm tra tổ chức đảng trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước; nguyên tắc tập trung dân chủ, quy chế làm việc, chế độ công tác, dân chủ, đoàn kết; thực hành tiết kiệm, chống lãng phí; quản lý cán bộ; công tác cán bộ; giải quyết khiếu nại, tố cáo",
      "Kiểm tra tổ chức đảng trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước; việc chấp hành nguyên tắc tổ chức và hoạt động của đảng, giữ gìn đoàn kết nội bộ, quy chế làm việc, chế độ công tác, dân chủ trong đảng, thực hành tiết kiệm, phòng, chống tham nhũng, lãng phí, tiêu cực; quản lý, rèn luyện phậm chất đạo đức lối sống của đảng viên.",
      "Kiểm tra tổ chức đảng trong việc chấp hành các quy định của Đảng, chính sách, pháp luật của Nhà nước; nguyên tắc tập trung dân chủ, quy chế làm việc, chế độ công tác, dân chủ, đoàn kết"
    ],
    "answer_letter": "C",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 4, mục 2.3"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 67,
    "question": "Không giải quyết khiếu nại kỷ luật đối với những trường hợp nào sau đây:",
    "options": [
      "Quá thời hạn khiếu nại theo quy định",
      "Đang được cấp trên có thẩm quyền giải quyết; đã được cấp có thẩm quyền cao nhất xem xét, kết luận, quyết định",
      "Bị toà án quyết định hình phạt từ cải tạo không giam giữ trở lên chưa được toà án có thẩm quyền quyết định hủy bỏ bản án; khiếu nại hộ, khiếu nại khi chưa nhận được quyết định kỷ luật bằng văn bản của tổ chức đảng có thẩm quyền; từ chối nhận quyết định kỷ luật hoặc quyết định giải quyết khiếu nại kỷ luật đảng; đã chuyển sinh hoạt đảng chính thức sang tổ chức đảng khác không cùng đảng bộ cấp trên trực tiếp xong mới làm đơn khiếu nại",
      "Tất cả các nội dung trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 23"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 68,
    "question": "Nguyên tắc thi hành kỷ luật trong Đảng, quy định trường hợp nào sau đây chưa xem xét xử lý kỷ luật",
    "options": [
      "Đảng viên vi phạm đang trong thời gian mang thai",
      "Đảng viên vi phạm đang nuôi con nhỏ dưới 12 tháng tuổi",
      "Đảng viên vi phạm bị bệnh nặng nằm viện",
      "Tất cả các trường hợp trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 8, ý 7"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 69,
    "question": "Hình thức kỷ luật của Đảng đối với đảng viên chính thức bao gồm:",
    "options": [
      "Khiển trách, cảnh cáo, phê bình",
      "Khiển trách, cảnh cáo, cách chức (nếu có chức vụ), khai trừ",
      "Khiển trách, cảnh cáo, phê bình, rút kinh nghiệm, khai trừ",
      "Khiển trách, cảnh cáo, phê bình rút kinh nghiệm, khai trừ, xoá tên"
    ],
    "answer_letter": "B",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 9"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 70,
    "question": "Chi bộ có thẩm quyền quyết định các hình thức kỷ luật nào?",
    "options": [
      "Khiển trách, cảnh cáo đảng viên",
      "Khiển trách, xóa tên đảng viên",
      "Cách chức chức vụ đảng viên; khai trừ đảng viên",
      "Phê bình, rút kinh nghiệm"
    ],
    "answer_letter": "A",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 10, mục 1.1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 71,
    "question": "Chi bộ quyết định khiển trách, cảnh cáo đảng viên trong chi bộ (kể cả cấp ủy viên các cấp, đảng viên thuộc diện cấp ủy cấp trên quản lý) trong trường hợp nào?",
    "options": [
      "Vi phạm phẩm chất chính trị, tư tưởng, đạo đức, lối sống, nhiệm vụ do cấp trên giao",
      "Vi phạm phẩm chất chính trị, tư tưởng, đạo đức, lối sống, \"tự diễn biến\", \"tự chuyển hoá\", sinh hoạt đảng, thực hiện nhiệm vụ do chi bộ giao, thực hiện nhiệm vụ đảng viên (trừ nhiệm vụ do cấp trên giao).",
      "Vi phạm phẩm chất chính trị, tư tưởng, đạo đức, lối sống, sinh hoạt đảng, thực hiện nhiệm vụ đảng viên (kể cả nhiệm vụ do cấp trên giao).",
      "Vi phạm đạo đức, lối sống, sinh hoạt đảng, thực hiện nhiệm vụ đảng viên (trừ nhiệm vụ do cấp trên giao)"
    ],
    "answer_letter": "B",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 10, mục 1.1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 72,
    "question": "Quyết định khiển trách, cảnh cáo của chi bộ đối với đảng viên vi phạm có hiệu lực:",
    "options": [
      "Ngay sau khi chi bộ công bố quyết định kỷ luật",
      "Ngay sau khi chi bộ công bố kết quả biểu quyết quyết định kỷ luật",
      "Trong vòng 10 ngày, chi bộ ban hành quyết định kỷ luật trao cho đảng viên bị kỷ luật, báo cáo cấp trên và lưu hồ sơ",
      "Khi đảng viên nhận quyết định kỷ luật"
    ],
    "answer_letter": "B",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 15, mục 2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 73,
    "question": "Quyết định kỷ luật của chi bộ trực thuộc (trong đảng bộ bộ phận, trong đảng bộ cơ sở): Được đóng dấu của Đảng ủy cơ sở vào phía trên, góc trái và được đảng ủy cơ sở chuẩn y",
    "options": [
      "Được Đảng ủy cơ sở ra quyết định chuẩn y",
      "Được đóng dấu của đảng ủy cơ sở vào phía trên, góc trái.",
      "Đảng ủy cơ sở hoặc cấp ủy cấp trên trực tiếp không phải ra quyết định chuẩn y.",
      "Được  cấp ủy cấp trên trực tiếp ra quyết định chuẩn y."
    ],
    "answer_letter": "C",
    "answer_explanation": "QĐ 296-QĐ/TW, Điều 15, mục 2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 74,
    "question": "Theo Hướng dẫn số 12-HD/BTCTW ngày 18/01/2022 Hướng dẫn nghiệp vụ công tác đảng viên, đảng viên phải khai lý lịch đảng viên để tổ chức đảng quản lý trong thời gian nào?",
    "options": [
      "Trong thời gian 30 ngày làm việc từ ngày chi bộ tổ chức lễ kết nạp vào Đảng",
      "Trong thời gian 60 ngày làm việc từ ngày chi bộ tổ chức lễ kết nạp vào Đảng",
      "Trong thời gian 90 ngày làm việc từ ngày chi bộ tổ chức lễ kết nạp vào Đảng",
      "Sau 30 ngày kể từ ngày chi chi bộ tổ chức lễ kết nạp vào Đảng"
    ],
    "answer_letter": "A",
    "answer_explanation": "HD12-HD/BTCTW, ngày 18/1/2022, điểm 2.2, phần lưu ý"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 75,
    "question": "Theo Hướng dẫn số 36 -HD/VPTW, ngày 03/4/2018 của Văn phòng Trung ương Đảng thì thể thức đề ký văn bản của chi bộ (chi bộ cơ sở và chi bộ trực thuộc đảng ủy cơ sở) như thế nào là đúng? T.M CHI ỦY",
    "options": [
      "T.M CHI ỦY CHI BỘ",
      "T.M BAN CHẤP HÀNH CHI",
      "BỘ",
      "T/M CHI BỘ"
    ],
    "answer_letter": "D",
    "answer_explanation": "HD 36-HD/VPTW"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 76,
    "question": "Theo Hướng dẫn số 12-HD/BTCTW ngày 18/01/2022, xét cho đảng viên được miễn công tác và sinh hoạt đảng không vì lý do tuổi cao, sức yếu trong các trường hợp nào?",
    "options": [
      "Do phải đi điều trị bệnh dài ngày hoặc điều trị bệnh ở xa nơi cư trú. Đảng viên ra nước ngoài làm nhiệm vụ đơn lẻ, vì việc riêng (du lịch, chữa bệnh, thăm thân nhân...); đảng viên đi lao động đơn lẻ, ở những vùng xa, không có tổ chức đảng hoặc điều kiện đi lại khó khăn, không thể tham gia sinh hoạt đảng",
      "Đi làm việc lưu động ở các địa phương, đơn vị trong nước thời gian dưới 1 năm, việc làm không ổn định, hoặc ở những nơi chưa có tổ chức đảng, không có điều kiện trở về tham gia sinh hoạt chi bộ theo quy định",
      "Đảng viên nữ trong thời gian nghỉ sinh con theo quy định của Bộ luật Lao động có nguyện vọng miễn sinh hoạt đảng",
      "Cả ba nội dung nêu trên."
    ],
    "answer_letter": "D",
    "answer_explanation": "HD 12-HD/TCTW, mục IV, điểm 1, ý 1.2"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 77,
    "question": "Theo Hướng dẫn số 12-HD/TCTW ngày 18/01/2022, khi hồ sơ đảng viên bị mất, cấp ủy nơi quản lý hồ sơ đảng viên tiến hành thẩm tra, xác minh (phối hợp với các cơ quan có liên quan nếu cần thiết) để làm rõ nguyên nhân mất hồ sơ đảng viên và thực hiện quy trình nào?",
    "options": [
      "Làm lại hồ sơ đảng viên",
      "Khôi phục hồ sơ đảng viên.",
      "Bổ sung hồ sơ đảng viên",
      "Khai lại hồ sơ đảng viên."
    ],
    "answer_letter": "B",
    "answer_explanation": "HD 12-HD/TCTW mục II, điểm 3, ý 3.1"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 78,
    "question": "Theo quy định hiện hành giữa 2 kỳ đại hội, cơ quan lãnh đạo của Đảng bộ VCB là",
    "options": [
      "Đại hội đại biểu Đảng bộ",
      "VCB",
      "Thường trực Đảng ủy VCB",
      "Ban Thường vụ Đảng ủy VCB Ban Chấp hành Đảng bộ VCB"
    ],
    "answer_letter": "D",
    "answer_explanation": "Điều 9, Điều lệ đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 79,
    "question": "Theo hướng dẫn hiện hành của Ban Tổ chức Trung ương thì một chức danh quy hoạch nhiều nhất được bao nhiêu người?",
    "options": [
      "3 người.",
      "4 người.",
      "5 người",
      "3-4 người"
    ],
    "answer_letter": "A",
    "answer_explanation": ""
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 80,
    "question": "Theo quy định của Đảng hiện hành, cấp nào có quyền quyết định khiển trách, cảnh cáo tổ chức đảng vi phạm?",
    "options": [
      "Cấp ủy cùng cấp",
      "Cấp ủy hoặc BTV cấp ủy cấp trên trực tiếp",
      "Cấp ủy cấp trên cách một cấp",
      "Đại hội cùng cấp."
    ],
    "answer_letter": "B",
    "answer_explanation": "QĐ 296-QĐ/TW, điều 11"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 81,
    "question": "Tại đại hội Đảng các cấp, việc bầu cử bằng hình thức biểu quyết giơ tay, có thể được áp dụng cho việc bầu cử nào?",
    "options": [
      "Bầu Đoàn Chủ tịch, Đoàn",
      "Thư ký đại hội. Bầu nhân sự cấp ủy.",
      "Bầu đại biểu chính thức đi dự đại hội cấp trên.",
      "Bầu đại biểu dự khuyết đi dự đại hội cấp trên."
    ],
    "answer_letter": "A",
    "answer_explanation": "Quyết định 190-QĐ/TW ngày 10/10/2024 - điều 3"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 82,
    "question": "Nội dung nào sau đây không thuộc nhiệm vụ của UBKT các cấp:",
    "options": [
      "Kiểm tra chấp hành Điều lệ, chỉ thị, nghị quyết của Đảng đối với tổ chức đảng hoặc đảng viên",
      "Kiểm tra tổ chức đảng hoặc đảng viên khi có dấu hiệu vi phạm",
      "Giải quyết tố cáo đối với tổ chức đảng hoặc đảng viên",
      "Giải quyết khiếu nại về kỷ luật Đảng"
    ],
    "answer_letter": "A",
    "answer_explanation": "Điều 32 Điều lệ đảng"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 83,
    "question": "Điều lệ Đảng quy định hình thức kỷ luật đối với đảng viên dự bị là?",
    "options": [
      "Khiển trách, cảnh cáo.",
      "Khiển trách, cảnh cáo, xóa tên.",
      "Khiển trách, cảnh cáo, khai trừ",
      "Khiển trách, cảnh cáo, cách chức."
    ],
    "answer_letter": "A",
    "answer_explanation": "QĐ 296-QĐ/TW ngày 30/5/2025, điều 9"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 84,
    "question": "Đơn tố cáo như thế nào thì được giải quyết ?",
    "options": [
      "Đơn tố cáo giấu tên, mạo danh.",
      "Đơn tố cáo có nội dung nhưng không cụ thể.",
      "Đơn tố cáo có nội dung, có chữ ký bằng bản photo.",
      "Đơn tố cáo có tên, có nội dung cụ thể, cung cấp được các bằng chứng chứng minh."
    ],
    "answer_letter": "D",
    "answer_explanation": "QĐ 296-QĐ/TW ngày 30/5/2025, Điều 19"
  },
  {
    "source": "Nghiep vu cong tac Dang",
    "number": 85,
    "question": "Nội dung đơn tố cáo nào sau đây được dùng làm căn cứ kết hợp với các thông  tin khác để quyết định kiểm  tra  tổ chức đảng  cấp dưới, đảng viên khi có dấu hiệu vi phạm?",
    "options": [
      "Đơn  tố cáo đã được cấp có thẩm quyền giải quyết nhưng tái  tố, không có nội dung mới",
      "Đơn tố cáo giấu tên, mạo tên có nội dung, địa chỉ cụ thể.",
      "Đơn tố cáo có nội dung xác định được là vu cáo",
      "Đơn tố cáo do người không có năng lực hành vi ký tên."
    ],
    "answer_letter": "B",
    "answer_explanation": "QĐ 296-QĐ/TW ngày 30/5/2025, Điều 19"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 1,
    "question": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB về tiếp tục đổi mới, sắp xếp tổ chức bộ máy tinh gọn, hoạt động hiệu lực, hiệu quả ra đời theo tinh thần của Nghị quyết nào sau đây?",
    "options": [
      "Nghị quyết số 18-NQ/TW ngày 16/06/2022 của BCH Trung ương",
      "Nghị quyết số 18-NQ/TW ngày 25/10/2017 của BCH Trung ương",
      "Nghị quyết số 17-NQ/CP ngày 07/03/2019 của Thủ tướng Chính phủ",
      "Cả 3 phương án trên"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 2,
    "question": "Đâu là những hạn chế còn tồn tại trong quá trình kiện toàn mô hình tổ chức tại VCB được chỉ ra tại Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB?",
    "options": [
      "Các mảng hoạt động, nghiệp vụ được tổ chức tập trung về một đầu mối",
      "Một số mảng hoạt động, nghiệp vụ đang được thực hiện phân tán tại một số đơn vị khác nhau",
      "Các mảng hoạt động, nghiệp vụ được thực hiện một cách  đồng bộ",
      "Rút giảm đầu mối trung gian trong quá trình thực hiện các hoạt động, nghiệp vụ"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 3,
    "question": "Theo Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB, \"mô hình tổng thể tổ chức bộ máy của VCB đang tiếp tục được rà soát, hoàn thiện, một số lĩnh vực hoạt động, nghiệp vụ chưa kịp thời chuyển đổi phù hợp với yêu cầu, nhiệm vụ trong thời kỳ mới\" là:",
    "options": [
      "Tình hình",
      "Hạn chế, bất cập",
      "Nguyên nhân hạn chế, bất cập",
      "Quan điểm chỉ đạo"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 4,
    "question": "Theo quan điểm chỉ đạo của Đảng ủy VCB tại Nghị quyết 2537- NQ/ĐU ngày 06/03/2025, việc đổi mới, sắp xếp tổ chức bộ máy, cơ cấu lại lao động tại VCB cần được thực hiện như thế nào?",
    "options": [
      "Thực hiện thường xuyên, liên tục, tích cực, mạnh mẽ",
      "Thực hiện có trọng tâm, trọng điểm và lộ trình cụ thể đáp ứng yêu cầu trước mắt và lâu dài",
      "Phù hợp với chiến lược phát triển và thực tế hoạt động kinh doanh của VCB trong từng thời kỳ",
      "Cả 3 phương án trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 5,
    "question": "Đâu là nguyên tắc trong quá trình đổi mới, sắp xếp tổ chức bộ máy tại VCB được Đảng ủy VCB đưa ra tại Nghị quyết 2537-NQ/ĐU ngày 06/03/2025?",
    "options": [
      "Mỗi đơn vị thực hiện một việc, chủ trì việc thực hiện và chịu trách nhiệm chính",
      "Mỗi đơn vị thực hiện một việc, đảm bảo sự không chồng chéo, giao thoa",
      "Mỗi đơn vị thực hiện nhiều việc, một việc chỉ giao cho một đơn vị chủ trì thực hiện và chịu trách nhiệm chính, đảm bảo không chồng chéo, giao thoa, không bỏ sót chức năng, nhiệm vụ",
      "Các đơn vị cùng thực hiện một công việc thì cấp trên sẽ chủ trì việc thực hiện và chịu trách nhiệm chính"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 6,
    "question": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB quy định nguyên tắc phân bổ kế hoạch lao động cho các đơn vị trong thời gian tới như thế nào?",
    "options": [
      "Ưu tiên phân bổ tăng mới lao động bán hàng, lao động hỗ trợ kinh doanh; Hạn chế phân bổ tăng mới lao động tác nghiệp/lao động giản đơn",
      "Ưu tiên phân bổ tăng mới lao động bán hàng, lao động trong lĩnh vực dữ liệu, công nghệ thông tin; Hạn chế phân bổ tăng mới lao động hỗ trợ/lao động giản đơn",
      "Ưu tiên phân bổ tăng mới lao động tác nghiệp, lao động trong lĩnh vực dữ liệu, công nghệ thông tin; Hạn chế phân bổ tăng mới lao động hỗ trợ/lao động giản đơn",
      "Ưu tiên phân bổ tăng mới lao động thực hiện công việc trong lĩnh vực công nghệ thông tin; Hạn chế phân bổ tăng mới lao động tác nghiệp/lao động hỗ trợ"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 7,
    "question": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB quy định nguyên tắc sắp xếp, bố trí lại lao động tại Chi nhánh trong thời gian tới như thế nào?",
    "options": [
      "Lao động bán hàng chiếm tỷ lệ ≥50% tổng số lao động của Chi nhánh",
      "Lao động bán hàng chiếm tỷ lệ ≥60% tổng số lao động của Chi nhánh",
      "Lao động bán hàng chiếm tỷ lệ ≥60% tổng số lao động chính thức của Chi nhánh",
      "Phương án B và C"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 8,
    "question": "Đơn vị nào có trách nhiệm chủ trì việc theo dõi, đôn đốc tình hình thực hiện Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB?",
    "options": [
      "Ban Thường vụ Đảng ủy VCB",
      "Ban chấp hành Đảng bộ VCB",
      "Ủy ban kiểm tra Đảng ủy VCB",
      "Ban Tổ chức Đảng ủy VCB"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 Phương án STT Câu hỏi BỘ CÂU HỎI CÁC NGHỊ QUYẾT TRỌNG TÂM Đáp án Giải thích"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 9,
    "question": "Theo Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB, tối ưu hóa giá trị và hiệu quả nguồn nhân lực thông qua việc tiếp tục rà soát, xây dựng/điều chỉnh định biên lao động, cơ cấu nhân sự lãnh đạo của các đơn vị, hỗ trợ Chi nhánh trong việc bố trí sắp xếp lại lao động, là:",
    "options": [
      "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Ban Tổ chức Đảng ủy VCB thực hiện",
      "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Trụ sở chính thực hiện",
      "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Chi nhánh thực hiện",
      "Chủ trương, định hướng về sắp xếp, cơ cấu lại lao động do Trụ sở chính và Chi nhánh cùng thực hiện"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 10,
    "question": "Theo Nghị quyết 2537-NQ/ĐU ngày 06/03/2025 của Đảng ủy VCB, nguyên tắc sắp xếp, cơ cấu lại lao động tại Chi nhánh trong thời gian tới là:",
    "options": [
      "Tuyển dụng bù đắp từ nguồn bên ngoài đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm",
      "Tuyển dụng bù đắp từ nguồn nội bộ đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm",
      "Hạn chế tối đa việc tuyển dụng bù đắp, bố trí nhân sự thay thế từ khối khách hàng đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm",
      "Hạn chế tối đa việc tuyển dụng bù đắp, bố trí nhân sự thay thế từ nguồn tại chỗ cho phù hợp đối với các trường hợp lao động hỗ trợ/lao động giản đơn nghỉ hưu/chấm dứt hợp đồng lao động/điều động đi đơn vị khác trong năm"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2537-NQ/ĐU ngày 06/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 11,
    "question": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB ra đời trong bối cảnh nào? Thực hiện Kết luận số 123- KL/TW ngày 24/01/2025 của BCH Trung ương",
    "options": [
      "Thực hiện Kết luận số 126- KL/TW ngày 14/02/2025 của Bộ",
      "Chính trị, Ban Bí thư",
      "Thực hiện Kết luận số 127-KL/TW ngày 28/02/2025 của Bộ Chính trị,",
      "Ban Bí thư Cả 3 phương án trên"
    ],
    "answer_letter": "A",
    "answer_explanation": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 12,
    "question": "Kết luận 123-KL/TW ngày 24/01/2025 của BCH Trung ương đề ra mục tiêu tăng trưởng GDP năm 2025 của Việt Nam đạt từ bao nhiêu % trở lên?",
    "options": [
      "7%",
      "8%",
      "9%",
      "10%"
    ],
    "answer_letter": "B",
    "answer_explanation": "Kết luận 123-KL/TW ngày 24/01/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 13,
    "question": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB đặt ra mục tiêu tổng quát tiếp tục triển khai cái gì? 03 đột phá chiến lược và 03 trọng tâm chuyển dịch cơ cấu kinh doanh 05 đột phá chiến lược và 05 trọng tâm chuyển dịch cơ cấu kinh doanh",
    "options": [
      "04 đột phá chiến lược và 06 trọng",
      "tâm chuyển dịch cơ cấu kinh doanh",
      "06 đột phá chiến lược và 04 trọng",
      "tâm chuyển dịch cơ cấu kinh doanh"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 14,
    "question": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB đặt ra mục tiêu năm 2025, VCB đạt mức tăng trưởng tín dụng tối thiểu bao nhiêu %?",
    "options": [
      "10%",
      "15%",
      "16%",
      "18%"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 15,
    "question": "Theo Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB, cần khai thác dữ liệu gì trong quá trình phát triển nền tảng dữ liệu nhằm nâng cao khả năng quản trị, điều hành và phát triển hoạt động kinh doanh?",
    "options": [
      "Dữ liệu nguồn",
      "Dữ liệu điện tử",
      "Dữ liệu định tính",
      "Dữ liệu lớn (Big data)"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 16,
    "question": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB đặt ra nhiệm vụ phát triển phương pháp làm việc gì để thích ứng với chuyển đổi số?",
    "options": [
      "Phương pháp làm việc khoa học",
      "Phương pháp làm việc đổi mới",
      "Phương pháp làm việc Agile",
      "Phương pháp làm việc từ xa"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 17,
    "question": "Đơn vị nào là đầu mối triển khai giải pháp thực hiện chương trình hành động/kế hoạch thực hiện Nghị quyết 2618-NQ/ĐU ngày 01/04/2025 của Đảng ủy VCB",
    "options": [
      "Ban chấp hành Đảng bộ VCB",
      "Ban điều hành VCB",
      "Ban chiến lược và Thư ký tổng hợp",
      "Ban Tổ chức Đảng ủy"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2618-NQ/ĐU ngày 01/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 18,
    "question": "Tại Kế hoạch hành động số 65-KH/ĐU ngày 09/05/2025 của Đảng ủy Vietcombank Sở giao dịch đề ra kế hoạch kinh doanh năm 2025 với tỷ lệ nợ nhóm 2 và tỷ lệ nợ xấu là bao nhiêu?",
    "options": [
      "Tỷ lệ nợ nhóm 2 < 0.5% và tỷ lệ nợ xấu < 1%",
      "Tỷ lệ nợ nhóm 2 < 0.5% và tỷ lệ nợ xấu < 0.5%",
      "Tỷ lệ nợ nhóm 2 < 0.3% và tỷ lệ nợ xấu < 0.3%",
      "Tỷ lệ nợ nhóm 2 < 0.3% và tỷ lệ nợ xấu < 0.4%"
    ],
    "answer_letter": "D",
    "answer_explanation": "Kế hoạch hành động số 65- KH/ĐU"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 19,
    "question": "Tại Kế hoạch hành động số 65-KH/ĐU ngày 09/05/2025 của Đảng ủy Vietcombank Sở giao dịch đề ra kế hoạch kinh doanh nhiệm kỳ 2025 - 2030 mục tiêu huy động vốn tăng trưởng bình quân là bao nhiêu %?",
    "options": [
      "3 - 5%/năm",
      "5- 7%/năm",
      "6 - 8%/năm",
      "8 - 10%/năm"
    ],
    "answer_letter": "C",
    "answer_explanation": "Kế hoạch hành động số 65- KH/ĐU"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 20,
    "question": "Tại Kế hoạch hành động số 65-KH/ĐU ngày 09/05/2025 của Đảng ủy Vietcombank Sở giao dịch đề ra kế hoạch kinh doanh nhiệm kỳ 2025 - 2030 với mục tiêu tín dụng tăng trưởng tối thiểu là bao nhiêu %/năm?",
    "options": [
      "10%",
      "12%",
      "15%",
      "18%"
    ],
    "answer_letter": "C",
    "answer_explanation": "Kế hoạch hành động số 65- KH/ĐU"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 21,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, phát triển lĩnh vực nào được xem là yếu tố quyết định phát triển của các quốc gia? Tài nguyên thiên nhiên phong phú Nguồn vốn đầu tư nước ngoài dồi",
    "options": [
      "dào",
      "Khoa học, công nghệ, đổi mới",
      "sáng tạo và chuyển đổi số quốc gia",
      "Xuất khẩu"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 22,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, chủ thể nào giữ vai trò dẫn dắt, thúc đẩy phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số?",
    "options": [
      "Các tổ chức phi chính phủ",
      "Nhà nước",
      "Các tập đoàn kinh tế lớn",
      "Các Trường Đại học và Viện nghiên cứu"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 23,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia được xác định là?",
    "options": [
      "Nhiệm vụ cốt lõi",
      "Nhiệm vụ quan trọng",
      "Đột phá quan trọng hàng đầu, là động lực chính",
      "Đột phá chiến lược"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 24,
    "question": "Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị nhấn mạnh đến kỷ nguyên nào?",
    "options": [
      "Kỷ nguyên công nghiệp hóa, hiện đại hóa",
      "Kỷ nguyên số",
      "Kỷ nguyên hội nhập",
      "Kỷ nguyên vươn mình của dân tộc"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 25,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, đổi mới sáng tạo và chuyển đổi số quốc gia được xem là cuộc cách mạng như thế nào?",
    "options": [
      "Chủ yếu trong lĩnh vực khoa học và công nghệ",
      "Sâu sắc, toàn diện trên tất cả các lĩnh vực",
      "Tập trung trong lĩnh vực kinh tế",
      "Cuộc cách mạng công nghiệp 4.0"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 26,
    "question": "Theo nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, phong trào nào được triển khai sâu rộng để nâng cao kiến thức số cho người dân?",
    "options": [
      "Chính phủ số",
      "Học tập số",
      "Nhà trường số",
      "Bình dân học vụ số"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 27,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, quan điểm nào sau đây đúng về đổi mới tư duy xây dựng pháp luật liên quan tới đổi mới sáng tạo?",
    "options": [
      "Ưu tiên phát triển các công nghệ truyền thống",
      "Áp dụng quy định linh hoạt, phát huy thử nghiệm các công nghệ mới",
      "Bảo đảm yêu cầu quản lý và khuyến khích đổi mới sáng tạo, loại bỏ tư duy \"không quản được thì cấm\"",
      "Thực hiện quản lý chặt chẽ để hạn chế rủi ro"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 28,
    "question": "Đâu là quan điểm của Đảng ủy VCB trong việc hoàn thiện cơ chế chính sách trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số tại Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB",
    "options": [
      "Đưa cơ chế chính sách thành một giá trị gia tăng trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số",
      "Đưa cơ chế chính sách thành một động lực trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số",
      "Đưa cơ chế chính sách thành một giải pháp cốt lõi trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số",
      "Đưa cơ chế chính sách thành một lợi thế cạnh tranh trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 29,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, hạ tầng số phải phát triển theo nguyên tắc nào?",
    "options": [
      "Đơn giản, tiết kiệm chi phí tối đa",
      "Cần đầu tư vào công nghệ viễn thông",
      "Hiện đại, đồng bộ, an ninh, an toàn, hiệu quả, tránh lãng phí",
      "Tăng cường đầu tư để phát triển nhanh, hiện đại, đồng bộ"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 30,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, đâu là lĩnh vực được xác định ưu tiên trong quan điểm tự chủ về công nghệ?",
    "options": [
      "Nghiên cứu cơ bản",
      "Công nghệ thông tin",
      "Công nghệ viễn thông",
      "Công nghệ chiến lược"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 31,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, đâu không phải là hạn chế trong việc triển khai các chủ trương chính sách về đổi mới sáng tạo và chuyển đổi số tại VCB?",
    "options": [
      "Các chính sách pháp luật về chuyển đổi số đang dần hoàn thiện nhưng chưa theo kịp công nghệ mới",
      "Nguồn nhân lực Công nghệ thông tin và chuyển đổi số tại VCB chưa đáp ứng kịp nhu cầu phát triển mạnh mẽ của ngân hàng",
      "VCB còn phụ thuộc nhiều vào bên thứ ba trong việc đầu tư phát triển công nghệ",
      "VCB xây dựng lộ trình chuyển đổi số có sự tham gia tư vấn của đơn vị tư vấn Boston Consulting Group (BCG)"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 32,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, dữ liệu được xác định là gì trong nền kinh tế số?",
    "options": [
      "Yếu tố chính và ảnh hưởng lớn",
      "Công cụ hỗ trợ chính",
      "Tư liệu sản xuất chính",
      "Một phần quan trọng"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 33,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, yếu tố nào được xem là điều kiện tiên quyết trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số?",
    "options": [
      "Hạ tầng",
      "Cơ chế, chính sách",
      "Công nghệ",
      "Dữ liệu"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 34,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, chủ thể nào được xác định là trung tâm và định hướng chuyển đổi số ngành Ngân hàng?",
    "options": [
      "Ngân hàng Nhà nước",
      "Các Ngân hàng thương mại",
      "Người dân và doanh nghiệp",
      "Các Trường Đại học và Viện nghiên cứu"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 35,
    "question": "Quan điểm chỉ đạo của Đảng ủy VCB tại Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 lấy gì là thước đo trong phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số tại VCB?",
    "options": [
      "Trải nghiệm khách hàng",
      "Số lượng sáng kiến cải tiến",
      "Điểm đánh giá khung năng lực",
      "Năng suất lao động bình quân"
    ],
    "answer_letter": "A",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 36,
    "question": "Theo quan điểm chỉ đạo tại Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, để tự chủ và cạnh tranh về công nghệ, VCB cần phải làm gì?",
    "options": [
      "Mua công nghệ từ các tổ chức nước ngoài",
      "Phát triển công nghệ riêng, đơn giản và tiết kiệm chi phí",
      "Đẩy mạnh nghiên cứu ứng dụng và chú trọng nghiên cứu cơ bản",
      "Phương án A và C"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 37,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, việc đảm bảo chủ quyền trên không gian mạng, đảm bảo an ninh mạng, an ninh dữ liệu, an toàn thông tin của VCB và khách hàng được xác định như thế nào trong quá trình phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số tại VCB?",
    "options": [
      "Là yêu cầu quan trọng",
      "Là yêu cầu cấp bách, liên tục",
      "Là yêu cầu thường xuyên",
      "Là yêu cầu xuyên suốt, không thể tách rời"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 38,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, để phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số, cần phải làm gì đối với cơ chế chính sách?",
    "options": [
      "Điều chỉnh theo tình hình thực tế",
      "Hoàn thiện và đi trước một bước",
      "Thay đổi theo lộ trình để đảm bảo ổn định",
      "Điều chỉnh hàng năm"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 39,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, việc xây dựng và triển khai chiến lược đổi mới sáng tạo của VCB đến năm 2025, tầm nhìn đến năm 2030 ưu tiên đến loại hình đổi mới sáng tạo nào?",
    "options": [
      "Đổi mới sáng tạo mở",
      "Đổi mới sáng tạo đột phá",
      "Đổi mới khoa học công nghệ",
      "Đổi mới sáng tạo mở và đột phá"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 40,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, cán bộ có trình độ chuyên môn khoa học kỹ thuật tại đơn vị sẽ được quan tâm cơ cấu bố trí tại đâu?",
    "options": [
      "Ban Giám đốc Chi nhánh",
      "Cấp ủy đơn vị",
      "Ban chấp hành Công đoàn cơ sở",
      "Lãnh đạo các phòng ban"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 41,
    "question": "VCB hiện đang thu hút nhân sự công nghệ cao bằng hình thức nào?",
    "options": [
      "Tăng bậc lương tối đa cho cán bộ thuộc Khối Công nghệ thông tin & Chuyển đổi số",
      "Áp dụng chế độ làm việc linh hoạt cho cán bộ thuộc Khối Công nghệ thông tin & Chuyển đổi số",
      "Áp dụng lương thỏa thuận cho nhân sự chủ chốt của Khối Công nghệ thông tin & Chuyển đổi số",
      "Cả 3 phương án trên"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 42,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, dữ liệu cần được phát triển như thế nào trong quá trình đổi mới sáng tạo?",
    "options": [
      "Tập trung vào nguồn dữ liệu tại đơn vị",
      "Làm giàu, khai thác tối đa tiềm năng của dữ liệu, thúc đẩy phát triển nhanh cơ sở dữ liệu lớn, công nghiệp dữ liệu, kinh tế dữ liệu",
      "Giữ nguyên hiện trạng và phát triển thêm",
      "Cả 3 phương án trên"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 43,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, giải pháp để thúc đẩy hoạt động nghiên cứu khoa học, ứng dụng công nghệ, đổi mới sáng tạo và chuyển đổi số trong hoạt động kinh doanh là tạo ra các dịch vụ sản phẩm như thế nào?",
    "options": [
      "Dịch vụ sản phẩm có hàm lượng công nghệ cao",
      "Dịch vụ sản phẩm sáng tạo",
      "Dịch vụ sản phẩm đơn giản, ưu việt và tiết kiệm chi phí",
      "Dịch vụ sản phẩm đột phá dẫn dắt thị trường theo cơ chế đổi mới sáng tạo mở"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 44,
    "question": "Trong năm 2025, VCB đã thành lập bộ phận nào để thích ứng với quá trình chuyển đổi số? Khối Công nghệ thông tin và Chuyển đổi số",
    "options": [
      "Trung tâm đổi mới sáng tạo và",
      "Khối Dữ liệu",
      "Khối Vận hành",
      "Công ty Fintech"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 45,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt mục tiêu đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số tại VCB cho giai đoạn nào?",
    "options": [
      "Đặt mục tiêu cho giai đoạn 2025 - 2030",
      "Đặt tầm nhìn cho giai đoạn 2030 - 2045",
      "Đặt mục tiêu đến năm 2025, tầm nhìn đến năm 2030",
      "Đặt mục tiêu đến năm 2030, tầm nhìn đến năm 2045"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 46,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt mục tiêu đến năm 2030, tỷ lệ khách hàng có sử dụng dịch vụ trên các kênh điện tử là bao nhiêu?",
    "options": [
      "≥ 50%",
      "≥ 60%",
      "≥ 70%",
      "≥ 90%"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 47,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, giải pháp để thúc đẩy hoạt động nghiên cứu khoa học, ứng dụng công nghệ, đổi mới sáng tạo và chuyển đổi số trong hoạt động kinh doanh là tối ưu hóa quy trình nội bộ trên cơ sở áp dụng các giải pháp nào?",
    "options": [
      "Cắt giảm các bước trung gian trong quá trình thực hiện quy trình nội bộ",
      "Cắt giảm thời gian luân chuyển hồ sơ giữa các bộ phận",
      "Áp dụng các giải pháp tự động hóa và số hóa nhằm tăng năng suất lao động và rút ngắn thời gian xử lý",
      "Áp dụng nền tảng công nghệ trí tuệ nhân tạo (AI) trong quá trình thực hiện quy trình nội bộ"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 48,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB, vai trò của an ninh mạng trong chuyển đổi số là gì?",
    "options": [
      "Quan trọng đối với tổ chức",
      "Cần chú trọng nhiều",
      "Áp dụng riêng trong lĩnh vực tài chính - ngân hàng",
      "Yêu cầu xuyên suốt, không thể tách rời"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 49,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt mục tiêu đến năm 2030, tỷ lệ doanh thu từ các kênh số là bao nhiêu?",
    "options": [
      "≥ 50%",
      "≥ 55%",
      "≥ 60%",
      "≥ 65%"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 50,
    "question": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt tầm nhìn đến năm 2045, số lượng cán bộ công nghệ thông tin đạt bao nhiêu % trên tổng số nhân sự của toàn hệ thống",
    "options": [
      "5%",
      "8%",
      "10%",
      "15%"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 51,
    "question": "Theo Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB đã đặt tầm nhìn đến năm 2045, tỷ lệ doanh thu từ các kênh số là bao nhiêu?",
    "options": [
      "≥ 50%",
      "≥ 55%",
      "≥ 60%",
      "≥ 75%"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 52,
    "question": "Đơn vị nào là đầu mối phối hợp xây dựng chương trình hành động/kế hoạch thực hiện Nghị quyết 2588-NQ/ĐU ngày 19/03/2025 của Đảng ủy VCB",
    "options": [
      "Ban chấp hành Đảng bộ VCB",
      "Ban điều hành VCB",
      "Ban Tuyên giáo Đảng ủy VCB",
      "Trung tâm Ngân hàng số và Trung tâm Đổi mới sáng tạo"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2588-NQ/ĐU ngày 19/03/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 53,
    "question": "Mục tiêu đến năm 2030, giao dịch không dùng tiền mặt đạt bao nhiêu % theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị?",
    "options": [
      "50%",
      "60%",
      "70%",
      "80%"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 54,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, quy mô kinh tế số của Việt Nam dự kiến đạt tối thiểu bao nhiêu % GDP vào năm 2030?",
    "options": [
      "10%",
      "20%",
      "30%",
      "40%"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 55,
    "question": "Theo Nghị quyết 57-NQ/TW ngày 22/12/2024 của Bộ Chính trị, đến năm 2045, Việt Nam thuộc nhóm bao nhiêu nước dẫn đầu thế giới về đổi mới sáng tạo và chuyển đổi số?",
    "options": [
      "20",
      "30",
      "40",
      "50"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 57-NQ/TW ngày 22/12/2024"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 56,
    "question": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB ra đời trong bối cảnh nào?",
    "options": [
      "Đất nước ta đang bước vào kỷ nguyên phát triển mạnh mẽ, bứt phá toàn diện",
      "VCB đã đạt được tầm vóc, khẳng định được uy tín và vị thế tiên phong",
      "VCB đang phải đối mặt với nhiều khó khăn, thách thức, thậm chí có nguy cơ tụt hậu",
      "Cả 3 phương án trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 57,
    "question": "Đâu là quan điểm chỉ đạo của Đảng ủy VCB tại Nghị quyết 2639-",
    "options": [
      "NQ/ĐU ngày 11/04/2025? Khơi dậy khát vọng phát triển đưa Vietcombank \"Đổi mới - Hiệu quả - Bền vững\"",
      "Khơi dậy khát vọng phát triển đưa Vietcombank \"Vượt qua thách thức - Duy trì vị thế dẫn đầu\"",
      "Khơi dậy khát vọng phát triển đưa Vietcombank \"Vượt lên thách thức - Vươn mình bứt phá - Vững bước tiên phong\"",
      "Khơi dậy khát vọng phát triển đưa Vietcombank \"Tinh - gọn - mạnh - hiệu năng - hiệu lực - hiệu quả\""
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 58,
    "question": "Định hướng của Đảng ủy VCB tại Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 biến các giá trị bản sắc văn hóa Vietcombank thành:",
    "options": [
      "Động lực trong quản trị nhằm nâng tầm nội lực",
      "Hệ tư tưởng trong quản trị nhằm nâng tầm nội lực",
      "Giá trị cốt lõi trong quản trị nhằm nâng tầm nội lực",
      "Quyền lực mềm trong quản trị nhằm nâng tầm nội lực"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 59,
    "question": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB coi việc quản trị, khai thác và sử dụng cái gì như một tài nguyên sản xuất mới?",
    "options": [
      "Công nghệ",
      "Dữ liệu",
      "Nguồn vốn",
      "Nhân lực"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 60,
    "question": "Định hướng chuyển đổi số của Đảng ủy VCB tại Nghị quyết 2639-",
    "options": [
      "NQ/ĐU ngày 11/04/2025 bao gồm những khía cạnh nào?",
      "Nghiên cứu, ứng dụng các công nghệ mới",
      "Xây dựng các mô hình kinh doanh mới",
      "Phát triển sản phẩm số mới Cả 3 phương án trên"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 61,
    "question": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB đề ra mục tiêu đến năm 2030, VCB sẽ áp dụng các tiêu chuẩn nào trong quản trị rủi ro?",
    "options": [
      "Tiêu chuẩn ISO 31000",
      "Khung quản trị rủi ro tích hợp (ERM)",
      "Chuẩn mực Basel mới nhất",
      "Chuẩn mực Basel"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 62,
    "question": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB đề ra mục tiêu đến năm 2030 có bao nhiêu % giao dịch của khách hàng được thực hiện qua các kênh số?",
    "options": [
      "60%",
      "70%",
      "80%",
      "90%"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 63,
    "question": "\"Đổi mới công tác đào tạo, quy hoạch gắn với bồi dưỡng năng lực lãnh đạo, năng lực số hóa\" thuộc nhóm giải pháp nào tại Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB?",
    "options": [
      "Giải pháp về tổ chức và quản lý",
      "Giải pháp về nguồn nhân lực và văn hóa doanh nghiệp",
      "Giải pháp về chuyển đổi số",
      "Giải pháp về quản trị rủi ro"
    ],
    "answer_letter": "B",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 64,
    "question": "Đâu là giải pháp về phát triển thị trường và dịch vụ tại Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB?",
    "options": [
      "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các giải pháp tài chính riêng biệt, chú trọng phân khúc khách hàng bán buôn lớn",
      "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các giải pháp tài chính toàn diện, chú trọng phân khúc khách hàng bán buôn lớn",
      "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các giải pháp tài chính riêng biệt, chú trọng phân khúc khách hàng FDI",
      "Khai thác tối đa nhu cầu của khách hàng bán buôn bằng các giải pháp tài chính toàn diện, chú trọng phân khúc khách hàng FDI"
    ],
    "answer_letter": "D",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  },
  {
    "source": "Cac Nghi quyet trong tam",
    "number": 65,
    "question": "Đơn vị nào có trách nhiệm chủ trì báo cáo tình hình, kết quả thực hiện Nghị quyết 2639-NQ/ĐU ngày 11/04/2025 của Đảng ủy VCB?",
    "options": [
      "Ban Thường vụ Đảng ủy VCB",
      "Ban chấp hành Đảng bộ VCB",
      "Ban Tuyên giáo Đảng ủy VCB",
      "Ban Tổ chức Đảng ủy VCB"
    ],
    "answer_letter": "C",
    "answer_explanation": "Nghị quyết 2639-NQ/ĐU ngày 11/04/2025"
  }
];

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Shuffle questions on component mount
  useEffect(() => {
    shuffleQuestions();
  }, []);

  const shuffleQuestions = () => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (_option: string, index: number) => {
    if (!showResult) {
      setSelectedAnswer(String.fromCharCode(65 + index)); // Convert to A, B, C, D
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer_letter;
    
    if (isCorrect) {
      setScore(score + 1);
    }

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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    shuffleQuestions();
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
          <button
            onClick={shuffleQuestions}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
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
          const isCorrect = optionLetter === currentQuestion.answer_letter;
          
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
          
          if (showResult) {
            if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 text-green-800";
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
            }
          } else {
            if (isSelected) {
              buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
            } else {
              buttonClass += "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option, index)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex items-start gap-3">
                <span className="font-bold text-sm mt-1 min-w-[24px]">
                  {optionLetter}.
                </span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                )}
                {showResult && isSelected && !isCorrect && (
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
          {showResult ? (
            selectedAnswer === currentQuestion.answer_letter ? (
              <span className="text-green-600 font-medium">✓ Correct!</span>
            ) : (
              <span className="text-red-600 font-medium">✗ Incorrect</span>
            )
          ) : (
            "Select an answer above"
          )}
        </div>
        
        <div className="flex gap-3">
          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
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
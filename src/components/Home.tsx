import React from 'react';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const quizCategories = [
    {
      id: 'luat-dau-thau',
      title: 'Luật Đấu thầu',
      description: 'Câu hỏi về Luật Đấu thầu và các quy định liên quan',
      questionCount: 220,
      difficulty: 'Trung bình',
      color: 'bg-blue-500',
      path: '#/luat-dau-thau'
    },
    {
      id: 'nghiep-vu-ke-toan',
      title: 'Nghiệp vụ kế toán',
      description: 'Câu hỏi về nghiệp vụ kế toán ngân hàng và các quy định tài chính',
      questionCount: 354,
      difficulty: 'Nâng cao',
      color: 'bg-green-500',
      path: '#/nghiep-vu-ke-toan'
    }
    // Add more quiz categories here in the future
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800">Training Quiz Platform</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nâng cao kiến thức chuyên môn thông qua các bài kiểm tra tương tác. 
          Chọn chủ đề phù hợp và bắt đầu học tập ngay hôm nay!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-blue-600">2</h3>
          <p className="text-gray-600">Chủ đề khả dụng</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-green-600">574+</h3>
          <p className="text-gray-600">Câu hỏi</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 text-center">
          <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-yellow-600">100%</h3>
          <p className="text-gray-600">Miễn phí</p>
        </div>
      </div>

      {/* Quiz Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Chọn chủ đề học tập</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className={`${category.color} h-2`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{category.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {category.questionCount} câu hỏi
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                    {category.difficulty}
                  </span>
                </div>

                <a
                  href={category.path}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  Bắt đầu quiz
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Câu hỏi đa dạng</h3>
            <p className="text-sm text-gray-600">Ngân hàng câu hỏi phong phú, cập nhật thường xuyên</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Kết quả chi tiết</h3>
            <p className="text-sm text-gray-600">Xem lại đáp án và giải thích sau mỗi bài quiz</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-3 w-fit mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Tiến độ cá nhân</h3>
            <p className="text-sm text-gray-600">Lưu trữ tiến độ học tập và lịch sử điểm số</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full p-3 w-fit mx-auto mb-3">
              <ArrowRight className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Dễ sử dụng</h3>
            <p className="text-sm text-gray-600">Giao diện thân thiện, trực quan và dễ điều hướng</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; 2024 Training Quiz Platform. Được phát triển để hỗ trợ học tập và đào tạo.</p>
      </footer>
    </div>
  );
};

export default Home;

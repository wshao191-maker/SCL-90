import React, { useState, useMemo, useRef, useEffect } from 'react';
import { questions, options, factors } from './data';
import { ScoreResult } from './types';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Brain, ChevronRight, CheckCircle2, RefreshCw, Info, AlertCircle } from 'lucide-react';

const TOTAL_QUESTIONS = questions.length;

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top when question changes
  useEffect(() => {
    if (hasStarted && !isFinished) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestionIndex, hasStarted, isFinished]);

  const progress = Math.round(((currentQuestionIndex) / TOTAL_QUESTIONS) * 100);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleAnswer = (value: number) => {
    const currentQId = questions[currentQuestionIndex].id;
    setAnswers(prev => ({
      ...prev,
      [currentQId]: value
    }));

    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      // Small delay for better UX
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 150);
    } else {
      setIsFinished(true);
    }
  };

  const resetTest = () => {
    setHasStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  // Calculate results
  const results: ScoreResult[] = useMemo(() => {
    if (!isFinished) return [];

    return factors.map(factor => {
      let sum = 0;
      let count = 0;
      factor.questionIds.forEach(qId => {
        if (answers[qId]) {
          sum += answers[qId];
          count++;
        }
      });
      
      const avg = count > 0 ? sum / count : 1;
      
      let severity: ScoreResult['severity'] = '无';
      if (avg > 3) severity = '重度';
      else if (avg > 2) severity = '中度';
      else if (avg > 1.5) severity = '轻度'; // Standard cut-off often varies, using 1.5-2 for mild

      return {
        factorName: factor.name,
        score: parseFloat(avg.toFixed(2)),
        rawScore: sum,
        description: factor.description,
        severity
      };
    });
  }, [isFinished, answers]);

  const totalScore = Object.values(answers).reduce((a: number, b: number) => a + b, 0);
  const totalAvg = parseFloat((totalScore / TOTAL_QUESTIONS).toFixed(2));
  
  // Custom Tooltip for Radar Chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg text-sm">
          <p className="font-bold text-primary">{payload[0].payload.factorName}</p>
          <p className="text-gray-600">指数: {payload[0].value}</p>
          <p className="text-xs text-gray-400 mt-1">{payload[0].payload.severity}</p>
        </div>
      );
    }
    return null;
  };

  // Render Welcome Screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-8 animate-fade-in border border-white">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">心理健康自评量表</h1>
            <p className="text-lg text-primary font-medium opacity-90">SCL-90 专业版</p>
            <p className="text-gray-500 leading-relaxed text-sm">
              本测试包含90道题目，将从躯体化、强迫、人际敏感、抑郁、焦虑等10个维度全面评估您的心理健康状况。
            </p>
          </div>
          
          <div className="space-y-3 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Info className="w-4 h-4 text-primary" />
              <span>请根据您<strong>最近一周</strong>的实际感受回答</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span>答案无对错之分，请凭直觉选择</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>结果仅供参考，不作为医疗诊断依据</span>
            </div>
          </div>

          <button 
            onClick={handleStart}
            className="w-full bg-primary hover:bg-teal-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-teal-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
          >
            开始测试 <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Render Result Screen
  if (isFinished) {
    const highRisks = results.filter(r => r.score > 2);
    
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4" ref={topRef}>
        <div className="max-w-2xl mx-auto space-y-6">
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-primary/10 p-6 text-center border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">测试报告分析</h2>
              <p className="text-gray-500 text-sm mt-2">生成时间: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="p-6">
              <div className="h-72 w-full -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={results}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="factorName" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 4]} tick={false} axisLine={false} />
                    <Radar
                      name="我的指数"
                      dataKey="score"
                      stroke="#5B9A8B"
                      fill="#5B9A8B"
                      fillOpacity={0.5}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mt-4">
                <div>
                   <p className="text-xs text-gray-400 uppercase">总均分</p>
                   <p className="text-2xl font-bold text-gray-800">{totalAvg}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">
                    整体状态: 
                    <span className={`ml-2 ${totalAvg > 2 ? 'text-red-500' : 'text-green-500'}`}>
                      {totalAvg > 2.5 ? '需关注' : (totalAvg > 1.5 ? '亚健康' : '健康')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" /> 详细维度解读
            </h3>
            <div className="space-y-4">
              {results.map((factor) => (
                <div key={factor.factorName} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-700">{factor.factorName}</span>
                    <span className={`text-sm px-2 py-1 rounded-full font-medium 
                      ${factor.score > 3 ? 'bg-red-100 text-red-600' : 
                        factor.score > 2 ? 'bg-orange-100 text-orange-600' : 
                        factor.score > 1.5 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                      {factor.severity} ({factor.score})
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{factor.description}</p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        factor.score > 2.5 ? 'bg-red-400' : 'bg-primary'
                      }`}
                      style={{ width: `${(factor.score / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {highRisks.length > 0 && (
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
              <h4 className="text-orange-800 font-bold mb-2">建议与指导</h4>
              <p className="text-sm text-orange-700 leading-relaxed">
                您的测试结果显示在 <strong>{highRisks.map(r => r.factorName).join('、')}</strong> 方面存在一定的困扰。这并不代表确诊精神疾病，但建议您近期多关注自己的情绪变化，保持规律作息。如果这些症状持续影响您的生活或工作，建议咨询专业心理医生进行评估。
              </p>
            </div>
          )}

          <div className="pb-8">
            <button 
              onClick={resetTest}
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> 重新测试
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Quiz Screen
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen bg-[#F8FBF8] flex flex-col max-w-md mx-auto shadow-2xl shadow-gray-100/50">
      
      {/* Header / Progress */}
      <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-6 py-4 border-b border-gray-50">
        <div className="flex justify-between items-end mb-2">
          <span className="text-2xl font-bold text-primary font-mono">
            {currentQuestionIndex + 1}
            <span className="text-sm text-gray-300 font-normal ml-1">/ {TOTAL_QUESTIONS}</span>
          </span>
          <span className="text-xs font-medium text-gray-400">进度 {progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="my-auto space-y-8 animate-fade-in">
          <div className="space-y-4">
             <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-600 text-xs font-medium tracking-wide">
               请如实回答
             </span>
             <h2 className="text-2xl font-bold text-gray-800 leading-snug">
               {currentQuestion.text}
             </h2>
             <p className="text-gray-400 text-sm">
               最近一周（包含今天），您是否受此困扰？
             </p>
          </div>

          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 relative group
                  ${option.colorClass} border-transparent shadow-sm hover:shadow-md active:scale-[0.99]`}
              >
                <span className="font-semibold text-lg">{option.label}</span>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 opacity-50" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 text-center text-xs text-gray-300 bg-[#F8FBF8]">
        SCL-90 Mental Health Evaluation
      </div>
    </div>
  );
}
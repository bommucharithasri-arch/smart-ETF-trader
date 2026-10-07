import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useTrading } from '../context/TradingContext';
import { AchievementsSection } from '../components/AchievementsSection';
import { LEARNING_LESSONS, QUIZ_QUESTIONS } from '../data/mockData';
import { LearningLesson } from '../types';

export const LearningView: React.FC = () => {
  const { updateQuizScore, showToast } = useTrading();
  const [activeTab, setActiveTab] = useState<'LESSONS' | 'QUIZ' | 'ACHIEVEMENTS'>('LESSONS');
  const [selectedLesson, setSelectedLesson] = useState<LearningLesson | null>(LEARNING_LESSONS[0]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  };

  const handleFinishQuiz = () => {
    setIsQuizSubmitted(true);
    const score = calculateScore();
    updateQuizScore(score);
    if (score >= 80) {
      showToast(`🎉 Outstanding! You scored ${score}% and unlocked the Quiz Master badge!`, 'success');
    } else {
      showToast(`You scored ${score}%. Review the explanations and retry anytime!`, 'info');
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
              ETF Academy & Mastery
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              CURATED CONTENT
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Build institutional-grade ETF knowledge, test your skills in the quiz, and collect achievement badges.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('LESSONS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'LESSONS' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Lessons ({LEARNING_LESSONS.length})
          </button>
          <button
            onClick={() => setActiveTab('QUIZ')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'QUIZ' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Interactive Quiz
          </button>
          <button
            onClick={() => setActiveTab('ACHIEVEMENTS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'ACHIEVEMENTS' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Badges
          </button>
        </div>
      </div>

      {/* Feature 12: Achievements Tab */}
      {activeTab === 'ACHIEVEMENTS' && <AchievementsSection />}

      {/* Interactive Quiz Tab */}
      {activeTab === 'QUIZ' && (
        <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
            <div>
              <h4 className="font-bold text-base text-zinc-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>ETF Knowledge Certification Quiz</span>
              </h4>
              <p className="text-xs text-zinc-400">Score 80%+ to unlock the 🏅 Quiz Master badge.</p>
            </div>

            {isQuizSubmitted && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Score: {calculateScore()}%
                </span>
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-zinc-100 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>
              </div>
            )}
          </div>

          {/* Question Card */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono">
                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <div className="flex gap-1">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-1.5 rounded-full ${
                      i === currentQuestionIndex
                        ? 'bg-emerald-400 w-5'
                        : selectedAnswers[QUIZ_QUESTIONS[i].id] !== undefined
                        ? 'bg-emerald-500/50'
                        : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h5 className="font-bold text-base sm:text-lg text-zinc-100 leading-snug">
              {currentQ.question}
            </h5>

            {/* Options list */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;
                const showFeedback = isQuizSubmitted;

                let optClass = 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-900';
                if (showFeedback) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  }
                } else if (isSelected) {
                  optClass = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-semibold';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt}</span>
                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {isQuizSubmitted && (
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                <span className="font-bold text-emerald-400">Explanation:</span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
              <button
                onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
              >
                Previous
              </button>

              {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((i) => i + 1)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
                >
                  Next Question
                </button>
              ) : (
                !isQuizSubmitted && (
                  <button
                    onClick={handleFinishQuiz}
                    disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
                  >
                    Submit Quiz
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lessons Tab */}
      {activeTab === 'LESSONS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lessons List (Col 4) */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1">
              Modules
            </h4>
            {LEARNING_LESSONS.map((les) => (
              <button
                key={les.id}
                onClick={() => setSelectedLesson(les)}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedLesson?.id === les.id
                    ? 'bg-zinc-900 border-emerald-500/40 text-zinc-100 shadow-sm'
                    : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {les.level}
                  </span>
                  <span className="text-[10px] text-zinc-400">{les.duration}</span>
                </div>
                <h5 className="font-bold text-xs text-zinc-200">{les.title}</h5>
                <span className="text-[10px] text-zinc-400 mt-1 block">{les.category}</span>
              </button>
            ))}
          </div>

          {/* Active Lesson Reader (Col 8) */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-6">
            {selectedLesson ? (
              <>
                <div className="pb-4 border-b border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {selectedLesson.category}
                    </span>
                    <span className="text-xs text-zinc-400">• {selectedLesson.duration}</span>
                  </div>
                  <h3 className="font-black text-xl text-zinc-100">{selectedLesson.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{selectedLesson.description}</p>
                </div>

                {/* Key Takeaways */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-zinc-200 uppercase tracking-wider">
                    Core Principles & Takeaways
                  </h4>
                  <div className="space-y-2.5">
                    {selectedLesson.keyTakeaways.map((point, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Ready to test what you learned?</span>
                  <button
                    onClick={() => setActiveTab('QUIZ')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Take Quiz →
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

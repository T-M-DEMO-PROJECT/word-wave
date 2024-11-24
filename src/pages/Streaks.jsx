import React from 'react';

const Streaks = ({ streak, lastEngagement }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date to a more readable format
  };

  const getMilestoneMessage = (streak) => {
    if (streak === 7) return "💡 One Week Strong! Keep glowing!";
    if (streak === 30) return "⚡ A Whole Month! You're electrifying!";
    if (streak > 30) return "🌟 Streak Legend! You're a star!";
    return "";
  };

  const progressPercentage = streak > 0 ? (streak % 30) * 100 / 30 : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="bg-purple-800/30 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-purple-500/60 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-neon-purple mb-3 glow">✨ Streak Tracker</h2>
        <p className="text-purple-300 text-lg mb-4">
          {streak > 0 ? (
            `🌟 You've built a glowing ${streak}-day streak!`
          ) : (
            "💡 No streak yet? Start today and shine brightly!"
          )}
        </p>
        {lastEngagement && (
          <p className="text-purple-400 mb-4">
            Last Engaged: <span className="font-bold">{formatDate(lastEngagement)}</span>
          </p>
        )}
        {getMilestoneMessage(streak) && (
          <p className="text-neon-purple font-semibold mb-4 glow">
            {getMilestoneMessage(streak)}
          </p>
        )}
        <div className="mb-4">
          <div className="w-full bg-purple-900 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 via-neon-purple to-pink-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-purple-400 text-sm text-center mt-1">
            {progressPercentage.toFixed(0)}% to your next milestone!
          </p>
        </div>
        <button
          className="w-full py-2 bg-gradient-to-r from-neon-purple to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
          onClick={() => alert("You're shining bright! Keep the streak alive!")}
        >
          Keep Glowing! 🌟
        </button>
        <div className="mt-6 text-purple-300">
          <h3 className="text-xl font-bold text-neon-purple mb-2 glow">✨ Pro Tips:</h3>
          <ul className="list-disc list-inside">
            <li>🔔 Set daily reminders for your audiobook sessions.</li>
            <li>📚 Learn a glowing new word each day!</li>
            <li>💪 Celebrate your streaks with small rewards!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Streaks;

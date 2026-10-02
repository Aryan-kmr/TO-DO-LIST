
export default function Progresstracker({ tasks }) {

  const completedTasks = tasks.filter((task) => task.completed).length;

  const totalTasks = tasks.length;

  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="progress-tracker">

      <h3>Task Progress</h3>

      <p>
        {completedTasks} of {totalTasks} tasks completed
      </p>

      <div className="progress-bar">

        <div
          className="progress"
          style={{ width: `${progress}%` }}>
        </div>

      </div>

    </div>
  );
}

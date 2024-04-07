const Assignment = ({ assignment }) => {
  const handleToggle = () => {
    toggleCompleted(assignment.id);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-md-1">
            <input
              type="checkbox"
              id={`checkbox-${assignment.id}`}
              checked={assignment.completed}
              onChange={() => handleToggle()}
            />
          </div>
          <div className="col-md-11">
            <label htmlFor={`checkbox-${assignment.id}`} className={`form-check-label ${assignment.completed ? 'completed' : ''}`}>
              {assignment.course}: {assignment.name}
            </label>
            <div>
              <small className="text-muted">Due: {assignment.dueDate} at {assignment.dueTime}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
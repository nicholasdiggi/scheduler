import { useLocation } from 'react-router-dom';

const AssignmentForm = () => {
  // const { state: assignment } = useLocation();

  return (
    <form className="row g-3">
      {/* <input type="hidden" name="id" value={assignment.id} /> */}
      <div className="col-auto">
        <label htmlFor="course" className="form-label">Course</label>
        <input type="text" className="form-control" id="course" placeholder="Ex: Math" />
      </div>
      <div className="col-auto">
        <label htmlFor="name" className="form-label">Assignment name</label>
        <input type="text" className="form-control" id="name" placeholder="Ex: Problem set 1" />
      </div>
      <div className="col-auto">
        <label htmlFor="dueDate" className="form-label">Due date</label>
        <input type="date" className="form-control" id="dueDate" />
      </div>
      <div className="col-auto">
        <label htmlFor="dueTime" className="form-label">Due time</label>
        <input type="time" className="form-control" id="dueTime" />
      </div>
      <div className="col-auto">
        <label htmlFor="completionTime" className="form-label">Est. time to complete (hrs)</label>
        <input type="number" className="form-control" id="completionTime" />
      </div>
      <div className="col-auto">
        <label htmlFor="importance" className="form-label">Importance (1-5)</label>
        <input type="number" className="form-control" id="importance" />
      </div>
      <div className="col-auto">
        {/* TODO: make button be on same line as iinput boxes */}
        <button type="submit" className="btn btn-primary">+</button>
      </div>
    </form>
  );
};

export default AssignmentForm;